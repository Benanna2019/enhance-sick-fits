import data from "@begin/data";
import take from "lodash/fp/take.js";
import drop from "lodash/fp/drop.js";

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
  const allProducts = await data.get({ table: "products", limit: 100 });
  const PER_PAGE = 2;

  const page = Number(req.query.page) || 1;
  const skip = page * PER_PAGE - PER_PAGE;

  const products = take(PER_PAGE, drop(skip, allProducts));

  const count = allProducts.length;
  const pageCount = Math.ceil(count / PER_PAGE);

  const session = req.session;

  return {
    session: { ...session },
    json: { products, page, pageCount, count },
  };
}
