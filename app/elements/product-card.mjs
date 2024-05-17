import { formatMoney } from "../lib/formatMoney.mjs";

export default function ProductCard({ html, state }) {
  const {
    product_image,
    product_name,
    product_price,
    product_description,
    product_key,
  } = state.attrs;

  // console.log("state attrs", state.attrs);
  return html`
    <div class="item__styles">
      <img src="${product_image}" alt="${product_name}" />
      <h3 class="product__title">
        <a href="/products/${product_key}">${product_name}</a>
      </h3>
      <span class="price__tag">${formatMoney(product_price)}</span>
      <p>${product_description}</p>
      <div class="buttonList">
        <a href=${product_key}>Edit</a>
        <button
          id="add_${product_key}_to_cart"
          name="product_id"
          value="${product_key}"
        >
          Add To Cart
        </button>

        <!-- hx-vals='{"product_id": "${product_key}"}'
          hx-swap="none" -->
        <!-- key={product.key} -->
        <!-- <DeleteProduct>Delete</DeleteProduct> -->
      </div>
    </div>
    <script type="module">
      const addToCartButton = document.getElementById(
        "add_${product_key}_to_cart"
      );

      const countelement = document.getElementById("count");
      // add an click event listener to the button that posts the button's value to /cart/add

      addToCartButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const product_id = event.target.value;

        console.log("product_id", product_id);
        const response = await fetch("/cart/add", {
          method: "POST",
          headers: {
            // prettier-ignore
            "accept": "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({ product_id }),
        });
        const { count } = await response.json();
        console.log("count", count);
        countelement.innerHTML = count;
      });
    </script>
  `;
}

{
  /* <AddToCart key={product.key} />
        {/* key={product.key} */
}
// <DeleteProduct>Delete</DeleteProduct> */}
