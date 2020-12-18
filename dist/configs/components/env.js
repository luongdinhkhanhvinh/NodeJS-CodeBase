"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const environment_1 = require("@common/environment");
const joi_1 = __importDefault(require("joi"));
const envVarsSchema = joi_1.default
    .object({
    NODE_ENV: joi_1.default
        .string()
        .allow([
        environment_1.Environment.DEVELOPMENT,
        environment_1.Environment.STAGING,
        environment_1.Environment.PRODUCTION,
        environment_1.Environment.TESTING,
        environment_1.Environment.DEMO,
    ])
        .required(),
})
    .unknown()
    .required();
const { error, value: envVars } = joi_1.default.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.env = envVars.NODE_ENV;
//# sourceMappingURL=env.js.map