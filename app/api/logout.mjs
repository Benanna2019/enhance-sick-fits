export async function get() {
  return {
    location: "/",
    session: { authorized: false },
  };
}
