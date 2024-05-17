import { verifyLogin } from "../lib/models/user.mjs";
import { validateEmail, validatePassword } from "../lib/validators.mjs";

/** @type {import('@enhance/types').EnhanceApiFn} */

export async function get(req) {
  return {
    pageTitle: "Login",
  };
}

export async function post(req) {
  const { message } = validateEmail(req.body.email);
  const checkPassword = validatePassword(req.body.password);
  const person = await verifyLogin(req.body.email, req.body.password);

  const errors = {
    email: {
      submittedEmail: req.body.email,
      message,
    },
    password: checkPassword,
    loginVerification: !person
      ? { message: "Invalid email or password" }
      : { message: "" },
  };

  const emailHasError = errors.email.message !== null;
  const passwordHasError = errors.password.message !== "";
  const personError = errors.loginVerification.message !== "";

  const hasErrors = emailHasError || passwordHasError || personError;

  if (hasErrors) {
    return {
      session: { errors },
      location: "/login",
    };
  }

  return {
    session: { person },
    location: "/",
  };
}
