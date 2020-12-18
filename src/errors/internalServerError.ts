import { SystemMessage } from "@common/systemMessage";
import { HttpBaseError } from "./httpBaseError";

export class InternalServerError extends HttpBaseError {
  constructor(className: string, functionName: string, message: string = SystemMessage.SYSTEM_ERROR) {
    super(className, functionName, 500, "InternalServerError", message);
  }
}
