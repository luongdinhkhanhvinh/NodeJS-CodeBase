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
exports.RolePermissionDbGatewayImpl = void 0;
const types_1 = require("@injection/types");
const databaseTables_1 = require("@models/databaseTables");
const inversify_1 = require("inversify");
let RolePermissionDbGatewayImpl = class RolePermissionDbGatewayImpl {
    constructor(models) {
        this.roleDb = models.getModels()[databaseTables_1.DatabaseTables.TABLE_ROLE];
        this.permissionDb = models.getModels()[databaseTables_1.DatabaseTables.TABLE_PERMISSION];
    }
    getRolePermission() {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield this.roleDb.findAll({
                include: [
                    {
                        model: this.permissionDb,
                        as: "permissions",
                    },
                ],
            });
            const rolePermission = [];
            for (const role of roles) {
                for (const permission of role.permissions) {
                    rolePermission.push({
                        role: role.name,
                        resource: permission.resource,
                        action: permission.action,
                        attributes: permission.attributes,
                    });
                }
            }
            return rolePermission;
        });
    }
};
RolePermissionDbGatewayImpl = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Models))
], RolePermissionDbGatewayImpl);
exports.RolePermissionDbGatewayImpl = RolePermissionDbGatewayImpl;
//# sourceMappingURL=rolePermissionGateway.js.map