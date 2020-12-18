import { TYPES } from "@injection/types";
import { Types } from "devblock-authentication";
import { inject, injectable } from "inversify";
import { UpdateUserSettingRequest } from "src/domain/models/user/updateUserSettingRequest";
import { UserRepository } from "src/domain/repositories/userRepository";
import { UserViewResponse } from "src/views/user/userViewResponse";

export interface UpdateUserSettingUseCase {
  execute(request: Types.Authentication.UpdateProfileRequest): Promise<UserViewResponse>;
}

@injectable()
export class UpdateUserSettingUseCaseImpl implements UpdateUserSettingUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  public async execute(request: Types.Authentication.UpdateProfileRequest): Promise<UserViewResponse> {
    const user = await this.userRepository.getById(request.id);

    const updateRequest = new UpdateUserSettingRequest(
      request.firstName,
      request.lastName,
      request.profileImageId,
      request.hashPassword || undefined
    );
    const newUserData = await this.userRepository.updateById(user.id, updateRequest);

    const response: UserViewResponse = {
      id: newUserData.id,
      email: newUserData.email,
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
      userStatus: newUserData.userStatus,
      priorLoginAt: newUserData.priorLoginAt,
      createdAt: newUserData.createdAt,
      updatedAt: newUserData.updatedAt,
    };

    return response;
  }
}
