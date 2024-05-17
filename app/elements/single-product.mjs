export default function SingleProduct({ html, state }) {
  const { product } = state.store;

  return html`
    <div id="product-info">
      <div class="single__product__style">
        <img src="${product?.photo?.image}" alt=${product?.name} />
        <div class="details">
          <h2>${product?.name}</h2>
          <p>${product?.description}</p>
        </div>
      </div>
    </div>
  `;
}
