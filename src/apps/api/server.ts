// import authorizeMiddleware from "@common/middlewares/authorizeMiddleware";
import { HttpRequestHeader } from "@common/httpRequestHeader";
import calculateResponseTimeMiddleware from "@common/middlewares/calculateResponseTimeMiddleware";
import errorHandlerMiddleware from "@common/middlewares/errorHandlerMiddleware";
import requestLoggingMiddleware from "@common/middlewares/requestLoggingMiddleware";
import { Router } from "@common/router";
import { TYPES } from "@injection/types";
import cors from "@koa/cors";
import { Logger } from "@utils/logger";
import { Authorization } from "devblock-authorization";
import http from "http";
import { Container } from "inversify";
import koa from "koa";
import koaBodyparser from "koa-bodyparser";
import { ServerConfig } from "src/configs/appConfig";
import { jwtConfig } from "src/configs/components/jsonWebToken";
import { InitCronJob } from "src/cronJobs/initCronJob";
import { CreateAuditLogUseCase } from "src/usecases/auditLog/createAuditLogUseCase";

export class Server {
  private readonly app: koa;
  private readonly logger: Logger;
  private readonly serverConfig: ServerConfig;

  constructor(appContainer: Container) {
    this.logger = appContainer.get<Logger>(TYPES.Logger);
    this.serverConfig = appContainer.get<ServerConfig>(TYPES.ServerConfig);
    const authorizationPackage: Authorization = appContainer.get<Authorization>(TYPES.Authorization);
    const createAuditLog = appContainer.get<CreateAuditLogUseCase>(TYPES.CreateAuditLogUseCase);

    // Router initialize
    const internalRouter = appContainer.get<Router>(TYPES.InternalRouter);
    const userRouter = appContainer.get<Router>(TYPES.UserRouter);

    this.app = new koa();
    this.app.use(requestLoggingMiddleware(createAuditLog));
    this.app.use(calculateResponseTimeMiddleware());
    this.app.use(errorHandlerMiddleware(this.logger));
    this.app.use(cors());
    this.app.use(koaBodyparser());
    this.app.use(authorizationPackage.authorizeMiddleware(HttpRequestHeader.HEADER_AUTHORIZATION, jwtConfig));

    this.app.use(internalRouter.routes());
    this.app.use(userRouter.routes());
    InitCronJob.init(appContainer);
  }

  public start(): http.Server {
    return this.app.listen(this.serverConfig.port, () => {
      this.logger.info(`The server is starting at port ${this.serverConfig.port}`);
    });
  }
}
