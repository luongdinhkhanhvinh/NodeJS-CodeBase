import { JwtConfigRequest } from './models/authorization/jwtConfigRequest';
import { Context } from 'koa';
export declare class Authorization {
    constructor();
    private verifyToken;
    authorizeMiddleware(authorizationHeaderParam: string, jwtConfig: JwtConfigRequest): (context: Context, next: () => Promise<any>) => any;
}
