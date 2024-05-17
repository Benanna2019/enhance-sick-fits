export default function AllProducts({ html, state }) {
  const { products } = state.store;
  // console.log("products from All products", products);

  const product_list = products
    .map((product) => {
      // console.log("product descriptoin", product.description);
      return html`<product-card
        product_key="${product.key}"
        product_image="${product.photo.image}"
        product_name="${product.name}"
        product_price="${product.price}"
        product_description="${product.description}"
      ></product-card>`;
    })
    .join("\n");

  return html`
    <div>
      <div class="product__list__styles">${product_list}</div>
    </div>
  `;
}
