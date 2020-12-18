import * as joi from 'joi';
export declare class JwtConfigRequest {
    readonly jwtPrivateKey: string;
    readonly jwtExpriresIn: number;
    static readonly SCHEMA: joi.ObjectSchema<any>;
    static validate(request: JwtConfigRequest): void;
    constructor(jwtPrivateKey: string, jwtExpriresIn: number);
}
