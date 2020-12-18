"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const userEnum_1 = require("src/common/enum/userEnum");
const databaseTables_1 = require("src/domain/models/databaseTables");
const userModelSchema = {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "email",
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "first_name",
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: "last_name",
    },
    hashPassword: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "hash_password",
    },
    userStatus: {
        type: sequelize_1.DataTypes.ENUM(userEnum_1.USER_STATUS.ACTIVE, userEnum_1.USER_STATUS.INACTIVE, userEnum_1.USER_STATUS.PASSWORD_RESET, userEnum_1.USER_STATUS.UNVERIFIED),
        field: "user_status",
    },
    priorLoginAt: {
        type: sequelize_1.DataTypes.DATE,
        field: "prior_login_at",
    },
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "role_id",
        references: {
            model: "role",
            key: "id",
        },
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
class UserModel extends sequelize_1.Model {
    static initModel(sequelize) {
        UserModel.init(userModelSchema, {
            sequelize,
            tableName: databaseTables_1.DatabaseTables.TABLE_USER,
        });
    }
    static associate(models) {
        const user = models[databaseTables_1.DatabaseTables.TABLE_USER];
        const role = models[databaseTables_1.DatabaseTables.TABLE_ROLE];
        user.belongsTo(role, { foreignKey: "role_id" });
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=userModel.js.map