import express from "express";
import { getAllStudentPlans, reviewStudentPlan } from "../controllers/advisorController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { requireAdvisorRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/plans", authenticateToken, requireAdvisorRole, getAllStudentPlans);
router.put("/plans/:id/review", authenticateToken, requireAdvisorRole, reviewStudentPlan);

export default router;