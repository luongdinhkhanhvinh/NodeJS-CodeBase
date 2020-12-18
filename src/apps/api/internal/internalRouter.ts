import { Router } from "@common/router";
import { injectable, inject } from "inversify";
import koaRouter, { IMiddleware } from "koa-router";
import { TYPES } from "src/injection/types";
import { ClearPermissionCacheUseCase } from "src/usecases/internal/clearPermissionCacheUseCase";

@injectable()
export class InternalRouter extends Router {
  private readonly router: koaRouter;

  constructor(
    @inject(TYPES.ClearPermissionCacheUseCase)
    private readonly clearPermissionCacheUseCase: ClearPermissionCacheUseCase
  ) {
    super();

    this.router = new koaRouter();

    this.router.get(
      "HealthCheck",
      "/healthcheck",
      this.handlePublicRoute(async (ctx) => {
        ctx.status = 200;
      })
    );

    this.router.get(
      "clearPermissionCache",
      "/clear-permission",
      this.handlePublicRoute(async (ctx) => {
        await this.clearPermissionCacheUseCase.execute();
        ctx.status = 204;
      })
    );
  }

  public routes(): IMiddleware {
    return this.router.routes();
  }
}
