import { createUser } from "../models/user-model.mjs";

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function post({ body }) {
  const { email, password } = body;
  await createUser(email, password);

  return {
    location: "/login",
  };
}
