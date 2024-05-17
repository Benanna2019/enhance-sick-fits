import {
  getCartCount,
  buildCartItemDataObject,
  upsertCartItem,
} from "../../lib/models/cart-model.mjs";

export let post = [incrementCart];

async function incrementCart(request) {
  const cartItem = buildCartItemDataObject(request);
  // let { problems, item } = await validateCartItem.create(cartItem);

  console.log("request", request);

  // console.log("problems", problems);
  // if (problems) {
  //   // fix return value for htmx
  //   return {
  //     session: { ...session, problems, item },
  //     json: { problems, item },
  //     location: "/sell",
  //   };
  // }

  const updatedUser = await upsertCartItem(cartItem);
  // eslint-disable-next-line no-unused-vars
  // let { problems: removedProblems, link: removed, ...newSession } = session
  console.log("updatedUser", updatedUser);

  const count = getCartCount(updatedUser.cart);
  console.log("count", count);

  return {
    json: { count },
    session: {
      ...request.session,
      person: { ...updatedUser },
    },
    location: "/",
  };
}
