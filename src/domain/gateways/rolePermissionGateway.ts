import { TYPES } from "@injection/types";
import { DatabaseTables } from "@models/databaseTables";
import { Models } from "@models/models";
import { PermissionModel } from "@models/permission/permissionModel";
import { RoleModel } from "@models/role/roleModel";
import { RolePermissionResponse } from "@models/rolePermission/rolePermissionResponse";
import { inject, injectable } from "inversify";

export interface RolePermissionDbGateway {
  getRolePermission(): Promise<RolePermissionResponse[]>;
}

@injectable()
export class RolePermissionDbGatewayImpl implements RolePermissionDbGateway {
  private readonly roleDb: typeof RoleModel;
  private readonly permissionDb: typeof PermissionModel;

  constructor(@inject(TYPES.Models) models: Models) {
    this.roleDb = models.getModels()[
      DatabaseTables.TABLE_ROLE
    ] as typeof RoleModel;
    this.permissionDb = models.getModels()[
      DatabaseTables.TABLE_PERMISSION
    ] as typeof PermissionModel;
  }

  public async getRolePermission(): Promise<RolePermissionResponse[]> {
    const roles = await this.roleDb.findAll({
      include: [
        {
          model: this.permissionDb,
          as: "permissions",
        },
      ],
    });

    const rolePermission: RolePermissionResponse[] = [];
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
  }
}
