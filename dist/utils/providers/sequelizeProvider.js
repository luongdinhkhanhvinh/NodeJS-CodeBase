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
exports.SequelizeProviderImpl = void 0;
const types_1 = require("@injection/types");
const inversify_1 = require("inversify");
const sequelize_1 = require("sequelize");
let SequelizeProviderImpl = class SequelizeProviderImpl {
    constructor(dbConfig) {
        this.sequelizeClient = new sequelize_1.Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
            host: dbConfig.host,
            dialect: "mysql",
            pool: {
                max: 10,
                min: 2,
                acquire: 15000,
            },
            define: {
                underscored: true,
                freezeTableName: true,
            },
        });
    }
    sequelize() {
        return this.sequelizeClient;
    }
};
SequelizeProviderImpl = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.DatabaseConfig))
], SequelizeProviderImpl);
exports.SequelizeProviderImpl = SequelizeProviderImpl;
//# sourceMappingURL=sequelizeProvider.js.map