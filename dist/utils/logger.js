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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonLogger = void 0;
const environment_1 = require("@common/environment");
const types_1 = require("@injection/types");
const inversify_1 = require("inversify");
const joi_1 = require("joi");
const winston_1 = require("winston");
let WinstonLogger = class WinstonLogger {
    constructor(env) {
        this.env = env;
        let options;
        switch (env) {
            case environment_1.Environment.PRODUCTION: {
                options = {
                    level: "info",
                    format: winston_1.format.json(),
                    transports: [new winston_1.transports.Console()],
                };
                break;
            }
            case environment_1.Environment.TESTING: {
                options = {
                    level: "info",
                    format: winston_1.format.simple(),
                    transports: [new winston_1.transports.Console()],
                };
                break;
            }
            case environment_1.Environment.STAGING: {
                options = {
                    level: "info",
                    format: winston_1.format.simple(),
                    transports: [new winston_1.transports.Console()],
                };
                break;
            }
            case environment_1.Environment.DEMO: {
                options = {
                    level: "info",
                    format: winston_1.format.simple(),
                    transports: [new winston_1.transports.Console()],
                };
                break;
            }
            case environment_1.Environment.DEVELOPMENT: {
                options = {
                    level: "debug",
                    format: winston_1.format.simple(),
                    transports: [new winston_1.transports.Console()],
                };
                break;
            }
            default: {
                options = {
                    level: "debug",
                    format: winston_1.format.simple(),
                    transports: [new winston_1.transports.Console()],
                };
            }
        }
        this.instance = winston_1.createLogger(options);
    }
    debug(message, metaData) {
        this.instance.log("debug", message, this.buildMetaData(metaData));
    }
    verbose(message, metaData) {
        this.instance.log("verbose", message, this.buildMetaData(metaData));
    }
    info(message, metaData) {
        this.instance.log("info", `Logger: ${message}`, this.buildMetaData(metaData));
    }
    warn(message, metaData) {
        this.instance.log("warn", message, this.buildMetaData(metaData));
    }
    error(message, metaData) {
        this.instance.log("error", message, this.buildMetaData(metaData));
    }
    buildMetaData(metaData) {
        if (joi_1.meta === undefined) {
            return undefined;
        }
        return { message: metaData };
    }
};
WinstonLogger = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.NodeEnv))
], WinstonLogger);
exports.WinstonLogger = WinstonLogger;
//# sourceMappingURL=logger.js.map