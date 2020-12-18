"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Router_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const unauthorizedError_1 = require("@errors/unauthorizedError");
const types_1 = require("@injection/types");
const inversify_1 = require("inversify");
const forbiddenError_1 = require("src/errors/forbiddenError");
let Router = Router_1 = class Router {
    constructor() { }
    static buildSuccessBody(data) {
        return { data };
    }
    static isAuthorized(tokenPayload) {
        return !!tokenPayload;
    }
    static getTokenPayload(context) {
        return context._tokenPayload;
    }
    static getCurrentUserId(context) {
        return context._tokenPayload.sub;
    }
    static getDecodedIdRole(context) {
        return context._userRole;
    }
    static assertAuthenticatedInternal(tokenPayloadInternal) {
        if (!Router_1.isAuthorized(tokenPayloadInternal)) {
            throw new unauthorizedError_1.UnauthorizedError("Router", "assertProtectedPermission", "Permission denied");
        }
    }
    static assertAuthenticated(tokenPayload) {
        if (!Router_1.isAuthorized(tokenPayload)) {
            throw new unauthorizedError_1.UnauthorizedError("Router", "assertProtectedPermission", "Permission denied");
        }
    }
    handleProtectedRoute(handler) {
        return (context) => __awaiter(this, void 0, void 0, function* () {
            Router_1.assertAuthenticated(context._tokenPayload);
            const permission = yield this.authorizationRepository.getPermission(context, context.routerName);
            if (!permission || !permission.granted) {
                throw new forbiddenError_1.ForbiddenError("Router", "assertProtectedPermission", "Permission denied");
            }
            context.permission = permission;
            yield handler(context);
        });
    }
    handleAuthenticatedRoute(handler) {
        return (context) => __awaiter(this, void 0, void 0, function* () {
            Router_1.assertAuthenticated(Router_1.getTokenPayload(context));
            yield handler(context);
        });
    }
    handleProtectedInternalRoute(handler) {
        return (context) => __awaiter(this, void 0, void 0, function* () {
            Router_1.assertAuthenticatedInternal(context._tokenPayloadInternal);
            yield handler(context);
        });
    }
    handlePublicRoute(handler) {
        return (context) => __awaiter(this, void 0, void 0, function* () {
            yield handler(context);
        });
    }
};
__decorate([
    inversify_1.inject(types_1.TYPES.AuthorizationRepository)
], Router.prototype, "authorizationRepository", void 0);
Router = Router_1 = __decorate([
    inversify_1.injectable()
], Router);
exports.Router = Router;
//# sourceMappingURL=router.js.map