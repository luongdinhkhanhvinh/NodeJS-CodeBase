import { TYPES } from "@injection/types";
import { DatabaseTables } from "@models/databaseTables";
import { Models } from "@models/models";
import { NewUserRequest } from "@models/user/newUserRequest";
import { UpdatePriorLoginAtRequest } from "@models/user/updatePriorLoginAtRequest";
import { UpdateUserSettingRequest } from "@models/user/updateUserSettingRequest";
import { UpdateUserStatusRequest } from "@models/user/updateUserStatusRequest";
import { UserModel } from "@models/user/userModel";
import { inject, injectable } from "inversify";

export interface UserDbGateway {
  createUser(request: NewUserRequest): Promise<UserModel>;
  getByEmail(email: string, userType?: string): Promise<UserModel>;
  getById(id: number, userType?: string): Promise<UserModel>;
  updateById(
    id: number,
    request: UpdateUserStatusRequest | NewUserRequest | UpdateUserSettingRequest | UpdatePriorLoginAtRequest
  ): Promise<UserModel>;
}

@injectable()
export class UserDbGatewayImpl implements UserDbGateway {
  private readonly userDb: typeof UserModel;

  constructor(@inject(TYPES.Models) models: Models) {
    this.userDb = models.getModels()[DatabaseTables.TABLE_USER] as typeof UserModel;
  }

  public async createUser(request: NewUserRequest): Promise<UserModel> {
    await this.userDb.create(request);
    return this.getByEmail(request.email);
  }

  public async getByEmail(email: string, userType?: string): Promise<UserModel> {
    const query = {
      where: { email, userType },
      raw: true,
    };
    if (!userType) {
      delete query.where.userType;
    }
    const user: UserModel = await this.userDb.findOne(query);
    return user;
  }

  public async getById(id: number, userType?: string): Promise<UserModel> {
    const query: { [key: string]: any } = {
      where: { id },
      raw: true,
    };
    if (userType) {
      query.where.userType = userType;
    }
    const user = await this.userDb.findOne(query);

    return user;
  }

  public async updateById(
    id: number,
    request: UpdateUserStatusRequest | NewUserRequest | UpdateUserSettingRequest | UpdatePriorLoginAtRequest
  ): Promise<UserModel> {
    await this.userDb.update(request, {
      where: { id },
    });
    return this.getById(id);
  }
}
