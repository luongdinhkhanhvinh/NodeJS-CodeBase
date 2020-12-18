"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModel = void 0;
const sequelize_1 = require("sequelize");
const databaseTables_1 = require("src/domain/models/databaseTables");
const permissionModelSchema = {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
    },
    action: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        field: "action",
    },
    resource: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        field: "resource",
    },
    attributes: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        field: "attributes",
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: "created_at",
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: "updated_at",
    },
};
class PermissionModel extends sequelize_1.Model {
    static initModel(sequelize) {
        PermissionModel.init(permissionModelSchema, {
            sequelize,
            tableName: databaseTables_1.DatabaseTables.TABLE_PERMISSION,
        });
    }
    static associate(models) {
        const role = models[databaseTables_1.DatabaseTables.TABLE_ROLE];
        const permission = models[databaseTables_1.DatabaseTables.TABLE_PERMISSION];
        const rolePermission = models[databaseTables_1.DatabaseTables.TABLE_ROLE_PERMISSION];
        permission.belongsToMany(role, {
            through: rolePermission,
            as: "roles",
            foreignKey: "permission_id",
        });
    }
}
exports.PermissionModel = PermissionModel;
//# sourceMappingURL=permissionModel.js.map