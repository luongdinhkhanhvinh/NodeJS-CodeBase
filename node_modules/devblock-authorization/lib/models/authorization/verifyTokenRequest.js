"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyTokenRequest = void 0;
const illegalParameterError_1 = require("../../errors/illegalParameterError");
const joi = require("joi");
class VerifyTokenRequest {
    constructor(token, jwtPrivateKey) {
        this.token = token;
        this.jwtPrivateKey = jwtPrivateKey;
        VerifyTokenRequest.validate(this);
    }
    static validate(request) {
        const { error } = VerifyTokenRequest.SCHEMA.validate(request);
        if (error) {
            throw new illegalParameterError_1.IllegalParameterError('VerifyTokenRequest', 'validate', `Invalid provided values: ${error.message}`);
        }
    }
}
exports.VerifyTokenRequest = VerifyTokenRequest;
VerifyTokenRequest.SCHEMA = joi
    .object({
    token: joi.number().required(),
    jwtPrivateKey: joi.string().required(),
})
    .required();
//# sourceMappingURL=verifyTokenRequest.js.map