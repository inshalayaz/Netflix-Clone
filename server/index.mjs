import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB COnnected"))
  .catch((err) => console.log(err));

app.listen(3001, () => {
  console.log("Server Running on Port 3001...");
});
