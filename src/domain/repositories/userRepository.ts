import { UserDbGateway } from "@gateways/userDbGateway";
import { NewUserRequest } from "@models/user/newUserRequest";
import { UpdatePriorLoginAtRequest } from "@models/user/updatePriorLoginAtRequest";
import { UpdateUserSettingRequest } from "@models/user/updateUserSettingRequest";
import { UpdateUserStatusRequest } from "@models/user/updateUserStatusRequest";
import { UserModel } from "@models/user/userModel";
import { inject, injectable } from "inversify";
import { IllegalParameterError } from "src/errors/illegalParameterError";
import { TYPES } from "src/injection/types";

export interface UserRepository {
  createUser(request: NewUserRequest): Promise<UserModel>;
  getByEmail(email: string, userType?: string): Promise<UserModel>;
  getById(id: number, userType?: string): Promise<UserModel>;
  updateById(
    id: number,
    request: UpdateUserStatusRequest | NewUserRequest | UpdateUserSettingRequest | UpdatePriorLoginAtRequest
  ): Promise<UserModel>;
  checkUserExist(user: UserModel): void;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@inject(TYPES.UserDbGateway) private readonly userDbGateway: UserDbGateway) {}

  public async createUser(request: NewUserRequest): Promise<UserModel> {
    return this.userDbGateway.createUser(request);
  }

  public async getByEmail(email: string, userType?: string): Promise<UserModel> {
    return this.userDbGateway.getByEmail(email, userType);
  }

  public async getById(id: number, userType?: string): Promise<UserModel> {
    return this.userDbGateway.getById(id, userType);
  }

  public async updateById(
    id: number,
    request: UpdateUserStatusRequest | NewUserRequest | UpdateUserSettingRequest | UpdatePriorLoginAtRequest
  ): Promise<UserModel> {
    return this.userDbGateway.updateById(id, request);
  }

  public checkUserExist(user: UserModel): void {
    if (!user) {
      throw new IllegalParameterError("UserRepository", "checkUserExist", "User does not exist");
    }
  }
}
