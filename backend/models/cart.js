import mongoose, { Schema, Types, model } from "mongoose";

const Cart = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User", // reference to the user object
  },
  products: [{ type: Types.ObjectId, ref: "Product" }], // reference to the products object
  checkedOut: {
    type: Boolean,
    default: false,
  },
});

export default models("Cart", Cart);
