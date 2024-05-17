export default function CartCount({ html, state }) {
  const { count } = state.attrs;
  const countAsNumber = Number(count);

  return html` <div id="count" class="count__dot">${countAsNumber}</div> `;
}
