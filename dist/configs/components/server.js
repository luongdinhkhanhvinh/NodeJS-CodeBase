"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = void 0;
const joi_1 = __importDefault(require("joi"));
const envVarsSchema = joi_1.default
    .object({
    SERVER_PORT: joi_1.default.number().required(),
    SERVER_LOG_PATH: joi_1.default.string().required(),
})
    .unknown()
    .required();
const { error, value: envVars } = joi_1.default.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validate error: ${error.message}`);
}
exports.serverConfig = {
    port: Number(envVars.SERVER_PORT),
    logPath: envVars.SERVER_LOG_PATH
};
//# sourceMappingURL=server.js.map