import { ModelsInterface } from "@models/models";
import { UserModel } from "@models/user/userModel";
import { DataTypes, Model, Sequelize } from "sequelize";
import { DatabaseTables } from "src/domain/models/databaseTables";

const auditLogModelSchema = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    field: "id",
  },
  userId: {
    type: DataTypes.DATE,
    field: "user_id",
  },
  logTime: {
    type: DataTypes.DATE,
    field: "log_time",
  },
  requestUrl: {
    type: DataTypes.STRING,
    field: "request_url",
  },
  controllerName: {
    type: DataTypes.STRING,
    field: "controller_name",
  },
  actionName: {
    type: DataTypes.STRING,
    field: "action_name",
  },
  responseCode: {
    type: DataTypes.STRING,
    field: "response_code",
  },
  authToken: {
    type: DataTypes.STRING,
    field: "auth_token",
  },
  sourceIp: {
    type: DataTypes.STRING,
    field: "source_ip",
  },
  requestBody: {
    type: DataTypes.STRING,
    field: "request_body",
  },
  requestDate: {
    type: DataTypes.DATE,
    field: "request_date",
  },
  requestDeviceInfo: {
    type: DataTypes.STRING,
    field: "request_device_info",
  },
  requestUserAgent: {
    type: DataTypes.STRING,
    field: "request_user_agent",
  },
  responseBody: {
    type: DataTypes.STRING,
    field: "response_body",
  },
  responseDate: {
    type: DataTypes.DATE,
    field: "response_date",
  },
  responseError: {
    type: DataTypes.STRING,
    field: "response_error",
  },
  trackingId: {
    type: DataTypes.STRING,
    field: "tracking_id",
  },
};

export class AuditLogModel extends Model {
  public id: number;
  public userId: number;
  public logTime: Date;
  public requestUrl: string;
  public controllerName: string;
  public responseCode: string;
  public authToken: string;
  public sourceIp: string;
  public requestBody: string;
  public requestDate: Date;
  public requestDeviceInfo: string;
  public requestUserAgent: string;
  public responseBody: string;
  public responseDate: Date;
  public responseError: string;
  public trackingId: string;

  public static initModel(sequelize: Sequelize) {
    AuditLogModel.init(auditLogModelSchema, {
      sequelize,
      tableName: DatabaseTables.TABLE_AUDIT_LOG,
    });
  }

  public static associate(models: ModelsInterface) {
    const user = models[DatabaseTables.TABLE_USER] as typeof UserModel;
    const auditLog = models[DatabaseTables.TABLE_AUDIT_LOG] as typeof AuditLogModel;

    auditLog.belongsTo(user, {
      foreignKey: "user_id",
    });
  }
}
