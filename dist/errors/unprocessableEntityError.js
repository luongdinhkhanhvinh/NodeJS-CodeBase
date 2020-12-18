"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntityError = void 0;
const systemMessage_1 = require("@common/systemMessage");
const httpBaseError_1 = require("./httpBaseError");
class UnprocessableEntityError extends httpBaseError_1.HttpBaseError {
    constructor(className, functionName, message = systemMessage_1.SystemMessage.NON_EXISTING_RESOURCE) {
        super(className, functionName, 422, "UnprocessableEntityError", message);
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
//# sourceMappingURL=unprocessableEntityError.js.map