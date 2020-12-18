"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionModel = void 0;
const sequelize_1 = require("sequelize");
const databaseTables_1 = require("src/domain/models/databaseTables");
const rolePermissionModelSchema = {
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "role_id",
        references: {
            model: "role",
            key: "id",
        },
    },
    permissionId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "permission_id",
        references: {
            model: "permission",
            key: "id",
        },
    },
};
class RolePermissionModel extends sequelize_1.Model {
    static initModel(sequelize) {
        RolePermissionModel.init(rolePermissionModelSchema, {
            sequelize,
            tableName: databaseTables_1.DatabaseTables.TABLE_ROLE_PERMISSION,
        });
    }
    static associate(models) { }
}
exports.RolePermissionModel = RolePermissionModel;
//# sourceMappingURL=rolePermissionModel.js.map