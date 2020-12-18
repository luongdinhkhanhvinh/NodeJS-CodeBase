"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronJob = void 0;
const cron_1 = require("cron");
const inversify_1 = require("inversify");
let CronJob = class CronJob {
    static create(executeTime, execute, onComplete, timeZone, useCase, logger) {
        try {
            // tslint:disable-next-line: no-unused-expression
            new cron_1.CronJob(executeTime, execute, onComplete, true, timeZone, { useCase, logger });
        }
        catch (err) {
            // @TODO: handle error
            logger.error(err);
        }
    }
};
CronJob = __decorate([
    inversify_1.injectable()
], CronJob);
exports.CronJob = CronJob;
//# sourceMappingURL=cronJob.js.map