"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiConfig = void 0;
const appConfig_1 = require("./appConfig");
const authentication_1 = require("./components/authentication");
const aws_1 = require("./components/aws");
const database_1 = require("./components/database");
const env_1 = require("./components/env");
const jsonWebToken_1 = require("./components/jsonWebToken");
const redis_1 = require("./components/redis");
const server_1 = require("./components/server");
exports.apiConfig = new appConfig_1.ApiConfig(env_1.env, server_1.serverConfig, database_1.dbConfig, redis_1.redisConfig, jsonWebToken_1.jwtConfig, aws_1.awsConfig, authentication_1.authenticationConfig);
//# sourceMappingURL=api.js.map