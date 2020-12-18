"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsConfig = void 0;
const joi_1 = __importDefault(require("joi"));
const envVarsSchema = joi_1.default
    .object({
    AWS_DEFAULT_REGION: joi_1.default.string().required(),
    AWS_S3_BUCKET: joi_1.default.string().required(),
    AWS_ACCESS_KEY_ID: joi_1.default.string().required(),
    AWS_SECRET_ACCESS_KEY: joi_1.default.string().required(),
})
    .unknown()
    .required();
const { error, value: envVars } = joi_1.default.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.awsConfig = {
    accessKeyId: envVars.AWS_ACCESS_KEY_ID,
    secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    region: envVars.AWS_DEFAULT_REGION,
    s3Bucket: envVars.AWS_S3_BUCKET,
};
//# sourceMappingURL=aws.js.map