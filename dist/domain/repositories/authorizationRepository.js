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
exports.AuthorizationRepositoryImpl = void 0;
const accesscontrol_1 = require("accesscontrol");
const inversify_1 = require("inversify");
const unauthorizedError_1 = require("src/errors/unauthorizedError");
const types_1 = require("src/injection/types");
let AuthorizationRepositoryImpl = class AuthorizationRepositoryImpl {
    constructor(rolePermissionRedisGateway, rolePermissionDbGateway) {
        this.rolePermissionRedisGateway = rolePermissionRedisGateway;
        this.rolePermissionDbGateway = rolePermissionDbGateway;
        this.accessControl = new accesscontrol_1.AccessControl();
    }
    getPermission(context, routerName // format [resource]/[action]
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            const granted = yield this.getRolePermissionData();
            this.accessControl.setGrants(granted);
            const role = context._tokenPayload.role;
            const resource = routerName.split("/")[0];
            const action = routerName.split("/")[1];
            if (!role || !resource || !action) {
                throw new unauthorizedError_1.UnauthorizedError("AuthorizationRepository", "getPermission", "invalid_permission");
            }
            const query = this.accessControl.can(role);
            const permission = this.checkAction(query, action, resource);
            return permission;
        });
    }
    checkAction(query, actionName, resource) {
        let permission;
        switch (actionName) {
            case "create:own":
                permission = query.createOwn(resource);
                break;
            case "create:any":
                permission = query.createAny(resource);
                break;
            case "update:own":
                permission = query.updateOwn(resource);
                break;
            case "update:any":
                permission = query.updateAny(resource);
                break;
            case "read:own":
                permission = query.readOwn(resource);
                break;
            case "read:any":
                permission = query.readAny(resource);
                break;
            case "delete:own":
                permission = query.deleteOwn(resource);
                break;
            case "delete:any":
                permission = query.deleteAny(resource);
                break;
            default:
                throw new unauthorizedError_1.UnauthorizedError("AuthorizationRepository", "checkPermission", "invalid_action");
        }
        return permission;
    }
    getRolePermissionData() {
        return __awaiter(this, void 0, void 0, function* () {
            let grant = yield this.rolePermissionRedisGateway.getRolePermission();
            if (!grant || !grant.length) {
                grant = yield this.rolePermissionDbGateway.getRolePermission();
                yield this.rolePermissionRedisGateway.setRolePermission(grant);
            }
            return grant;
        });
    }
};
AuthorizationRepositoryImpl = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.RolePermissionRedisGateway)),
    __param(1, inversify_1.inject(types_1.TYPES.RolePermissionDbGateway))
], AuthorizationRepositoryImpl);
exports.AuthorizationRepositoryImpl = AuthorizationRepositoryImpl;
//# sourceMappingURL=authorizationRepository.js.map