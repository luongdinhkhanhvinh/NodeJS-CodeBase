import { IllegalParameterError } from '../../errors/illegalParameterError';
import * as joi from 'joi';

export class JwtConfigRequest {
  public static readonly SCHEMA = joi.object({
    jwtPrivateKey: joi.string().required(),
    jwtExpriresIn: joi.number().required(),
  }).required();

  public static  validate(request: JwtConfigRequest) {
    const { error } =  JwtConfigRequest.SCHEMA.validate(request);

    if (error) {
      throw new IllegalParameterError('UserSignupInfo', 'validate', `Invalid provided values: ${error.message}`);
    }
  }

  constructor(
    public readonly jwtPrivateKey: string,
    public readonly jwtExpriresIn: number,
  ) {
    JwtConfigRequest.validate(this);
  }
}
