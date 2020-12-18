import { Logger } from "@utils/logger";
import { Context } from "koa";
import { HttpRequestHeader } from "../httpRequestHeader";
import { CreateAuditLogUseCase } from "src/usecases/auditLog/createAuditLogUseCase";

export default function requestLoggingMiddleware(
  createAuditLog: CreateAuditLogUseCase
): (context: Context, next: () => Promise<any>) => any {
  return async (context: Context, next: () => Promise<any>): Promise<any> => {
    const timeRequest = new Date();

    await next();

    createAuditLog.execute(context, timeRequest, new Date());
  };
}
