export async function get(request) {
  const person = request.session.person;
  console.log("session", request.session);

  if (!person) {
    return {
      location: "/login",
    };
  }

  return {
    session: { person },
    json: { person, path: request.path },
  };
}
