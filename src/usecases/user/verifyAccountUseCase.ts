import { USER_STATUS } from "@common/enum/userEnum";
import { TYPES } from "@injection/types";
import { UserRepository } from "@repositories/userRepository";
import { UserViewResponse } from "@views/user/userViewResponse";
import { VerifyAccountViewRequest } from "@views/user/verifyAccountViewRequest";
import { inject, injectable } from "inversify";
import { UpdateUserStatusRequest } from "src/domain/models/user/updateUserStatusRequest";
import { UserRedisRepository } from "src/domain/repositories/userRedisRepository";

export interface VerifyAccountUseCase {
  execute(request: VerifyAccountViewRequest): Promise<UserViewResponse>;
}

@injectable()
export class VerifyAccountUseCaseImpl implements VerifyAccountUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository,
    @inject(TYPES.UserRedisRepository)
    private readonly userRedisRepository: UserRedisRepository
  ) {}

  public async execute(request: VerifyAccountViewRequest): Promise<UserViewResponse> {
    const user = await this.userRepository.getById(request.id);
    this.userRepository.checkUserExist(user);

    const updateRequest = new UpdateUserStatusRequest(USER_STATUS.ACTIVE);
    await Promise.all([
      this.userRepository.updateById(user.id, updateRequest),
      this.userRedisRepository.setVerifyCode(user.id, "", 1),
    ]);

    const response: UserViewResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userStatus: user.userStatus,
      priorLoginAt: user.priorLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return response;
  }
}
