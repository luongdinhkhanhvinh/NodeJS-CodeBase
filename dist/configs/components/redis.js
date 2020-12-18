"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = void 0;
const joi_1 = __importDefault(require("joi"));
const envVarsSchema = joi_1.default
    .object({
    REDIS_ENDPOINT: joi_1.default.string().required(),
    REDIS_PORT: joi_1.default.number().required(),
})
    .unknown()
    .required();
const { error, value: envVars } = joi_1.default.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.redisConfig = {
    endpoint: envVars.REDIS_ENDPOINT,
    port: envVars.REDIS_PORT
};
//# sourceMappingURL=redis.js.map