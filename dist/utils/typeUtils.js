"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeUtilsImpl = void 0;
const trackableSystemError_1 = require("@errors/trackableSystemError");
const inversify_1 = require("inversify");
let TypeUtilsImpl = class TypeUtilsImpl {
    toBoolean(booleanStr) {
        if (booleanStr === undefined) {
            return undefined;
        }
        if (typeof booleanStr === "boolean") {
            return booleanStr;
        }
        if (booleanStr === "true") {
            return true;
        }
        if (booleanStr === "false") {
            return false;
        }
        if (booleanStr === "1") {
            return true;
        }
        if (booleanStr === "0") {
            return false;
        }
        throw new trackableSystemError_1.TrackableSystemError("TypeUtils", "toBoolean", `Cannot convert to boolean: ${booleanStr}, type: ${typeof booleanStr}`);
    }
    formatString(value, variables) {
        if (!value) {
            return "";
        }
        return value.replace(/(\{\w+\})/g, (match) => {
            if (!variables) {
                return "";
            }
            const text = match.replace(/\{|\}/g, "");
            return variables[text] || "";
        });
    }
    randomNumber(length) {
        let text = "";
        const possible = "0123456789";
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    randomString(length) {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    sleep(seconds) {
        return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    }
    /**
     *
     * @param hrtime [seconds, nanoseconds]
     */
    formatHRTime(hrtime) {
        if (!hrtime) {
            return "N/A";
        }
        const seconds = hrtime[0];
        const nanoseconds = hrtime[1];
        return new Date(seconds * 1000 + nanoseconds / 1000000).toISOString().slice(11, -1);
    }
    mysqlRealEscapeString(value) {
        if (typeof value === "number") {
            return value;
        }
        if (!value) {
            return "NULL";
        }
        return value.toString().replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case '"':
                case "'":
                case "\\":
                case "%":
                    return "\\" + char;
            }
        });
    }
};
TypeUtilsImpl = __decorate([
    inversify_1.injectable()
], TypeUtilsImpl);
exports.TypeUtilsImpl = TypeUtilsImpl;
//# sourceMappingURL=typeUtils.js.map