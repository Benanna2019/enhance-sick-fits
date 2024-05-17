import arc from "@architect/functions";

export default function Head(state) {
  const { store = {} } = state;
  // pageTitle is set in /app/preflight.mjs
  const { pageTitle = "" } = store;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>${pageTitle}</title>
      <link rel="stylesheet" href="${arc.static("/styles/styles.css")}">
      <link rel="icon" href="/_public/favicon.svg">
      <meta name="description" content="The HTML first full stack web framework.">
      <script src="https://js.stripe.com/v3" defer async></script>
      <script type="module" src="/_public/bundles/my-htmx.mjs"></script>
      <script
          src="https://unpkg.com/htmx.org@1.9.10"
          integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
          crossorigin="anonymous"
        ></script>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <style>
        @font-face {
          font-family: "kongtext";
          src: url("${arc.static("/fonts/kongtext.ttf")}") format("woff");
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: "radnika_next";
          src: url("${arc.static("/fonts/radnikanext-medium-webfont.woff2")}")
            format("woff");
          font-weight: normal;
          font-style: normal;
        }

        :root {
          font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
          line-height: 1.5;
          font-weight: 400;

          /* color: rgba(255, 255, 255, 0.87);
			background-color: #242424; */

          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          --red: #ff0000;
          --black: #393939;
          --grey: #3a3a3a;
          --gray: var(--grey);
          --lightGrey: #e1e1e1;
          --lightGray: var(--lightGrey);
          --offWhite: #ededed;
          --maxWidth: 1000px;
          --bs: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
        }

        body {
          font-family: "kongtext", ---apple-system, BlinkMacSystemFont,
            "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
            "Helvetica Neue", sans-serif;
          padding: 0;
          margin: 0;
          font-size: 1.5rem;
          line-height: 2;
        }

        html {
          box-sizing: border-box;
          font-size: 62.5%;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        a {
          text-decoration: none;
          color: var(--black);
        }

        a:hover {
          text-decoration: underline;
        }

        button {
          font-family: "radnika_next", ---apple-system, BlinkMacSystemFont,
            "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
            "Helvetica Neue", sans-serif;
        }
      </style>
      <body hx-boost="true">
`;
}
