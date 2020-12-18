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
exports.CreateAuditLogUseCaseImpl = void 0;
const types_1 = require("@injection/types");
const inversify_1 = require("inversify");
const newAuditLogRequest_1 = require("src/domain/models/auditLog/newAuditLogRequest");
const fs_1 = __importDefault(require("fs"));
let CreateAuditLogUseCaseImpl = class CreateAuditLogUseCaseImpl {
    constructor(serverConfig, logger) {
        this.serverConfig = serverConfig;
        this.logger = logger;
    }
    execute(context, timeRequest, timeResponse) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const errorMessage = context.status >= 400 ? (_b = (_a = context.response) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.message : "";
            const request = new newAuditLogRequest_1.NewAuditLogRequest((_c = context._tokenPayload) === null || _c === void 0 ? void 0 : _c.sub, context.path, context.routerName, context.method, context.status, context.headers.authorization, context.headers["x-forwarded-for"], context.request.body, timeRequest, context.headers["device-info"], context.headers["user-agent"], context.response.body, timeResponse, errorMessage, "");
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            const rootPath = `${this.serverConfig.logPath}/${year}`;
            try {
                if (!fs_1.default.existsSync(rootPath)) {
                    fs_1.default.mkdirSync(rootPath);
                }
                if (!fs_1.default.existsSync(`${rootPath}/${month}`)) {
                    fs_1.default.mkdirSync(`${rootPath}/${month}`);
                }
                if (!fs_1.default.existsSync(`${rootPath}/${month}/${day}`)) {
                    fs_1.default.mkdirSync(`${rootPath}/${month}/${day}`);
                }
                fs_1.default.appendFileSync(`${rootPath}/${month}/${day}/${year}-${month}-${day}.log`, `\n${JSON.stringify(request)}`);
            }
            catch (error) {
                this.logger.error(error.message);
            }
        });
    }
};
CreateAuditLogUseCaseImpl = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.ServerConfig)),
    __param(1, inversify_1.inject(types_1.TYPES.Logger))
], CreateAuditLogUseCaseImpl);
exports.CreateAuditLogUseCaseImpl = CreateAuditLogUseCaseImpl;
//# sourceMappingURL=createAuditLogUseCase.js.map