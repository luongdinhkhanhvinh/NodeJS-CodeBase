import { UserDbGateway } from "@gateways/userDbGateway";
import { inject, injectable } from "inversify";
import { TYPES } from "src/injection/types";
import { RoleDbGateway } from "@gateways/roleDbGateway";
import { RoleModel } from "@models/role/roleModel";
import { RolePermissionRedisGateway } from "@gateways/rolePermissionRedisGateway";

export interface RoleRepository {
  getRoleByUserId(userId: number): Promise<RoleModel>;
  getRoleByName(roleName: string): Promise<RoleModel>;
  clearCache(): Promise<void>;
}

@injectable()
export class RoleRepositoryImpl implements RoleRepository {
  constructor(
    @inject(TYPES.RoleDbGateway) private readonly roleDbGateway: RoleDbGateway,
    @inject(TYPES.RolePermissionRedisGateway) private readonly rolePermissionRedisGateway: RolePermissionRedisGateway
  ) {}

  public async getRoleByUserId(userId: number): Promise<RoleModel> {
    return this.roleDbGateway.getRoleByUserId(userId);
  }

  public async getRoleByName(roleName: string): Promise<RoleModel> {
    return this.roleDbGateway.getRoleByName(roleName);
  }

  public async clearCache(): Promise<void> {
    return this.rolePermissionRedisGateway.setRolePermission([]);
  }
}
