import { createUser } from "../lib/models/user.mjs";
import { validateEmail, validatePassword } from "../lib/validators.mjs";

export let post = [signup];

async function signup(req) {
  const { message } = validateEmail(req.body.email);
  console.log("message", message);
  const errors = {
    email: {
      submittedEmail: req.body.email,
      message,
    },
    password: validatePassword(req.body.password),
  };

  console.log("errors", errors);

  const emailHasError = errors.email.message !== null;
  const passwordHasError = errors.password.message !== "";

  const hasErrors = emailHasError || passwordHasError;

  if (hasErrors) {
    return {
      json: { errors },
      status: 400,
      location: "/login",
    };
  }

  let person = await createUser(req.body.email, req.body.password);

  console.log("person", person);

  //Signed up with {data.createUser.email} - Please Go Head and Sign in!
  return {
    session: {
      ...req.session,
      message: `Signed up with ${person.email} - Please Go Head and Sign in!`,
    },
    location: "/login",
  };
}
