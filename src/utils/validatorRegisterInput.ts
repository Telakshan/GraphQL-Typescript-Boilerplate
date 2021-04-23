import { EmailPasswordInput } from "../resolvers/EmailPasswordInput";
import { body } from "express-validator";

export const validateRegister = (options: EmailPasswordInput) => {
  if (!body(options.email).normalizeEmail().isEmail()) {
    return [{ field: "email", message: "Invalid email" }];
  }

  if (!body(options.password).isLength({ min: 5 })) {
    return [
      {
        field: "password",
        message: "Length must be greater than 4",
      },
    ];
  }
  return null;
};
