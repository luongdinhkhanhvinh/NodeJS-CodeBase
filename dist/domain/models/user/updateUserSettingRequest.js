"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSettingRequest = void 0;
const illegalParameterError_1 = require("@errors/illegalParameterError");
const joi_1 = __importDefault(require("joi"));
const user_1 = require("src/common/user");
class UpdateUserSettingRequest {
    constructor(firstName, lastName, profileImageId, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImageId = profileImageId;
        this.password = password;
        UpdateUserSettingRequest.validate(this);
    }
    static validate(request) {
        const { error } = joi_1.default.validate(request, UpdateUserSettingRequest.SCHEMA);
        if (error) {
            throw new illegalParameterError_1.IllegalParameterError("UpdateUserSettingRequest", "validate", `Invalid provided values: ${error.message}`);
        }
    }
}
exports.UpdateUserSettingRequest = UpdateUserSettingRequest;
UpdateUserSettingRequest.SCHEMA = joi_1.default
    .object({
    profileImageId: joi_1.default.number().optional().allow(null),
    firstName: joi_1.default.string().regex(user_1.USER.REGEX_VALIDATE_NAME).min(2).max(20).optional(),
    lastName: joi_1.default.string().regex(user_1.USER.REGEX_VALIDATE_NAME).min(2).max(20).optional(),
    password: joi_1.default.string().optional(),
    attributes: joi_1.default
        .object({
        dateOfBirth: joi_1.default.string().isoDate().required(),
    })
        .unknown()
        .optional(),
})
    .min(1)
    .required();
//# sourceMappingURL=updateUserSettingRequest.js.map