"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewAuditLogRequest = void 0;
const illegalParameterError_1 = require("@errors/illegalParameterError");
const joi_1 = __importDefault(require("joi"));
class NewAuditLogRequest {
    constructor(userId, requestUrl, controllerName, actionName, responseCode, authToken, sourceIP, requestBody, requestDate, requestDeviceInfo, requestUserAgent, responseBody, responseDate, responseError, trackingId) {
        this.userId = userId;
        this.requestUrl = requestUrl;
        this.controllerName = controllerName;
        this.actionName = actionName;
        this.responseCode = responseCode;
        this.authToken = authToken;
        this.sourceIP = sourceIP;
        this.requestBody = requestBody;
        this.requestDate = requestDate;
        this.requestDeviceInfo = requestDeviceInfo;
        this.requestUserAgent = requestUserAgent;
        this.responseBody = responseBody;
        this.responseDate = responseDate;
        this.responseError = responseError;
        this.trackingId = trackingId;
        this.logtime = new Date();
        NewAuditLogRequest.validate(this);
    }
    static validate(request) {
        const { error } = joi_1.default.validate(request, NewAuditLogRequest.SCHEMA);
        if (error) {
            throw new illegalParameterError_1.IllegalParameterError("NewUserRequest", "validate", `Invalid provided values: ${error.message}`);
        }
    }
}
exports.NewAuditLogRequest = NewAuditLogRequest;
NewAuditLogRequest.SCHEMA = joi_1.default
    .object({
    userId: joi_1.default.number().optional(),
    logtime: joi_1.default.date().required(),
    requestUrl: joi_1.default.string().required(),
    controllerName: joi_1.default.string().optional().allow(null, ""),
    actionName: joi_1.default.string().required(),
    responseCode: joi_1.default.number().required(),
    authToken: joi_1.default.string().optional(),
    sourceIP: joi_1.default.string().optional().allow(null, ""),
    requestBody: joi_1.default.any().optional().allow(null, ""),
    requestDate: joi_1.default.date().required(),
    requestDeviceInfo: joi_1.default.string().optional().allow(null, ""),
    requestUserAgent: joi_1.default.string().optional().allow(null, ""),
    responseBody: joi_1.default.any().optional().allow(null, ""),
    responseDate: joi_1.default.date().required(),
    responseError: joi_1.default.string().optional().allow(null, ""),
    trackingId: joi_1.default.string().optional().allow(null, ""),
})
    .required();
//# sourceMappingURL=newAuditLogRequest.js.map