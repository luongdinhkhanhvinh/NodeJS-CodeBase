import { ApiConfig } from "./appConfig";
import { authenticationConfig } from "./components/authentication";
import { awsConfig } from "./components/aws";
import { dbConfig } from "./components/database";
import { env } from "./components/env";
import { jwtConfig } from "./components/jsonWebToken";
import { redisConfig } from "./components/redis";
import { serverConfig } from "./components/server";

export const apiConfig: ApiConfig = new ApiConfig(
  env,
  serverConfig,
  dbConfig,
  redisConfig,
  jwtConfig,
  awsConfig,
  authenticationConfig
);
