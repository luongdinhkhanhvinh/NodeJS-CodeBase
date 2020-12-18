"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiConfig = void 0;
class ApiConfig {
    constructor(env, serverConfig, dbConfig, redisConfig, jwtConfig, awsConfig, authenticationConfig) {
        this._serverConfig = undefined;
        this._dbConfig = undefined;
        this._redisConfig = undefined;
        this._jwtConfig = undefined;
        this._authenticationConfig = undefined;
        this._awsConfig = undefined;
        this._env = env;
        this._serverConfig = serverConfig;
        this._dbConfig = dbConfig;
        this._awsConfig = awsConfig;
        this._redisConfig = redisConfig;
        this._jwtConfig = jwtConfig;
        this._authenticationConfig = authenticationConfig;
    }
    get env() {
        return this._env;
    }
    get serverConfig() {
        if (!this._serverConfig) {
            throw new Error(`Server config wasn't set yet`);
        }
        return this._serverConfig;
    }
    get dbConfig() {
        if (!this._dbConfig) {
            throw new Error(`Database config wasn't set yet`);
        }
        return this._dbConfig;
    }
    get redisConfig() {
        if (!this._redisConfig) {
            throw new Error(`Redis config wasn't set yet`);
        }
        return this._redisConfig;
    }
    get jwtConfig() {
        if (!this._jwtConfig) {
            throw new Error(`Jwt config wasn't set yet`);
        }
        return this._jwtConfig;
    }
    get authenticationConfig() {
        if (!this._authenticationConfig) {
            throw new Error(`Jwt config wasn't set yet`);
        }
        return this._authenticationConfig;
    }
    get awsConfig() {
        if (!this._awsConfig) {
            throw new Error(`Aws config wasn't set yet`);
        }
        return this._awsConfig;
    }
}
exports.ApiConfig = ApiConfig;
//# sourceMappingURL=appConfig.js.map