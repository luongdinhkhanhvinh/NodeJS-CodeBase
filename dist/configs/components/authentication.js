"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationConfig = void 0;
const joi_1 = __importDefault(require("joi"));
const envVarsSchema = joi_1.default
    .object({
    VERIFICATION_URL: joi_1.default.string().uri().required(),
    EMAIL_SYSTEM: joi_1.default.string().email().required(),
    EXPIRE_RESET_CODE_SECOND: joi_1.default.string().required(),
    RETRY_LOGIN_COUNT: joi_1.default.string().required(),
    ATTEMPT_LOCK_ACCOUNT_SECOND: joi_1.default.string().required(),
})
    .unknown()
    .required();
const { error, value: envVars } = joi_1.default.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validate error: ${error.message}`);
}
exports.authenticationConfig = {
    expireResetCodeSecond: envVars.EXPIRE_RESET_CODE_SECOND,
    retryLoginCount: envVars.RETRY_LOGIN_COUNT,
    attemptLockAccountSecond: envVars.ATTEMPT_LOCK_ACCOUNT_SECOND,
    verificationUrl: envVars.VERIFICATION_URL,
    emailSystem: envVars.EMAIL_SYSTEM,
};
//# sourceMappingURL=authentication.js.map