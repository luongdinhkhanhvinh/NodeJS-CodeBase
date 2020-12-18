import joi from "joi";
import { AuthenticationConfig } from "../appConfig";

const envVarsSchema = joi
  .object({
    VERIFICATION_URL: joi.string().uri().required(),
    EMAIL_SYSTEM: joi.string().email().required(),
    EXPIRE_RESET_CODE_SECOND: joi.string().required(),
    RETRY_LOGIN_COUNT: joi.string().required(),
    ATTEMPT_LOCK_ACCOUNT_SECOND: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validate error: ${error.message}`);
}

export const authenticationConfig: AuthenticationConfig = {
  expireResetCodeSecond: envVars.EXPIRE_RESET_CODE_SECOND as string,
  retryLoginCount: envVars.RETRY_LOGIN_COUNT as string,
  attemptLockAccountSecond: envVars.ATTEMPT_LOCK_ACCOUNT_SECOND as string,
  verificationUrl: envVars.VERIFICATION_URL as string,
  emailSystem: envVars.EMAIL_SYSTEM as string,
};
