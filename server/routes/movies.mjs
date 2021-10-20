import { Router } from "express";
import Movie from "../models/Movies.mjs";
import verifyToken from "../verifyToken.mjs";

const router = Router();

// Create

router.post("/create", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);

    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are Not Authorized");
  }
});

// Update

router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are Not Authorized");
  }
});

// Delete

router.delete("/find/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The Movie Has Been Deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are Not Authorized");
  }
});

// Get Movie

router.get("/movie", verifyToken, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Random Movie

router.get("/random", verifyToken, async (req, res) => {
  try {
    const movie = Movie.findById(req, id, params);

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});
export default router;
