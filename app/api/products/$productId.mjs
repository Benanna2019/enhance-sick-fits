import data from "@begin/data";

export async function get(request) {
  const productId = request.params.productId
    ? request.params.productId
    : request.query.productId;

  const product = await data.get({ table: "products", key: productId });
  console.log("product", product);

  return {
    session: { ...request.session },
    json: { product },
  };
}
