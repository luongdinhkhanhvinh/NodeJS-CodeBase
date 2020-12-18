import { USER_STATUS } from "src/common/enum/userEnum";

export interface UserViewResponse {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly userStatus: USER_STATUS;
  readonly priorLoginAt: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  readonly hashPassword?: string;
}
