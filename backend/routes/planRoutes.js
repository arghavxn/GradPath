import express from "express";
import { getAllPlans, savePlan, deletePlan } from "../controllers/planController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getAllPlans);
router.post("/", authenticateToken, savePlan);
router.delete("/:name", authenticateToken, deletePlan);

export default router;