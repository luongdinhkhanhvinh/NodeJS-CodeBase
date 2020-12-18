"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationRepositoryImpl = void 0;
const types_1 = require("@injection/types");
const newUserRequest_1 = require("@models/user/newUserRequest");
const updatePasswordRequest_1 = require("@models/user/updatePasswordRequest");
const updatePriorLoginAtRequest_1 = require("@models/user/updatePriorLoginAtRequest");
const updateUserStatusRequest_1 = require("@models/user/updateUserStatusRequest");
const authentication_1 = require("devblock-authentication/lib/models/authentication");
const inversify_1 = require("inversify");
const randomstring_1 = require("randomstring");
const userEnum_1 = require("src/common/enum/userEnum");
const user_1 = require("src/common/user");
const illegalParameterError_1 = require("src/errors/illegalParameterError");
let AuthenticationRepositoryImpl = class AuthenticationRepositoryImpl {
    constructor(userRepository, roleRepository, userRedisRepository, sendEmailUtil, authenticationConfig, updateUserSettingUseCase, verifyAccountUseCase) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRedisRepository = userRedisRepository;
        this.sendEmailUtil = sendEmailUtil;
        this.authenticationConfig = authenticationConfig;
        this.updateUserSettingUseCase = updateUserSettingUseCase;
        this.verifyAccountUseCase = verifyAccountUseCase;
    }
    getUserByUserName(userName, userType) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getByEmail(userName, userType);
            return user
                ? Object.assign({ userName: user.email, hashPassword: user.hashPassword }, user) : null;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getByEmail(email);
            return user
                ? Object.assign({ userName: user.email, hashPassword: user.hashPassword }, user) : null;
        });
    }
    generateForgotPasswordCode(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const expireIn = this.authenticationConfig.expireResetCodeSecond;
            const code = randomstring_1.generate(10);
            yield Promise.all([
                this.userRedisRepository.setVerifyCode(request.id, code, parseInt(expireIn, 10)),
                this.userRedisRepository.setResendTime(request.id),
            ]);
            return code;
        });
    }
    sendEmailForgotPassword(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getById(request.param.id);
            let template = request.htmlTemplate.replace(/{{id}}/gi, user.id.toString());
            template = template.replace(/{{code}}/gi, request.param.verifyCode);
            template = template.replace(/{{user_name}}/gi, user.firstName);
            template = template.replace(/{{url}}/gi, this.authenticationConfig.verificationUrl);
            yield this.sendEmailUtil.sendEmail(this.authenticationConfig.emailSystem, [request.toEmail], user_1.USER.RESET_PASSWORD, template);
            yield this.userRedisRepository.setResendTime(user.id);
        });
    }
    checkUserExist(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getByEmail(request.email);
            return !!user && user.userStatus !== userEnum_1.USER_STATUS.UNVERIFIED;
        });
    }
    saveUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.roleRepository.getRoleByName(request.additional.role);
            if (!role) {
                throw new illegalParameterError_1.IllegalParameterError("VerifyAccountUseCase", "validate", "Role does not exist");
            }
            const newUserRequest = new newUserRequest_1.NewUserRequest(request.email, request.firstName, request.lastName, request.hashPassword, role.id, userEnum_1.USER_STATUS.UNVERIFIED);
            let user = yield this.userRepository.getByEmail(request.email);
            user = !!user
                ? yield this.userRepository.updateById(user.id, newUserRequest)
                : yield this.userRepository.createUser(newUserRequest);
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.email,
                email: user.email,
                hashPassword: user.hashPassword,
                userStatus: user.userStatus,
            };
        });
    }
    generateVerifyCode(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const code = randomstring_1.generate(10);
            yield this.userRedisRepository.setVerifyCode(request.id, code, user_1.USER.EXPIRE_VERTIFY_CODE_SECOND);
            return code;
        });
    }
    validateVerifyCode(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyCode = yield this.userRedisRepository.getVerifyCode(request.id);
            if (!verifyCode || request.code !== verifyCode) {
                throw new illegalParameterError_1.IllegalParameterError("VerifyAccountUseCase", "validate", "Invalid code");
            }
            return true;
        });
    }
    sendVerifyEmail(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getById(request.param.id);
            let template = request.htmlTemplate.replace(/{{id}}/gi, user.id.toString());
            template = template.replace(/{{code}}/gi, request.param.verifyCode);
            template = template.replace(/{{user_full_name}}/gi, `${user.firstName}`);
            template = template.replace(/{{url}}/gi, this.authenticationConfig.verificationUrl);
            yield this.sendEmailUtil.sendEmail(this.authenticationConfig.emailSystem, [request.toEmail], user_1.USER.NEW_ACCOUNT_SUBJECT, template);
            yield this.userRedisRepository.setResendTime(user.id);
            return true;
        });
    }
    checkUserValid(user, usecase) {
        return __awaiter(this, void 0, void 0, function* () {
            let error = null;
            switch (usecase) {
                case authentication_1.CHECK_USER_VALID_CASE.RESEND_VERIFY:
                    if (!user || user.userStatus !== userEnum_1.USER_STATUS.UNVERIFIED) {
                        error = "Invalid User";
                    }
                    else {
                        const ttl = yield this.userRedisRepository.getResendTime(user.id);
                        if (ttl > 0) {
                            error = `Retry after ${ttl} seconds`;
                        }
                    }
                    break;
                case authentication_1.CHECK_USER_VALID_CASE.LOGIN:
                    if (user.userStatus !== userEnum_1.USER_STATUS.ACTIVE) {
                        error = "User Invalid";
                    }
                    break;
                case authentication_1.CHECK_USER_VALID_CASE.RESET_PASSWORD:
                    if (!user || user.userStatus === userEnum_1.USER_STATUS.UNVERIFIED) {
                        error = "Account not found";
                    }
                    else if (user.userStatus === userEnum_1.USER_STATUS.INACTIVE) {
                        error = "Account not active, contact support";
                    }
                    else {
                        const ttl = yield this.userRedisRepository.getResendTime(user.id);
                        if (ttl > 0) {
                            error = `Retry after ${ttl} seconds`;
                        }
                    }
                    break;
                default:
                    return null;
            }
            return error;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getById(id);
            return user
                ? Object.assign({ userName: user.email, hashPassword: user.hashPassword }, user) : null;
        });
    }
    getTokenPayLoad(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.roleRepository.getRoleByUserId(user.id);
            const tokenPayload = {
                sub: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName,
                role: role.name || "",
            };
            return tokenPayload;
        });
    }
    postLoginSuccess(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDetail = yield this.userRepository.getById(user.id);
            const updateDate = new updatePriorLoginAtRequest_1.UpdatePriorLoginAtRequest(userDetail.updatedAt);
            yield Promise.all([
                this.userRepository.updateById(user.id, updateDate),
                this.userRedisRepository.setRetryLoginNumber(user.id, 0, 1),
            ]);
            return;
        });
    }
    preAuthen(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const retry = yield this.userRedisRepository.getRetryLoginNumber(user.id);
            const maxRetry = this.authenticationConfig.retryLoginCount;
            const timeExpires = this.authenticationConfig.attemptLockAccountSecond;
            if (retry > parseInt(maxRetry, 10)) {
                throw new illegalParameterError_1.IllegalParameterError("Authentication", "login", "The account has been temporarily locked");
            }
            yield this.userRedisRepository.setRetryLoginNumber(user.id, retry + 1, parseInt(timeExpires, 10));
        });
    }
    updateProfile(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.updateUserSettingUseCase.execute(request);
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.email,
                email: user.email,
                hashPassword: user.hashPassword,
                userStatus: user.userStatus,
            };
        });
    }
    preResetPassword(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = new updateUserStatusRequest_1.UpdateUserStatusRequest(userEnum_1.USER_STATUS.PASSWORD_RESET);
            yield this.userRepository.updateById(user.id, updateRequest);
        });
    }
    updatePassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = new updatePasswordRequest_1.UpdatePasswordRequest(password, userEnum_1.USER_STATUS.ACTIVE);
            yield Promise.all([
                this.userRepository.updateById(id, updateRequest),
                this.userRedisRepository.setVerifyCode(id, "", 1),
            ]);
        });
    }
    verifyAccount(userId, code) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.verifyAccountUseCase.execute({ id: userId, code });
        });
    }
};
AuthenticationRepositoryImpl = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.UserRepository)),
    __param(1, inversify_1.inject(types_1.TYPES.RoleRepository)),
    __param(2, inversify_1.inject(types_1.TYPES.UserRedisRepository)),
    __param(3, inversify_1.inject(types_1.TYPES.SendEmailUtil)),
    __param(4, inversify_1.inject(types_1.TYPES.AuthenticationConfig)),
    __param(5, inversify_1.inject(types_1.TYPES.UpdateUserSettingUseCase)),
    __param(6, inversify_1.inject(types_1.TYPES.VerifyAccountUseCase))
], AuthenticationRepositoryImpl);
exports.AuthenticationRepositoryImpl = AuthenticationRepositoryImpl;
//# sourceMappingURL=authenticationRepository.js.map