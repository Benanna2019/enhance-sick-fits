export default function AddToCart({ html, state }) {
  const { product_id } = state.attrs;
  return html`
    <form action="/cart/add" method="post">
      <input type="hidden" name="product_id" value="${product_id}" />
      <button type="submit">Add To Cart</button>
    </form>
  `;
}
