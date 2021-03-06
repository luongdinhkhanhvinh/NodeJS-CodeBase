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
exports.VerifyAccountUseCaseImpl = void 0;
const userEnum_1 = require("@common/enum/userEnum");
const types_1 = require("@injection/types");
const inversify_1 = require("inversify");
const updateUserStatusRequest_1 = require("src/domain/models/user/updateUserStatusRequest");
let VerifyAccountUseCaseImpl = class VerifyAccountUseCaseImpl {
    constructor(userRepository, userRedisRepository) {
        this.userRepository = userRepository;
        this.userRedisRepository = userRedisRepository;
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getById(request.id);
            this.userRepository.checkUserExist(user);
            const updateRequest = new updateUserStatusRequest_1.UpdateUserStatusRequest(userEnum_1.USER_STATUS.ACTIVE);
            yield Promise.all([
                this.userRepository.updateById(user.id, updateRequest),
                this.userRedisRepository.setVerifyCode(user.id, "", 1),
            ]);
            const response = {
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
        });
    }
};
VerifyAccountUseCaseImpl = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.UserRepository)),
    __param(1, inversify_1.inject(types_1.TYPES.UserRedisRepository))
], VerifyAccountUseCaseImpl);
exports.VerifyAccountUseCaseImpl = VerifyAccountUseCaseImpl;
//# sourceMappingURL=verifyAccountUseCase.js.map