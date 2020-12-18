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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRedisRepositoryImpl = void 0;
const types_1 = require("@injection/types");
const inversify_1 = require("inversify");
let UserRedisRepositoryImpl = class UserRedisRepositoryImpl {
    constructor(userRedisGateway) {
        this.userRedisGateway = userRedisGateway;
    }
    setVerifyCode(userId, code, expires) {
        return this.userRedisGateway.setVerifyCode(userId, code, expires);
    }
    getVerifyCode(userId) {
        return this.userRedisGateway.getVerifyCode(userId);
    }
    setResendTime(userId) {
        return this.userRedisGateway.setResendTime(userId);
    }
    getResendTime(userId) {
        return this.userRedisGateway.getResendTime(userId);
    }
    setRetryLoginNumber(userId, retry, expire) {
        return this.userRedisGateway.setRetryLoginNumber(userId, retry, expire);
    }
    getRetryLoginNumber(userId) {
        return this.userRedisGateway.getRetryLoginNumber(userId);
    }
};
UserRedisRepositoryImpl = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.UserRedisGateway))
], UserRedisRepositoryImpl);
exports.UserRedisRepositoryImpl = UserRedisRepositoryImpl;
//# sourceMappingURL=userRedisRepository.js.map