import { Router } from "@common/router";
import { TYPES } from "@injection/types";
import { Authentication, Types } from "devblock-authentication";
import {
  ChangePasswordRequest,
  SendEmailVerifyRequest,
  UpdateProfileRequest,
  UserReponse,
  UserSignupInfoRequest,
  USER_NAME_TYPE,
} from "devblock-authentication/lib/models/authentication";
import { inject, injectable } from "inversify";
import koaRouter, { IMiddleware } from "koa-router";
import { ROLE_NAME } from "src/common/enum/roleEnum";
import { RESET_PASSWORD_EMAIL_TEMPLATE } from "src/common/templates/resetPasswordTemplate";
import { SIGN_UP_EMAIL_TEMPLATE } from "src/common/templates/signUpEmailTemplate";
import { JwtConfig } from "src/configs/appConfig";
import { GetUserProfileUseCase } from "src/usecases/user/getUserProfileUseCase";

@injectable()
export class UserRouter extends Router {
  private readonly router: koaRouter;

  constructor(
    @inject(TYPES.Authentication)
    private readonly authentication: Authentication,
    @inject(TYPES.JwtConfig) private readonly jwtConfig: JwtConfig,
    @inject(TYPES.GetUserProfileUseCase)
    private readonly getUserProfileUseCase: GetUserProfileUseCase
  ) {
    super();

    this.router = new koaRouter({
      prefix: "/users",
    });

    this.router.post(
      "user/create:own",
      "/register",
      this.handlePublicRoute(async (ctx) => {
        const request = ctx.request.body;
        const requestSignup = new UserSignupInfoRequest(
          request.firstName,
          request.lastName,
          request.email,
          request.password,
          request.email,
          USER_NAME_TYPE.EMAIL,
          undefined,
          undefined,
          undefined,
          undefined,
          {
            role: ROLE_NAME.ADMIN,
          }
        );
        const sendEmailRequest = new SendEmailVerifyRequest("", request.email, SIGN_UP_EMAIL_TEMPLATE, undefined);
        const user: UserReponse = await this.authentication.signUp(requestSignup, sendEmailRequest);

        const bodyData = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userStatus: user.userStatus,
        };

        ctx.body = Router.buildSuccessBody(bodyData);
        ctx.status = 200;
      })
    );

    this.router.post(
      "user/read:own",
      "/login",
      this.handlePublicRoute(async (ctx) => {
        const request = ctx.request.body;
        const requestData = new Types.Authentication.UserLoginRequest(request.email, "email", request.password);
        const result = await this.authentication.login(requestData, this.jwtConfig);

        ctx.body = Router.buildSuccessBody(result);
        ctx.status = 200;
      })
    );

    this.router.post(
      "user/read:own",
      "/resend-verification",
      this.handlePublicRoute(async (ctx) => {
        await this.authentication.resendVerifyEmail(ctx.request.body.uid, "", SIGN_UP_EMAIL_TEMPLATE);

        ctx.status = 204;
      })
    );

    this.router.patch(
      "user/update:own",
      "/:id/status",
      this.handlePublicRoute(async (ctx) => {
        const body = await this.authentication.verifyAccount(ctx.params.id, ctx.request.body.code);

        ctx.body = Router.buildSuccessBody(body);
        ctx.status = 200;
      })
    );

    this.router.get(
      "user/read:own",
      "/me/profile",
      this.handleAuthenticatedRoute(async (ctx) => {
        const userId = ctx._tokenPayload.sub as number;
        const body = await this.getUserProfileUseCase.execute(userId);

        ctx.body = Router.buildSuccessBody(body);
        ctx.status = 200;
      })
    );

    this.router.put(
      "user/update:own",
      "/me/user-setting",
      this.handleAuthenticatedRoute(async (ctx) => {
        const update = new UpdateProfileRequest(
          ctx._tokenPayload.sub,
          ctx.request.body.firstName,
          ctx.request.body.lastName,
          undefined,
          ctx.request.body.currentPassword,
          ctx.request.body.password,
          undefined
        );
        const user: UserReponse = await this.authentication.updateProfile(update);
        ctx.body = Router.buildSuccessBody(user);
        ctx.status = 200;
      })
    );

    this.router.post(
      "ResetPassword",
      "/reset-password",
      this.handlePublicRoute(async (ctx) => {
        await this.authentication.resetPassword(ctx.request.body.email, RESET_PASSWORD_EMAIL_TEMPLATE, null);

        ctx.status = 204;
      })
    );

    this.router.patch(
      "ChangePassword",
      "/:id/password",
      this.handlePublicRoute(async (ctx) => {
        const request = new ChangePasswordRequest(ctx.params.id, ctx.request.body.code, ctx.request.body.password);
        await this.authentication.updatePassword(request);

        ctx.status = 204;
      })
    );

    this.router.post(
      "RenewToken",
      "/renew-token",
      this.handlePublicRoute(async (ctx) => {
        const token = await this.authentication.renewToken(ctx.request.body.refreshToken, this.jwtConfig);

        ctx.body = Router.buildSuccessBody(token);
        ctx.status = 200;
      })
    );
  }
  public routes(): IMiddleware {
    return this.router.routes();
  }
}
