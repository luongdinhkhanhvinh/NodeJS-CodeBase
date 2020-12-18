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
exports.RolePermissionRedisGatewayImpl = void 0;
const types_1 = require("@injection/types");
const inversify_1 = require("inversify");
let RolePermissionRedisGatewayImpl = class RolePermissionRedisGatewayImpl {
    constructor(redisProvider) {
        this.redisProvider = redisProvider;
        this.rolePermissionKey = "role_permission";
        this.redisClient = redisProvider.redisClient();
    }
    setRolePermission(rolePermission) {
        return __awaiter(this, void 0, void 0, function* () {
            this.redisClient.set(this.rolePermissionKey, JSON.stringify(rolePermission));
        });
    }
    getRolePermission() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redisClient.get(this.rolePermissionKey, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(data ? JSON.parse(data) : null);
                });
            });
        });
    }
};
RolePermissionRedisGatewayImpl = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.RedisProvider))
], RolePermissionRedisGatewayImpl);
exports.RolePermissionRedisGatewayImpl = RolePermissionRedisGatewayImpl;
//# sourceMappingURL=rolePermissionRedisGateway.js.map