import { IllegalParameterError } from "@errors/illegalParameterError";
import joi from "joi";

export class UpdatePriorLoginAtRequest {
  public static readonly SCHEMA = joi
    .object({
      priorLoginAt: joi.date().required(),
    })
    .required();

  public static validate(request: UpdatePriorLoginAtRequest) {
    const { error } = joi.validate(request, UpdatePriorLoginAtRequest.SCHEMA);

    if (error) {
      throw new IllegalParameterError(
        "UpdatePriorLoginAtRequest",
        "validate",
        `Invalid provided values: ${error.message}`
      );
    }
  }

  constructor(public readonly priorLoginAt: Date) {
    UpdatePriorLoginAtRequest.validate(this);
  }
}
