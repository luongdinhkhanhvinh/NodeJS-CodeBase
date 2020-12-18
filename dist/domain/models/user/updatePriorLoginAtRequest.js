"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePriorLoginAtRequest = void 0;
const illegalParameterError_1 = require("@errors/illegalParameterError");
const joi_1 = __importDefault(require("joi"));
class UpdatePriorLoginAtRequest {
    constructor(priorLoginAt) {
        this.priorLoginAt = priorLoginAt;
        UpdatePriorLoginAtRequest.validate(this);
    }
    static validate(request) {
        const { error } = joi_1.default.validate(request, UpdatePriorLoginAtRequest.SCHEMA);
        if (error) {
            throw new illegalParameterError_1.IllegalParameterError("UpdatePriorLoginAtRequest", "validate", `Invalid provided values: ${error.message}`);
        }
    }
}
exports.UpdatePriorLoginAtRequest = UpdatePriorLoginAtRequest;
UpdatePriorLoginAtRequest.SCHEMA = joi_1.default
    .object({
    priorLoginAt: joi_1.default.date().required(),
})
    .required();
//# sourceMappingURL=updatePriorLoginAtRequest.js.map