export default function HtmxClicker({ html, state }) {
  const { htmxEnabled, serverTime } = state.store.session;
  // console.log("serverTime", state);

  console.log("htmxEnabled", htmxEnabled);
  console.log("serverTime", serverTime);

  const renderJson = !htmxEnabled ? `<code>${serverTime}</code>` : "";

  return html`
    <style>
      :host {
        display: block;
      }
      a {
        cursor: pointer;
      }
    </style>

    <a href="/now" hx-boost="true" hx-target="#serverTime" hx-swap="innerHTML"
      >Get server time!</a
    >
    <br />

    <div id="serverTime">${renderJson}</div>
  `;
}
