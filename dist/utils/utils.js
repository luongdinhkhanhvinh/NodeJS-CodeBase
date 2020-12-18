"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilImpl = void 0;
const inversify_1 = require("inversify");
let UtilImpl = class UtilImpl {
    isValidPhoneNumber(phoneNumber) {
        const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return !reg.test(phoneNumber);
    }
    formatPhone(number) {
        if (!number)
            return number;
        return number.replace(/[^0-9]/g, "");
    }
    getDomainWithProtocol(value) {
        if (!value) {
            return;
        }
        const match = value.match(/^https?\:\/\/([^\/?#]+)/i);
        if (match && match[0]) {
            return match[0];
        }
        return value;
    }
    hiddenName(name) {
        return name.replace(/[a-zA-Z]/gi, "#");
    }
    padNumber(number, width, fillString = "0") {
        return number.toString().padStart(width, fillString);
    }
};
UtilImpl = __decorate([
    inversify_1.injectable()
], UtilImpl);
exports.UtilImpl = UtilImpl;
//# sourceMappingURL=utils.js.map