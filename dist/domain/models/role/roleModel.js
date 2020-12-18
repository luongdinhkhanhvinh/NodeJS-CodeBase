"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const sequelize_1 = require("sequelize");
const databaseTables_1 = require("src/domain/models/databaseTables");
const roleModelSchema = {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "name",
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        field: "full_name",
    },
    abbreviation: {
        type: sequelize_1.DataTypes.STRING,
        field: "abbreviation",
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
class RoleModel extends sequelize_1.Model {
    static initModel(sequelize) {
        RoleModel.init(roleModelSchema, {
            sequelize,
            tableName: databaseTables_1.DatabaseTables.TABLE_ROLE,
        });
    }
    static associate(models) {
        const user = models[databaseTables_1.DatabaseTables.TABLE_USER];
        const role = models[databaseTables_1.DatabaseTables.TABLE_ROLE];
        const permission = models[databaseTables_1.DatabaseTables.TABLE_PERMISSION];
        const rolePermission = models[databaseTables_1.DatabaseTables.TABLE_ROLE_PERMISSION];
        role.belongsToMany(permission, {
            through: rolePermission,
            as: "permissions",
            foreignKey: "role_id",
        });
        role.hasMany(user, { foreignKey: "role_id", as: "users" });
    }
}
exports.RoleModel = RoleModel;
//# sourceMappingURL=roleModel.js.map