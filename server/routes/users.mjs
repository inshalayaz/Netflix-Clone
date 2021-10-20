import { Router } from "express";
import User from "../models/Users.mjs";
import CryptoJs from "crypto-js";
import verifyToken from "../verifyToken.mjs";

const router = Router();

// Update

router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJs.AES.encrypt(
        req.body.password,
        process.env.MY_SECRET
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can Only Update Your Account");
  }
});

// Delete

router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.password === req.params.id || req.user.isAdmin) {
    const id = req.user.id;

    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Not Your Account Dude...");
  }
});

// Get

router.get("/find/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);

    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    // console.log(error);
    res.status(500).json(error);
  }
});

// Get All

router.get("/", verifyToken, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(10)
        : await User.find();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not Authorized");
  }
});

// Get User Stats

router.get("/stats", verifyToken, async (req, res) => {
  const today = new Date();
  const lastYear = today.getFullYear(today.getFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
