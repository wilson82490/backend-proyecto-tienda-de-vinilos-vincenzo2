import { Router } from "express";

import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

// prefijo: /api/movies

router.post("/", authMiddleware, adminMiddleware, createMovie);

router.get("/", getMovies);
router.get("/:id", getMovieById);

router.put("/:id", authMiddleware, adminMiddleware, updateMovie);
router.delete("/:id", authMiddleware, adminMiddleware, deleteMovie);

export default router;
