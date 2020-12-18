import { IllegalParameterError } from '../../errors/illegalParameterError';
import * as joi from 'joi';

export class VerifyTokenRequest {
  public static readonly SCHEMA = joi
    .object({
      token: joi.number().required(),
      jwtPrivateKey: joi.string().required(),
    })
    .required();

  public static validate(request: VerifyTokenRequest) {
    const { error } = VerifyTokenRequest.SCHEMA.validate(request);

    if (error) {
      throw new IllegalParameterError('VerifyTokenRequest', 'validate', `Invalid provided values: ${error.message}`);
    }
  }

  constructor(public readonly token: string, public readonly jwtPrivateKey: string) {
    VerifyTokenRequest.validate(this);
  }
}
