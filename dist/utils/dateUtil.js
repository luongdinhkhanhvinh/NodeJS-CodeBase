"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
const date_fns_1 = require("date-fns");
class DateUtils {
    static dateOnly(value) {
        if (!value) {
            return null;
        }
        return date_fns_1.isValid(value) ? date_fns_1.formatISO(value, { representation: "date" }) : value.toString();
    }
    static dateTime(value) {
        return date_fns_1.isValid(value) ? value.toISOString() : value.toString();
    }
    static isValidDate(value) {
        return date_fns_1.isValid(value);
    }
    static toString(value) {
        return this.isValidDate(value) ? value.toString() : "";
    }
    static formatDate(value, dateFormat = "") {
        if (!dateFormat || !this.isValidDate(value)) {
            return "";
        }
        return date_fns_1.format(value, dateFormat);
    }
    static calculateAge(dateOfBirth) {
        return date_fns_1.differenceInYears(Date.now(), dateOfBirth);
    }
}
exports.DateUtils = DateUtils;
//# sourceMappingURL=dateUtil.js.map