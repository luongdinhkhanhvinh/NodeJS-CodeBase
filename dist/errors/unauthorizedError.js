"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const systemMessage_1 = require("@common/systemMessage");
const httpBaseError_1 = require("./httpBaseError");
class UnauthorizedError extends httpBaseError_1.HttpBaseError {
    constructor(className, functionName, message = systemMessage_1.SystemMessage.UNAUTHORIZED_ERROR) {
        super(className, functionName, 401, "UnauthorizedError", message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=unauthorizedError.js.map