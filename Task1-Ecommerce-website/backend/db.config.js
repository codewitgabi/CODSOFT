import mongoose from "mongoose";
import { config } from "dotenv";
config();

const spawnDb = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

export default spawnDb;
