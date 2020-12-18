"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogModel = void 0;
const sequelize_1 = require("sequelize");
const databaseTables_1 = require("src/domain/models/databaseTables");
const auditLogModelSchema = {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
    },
    userId: {
        type: sequelize_1.DataTypes.DATE,
        field: "user_id",
    },
    logTime: {
        type: sequelize_1.DataTypes.DATE,
        field: "log_time",
    },
    requestUrl: {
        type: sequelize_1.DataTypes.STRING,
        field: "request_url",
    },
    controllerName: {
        type: sequelize_1.DataTypes.STRING,
        field: "controller_name",
    },
    actionName: {
        type: sequelize_1.DataTypes.STRING,
        field: "action_name",
    },
    responseCode: {
        type: sequelize_1.DataTypes.STRING,
        field: "response_code",
    },
    authToken: {
        type: sequelize_1.DataTypes.STRING,
        field: "auth_token",
    },
    sourceIp: {
        type: sequelize_1.DataTypes.STRING,
        field: "source_ip",
    },
    requestBody: {
        type: sequelize_1.DataTypes.STRING,
        field: "request_body",
    },
    requestDate: {
        type: sequelize_1.DataTypes.DATE,
        field: "request_date",
    },
    requestDeviceInfo: {
        type: sequelize_1.DataTypes.STRING,
        field: "request_device_info",
    },
    requestUserAgent: {
        type: sequelize_1.DataTypes.STRING,
        field: "request_user_agent",
    },
    responseBody: {
        type: sequelize_1.DataTypes.STRING,
        field: "response_body",
    },
    responseDate: {
        type: sequelize_1.DataTypes.DATE,
        field: "response_date",
    },
    responseError: {
        type: sequelize_1.DataTypes.STRING,
        field: "response_error",
    },
    trackingId: {
        type: sequelize_1.DataTypes.STRING,
        field: "tracking_id",
    },
};
class AuditLogModel extends sequelize_1.Model {
    static initModel(sequelize) {
        AuditLogModel.init(auditLogModelSchema, {
            sequelize,
            tableName: databaseTables_1.DatabaseTables.TABLE_AUDIT_LOG,
        });
    }
    static associate(models) {
        const user = models[databaseTables_1.DatabaseTables.TABLE_USER];
        const auditLog = models[databaseTables_1.DatabaseTables.TABLE_AUDIT_LOG];
        auditLog.belongsTo(user, {
            foreignKey: "user_id",
        });
    }
}
exports.AuditLogModel = AuditLogModel;
//# sourceMappingURL=auditLogModel.js.map