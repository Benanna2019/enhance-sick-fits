export async function get(req) {
  console.log("req", req);

  const useHyperMedia = req.headers["hx-request"] === "true";

  if (useHyperMedia) {
    return {
      html: `<code class="now">${new Date().toLocaleString()}</code>`,
    };
  }

  return {
    session: {
      ...req.session,
      htmxEnabled: useHyperMedia,
      serverTime: new Date().toLocaleString(),
    },

    location: "/",
  };
}
