import joi from "joi";
import { AwsConfig } from "../appConfig";

const envVarsSchema = joi
  .object({
    AWS_DEFAULT_REGION: joi.string().required(),
    AWS_S3_BUCKET: joi.string().required(),
    AWS_ACCESS_KEY_ID: joi.string().required(),
    AWS_SECRET_ACCESS_KEY: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const awsConfig: AwsConfig = {
  accessKeyId: envVars.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY as string,
  region: envVars.AWS_DEFAULT_REGION as string,
  s3Bucket: envVars.AWS_S3_BUCKET as string,
};
