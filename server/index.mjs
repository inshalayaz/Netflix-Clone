import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.mjs";
import userRoute from "./routes/users.mjs";
import movieRoute from "./routes/movies.mjs";

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/movie", movieRoute);

app.listen(3001, () => {
  console.log("Backend server is running!");
});
