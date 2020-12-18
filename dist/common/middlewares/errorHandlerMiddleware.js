"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpBaseError_1 = require("@errors/httpBaseError");
const devblock_authentication_1 = require("devblock-authentication");
const devblock_authorization_1 = require("devblock-authorization");
const environment_1 = require("src/common/environment");
const env_1 = require("src/configs/components/env");
const systemMessage_1 = require("../systemMessage");
function errorHandlerMiddleware(logger) {
    return (context, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield next();
        }
        catch (error) {
            logger.error(error.message, error.stack);
            if (error instanceof httpBaseError_1.HttpBaseError || error instanceof devblock_authorization_1.AuthorHttpBaseError || error instanceof devblock_authentication_1.AuthenHttpBaseError) {
                // TODO log error for HttpBaseError
                // TODO log error for BaseError
                context.status = error.code;
                context.body = buildErrorBody(error.code, error.message);
                return;
            }
            // TODO log error for SystemError
            context.status = 500;
            context.body = buildErrorBody(500, env_1.env === environment_1.Environment.DEVELOPMENT ? error.message : systemMessage_1.SystemMessage.SYSTEM_ERROR);
        }
    });
}
exports.default = errorHandlerMiddleware;
function buildErrorBody(errorCode, errorMessage) {
    return {
        status: errorCode,
        message: errorMessage
    };
}
//# sourceMappingURL=errorHandlerMiddleware.js.map