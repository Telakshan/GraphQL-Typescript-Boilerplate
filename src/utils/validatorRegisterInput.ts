import { EmailPasswordInput } from "../resolvers/EmailPasswordInput";

export const validateRegister = (options: EmailPasswordInput) => {
  const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isValidEmail = emailExpression.test(
    String(options.email).toLowerCase()
  );

  if (!isValidEmail) {
    return [{ field: "email", message: "Invalid email" }];
  }

  if (options.password.length < 5) {
    return [
      {
        field: "password",
        message: "Invalid",
      },
    ];
  }
  return null;
};
