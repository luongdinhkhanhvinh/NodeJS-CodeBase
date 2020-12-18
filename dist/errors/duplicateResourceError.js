"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateResourceError = void 0;
const httpBaseError_1 = require("./httpBaseError");
class DuplicateResourceError extends httpBaseError_1.HttpBaseError {
    constructor(className, functionName, message) {
        super(className, functionName, 409, "DuplicateResourceError", message);
    }
}
exports.DuplicateResourceError = DuplicateResourceError;
//# sourceMappingURL=duplicateResourceError.js.map