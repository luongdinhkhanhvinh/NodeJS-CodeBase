import { IllegalParameterError } from "@errors/illegalParameterError";
import joi from "joi";
import { USER_STATUS } from "src/common/enum/userEnum";

export class UpdatePasswordRequest {
  public static readonly SCHEMA = joi
    .object({
      password: joi.string().required(),
      userStatus: joi
        .string()
        .required()
        .allow([
          USER_STATUS.ACTIVE,
        ]),
    })
    .required();

  public static validate(request: UpdatePasswordRequest) {
    const { error } = joi.validate(request, UpdatePasswordRequest.SCHEMA);

    if (error) {
      throw new IllegalParameterError(
        "UpdatePasswordRequest",
        "validate",
        `Invalid provided values: ${error.message}`
      );
    }
  }

  constructor(public readonly password: string, public readonly userStatus: USER_STATUS) {
    UpdatePasswordRequest.validate(this);
  }
}
