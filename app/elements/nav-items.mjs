export function getCartCount(cart) {
  return cart?.reduce((tally, cartItem) => tally + cartItem.quantity, 0) || 0;
}

export default function NavItems({ html, state }) {
  const session = state.store.session;
  const count = getCartCount(session.person?.cart);

  const loggedInNavItem = session.person
    ? `<a href="/sell">Sell</a><a href="/orders">Orders</a><a href="/logout">Sign Out</a><button id="cart__button"
    >My Cart<cart-count count="${count}"></cart-count></button
  >`
    : `<a href="/login">Sign In</a>`;

  return html`
    <ul class="nav__list">
      <a href="/">Products</a>
      ${loggedInNavItem}
    </ul>
    <script type="module">
      const openCart = document.getElementById("cart__button");
      openCart.addEventListener("click", () => {
        document.getElementById("cart").classList.remove("hidden");
        document.getElementById("cart-dialog").classList.add("open__dialog");
      });
    </script>
  `;
}
