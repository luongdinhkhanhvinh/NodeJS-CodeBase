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
exports.RedisProviderImpl = void 0;
const types_1 = require("@injection/types");
const inversify_1 = require("inversify");
// import { RedisConfig } from "../configs/appConfig";
const redis_1 = require("redis");
let RedisProviderImpl = class RedisProviderImpl {
    constructor(redisConfig) {
        this.redisConfig = redisConfig;
        this.redis = new redis_1.RedisClient({
            host: this.redisConfig.endpoint,
            port: this.redisConfig.port,
        });
    }
    redisClient() {
        return this.redis;
    }
};
RedisProviderImpl = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.RedisConfig))
], RedisProviderImpl);
exports.RedisProviderImpl = RedisProviderImpl;
//# sourceMappingURL=redisProvider.js.map