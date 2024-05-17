export default function MyLayout({ html, state }) {
  let products = state.store;

  return html`
    <sick-header>
      <nav-items slot="nav-items"></nav-items>
      <product-search slot="search-bar"></product-search>
    </sick-header>
    <main class="outlet__div">
      <slot name="main"></slot>
    </main>
    <cart-dialog id="cart" class="hidden"></cart-dialog>
  `;
}
