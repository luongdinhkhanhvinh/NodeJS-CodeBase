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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDbGatewayImpl = void 0;
const types_1 = require("@injection/types");
const databaseTables_1 = require("@models/databaseTables");
const inversify_1 = require("inversify");
let UserDbGatewayImpl = class UserDbGatewayImpl {
    constructor(models) {
        this.userDb = models.getModels()[databaseTables_1.DatabaseTables.TABLE_USER];
    }
    createUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userDb.create(request);
            return this.getByEmail(request.email);
        });
    }
    getByEmail(email, userType) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: { email, userType },
                raw: true,
            };
            if (!userType) {
                delete query.where.userType;
            }
            const user = yield this.userDb.findOne(query);
            return user;
        });
    }
    getById(id, userType) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: { id },
                raw: true,
            };
            if (userType) {
                query.where.userType = userType;
            }
            const user = yield this.userDb.findOne(query);
            return user;
        });
    }
    updateById(id, request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userDb.update(request, {
                where: { id },
            });
            return this.getById(id);
        });
    }
};
UserDbGatewayImpl = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Models))
], UserDbGatewayImpl);
exports.UserDbGatewayImpl = UserDbGatewayImpl;
//# sourceMappingURL=userDbGateway.js.map