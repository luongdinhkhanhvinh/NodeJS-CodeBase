import * as joi from 'joi';
export declare class VerifyTokenRequest {
    readonly token: string;
    readonly jwtPrivateKey: string;
    static readonly SCHEMA: joi.ObjectSchema<any>;
    static validate(request: VerifyTokenRequest): void;
    constructor(token: string, jwtPrivateKey: string);
}
