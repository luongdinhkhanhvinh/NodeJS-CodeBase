"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const joi_1 = __importDefault(require("joi"));
const envVarsSchema = joi_1.default
    .object({
    JWT_PRIVATE_KEY: joi_1.default.string().required(),
    JWT_EXPRIRES_IN: joi_1.default.number().required(),
    JWT_REFRESH_KEY: joi_1.default.string().required(),
})
    .unknown()
    .required();
const { error, value: envVars } = joi_1.default.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.jwtConfig = {
    jwtPrivateKey: envVars.JWT_PRIVATE_KEY,
    jwtExpriresIn: envVars.JWT_EXPRIRES_IN,
    jwtRefreshKey: envVars.JWT_REFRESH_KEY
};
//# sourceMappingURL=jsonWebToken.js.map