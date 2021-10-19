// const router = require("express").Router();
import { Router } from "express";
import User from "../models/Users.mjs";
import CryptoJs from "crypto-js";
const router = Router();

const { AES } = CryptoJs;
//REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username: username,
    email: email,
    password: AES.encrypt(password, process.env.SECRET_KEY).toString(),
  });

  try {
    const user = await newUser.save();
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    // console.log(user.password);
    !user && res.status(401).json("Wrong Email or Password");

    var bytes = CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY);
    var originalText = bytes.toString(CryptoJs.enc.Utf8);

    originalText !== password &&
      res.status(410).json("Wrong Email Or Password");

    res.status(200).json(user);
  } catch (error) {
    // console.log(error);
    res.status(500).json(error);
  }
});

export default router;
