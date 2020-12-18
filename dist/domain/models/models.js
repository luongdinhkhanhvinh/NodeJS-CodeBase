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
exports.ModelsImpl = void 0;
const types_1 = require("@injection/types");
const inversify_1 = require("inversify");
const auditLogModel_1 = require("./auditLog/auditLogModel");
const databaseTables_1 = require("./databaseTables");
const permissionModel_1 = require("./permission/permissionModel");
const roleModel_1 = require("./role/roleModel");
const rolePermissionModel_1 = require("./rolePermission/rolePermissionModel");
const userModel_1 = require("./user/userModel");
let ModelsImpl = class ModelsImpl {
    constructor(sequelize) {
        this.sequelize = sequelize;
        this._models = {
            [databaseTables_1.DatabaseTables.TABLE_USER]: userModel_1.UserModel,
            [databaseTables_1.DatabaseTables.TABLE_AUDIT_LOG]: auditLogModel_1.AuditLogModel,
            [databaseTables_1.DatabaseTables.TABLE_PERMISSION]: permissionModel_1.PermissionModel,
            [databaseTables_1.DatabaseTables.TABLE_ROLE]: roleModel_1.RoleModel,
            [databaseTables_1.DatabaseTables.TABLE_ROLE_PERMISSION]: rolePermissionModel_1.RolePermissionModel,
        };
        this.init(sequelize.sequelize());
        this.associate();
    }
    getModels() {
        return this._models;
    }
    init(sequelize) {
        Object.keys(this._models).forEach((modelName) => {
            this._models[modelName].initModel(sequelize);
        });
    }
    associate() {
        Object.keys(this._models).forEach((modelName) => {
            if (this._models[modelName].associate) {
                this._models[modelName].associate(this._models);
            }
        });
    }
};
ModelsImpl = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.SequelizeProvider))
], ModelsImpl);
exports.ModelsImpl = ModelsImpl;
//# sourceMappingURL=models.js.map