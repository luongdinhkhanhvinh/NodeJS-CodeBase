"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserStatusRequest = void 0;
const illegalParameterError_1 = require("@errors/illegalParameterError");
const joi_1 = __importDefault(require("joi"));
const userEnum_1 = require("src/common/enum/userEnum");
class UpdateUserStatusRequest {
    constructor(userStatus) {
        this.userStatus = userStatus;
        UpdateUserStatusRequest.validate(this);
    }
    static validate(request) {
        const { error } = joi_1.default.validate(request, UpdateUserStatusRequest.SCHEMA);
        if (error) {
            throw new illegalParameterError_1.IllegalParameterError("UpdateUserStatusRequest", "validate", `Invalid provided values: ${error.message}`);
        }
    }
}
exports.UpdateUserStatusRequest = UpdateUserStatusRequest;
UpdateUserStatusRequest.SCHEMA = joi_1.default
    .object({
    userStatus: joi_1.default
        .string()
        .required()
        .allow([
        userEnum_1.USER_STATUS.ACTIVE,
        userEnum_1.USER_STATUS.INACTIVE,
        userEnum_1.USER_STATUS.PASSWORD_RESET,
        userEnum_1.USER_STATUS.UNVERIFIED,
    ]),
})
    .required();
//# sourceMappingURL=updateUserStatusRequest.js.map