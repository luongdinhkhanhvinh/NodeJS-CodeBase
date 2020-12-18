import { SystemMessage } from "@common/systemMessage";
import { HttpBaseError } from "./httpBaseError";

export class UnprocessableEntityError extends HttpBaseError {
  constructor(className: string, functionName: string, message: string = SystemMessage.NON_EXISTING_RESOURCE) {
    super(className, functionName, 422, "UnprocessableEntityError", message);
  }
}
