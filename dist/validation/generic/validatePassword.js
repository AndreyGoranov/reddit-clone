"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePasswordMatch = exports.validatePasswordLength = void 0;
const validatePasswordLength = (password) => {
    if (password.length < 8) {
        return false;
    }
    return true;
};
exports.validatePasswordLength = validatePasswordLength;
const validatePasswordMatch = (pw1, pw2) => {
    if (pw1 !== pw2) {
        return false;
    }
    return true;
};
exports.validatePasswordMatch = validatePasswordMatch;
//# sourceMappingURL=validatePassword.js.map