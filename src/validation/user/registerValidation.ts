import { RegisterInput, ResetPasswordInput } from "src/resolvers/user";
import { lengthMessage, matchMessage } from "../messages/passwordMsg";
import {
  validatePasswordLength,
  validatePasswordMatch,
} from "../generic/validatePassword";

export const validateRegister = (options: RegisterInput) => {
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
  if (!validatePasswordLength(options.password)) {
    errors.push({
      field: "password",
      message: lengthMessage,
    });
  }

  return errors;
};

export const validateResetPassword = (
  options: ResetPasswordInput & { userId: string | null }
) => {
  const { newPassword, confirmPassword, userId } = options;
  const errors = [];
  if (!validatePasswordLength(newPassword)) {
    errors.push({
      field: "newPassword",
      message: lengthMessage,
    });
  }

  if (!validatePasswordLength(confirmPassword)) {
    errors.push({
      field: "confirmPassword",
      message: lengthMessage,
    });
  }

  if (!validatePasswordMatch(newPassword, confirmPassword)) {
    errors.push({
      field: "confirmPassword",
      message: matchMessage,
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
