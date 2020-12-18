"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const router_1 = require("@common/router");
const types_1 = require("@injection/types");
const devblock_authentication_1 = require("devblock-authentication");
const authentication_1 = require("devblock-authentication/lib/models/authentication");
const inversify_1 = require("inversify");
const koa_router_1 = __importDefault(require("koa-router"));
const roleEnum_1 = require("src/common/enum/roleEnum");
const resetPasswordTemplate_1 = require("src/common/templates/resetPasswordTemplate");
const signUpEmailTemplate_1 = require("src/common/templates/signUpEmailTemplate");
let UserRouter = class UserRouter extends router_1.Router {
    constructor(authentication, jwtConfig, getUserProfileUseCase) {
        super();
        this.authentication = authentication;
        this.jwtConfig = jwtConfig;
        this.getUserProfileUseCase = getUserProfileUseCase;
        this.router = new koa_router_1.default({
            prefix: "/users",
        });
        this.router.post("user/create:own", "/register", this.handlePublicRoute((ctx) => __awaiter(this, void 0, void 0, function* () {
            const request = ctx.request.body;
            const requestSignup = new authentication_1.UserSignupInfoRequest(request.firstName, request.lastName, request.email, request.password, request.email, authentication_1.USER_NAME_TYPE.EMAIL, undefined, undefined, undefined, undefined, {
                role: roleEnum_1.ROLE_NAME.ADMIN,
            });
            const sendEmailRequest = new authentication_1.SendEmailVerifyRequest("", request.email, signUpEmailTemplate_1.SIGN_UP_EMAIL_TEMPLATE, undefined);
            const user = yield this.authentication.signUp(requestSignup, sendEmailRequest);
            const bodyData = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userStatus: user.userStatus,
            };
            ctx.body = router_1.Router.buildSuccessBody(bodyData);
            ctx.status = 200;
        })));
        this.router.post("user/read:own", "/login", this.handlePublicRoute((ctx) => __awaiter(this, void 0, void 0, function* () {
            const request = ctx.request.body;
            const requestData = new devblock_authentication_1.Types.Authentication.UserLoginRequest(request.email, "email", request.password);
            const result = yield this.authentication.login(requestData, this.jwtConfig);
            ctx.body = router_1.Router.buildSuccessBody(result);
            ctx.status = 200;
        })));
        this.router.post("user/read:own", "/resend-verification", this.handlePublicRoute((ctx) => __awaiter(this, void 0, void 0, function* () {
            yield this.authentication.resendVerifyEmail(ctx.request.body.uid, "", signUpEmailTemplate_1.SIGN_UP_EMAIL_TEMPLATE);
            ctx.status = 204;
        })));
        this.router.patch("user/update:own", "/:id/status", this.handlePublicRoute((ctx) => __awaiter(this, void 0, void 0, function* () {
            const body = yield this.authentication.verifyAccount(ctx.params.id, ctx.request.body.code);
            ctx.body = router_1.Router.buildSuccessBody(body);
            ctx.status = 200;
        })));
        this.router.get("user/read:own", "/me/profile", this.handleAuthenticatedRoute((ctx) => __awaiter(this, void 0, void 0, function* () {
            const userId = ctx._tokenPayload.sub;
            const body = yield this.getUserProfileUseCase.execute(userId);
            ctx.body = router_1.Router.buildSuccessBody(body);
            ctx.status = 200;
        })));
        this.router.put("user/update:own", "/me/user-setting", this.handleAuthenticatedRoute((ctx) => __awaiter(this, void 0, void 0, function* () {
            const update = new authentication_1.UpdateProfileRequest(ctx._tokenPayload.sub, ctx.request.body.firstName, ctx.request.body.lastName, undefined, ctx.request.body.currentPassword, ctx.request.body.password, undefined);
            const user = yield this.authentication.updateProfile(update);
            ctx.body = router_1.Router.buildSuccessBody(user);
            ctx.status = 200;
        })));
        this.router.post("ResetPassword", "/reset-password", this.handlePublicRoute((ctx) => __awaiter(this, void 0, void 0, function* () {
            yield this.authentication.resetPassword(ctx.request.body.email, resetPasswordTemplate_1.RESET_PASSWORD_EMAIL_TEMPLATE, null);
            ctx.status = 204;
        })));
        this.router.patch("ChangePassword", "/:id/password", this.handlePublicRoute((ctx) => __awaiter(this, void 0, void 0, function* () {
            const request = new authentication_1.ChangePasswordRequest(ctx.params.id, ctx.request.body.code, ctx.request.body.password);
            yield this.authentication.updatePassword(request);
            ctx.status = 204;
        })));
        this.router.post("RenewToken", "/renew-token", this.handlePublicRoute((ctx) => __awaiter(this, void 0, void 0, function* () {
            const token = yield this.authentication.renewToken(ctx.request.body.refreshToken, this.jwtConfig);
            ctx.body = router_1.Router.buildSuccessBody(token);
            ctx.status = 200;
        })));
    }
    routes() {
        return this.router.routes();
    }
};
UserRouter = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Authentication)),
    __param(1, inversify_1.inject(types_1.TYPES.JwtConfig)),
    __param(2, inversify_1.inject(types_1.TYPES.GetUserProfileUseCase))
], UserRouter);
exports.UserRouter = UserRouter;
//# sourceMappingURL=userRouter.js.map