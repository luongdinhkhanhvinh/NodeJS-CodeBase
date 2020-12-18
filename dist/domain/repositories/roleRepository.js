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
exports.RoleRepositoryImpl = void 0;
const inversify_1 = require("inversify");
const types_1 = require("src/injection/types");
let RoleRepositoryImpl = class RoleRepositoryImpl {
    constructor(roleDbGateway, rolePermissionRedisGateway) {
        this.roleDbGateway = roleDbGateway;
        this.rolePermissionRedisGateway = rolePermissionRedisGateway;
    }
    getRoleByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.roleDbGateway.getRoleByUserId(userId);
        });
    }
    getRoleByName(roleName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.roleDbGateway.getRoleByName(roleName);
        });
    }
    clearCache() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rolePermissionRedisGateway.setRolePermission([]);
        });
    }
};
RoleRepositoryImpl = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.RoleDbGateway)),
    __param(1, inversify_1.inject(types_1.TYPES.RolePermissionRedisGateway))
], RoleRepositoryImpl);
exports.RoleRepositoryImpl = RoleRepositoryImpl;
//# sourceMappingURL=roleRepository.js.map