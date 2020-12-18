import { IllegalParameterError } from "@errors/illegalParameterError";
import joi from "joi";
import { USER_STATUS } from "src/common/enum/userEnum";

export class UpdateUserStatusRequest {
  public static readonly SCHEMA = joi
    .object({
      userStatus: joi
        .string()
        .required()
        .allow([
          USER_STATUS.ACTIVE,
          USER_STATUS.INACTIVE,
          USER_STATUS.PASSWORD_RESET,
          USER_STATUS.UNVERIFIED,
        ]),
    })
    .required();

  public static validate(request: UpdateUserStatusRequest) {
    const { error } = joi.validate(request, UpdateUserStatusRequest.SCHEMA);

    if (error) {
      throw new IllegalParameterError(
        "UpdateUserStatusRequest",
        "validate",
        `Invalid provided values: ${error.message}`
      );
    }
  }

  constructor(public readonly userStatus: USER_STATUS) {
    UpdateUserStatusRequest.validate(this);
  }
}
