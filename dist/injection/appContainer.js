"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppContainer = void 0;
const types_1 = require("@injection/types");
const roleDbGateway_1 = require("@gateways/roleDbGateway");
const rolePermissionGateway_1 = require("@gateways/rolePermissionGateway");
const rolePermissionRedisGateway_1 = require("@gateways/rolePermissionRedisGateway");
const userDbGateway_1 = require("@gateways/userDbGateway");
const userRedisGateway_1 = require("@gateways/userRedisGateway");
const models_1 = require("@models/models");
const authenticationRepository_1 = require("@repositories/authenticationRepository");
const authorizationRepository_1 = require("@repositories/authorizationRepository");
const roleRepository_1 = require("@repositories/roleRepository");
const userRedisRepository_1 = require("@repositories/userRedisRepository");
const userRepository_1 = require("@repositories/userRepository");
const verifyAccountUseCase_1 = require("@usecases/user/verifyAccountUseCase");
const logger_1 = require("@utils/logger");
const redisProvider_1 = require("@utils/providers/redisProvider");
const sequelizeProvider_1 = require("@utils/providers/sequelizeProvider");
const sendEmailUtil_1 = require("@utils/sendEmailUtil");
const devblock_authentication_1 = require("devblock-authentication");
const devblock_authorization_1 = require("devblock-authorization");
const inversify_1 = require("inversify");
require("reflect-metadata");
const internalRouter_1 = require("src/apps/api/internal/internalRouter");
const userRouter_1 = require("src/apps/api/user/userRouter");
const api_1 = require("src/configs/api");
const createAuditLogUseCase_1 = require("src/usecases/auditLog/createAuditLogUseCase");
const clearPermissionCacheUseCase_1 = require("src/usecases/internal/clearPermissionCacheUseCase");
const getUserProfileUseCase_1 = require("src/usecases/user/getUserProfileUseCase");
const updateUserSettingUseCase_1 = require("src/usecases/user/updateUserSettingUseCase");
const utils_1 = require("src/utils/utils");
class AppContainer extends inversify_1.Container {
    inject() {
        // Configs
        this.provideNodeEnvironment();
        this.provideDatabaseConfig();
        this.provideServerConfig();
        this.provideRedisConfig();
        this.provideJwtConfig();
        this.provideAuthenticationConfig();
        this.provideAwsConfig();
        // Utilities
        this.provideUtil();
        this.provideLogger();
        this.provideSequelizeProvider();
        this.provideRedisProvider();
        this.provideSendEmailUtil();
        // Model
        this.provideModels();
        // Permission
        // Role
        this.provideRoleRepository();
        this.provideRoleDbGateway();
        // RolePermission
        this.provideRolePermissionDbGateway();
        this.provideRolePermissionRedisGateway();
        this.provideAuthorizationRepository();
        // User
        this.provideUserRouter();
        this.provideUserRepository();
        this.provideUserDbGateway();
        this.provideUserRedisRepository();
        this.provideUserRedisGateway();
        this.provideVerifyAccountUseCase();
        this.provideAuthorization();
        this.provideGetUserProfileUseCase();
        this.provideUpdateUserSettingUseCase();
        // Authentication
        this.provideAuthenticationRepository();
        this.provideAuthentication();
        // Internal
        this.provideInternalRouter();
        this.provideClearPermissionCacheUseCase();
        // Audit Log
        this.provideCreateAuditLogUseCase();
    }
    provideNodeEnvironment() {
        this.bind(types_1.TYPES.NodeEnv).toConstantValue(api_1.apiConfig.env);
    }
    provideDatabaseConfig() {
        this.bind(types_1.TYPES.DatabaseConfig).toConstantValue(api_1.apiConfig.dbConfig);
    }
    provideServerConfig() {
        this.bind(types_1.TYPES.ServerConfig).toConstantValue(api_1.apiConfig.serverConfig);
    }
    provideRedisConfig() {
        this.bind(types_1.TYPES.RedisConfig).toConstantValue(api_1.apiConfig.redisConfig);
    }
    provideAuthenticationConfig() {
        this.bind(types_1.TYPES.AuthenticationConfig).toConstantValue(api_1.apiConfig.authenticationConfig);
    }
    provideAwsConfig() {
        this.bind(types_1.TYPES.AwsConfig).toConstantValue(api_1.apiConfig.awsConfig);
    }
    provideLogger() {
        this.bind(types_1.TYPES.Logger).to(logger_1.WinstonLogger).inSingletonScope();
    }
    provideSequelizeProvider() {
        this.bind(types_1.TYPES.SequelizeProvider).to(sequelizeProvider_1.SequelizeProviderImpl).inSingletonScope();
    }
    provideUserRouter() {
        this.bind(types_1.TYPES.UserRouter).to(userRouter_1.UserRouter).inSingletonScope();
    }
    provideInternalRouter() {
        this.bind(types_1.TYPES.InternalRouter).to(internalRouter_1.InternalRouter).inSingletonScope();
    }
    provideUserRepository() {
        this.bind(types_1.TYPES.UserRepository).to(userRepository_1.UserRepositoryImpl).inSingletonScope();
    }
    provideUserDbGateway() {
        this.bind(types_1.TYPES.UserDbGateway).to(userDbGateway_1.UserDbGatewayImpl).inSingletonScope();
    }
    provideRedisProvider() {
        this.bind(types_1.TYPES.RedisProvider).to(redisProvider_1.RedisProviderImpl).inSingletonScope();
    }
    provideUserRedisRepository() {
        this.bind(types_1.TYPES.UserRedisRepository).to(userRedisRepository_1.UserRedisRepositoryImpl).inSingletonScope();
    }
    provideUserRedisGateway() {
        this.bind(types_1.TYPES.UserRedisGateway).to(userRedisGateway_1.UserRedisGatewayImpl).inSingletonScope();
    }
    provideSendEmailUtil() {
        this.bind(types_1.TYPES.SendEmailUtil).to(sendEmailUtil_1.SendEmailUtilImpl).inSingletonScope();
    }
    provideModels() {
        this.bind(types_1.TYPES.Models).to(models_1.ModelsImpl).inSingletonScope();
    }
    provideAuthenticationRepository() {
        this.bind(types_1.TYPES.AuthenticationRepository)
            .to(authenticationRepository_1.AuthenticationRepositoryImpl)
            .inSingletonScope();
    }
    provideVerifyAccountUseCase() {
        this.bind(types_1.TYPES.VerifyAccountUseCase).to(verifyAccountUseCase_1.VerifyAccountUseCaseImpl).inSingletonScope();
    }
    provideJwtConfig() {
        this.bind(types_1.TYPES.JwtConfig).toConstantValue(api_1.apiConfig.jwtConfig);
    }
    provideAuthentication() {
        const authenticationRepository = this.get(types_1.TYPES.AuthenticationRepository);
        this.bind(types_1.TYPES.Authentication).toConstantValue(new devblock_authentication_1.Authentication(authenticationRepository));
    }
    provideAuthorization() {
        this.bind(types_1.TYPES.Authorization).toConstantValue(new devblock_authorization_1.Authorization());
    }
    provideGetUserProfileUseCase() {
        this.bind(types_1.TYPES.GetUserProfileUseCase).to(getUserProfileUseCase_1.GetUserProfileUseCaseImpl).inSingletonScope();
    }
    provideRolePermissionDbGateway() {
        this.bind(types_1.TYPES.RolePermissionDbGateway)
            .to(rolePermissionGateway_1.RolePermissionDbGatewayImpl)
            .inSingletonScope();
    }
    provideRolePermissionRedisGateway() {
        this.bind(types_1.TYPES.RolePermissionRedisGateway)
            .to(rolePermissionRedisGateway_1.RolePermissionRedisGatewayImpl)
            .inSingletonScope();
    }
    provideAuthorizationRepository() {
        this.bind(types_1.TYPES.AuthorizationRepository)
            .to(authorizationRepository_1.AuthorizationRepositoryImpl)
            .inSingletonScope();
    }
    provideRoleRepository() {
        this.bind(types_1.TYPES.RoleRepository).to(roleRepository_1.RoleRepositoryImpl).inSingletonScope();
    }
    provideRoleDbGateway() {
        this.bind(types_1.TYPES.RoleDbGateway).to(roleDbGateway_1.RoleDbGatewayImpl).inSingletonScope();
    }
    provideUpdateUserSettingUseCase() {
        this.bind(types_1.TYPES.UpdateUserSettingUseCase)
            .to(updateUserSettingUseCase_1.UpdateUserSettingUseCaseImpl)
            .inSingletonScope();
    }
    provideClearPermissionCacheUseCase() {
        this.bind(types_1.TYPES.ClearPermissionCacheUseCase)
            .to(clearPermissionCacheUseCase_1.ClearPermissionCacheUseCaseImpl)
            .inSingletonScope();
    }
    provideCreateAuditLogUseCase() {
        this.bind(types_1.TYPES.CreateAuditLogUseCase).to(createAuditLogUseCase_1.CreateAuditLogUseCaseImpl).inSingletonScope();
    }
    provideUtil() {
        this.bind(types_1.TYPES.Util).to(utils_1.UtilImpl).inSingletonScope();
    }
}
exports.AppContainer = AppContainer;
//# sourceMappingURL=appContainer.js.map