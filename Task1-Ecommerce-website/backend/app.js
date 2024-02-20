import express from "express";
import { config } from "dotenv";
import logger from "morgan";
import spawnDb from "./db.config.js";
import authRouter from "./routes/auth.routes.js";
config();

const app = express();
app.set("port", process.env.PORT || 3000);

// middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger("dev"));
app.use("/auth", authRouter);

const runserver = () => {
  const db = spawnDb(); // start database server
  db.then(() => {
    app.listen(app.get("port"), () => {
      console.log(`Server listening on ${app.get("port")}`);
    });
  }).catch((err) => {
    console.log(err?.message);
  });
};

runserver();
