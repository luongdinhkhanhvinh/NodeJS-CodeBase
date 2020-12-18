import { TYPES } from "@injection/types";
import { UserRepository } from "@repositories/userRepository";
import { UserViewResponse } from "@views/user/userViewResponse";
import { inject, injectable } from "inversify";

export interface GetUserProfileUseCase {
  execute(userId: number, userType?: string, isOtherProfile?: boolean): Promise<UserViewResponse>;
}
@injectable()
export class GetUserProfileUseCaseImpl implements GetUserProfileUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  public async execute(userId: number, userType?: string, isOtherProfile: boolean = false): Promise<UserViewResponse> {
    const user = await this.userRepository.getById(userId, userType);
    this.userRepository.checkUserExist(user);

    const response: UserViewResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userStatus: user.userStatus,
      priorLoginAt: user.priorLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return response;
  }
}
