import data from "@begin/data";
// import { CartItem } from "./schema/cartItem.mjs";
import { updateUserCart, getUserByEmail } from "./user.mjs";
import { findProductById } from "./product-model.mjs";
import { createId } from "@paralleldrive/cuid2";
import remove from "lodash/fp/remove.js";

export async function removeFromCart(email, cartItemKey) {
  try {
    // Step 1: Retrieve the user object from the database

    const user = await getUserByEmail(email);

    console.log("user", user);

    if (!user) {
      throw new Error("User not found");
    }
    const itemIndex = user.cart.findIndex((item) => item.key === cartItemKey);

    console.log("itemIndex", itemIndex);

    let cart = user.cart;

    // If the item exists, remove it from the cart
    if (itemIndex > -1) {
      cart = remove((item) => item.key === cartItemKey, cart);
    } else {
      throw new Error("Cart item not found");
    }

    // Step 4: Update the user's cart in the database
    const updatedUser = await updateUserCart(user.key, cart);
    return updatedUser;
  } catch (error) {
    console.error("Error removing item from cart:", error.message);
    // Handle error appropriately
  }
}

export async function decrementCartItemQuantity(email, cartItemKey) {
  try {
    const user = await getUserByEmail(email);

    // Find the cart item by key
    const itemIndex = user.cart.findIndex((item) => item.key === cartItemKey);
    if (itemIndex === -1) {
      throw new Error("Cart item not found");
    }

    // Decrement the item quantity
    user.cart[itemIndex].quantity -= 1;

    // If the quantity is 0, remove the item from the cart
    if (user.cart[itemIndex].quantity <= 0) {
      await removeFromCart(userIdentifier, cartItemKey); // Assume removeFromCart is implemented
    } else {
      // Otherwise, update the user's cart in the database
      const updatedUser = await updateUserCart(user);
      return updatedUser;
    }
  } catch (error) {
    console.error("Error decrementing cart item quantity:", error.message);
    // Handle error appropriately
  }
}

export function buildCartItemDataObject(req) {
  const { session } = req;
  const { product_id } = req.body;
  console.log();
  const cartItem = {
    product_id,
    user_id: session.person.email,
    quantity: 1,
    created: new Date().toISOString(),
  };
  return cartItem;
}

export async function upsertCartItem(cartItem) {
  try {
    const [user] = await getUserByEmail(cartItem.email);
    if (!user) {
      // return html for an error
      throw new Error("User not found");
    }
    if (!user.cart) {
      user.cart = [];
    }

    const existingItemIndex = user.cart.findIndex(
      (item) => item.product_id === cartItem.product_id
    );

    if (existingItemIndex > -1) {
      user.cart[existingItemIndex].quantity += 1;
    } else {
      const product = await findProductById(cartItem.product_id);
      if (!product) {
        throw new Error("Product not found");
      }
      cartItem.key = createId();
      cartItem.product = product;
      user.cart.push(cartItem);
    }

    const updatedUser = await updateUserCart(user.key, user.cart);
    return updatedUser;
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    // Handle error appropriately
  }
}

export const getUserCartItems = async function (email) {
  const user = await data.get({ table: "users", key: email });
  return user.cart;
};

export function getCartCount(cart) {
  return cart?.reduce((tally, cartItem) => tally + cartItem.quantity, 0) || 0;
}

// export const validateCartItem = {
//   /**
//    *
//    * @param {import("./types").CartItem} item
//    *
//    */
//   shared(item) {
//     return validator(item, CartItem);
//   },
//   async create(item) {
//     let { valid, problems, data } = validateCartItem.shared(item);
//     if (item.key) {
//       problems["key"] = { errors: "<p>should not be included on a create</p>" };
//     }
//     // Insert your custom validation here
//     return !valid ? { problems, item: data } : { item: data };
//   },
//   async update(item) {
//     let { valid, problems, data } = validateCartItem.shared(item);
//     // Insert your custom validation here
//     return !valid ? { problems, item: data } : { item: data };
//   },
// };
