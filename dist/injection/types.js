"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES = void 0;
const TYPES = {
    // Config
    ServerConfig: Symbol.for("ServerConfig"),
    NodeEnv: Symbol.for("NodeEnv"),
    DatabaseConfig: Symbol.for("DatabaseConfig"),
    RedisConfig: Symbol.for("RedisConfig"),
    JwtConfig: Symbol.for("JwtConfig"),
    AwsConfig: Symbol.for("AwsConfig"),
    AuthenticationConfig: Symbol.for("AuthenticationConfig"),
    // Internal,
    InternalRouter: Symbol.for("InternalRouter"),
    ClearPermissionCacheUseCase: Symbol.for("ClearPermissionCacheUseCase"),
    // Utilities,
    Logger: Symbol.for("Logger"),
    Util: Symbol.for("Util"),
    SequelizeProvider: Symbol.for("SequelizeProvider"),
    RedisProvider: Symbol.for("RedisProvider"),
    SendEmailUtil: Symbol.for("SendEmailUtil"),
    // Aws
    AwsGateway: Symbol.for("AwsGateway"),
    // User
    UserRouter: Symbol.for("UserRouter"),
    UserRepository: Symbol.for("UserRepository"),
    AuthenticationRepository: Symbol.for("AuthenticationRepository"),
    Authentication: Symbol.for("Authentication"),
    Authorization: Symbol.for("Authorization"),
    UserDbGateway: Symbol.for("UserDbGateway"),
    UserRedisRepository: Symbol.for("UserRedisRepository"),
    UserRedisGateway: Symbol.for("UserRedisGateway"),
    CreateUserUseCase: Symbol.for("CreateUserUseCase"),
    LoginUseCase: Symbol.for("LoginUseCase"),
    VerifyAccountUseCase: Symbol.for("VerifyAccountUseCase"),
    GetUserProfileUseCase: Symbol.for("GetUserProfileUseCase"),
    UpdateUserSettingUseCase: Symbol.for("UpdateUserSettingUseCase"),
    // Role
    RoleDbGateway: Symbol.for("RoleDbGateway"),
    RoleRepository: Symbol.for("RoleRepository"),
    // Permission
    // RolePermission
    RolePermissionDbGateway: Symbol.for("RolePermissionDbGateway"),
    RolePermissionRedisGateway: Symbol.for("RolePermissionRedisGateway"),
    AuthorizationRepository: Symbol.for("AuthorizationRepository"),
    // Audit Log
    CreateAuditLogUseCase: Symbol.for("CreateAuditLogUseCase"),
    Models: Symbol.for("Models"),
};
exports.TYPES = TYPES;
//# sourceMappingURL=types.js.map