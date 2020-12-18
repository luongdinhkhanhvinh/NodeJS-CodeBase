"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const joi_1 = __importDefault(require("joi"));
const envVarsSchema = joi_1.default
    .object({
    DB_HOST: joi_1.default.string().required(),
    DB_PORT: joi_1.default.number().required(),
    DB_USER: joi_1.default.string().required(),
    DB_PASSWORD: joi_1.default.string().required(),
    DB_DATABASE: joi_1.default.string().required(),
    DB_SSL_KEY: joi_1.default.string().optional()
})
    .unknown()
    .required();
const { error, value: envVars } = joi_1.default.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.dbConfig = {
    host: envVars.DB_HOST,
    port: Number(envVars.DB_PORT),
    user: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_DATABASE,
    caPath: envVars.DB_SSL_KEY
};
//# sourceMappingURL=database.js.map