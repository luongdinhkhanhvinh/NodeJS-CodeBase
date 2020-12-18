"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const systemMessage_1 = require("@common/systemMessage");
const httpBaseError_1 = require("./httpBaseError");
class NotFoundError extends httpBaseError_1.HttpBaseError {
    constructor(className, functionName, message = systemMessage_1.SystemMessage.RESOURCE_NOT_FOUND_ERROR) {
        super(className, functionName, 404, "NotFoundError", message);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=notFoundError.js.map