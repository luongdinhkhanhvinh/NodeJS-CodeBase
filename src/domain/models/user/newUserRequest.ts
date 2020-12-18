import { IllegalParameterError } from "@errors/illegalParameterError";
import joi from "joi";
import { ROLE_NAME } from "src/common/enum/roleEnum";
import { USER_STATUS } from "src/common/enum/userEnum";
import { USER } from "src/common/user";

export class NewUserRequest {
  public static readonly SCHEMA = joi
    .object({
      email: joi.string().max(50).email().required(),
      firstName: joi.string().regex(USER.REGEX_VALIDATE_NAME).min(2).max(20).required(),
      lastName: joi.string().regex(USER.REGEX_VALIDATE_NAME).min(2).max(20).required(),
      hashPassword: joi.string().required(),
      roleId: joi.number().allow(ROLE_NAME.ADMIN).required(),
      userStatus: joi.string().required().allow(USER_STATUS.UNVERIFIED),
    })
    .required();

  public static validate(request: NewUserRequest) {
    const { error } = joi.validate(request, NewUserRequest.SCHEMA);

    if (error) {
      throw new IllegalParameterError("NewUserRequest", "validate", `Invalid provided values: ${error.message}`);
    }
  }

  constructor(
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly hashPassword: string,
    public readonly roleId: number,
    public readonly userStatus: USER_STATUS
  ) {
    NewUserRequest.validate(this);
  }
}
