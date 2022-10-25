"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResetPassword = exports.validateRegister = void 0;
const passwordMsg_1 = require("../messages/passwordMsg");
const validatePassword_1 = require("../generic/validatePassword");
const validateRegister = (options) => {
    const errors = [];
    if (!options.email.includes("@")) {
        errors.push({
            field: "email",
            message: "Email invalid",
        });
    }
    if (options.username.length <= 2) {
        errors.push({
            field: "username",
            message: "username cannot be less than 3 characters",
        });
    }
    if (!(0, validatePassword_1.validatePasswordLength)(options.password)) {
        errors.push({
            field: "password",
            message: passwordMsg_1.lengthMessage,
        });
    }
    return errors;
};
exports.validateRegister = validateRegister;
const validateResetPassword = (options) => {
    const { newPassword, confirmPassword, userId } = options;
    const errors = [];
    if (!(0, validatePassword_1.validatePasswordLength)(newPassword)) {
        errors.push({
            field: "newPassword",
            message: passwordMsg_1.lengthMessage,
        });
    }
    if (!(0, validatePassword_1.validatePasswordLength)(confirmPassword)) {
        errors.push({
            field: "confirmPassword",
            message: passwordMsg_1.lengthMessage,
        });
    }
    if (!(0, validatePassword_1.validatePasswordMatch)(newPassword, confirmPassword)) {
        errors.push({
            field: "confirmPassword",
            message: passwordMsg_1.matchMessage,
        });
    }
    console.log(errors, "errors in validation");
    if (errors.length) {
        return errors;
    }
    if (!userId) {
        errors.push({
            field: "token",
            message: "Token expired",
        });
    }
    return errors;
};
exports.validateResetPassword = validateResetPassword;
//# sourceMappingURL=registerValidation.js.map