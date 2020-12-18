import { TYPES } from "@injection/types";
import { inject, injectable } from "inversify";
import { Context } from "koa";
import { NewAuditLogRequest } from "src/domain/models/auditLog/newAuditLogRequest";
import fs from "fs";
import { ServerConfig } from "src/configs/appConfig";
import { Logger } from "@utils/logger";

export interface CreateAuditLogUseCase {
  execute(context: Context, timeRequest: Date, timeResponse: Date): Promise<any>;
}

@injectable()
export class CreateAuditLogUseCaseImpl implements CreateAuditLogUseCase {
  constructor(@inject(TYPES.ServerConfig) private readonly serverConfig: ServerConfig,
  @inject(TYPES.Logger) private readonly logger: Logger
  ) { }

  public async execute(context: Context, timeRequest: Date, timeResponse: Date): Promise<any> {
    const errorMessage = context.status >= 400 ? context.response?.body?.message : "";
    const request = new NewAuditLogRequest(
      context._tokenPayload?.sub,
      context.path,
      context.routerName,
      context.method,
      context.status,
      context.headers.authorization,
      context.headers["x-forwarded-for"],
      context.request.body,
      timeRequest,
      context.headers["device-info"],
      context.headers["user-agent"],
      context.response.body,
      timeResponse,
      errorMessage,
      "",
    );

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const rootPath = `${this.serverConfig.logPath}/${year}`;
    try {
      if (!fs.existsSync(rootPath)) {
        fs.mkdirSync(rootPath);
      }
      if (!fs.existsSync(`${rootPath}/${month}`)) {
        fs.mkdirSync(`${rootPath}/${month}`);
      }
      if (!fs.existsSync(`${rootPath}/${month}/${day}`)) {
        fs.mkdirSync(`${rootPath}/${month}/${day}`);
      }

      fs.appendFileSync(`${rootPath}/${month}/${day}/${year}-${month}-${day}.log`, `\n${JSON.stringify(request)}`);
    } catch (error) {
      this.logger.error(error.message);
    }

  }
 }
