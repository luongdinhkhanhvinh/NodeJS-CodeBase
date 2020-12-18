import { HttpBaseError } from "./httpBaseError";

export class DuplicateResourceError extends HttpBaseError {
  constructor(className: string, functionName: string, message: string) {
    super(className, functionName, 409, "DuplicateResourceError", message);
  }
}
