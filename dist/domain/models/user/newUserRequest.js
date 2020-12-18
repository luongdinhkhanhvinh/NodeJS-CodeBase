"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewUserRequest = void 0;
const illegalParameterError_1 = require("@errors/illegalParameterError");
const joi_1 = __importDefault(require("joi"));
const roleEnum_1 = require("src/common/enum/roleEnum");
const userEnum_1 = require("src/common/enum/userEnum");
const user_1 = require("src/common/user");
class NewUserRequest {
    constructor(email, firstName, lastName, hashPassword, roleId, userStatus) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.hashPassword = hashPassword;
        this.roleId = roleId;
        this.userStatus = userStatus;
        NewUserRequest.validate(this);
    }
    static validate(request) {
        const { error } = joi_1.default.validate(request, NewUserRequest.SCHEMA);
        if (error) {
            throw new illegalParameterError_1.IllegalParameterError("NewUserRequest", "validate", `Invalid provided values: ${error.message}`);
        }
    }
}
exports.NewUserRequest = NewUserRequest;
NewUserRequest.SCHEMA = joi_1.default
    .object({
    email: joi_1.default.string().max(50).email().required(),
    firstName: joi_1.default.string().regex(user_1.USER.REGEX_VALIDATE_NAME).min(2).max(20).required(),
    lastName: joi_1.default.string().regex(user_1.USER.REGEX_VALIDATE_NAME).min(2).max(20).required(),
    hashPassword: joi_1.default.string().required(),
    roleId: joi_1.default.number().allow(roleEnum_1.ROLE_NAME.ADMIN).required(),
    userStatus: joi_1.default.string().required().allow(userEnum_1.USER_STATUS.UNVERIFIED),
})
    .required();
//# sourceMappingURL=newUserRequest.js.map