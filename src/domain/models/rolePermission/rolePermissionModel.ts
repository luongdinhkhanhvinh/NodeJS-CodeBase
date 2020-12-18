import { ModelsInterface } from "@models/models";
import { DataTypes, Model, Sequelize } from "sequelize";
import { DatabaseTables } from "src/domain/models/databaseTables";

const rolePermissionModelSchema = {
  roleId: {
    type: DataTypes.INTEGER,
    field: "role_id",
    references: {
      model: "role",
      key: "id",
    },
  },
  permissionId: {
    type: DataTypes.INTEGER,
    field: "permission_id",
    references: {
      model: "permission",
      key: "id",
    },
  },
};

export class RolePermissionModel extends Model {
  public roleId: number;
  public permissionId: number;

  public static initModel(sequelize: Sequelize) {
    RolePermissionModel.init(rolePermissionModelSchema, {
      sequelize,
      tableName: DatabaseTables.TABLE_ROLE_PERMISSION,
    });
  }

  public static associate(models: ModelsInterface) {}
}
