import { formatMoney } from "../lib/formatMoney.mjs";
import { calcTotalPrice } from "../lib/calc-total-price.mjs";

export default function CartDialog({ html, state }) {
  const { session } = state.store;
  const { person } = session;

  const cartItems =
    person?.cart
      ?.map((item) => {
        //   console.log("This is the cartItem", item);
        const product = item?.product;
        return html`
          <li id="cart_item_${product?.key}" class="cart__item__styles">
            <img
              src="${product?.photo?.image}"
              alt="${product?.name}"
              class="w-[100px] h-[100px] object-cover"
            />
            <div class="flex flex-col h-full justify-around text-xl">
              <div>
                <h3>${product?.name}</h3>
              </div>
              <div class="flex flex-col">
                <p class="cart_item_${product?.key}_quantity_price">
                  ${item?.quantity &&
                  formatMoney(product?.price * item?.quantity)}
                  -
                </p>
                <p>
                  <em>
                    ${item?.quantity}
                    <span class="x-html text-3xl">&times;</span> ${formatMoney(
                      product?.price
                    )}
                    each
                  </em>
                </p>
              </div>
            </div>
            <button
              class="big__button"
              hx-delete="/cart/${item.key}"
              hx-target="#cart_item_${product?.key}"
              hx-swap="delete"
              title="Remove This Item from Cart"
            >
              &times;
            </button>
          </li>
        `;
      })
      .join("\n") ?? null;

  return html`
    <div id="cart-dialog" class="cart__styles">
      <header>
        <h3 class="supreme__h3">
          ${person?.name ? person?.name + "'s" : ""} Cart
        </h3>
      </header>
      <button id="close__button" class="close__button">&times;</button>
      <ul>
        ${cartItems}
      </ul>
      <footer>
        <p>${formatMoney(calcTotalPrice(person?.cart))}</p>
        <checkout-form></checkout-form>
      </footer>
    </div>
    <script type="module">
      const closeButton = document.getElementById("close__button");
      closeButton.addEventListener("click", () => {
        document.getElementById("cart").classList.add("hidden");
        document.getElementById("cart-dialog").classList.remove("open__dialog");
      });
    </script>
  `;
}
