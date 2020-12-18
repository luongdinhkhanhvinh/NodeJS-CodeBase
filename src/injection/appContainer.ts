import { TYPES } from "@injection/types";
// tslint:disable-next-line:ordered-imports
import { Router } from "@common/router";
import { RoleDbGateway, RoleDbGatewayImpl } from "@gateways/roleDbGateway";
import { RolePermissionDbGateway, RolePermissionDbGatewayImpl } from "@gateways/rolePermissionGateway";
import { RolePermissionRedisGateway, RolePermissionRedisGatewayImpl } from "@gateways/rolePermissionRedisGateway";
import { UserDbGateway, UserDbGatewayImpl } from "@gateways/userDbGateway";
import { UserRedisGateway, UserRedisGatewayImpl } from "@gateways/userRedisGateway";
import { Models, ModelsImpl } from "@models/models";
import { AuthenticationRepository, AuthenticationRepositoryImpl } from "@repositories/authenticationRepository";
import { AuthorizationRepository, AuthorizationRepositoryImpl } from "@repositories/authorizationRepository";
import { RoleRepository, RoleRepositoryImpl } from "@repositories/roleRepository";
import { UserRedisRepository, UserRedisRepositoryImpl } from "@repositories/userRedisRepository";
import { UserRepository, UserRepositoryImpl } from "@repositories/userRepository";
import { VerifyAccountUseCase, VerifyAccountUseCaseImpl } from "@usecases/user/verifyAccountUseCase";
import { Logger, WinstonLogger } from "@utils/logger";
import { RedisProvider, RedisProviderImpl } from "@utils/providers/redisProvider";
import { SequelizeProvider, SequelizeProviderImpl } from "@utils/providers/sequelizeProvider";
import { SendEmailUtil, SendEmailUtilImpl } from "@utils/sendEmailUtil";
import { Authentication } from "devblock-authentication";
import { Authorization } from "devblock-authorization";
import { Container } from "inversify";
import "reflect-metadata";
import { InternalRouter } from "src/apps/api/internal/internalRouter";
import { UserRouter } from "src/apps/api/user/userRouter";
import { apiConfig } from "src/configs/api";
import {
  DatabaseConfig,
  JwtConfig,
  RedisConfig,
  ServerConfig,
  AuthenticationConfig,
  AwsConfig,
} from "src/configs/appConfig";
import { CreateAuditLogUseCase, CreateAuditLogUseCaseImpl } from "src/usecases/auditLog/createAuditLogUseCase";
import {
  ClearPermissionCacheUseCase,
  ClearPermissionCacheUseCaseImpl,
} from "src/usecases/internal/clearPermissionCacheUseCase";
import { GetUserProfileUseCase, GetUserProfileUseCaseImpl } from "src/usecases/user/getUserProfileUseCase";
import { UpdateUserSettingUseCase, UpdateUserSettingUseCaseImpl } from "src/usecases/user/updateUserSettingUseCase";
import { Util, UtilImpl } from "src/utils/utils";

export class AppContainer extends Container {
  public inject() {
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

  protected provideNodeEnvironment() {
    this.bind<string>(TYPES.NodeEnv).toConstantValue(apiConfig.env);
  }

  protected provideDatabaseConfig() {
    this.bind<DatabaseConfig>(TYPES.DatabaseConfig).toConstantValue(apiConfig.dbConfig);
  }

  protected provideServerConfig() {
    this.bind<ServerConfig>(TYPES.ServerConfig).toConstantValue(apiConfig.serverConfig);
  }

  protected provideRedisConfig() {
    this.bind<RedisConfig>(TYPES.RedisConfig).toConstantValue(apiConfig.redisConfig);
  }

  protected provideAuthenticationConfig() {
    this.bind<AuthenticationConfig>(TYPES.AuthenticationConfig).toConstantValue(apiConfig.authenticationConfig);
  }

  protected provideAwsConfig() {
    this.bind<AwsConfig>(TYPES.AwsConfig).toConstantValue(apiConfig.awsConfig);
  }

  protected provideLogger() {
    this.bind<Logger>(TYPES.Logger).to(WinstonLogger).inSingletonScope();
  }

  protected provideSequelizeProvider() {
    this.bind<SequelizeProvider>(TYPES.SequelizeProvider).to(SequelizeProviderImpl).inSingletonScope();
  }

  protected provideUserRouter() {
    this.bind<Router>(TYPES.UserRouter).to(UserRouter).inSingletonScope();
  }

  protected provideInternalRouter() {
    this.bind<Router>(TYPES.InternalRouter).to(InternalRouter).inSingletonScope();
  }

  protected provideUserRepository() {
    this.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl).inSingletonScope();
  }

  protected provideUserDbGateway() {
    this.bind<UserDbGateway>(TYPES.UserDbGateway).to(UserDbGatewayImpl).inSingletonScope();
  }

  protected provideRedisProvider() {
    this.bind<RedisProvider>(TYPES.RedisProvider).to(RedisProviderImpl).inSingletonScope();
  }

  protected provideUserRedisRepository() {
    this.bind<UserRedisRepository>(TYPES.UserRedisRepository).to(UserRedisRepositoryImpl).inSingletonScope();
  }

  protected provideUserRedisGateway() {
    this.bind<UserRedisGateway>(TYPES.UserRedisGateway).to(UserRedisGatewayImpl).inSingletonScope();
  }

  protected provideSendEmailUtil() {
    this.bind<SendEmailUtil>(TYPES.SendEmailUtil).to(SendEmailUtilImpl).inSingletonScope();
  }

  protected provideModels() {
    this.bind<Models>(TYPES.Models).to(ModelsImpl).inSingletonScope();
  }

  protected provideAuthenticationRepository() {
    this.bind<AuthenticationRepository>(TYPES.AuthenticationRepository)
      .to(AuthenticationRepositoryImpl)
      .inSingletonScope();
  }

  protected provideVerifyAccountUseCase() {
    this.bind<VerifyAccountUseCase>(TYPES.VerifyAccountUseCase).to(VerifyAccountUseCaseImpl).inSingletonScope();
  }

  protected provideJwtConfig() {
    this.bind<JwtConfig>(TYPES.JwtConfig).toConstantValue(apiConfig.jwtConfig);
  }

  protected provideAuthentication() {
    const authenticationRepository = this.get<AuthenticationRepository>(TYPES.AuthenticationRepository);
    this.bind<Authentication>(TYPES.Authentication).toConstantValue(new Authentication(authenticationRepository));
  }

  protected provideAuthorization() {
    this.bind<Authorization>(TYPES.Authorization).toConstantValue(new Authorization());
  }

  protected provideGetUserProfileUseCase() {
    this.bind<GetUserProfileUseCase>(TYPES.GetUserProfileUseCase).to(GetUserProfileUseCaseImpl).inSingletonScope();
  }

  protected provideRolePermissionDbGateway() {
    this.bind<RolePermissionDbGateway>(TYPES.RolePermissionDbGateway)
      .to(RolePermissionDbGatewayImpl)
      .inSingletonScope();
  }

  protected provideRolePermissionRedisGateway() {
    this.bind<RolePermissionRedisGateway>(TYPES.RolePermissionRedisGateway)
      .to(RolePermissionRedisGatewayImpl)
      .inSingletonScope();
  }

  protected provideAuthorizationRepository() {
    this.bind<AuthorizationRepository>(TYPES.AuthorizationRepository)
      .to(AuthorizationRepositoryImpl)
      .inSingletonScope();
  }

  protected provideRoleRepository() {
    this.bind<RoleRepository>(TYPES.RoleRepository).to(RoleRepositoryImpl).inSingletonScope();
  }

  protected provideRoleDbGateway() {
    this.bind<RoleDbGateway>(TYPES.RoleDbGateway).to(RoleDbGatewayImpl).inSingletonScope();
  }

  protected provideUpdateUserSettingUseCase() {
    this.bind<UpdateUserSettingUseCase>(TYPES.UpdateUserSettingUseCase)
      .to(UpdateUserSettingUseCaseImpl)
      .inSingletonScope();
  }

  protected provideClearPermissionCacheUseCase() {
    this.bind<ClearPermissionCacheUseCase>(TYPES.ClearPermissionCacheUseCase)
      .to(ClearPermissionCacheUseCaseImpl)
      .inSingletonScope();
  }

  protected provideCreateAuditLogUseCase() {
    this.bind<CreateAuditLogUseCase>(TYPES.CreateAuditLogUseCase).to(CreateAuditLogUseCaseImpl).inSingletonScope();
  }

  protected provideUtil() {
    this.bind<Util>(TYPES.Util).to(UtilImpl).inSingletonScope();
  }
}
