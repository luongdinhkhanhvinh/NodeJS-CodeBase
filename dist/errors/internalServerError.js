"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const systemMessage_1 = require("@common/systemMessage");
const httpBaseError_1 = require("./httpBaseError");
class InternalServerError extends httpBaseError_1.HttpBaseError {
    constructor(className, functionName, message = systemMessage_1.SystemMessage.SYSTEM_ERROR) {
        super(className, functionName, 500, "InternalServerError", message);
    }
}
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=internalServerError.js.map