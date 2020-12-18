"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordRequest = void 0;
const illegalParameterError_1 = require("@errors/illegalParameterError");
const joi_1 = __importDefault(require("joi"));
const userEnum_1 = require("src/common/enum/userEnum");
class UpdatePasswordRequest {
    constructor(password, userStatus) {
        this.password = password;
        this.userStatus = userStatus;
        UpdatePasswordRequest.validate(this);
    }
    static validate(request) {
        const { error } = joi_1.default.validate(request, UpdatePasswordRequest.SCHEMA);
        if (error) {
            throw new illegalParameterError_1.IllegalParameterError("UpdatePasswordRequest", "validate", `Invalid provided values: ${error.message}`);
        }
    }
}
exports.UpdatePasswordRequest = UpdatePasswordRequest;
UpdatePasswordRequest.SCHEMA = joi_1.default
    .object({
    password: joi_1.default.string().required(),
    userStatus: joi_1.default
        .string()
        .required()
        .allow([
        userEnum_1.USER_STATUS.ACTIVE,
    ]),
})
    .required();
//# sourceMappingURL=updatePasswordRequest.js.map