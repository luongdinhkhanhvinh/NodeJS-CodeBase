import { TYPES } from "@injection/types";
import { DatabaseTables } from "@models/databaseTables";
import { Models } from "@models/models";
import { UserModel } from "@models/user/userModel";
import { inject, injectable } from "inversify";
import { RoleModel } from "@models/role/roleModel";

export interface RoleDbGateway {
  getRoleByUserId(userId: number): Promise<RoleModel>;
  getRoleByName(roleName: string): Promise<RoleModel>;
}

@injectable()
export class RoleDbGatewayImpl implements RoleDbGateway {
  private readonly roleDb: typeof RoleModel;
  private readonly userDb: typeof UserModel;

  constructor(@inject(TYPES.Models) models: Models) {
    this.roleDb = models.getModels()[
      DatabaseTables.TABLE_ROLE
    ] as typeof RoleModel;
    this.userDb = models.getModels()[
      DatabaseTables.TABLE_USER
    ] as typeof UserModel;
  }

  public async getRoleByUserId(userId: number): Promise<RoleModel> {
    const user = await this.userDb.findByPk(userId);
    if (!user) {
      return null;
    }
    const role = await this.roleDb.findByPk(user.roleId);
    return role;
  }

  public async getRoleByName(roleName: string): Promise<RoleModel> {
    return this.roleDb.findOne({ where: { name: roleName } });
  }
}
