import { Schema, model, Types } from "mongoose";

const User = new Schema(
  {
    username: {
      type: String,
      maxLength: [50, "Username cannot be more than 50 characters"],
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      cast: "User with email `{VALUE}` already exists",
    },
    password: {
      type: String,
      required: true,
    },
    picture: String,
  },
  { timestamps: true }
);

export default model("User", User);
