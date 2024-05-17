export default function DeleteProduct({ html }) {
  return html`
    <form hx-delete="/product" hx-swap="outerHTML" hx-target="#cart-message">
      <input type="hidden" name="product_id" value="${product_id}" />

      Delete Product
    </form>
  `;
}
