import data from "@begin/data";

export async function post(req) {
  const { product_id } = req.body;
  const { authorized, sessionEmail } = req.session;
  const pathname = req.path;

  // I need to check if the incoming type from DynamoDB is an array or an object
  // if it is an object, I need to convert it to an array
  // So I should probably check if it is an array first, otherwise an array and object will always be a type of object
  // If it isn't an array, create a new array and push the object into it
  // if it is an array, continue on as normal

  if (!authorized) {
    return {
      text: "Unauthorized",
    };
  }

  const cartItems = await data.get({
    table: "cartItem",
    key: sessionEmail,
  });

  console.log("cartItems", cartItems);

  if (!cartItems) {
    await data.set({
      table: "cartItem",
      key: sessionEmail,
      product_id,
      quantity: 1,
    });

    return {
      location: "/",
    };
  }
  const existingCartItem = cartItems.find(
    (item) => item.product_id === product_id
  );

  if (existingCartItem) {
    console.log(existingCartItem);
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1!`
    );
    await data.incr({
      table: "cartItem",
      key: sessionEmail,
      prop: "quantity",
    });

    return {
      location: "/",
    };
  }
}
