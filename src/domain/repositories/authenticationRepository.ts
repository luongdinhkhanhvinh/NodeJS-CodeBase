import { TYPES } from "@injection/types";
import { NewUserRequest } from "@models/user/newUserRequest";
import { UpdatePasswordRequest } from "@models/user/updatePasswordRequest";
import { UpdatePriorLoginAtRequest } from "@models/user/updatePriorLoginAtRequest";
import { UpdateUserStatusRequest } from "@models/user/updateUserStatusRequest";
import { SendEmailUtil } from "@utils/sendEmailUtil";
import { Interfaces, Types } from "devblock-authentication";
import { CHECK_USER_VALID_CASE } from "devblock-authentication/lib/models/authentication";
import { inject, injectable } from "inversify";
import { generate } from "randomstring";
import { USER_STATUS } from "src/common/enum/userEnum";
import { USER } from "src/common/user";
import { AuthenticationConfig } from "src/configs/appConfig";
import { IllegalParameterError } from "src/errors/illegalParameterError";
import { UpdateUserSettingUseCase } from "src/usecases/user/updateUserSettingUseCase";
import { VerifyAccountUseCase } from "src/usecases/user/verifyAccountUseCase";
import { UserViewResponse } from "src/views/user/userViewResponse";
import { RoleRepository } from "./roleRepository";
import { UserRedisRepository } from "./userRedisRepository";
import { UserRepository } from "./userRepository";

export interface AuthenticationRepository extends Interfaces.AuthenticationInterface {}

@injectable()
export class AuthenticationRepositoryImpl implements AuthenticationRepository {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository,
    @inject(TYPES.RoleRepository)
    private readonly roleRepository: RoleRepository,
    @inject(TYPES.UserRedisRepository)
    private readonly userRedisRepository: UserRedisRepository,
    @inject(TYPES.SendEmailUtil) private sendEmailUtil: SendEmailUtil,
    @inject(TYPES.AuthenticationConfig)
    private readonly authenticationConfig: AuthenticationConfig,
    @inject(TYPES.UpdateUserSettingUseCase)
    private readonly updateUserSettingUseCase: UpdateUserSettingUseCase,
    @inject(TYPES.VerifyAccountUseCase)
    private readonly verifyAccountUseCase: VerifyAccountUseCase
  ) {}

  public async getUserByUserName(userName: string, userType: string): Promise<Types.Authentication.UserReponse> {
    const user = await this.userRepository.getByEmail(userName, userType);
    return user
      ? {
          userName: user.email,
          hashPassword: user.hashPassword,
          ...user,
        }
      : null;
  }
  public async getUserByEmail(email: string): Promise<Types.Authentication.UserReponse> {
    const user = await this.userRepository.getByEmail(email);
    return user
      ? {
          userName: user.email,
          hashPassword: user.hashPassword,
          ...user,
        }
      : null;
  }
  public async generateForgotPasswordCode(request: Types.Authentication.UserReponse): Promise<string> {
    const expireIn = this.authenticationConfig.expireResetCodeSecond;
    const code = generate(10);
    await Promise.all([
      this.userRedisRepository.setVerifyCode(request.id, code, parseInt(expireIn, 10)),
      this.userRedisRepository.setResendTime(request.id),
    ]);
    return code;
  }
  public async sendEmailForgotPassword(request: Types.Authentication.SendEmailForgotPasswordRequest): Promise<void> {
    const user = await this.userRepository.getById(request.param.id);
    let template = request.htmlTemplate.replace(/{{id}}/gi, user.id.toString());
    template = template.replace(/{{code}}/gi, request.param.verifyCode);
    template = template.replace(/{{user_name}}/gi, user.firstName);
    template = template.replace(/{{url}}/gi, this.authenticationConfig.verificationUrl);

    await this.sendEmailUtil.sendEmail(
      this.authenticationConfig.emailSystem,
      [request.toEmail],
      USER.RESET_PASSWORD,
      template
    );
    await this.userRedisRepository.setResendTime(user.id);
  }

  public async checkUserExist(request: Types.Authentication.UserSignupInfoRequest): Promise<boolean> {
    const user = await this.userRepository.getByEmail(request.email);
    return !!user && user.userStatus !== USER_STATUS.UNVERIFIED;
  }

  public async saveUser(
    request: Types.Authentication.UserSignupInfoRequest
  ): Promise<Types.Authentication.UserReponse> {
    const role = await this.roleRepository.getRoleByName(request.additional.role);

    if (!role) {
      throw new IllegalParameterError("VerifyAccountUseCase", "validate", "Role does not exist");
    }

    const newUserRequest = new NewUserRequest(
      request.email,
      request.firstName,
      request.lastName,
      request.hashPassword,
      role.id,
      USER_STATUS.UNVERIFIED
    );

    let user = await this.userRepository.getByEmail(request.email);

    user = !!user
      ? await this.userRepository.updateById(user.id, newUserRequest)
      : await this.userRepository.createUser(newUserRequest);

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.email,
      email: user.email,
      hashPassword: user.hashPassword,
      userStatus: user.userStatus,
    };
  }

  public async generateVerifyCode(
    request: Types.Authentication.UserSignupInfoRequest | Types.Authentication.UserReponse
  ): Promise<string> {
    const code = generate(10);
    await this.userRedisRepository.setVerifyCode(request.id, code, USER.EXPIRE_VERTIFY_CODE_SECOND);
    return code;
  }

  public async validateVerifyCode(request: any): Promise<boolean> {
    const verifyCode = await this.userRedisRepository.getVerifyCode(request.id);
    if (!verifyCode || request.code !== verifyCode) {
      throw new IllegalParameterError("VerifyAccountUseCase", "validate", "Invalid code");
    }
    return true;
  }

  public async sendVerifyEmail(request: Types.Authentication.SendEmailVerifyRequest): Promise<boolean> {
    const user = await this.userRepository.getById(request.param.id);
    let template = request.htmlTemplate.replace(/{{id}}/gi, user.id.toString());
    template = template.replace(/{{code}}/gi, request.param.verifyCode);
    template = template.replace(/{{user_full_name}}/gi, `${user.firstName}`);
    template = template.replace(/{{url}}/gi, this.authenticationConfig.verificationUrl);

    await this.sendEmailUtil.sendEmail(
      this.authenticationConfig.emailSystem,
      [request.toEmail],
      USER.NEW_ACCOUNT_SUBJECT,
      template
    );
    await this.userRedisRepository.setResendTime(user.id);
    return true;
  }

  public async checkUserValid(user: Types.Authentication.UserReponse, usecase: string): Promise<string> {
    let error = null;
    switch (usecase) {
      case CHECK_USER_VALID_CASE.RESEND_VERIFY:
        if (!user || user.userStatus !== USER_STATUS.UNVERIFIED) {
          error = "Invalid User";
        } else {
          const ttl = await this.userRedisRepository.getResendTime(user.id);
          if (ttl > 0) {
            error = `Retry after ${ttl} seconds`;
          }
        }
        break;
      case CHECK_USER_VALID_CASE.LOGIN:
        if (user.userStatus !== USER_STATUS.ACTIVE) {
          error = "User Invalid";
        }
        break;
      case CHECK_USER_VALID_CASE.RESET_PASSWORD:
        if (!user || user.userStatus === USER_STATUS.UNVERIFIED) {
          error = "Account not found";
        } else if (user.userStatus === USER_STATUS.INACTIVE) {
          error = "Account not active, contact support";
        } else {
          const ttl = await this.userRedisRepository.getResendTime(user.id);
          if (ttl > 0) {
            error = `Retry after ${ttl} seconds`;
          }
        }
        break;
      default:
        return null;
    }
    return error;
  }

  public async getById(id: number): Promise<Types.Authentication.UserReponse> {
    const user = await this.userRepository.getById(id);
    return user
      ? {
          userName: user.email,
          hashPassword: user.hashPassword,
          ...user,
        }
      : null;
  }

  public async getTokenPayLoad(user: Types.Authentication.UserReponse): Promise<object> {
    const role = await this.roleRepository.getRoleByUserId(user.id);
    const tokenPayload = {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
      role: role.name || "",
    };
    return tokenPayload;
  }

  public async postLoginSuccess(user: Types.Authentication.UserReponse): Promise<void> {
    const userDetail = await this.userRepository.getById(user.id);
    const updateDate = new UpdatePriorLoginAtRequest(userDetail.updatedAt);
    await Promise.all([
      this.userRepository.updateById(user.id, updateDate),
      this.userRedisRepository.setRetryLoginNumber(user.id, 0, 1),
    ]);
    return;
  }

  public async preAuthen(user: Types.Authentication.UserReponse): Promise<void> {
    const retry = await this.userRedisRepository.getRetryLoginNumber(user.id);
    const maxRetry = this.authenticationConfig.retryLoginCount;
    const timeExpires = this.authenticationConfig.attemptLockAccountSecond;

    if (retry > parseInt(maxRetry, 10)) {
      throw new IllegalParameterError("Authentication", "login", "The account has been temporarily locked");
    }
    await this.userRedisRepository.setRetryLoginNumber(user.id, retry + 1, parseInt(timeExpires, 10));
  }

  public async updateProfile(
    request: Types.Authentication.UpdateProfileRequest
  ): Promise<Types.Authentication.UserReponse> {
    const user = await this.updateUserSettingUseCase.execute(request);
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.email,
      email: user.email,
      hashPassword: user.hashPassword,
      userStatus: user.userStatus,
    };
  }

  public async preResetPassword(user: Types.Authentication.UserReponse): Promise<void> {
    const updateRequest = new UpdateUserStatusRequest(USER_STATUS.PASSWORD_RESET);
    await this.userRepository.updateById(user.id, updateRequest);
  }

  public async updatePassword(id: number, password: string): Promise<void> {
    const updateRequest = new UpdatePasswordRequest(password, USER_STATUS.ACTIVE);
    await Promise.all([
      this.userRepository.updateById(id, updateRequest),
      this.userRedisRepository.setVerifyCode(id, "", 1),
    ]);
  }

  public async verifyAccount(userId: number, code: string): Promise<UserViewResponse> {
    return this.verifyAccountUseCase.execute({ id: userId, code });
  }
}
