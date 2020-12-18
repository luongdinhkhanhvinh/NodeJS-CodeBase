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
exports.Authorization = void 0;
const jwt = require("jsonwebtoken");
const unauthorizedError_1 = require("./errors/unauthorizedError");
class Authorization {
    constructor() { }
    verifyToken(token, privateKeyJwt) {
        try {
            return jwt.verify(token, privateKeyJwt);
        }
        catch (err) {
            throw new unauthorizedError_1.UnauthorizedError("Authorization", "verifyToken");
        }
    }
    authorizeMiddleware(authorizationHeaderParam, jwtConfig) {
        return (context, next) => __awaiter(this, void 0, void 0, function* () {
            const authorizedToken = context.request.headers[authorizationHeaderParam];
            context._tokenPayload = undefined;
            if (authorizedToken) {
                context._tokenPayload = this.verifyToken(authorizedToken, jwtConfig.jwtPrivateKey);
            }
            yield next();
        });
    }
}
exports.Authorization = Authorization;
//# sourceMappingURL=authorization.js.map