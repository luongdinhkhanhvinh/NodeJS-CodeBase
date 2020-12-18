"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const systemMessage_1 = require("../common/systemMessage");
const httpBaseError_1 = require("./httpBaseError");
class ForbiddenError extends httpBaseError_1.HttpBaseError {
    constructor(className, functionName, message = systemMessage_1.SystemMessage.FORBIDDEN_ERROR) {
        super(className, functionName, 403, "ForbiddenError", message);
    }
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=forbiddenError.js.map