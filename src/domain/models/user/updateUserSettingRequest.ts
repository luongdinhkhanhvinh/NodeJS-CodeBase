import { IllegalParameterError } from "@errors/illegalParameterError";
import joi from "joi";
import { USER } from "src/common/user";

export class UpdateUserSettingRequest {
  public static readonly SCHEMA = joi
    .object({
      profileImageId: joi.number().optional().allow(null),
      firstName: joi.string().regex(USER.REGEX_VALIDATE_NAME).min(2).max(20).optional(),
      lastName: joi.string().regex(USER.REGEX_VALIDATE_NAME).min(2).max(20).optional(),
      password: joi.string().optional(),
      attributes: joi
        .object({
          dateOfBirth: joi.string().isoDate().required(),
        })
        .unknown()
        .optional(),
    })
    .min(1)
    .required();

  public static validate(request: UpdateUserSettingRequest) {
    const { error } = joi.validate(request, UpdateUserSettingRequest.SCHEMA);

    if (error) {
      throw new IllegalParameterError(
        "UpdateUserSettingRequest",
        "validate",
        `Invalid provided values: ${error.message}`
      );
    }
  }

  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly profileImageId: number,
    public readonly password: string
  ) {
    UpdateUserSettingRequest.validate(this);
  }
}
