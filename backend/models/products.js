import { Schema, model } from "mongoose";

const Product = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: [1, "Price cannot be less than 1"],
    max: [999999, "Price cannot be more than 999999"],
    required: true,
    default: 10
  },
  image: {
    type: String,
    required: true,
  },
});

export default model("Product", Product);
