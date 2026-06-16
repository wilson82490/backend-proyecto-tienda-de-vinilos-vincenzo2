import { Router } from "express";

import {
  createVinilo,
  getVinilos,
  getViniloById,
  updateVinilo,
  deleteVinilo,
} from "../controllers/vinilo.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

// prefijo: /api/vinilos

router.post("/", authMiddleware, adminMiddleware, createVinilo);

router.get("/", getVinilos);
router.get("/:id", getViniloById);

router.put("/:id", authMiddleware, adminMiddleware, updateVinilo);
router.delete("/:id", authMiddleware, adminMiddleware, deleteVinilo);

export default router;
