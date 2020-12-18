"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
// import authorizeMiddleware from "@common/middlewares/authorizeMiddleware";
const httpRequestHeader_1 = require("@common/httpRequestHeader");
const calculateResponseTimeMiddleware_1 = __importDefault(require("@common/middlewares/calculateResponseTimeMiddleware"));
const errorHandlerMiddleware_1 = __importDefault(require("@common/middlewares/errorHandlerMiddleware"));
const requestLoggingMiddleware_1 = __importDefault(require("@common/middlewares/requestLoggingMiddleware"));
const types_1 = require("@injection/types");
const cors_1 = __importDefault(require("@koa/cors"));
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const jsonWebToken_1 = require("src/configs/components/jsonWebToken");
const initCronJob_1 = require("src/cronJobs/initCronJob");
class Server {
    constructor(appContainer) {
        this.logger = appContainer.get(types_1.TYPES.Logger);
        this.serverConfig = appContainer.get(types_1.TYPES.ServerConfig);
        const authorizationPackage = appContainer.get(types_1.TYPES.Authorization);
        const createAuditLog = appContainer.get(types_1.TYPES.CreateAuditLogUseCase);
        // Router initialize
        const internalRouter = appContainer.get(types_1.TYPES.InternalRouter);
        const userRouter = appContainer.get(types_1.TYPES.UserRouter);
        this.app = new koa_1.default();
        this.app.use(requestLoggingMiddleware_1.default(createAuditLog));
        this.app.use(calculateResponseTimeMiddleware_1.default());
        this.app.use(errorHandlerMiddleware_1.default(this.logger));
        this.app.use(cors_1.default());
        this.app.use(koa_bodyparser_1.default());
        this.app.use(authorizationPackage.authorizeMiddleware(httpRequestHeader_1.HttpRequestHeader.HEADER_AUTHORIZATION, jsonWebToken_1.jwtConfig));
        this.app.use(internalRouter.routes());
        this.app.use(userRouter.routes());
        initCronJob_1.InitCronJob.init(appContainer);
    }
    start() {
        return this.app.listen(this.serverConfig.port, () => {
            this.logger.info(`The server is starting at port ${this.serverConfig.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map