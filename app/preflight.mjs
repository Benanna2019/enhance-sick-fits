export default async function Preflight({ req }) {
  return {
    pageTitle: getPageTitle(req.path),
    session: req.session,
  };
}

function getPageTitle(path) {
  const titleMap = {
    "/": "Sick Fits - Products",
  };

  return titleMap[path];
}
