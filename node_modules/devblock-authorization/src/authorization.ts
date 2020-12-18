import * as jwt from 'jsonwebtoken';
import { JwtConfigRequest } from './models/authorization/jwtConfigRequest';
import { Context } from 'koa';
import { AuthorizationInterface } from './interfaces';
import { UnauthorizedError } from './errors/unauthorizedError';

export class Authorization {
  constructor() {}
  private verifyToken(token: string, privateKeyJwt: string): string | object {
    try {
      return jwt.verify(token, privateKeyJwt);
    } catch (err) {
      throw new UnauthorizedError("Authorization", "verifyToken");
    }
  }

  public authorizeMiddleware(
    authorizationHeaderParam: string,
    jwtConfig: JwtConfigRequest,
  ): (context: Context, next: () => Promise<any>) => any {
    return async (context: Context, next: () => Promise<any>): Promise<any> => {
      const authorizedToken = context.request.headers[authorizationHeaderParam];

      context._tokenPayload = undefined;

      if (authorizedToken) {
        context._tokenPayload = this.verifyToken(authorizedToken, jwtConfig.jwtPrivateKey);
      }

      await next();
    };
  }
}
