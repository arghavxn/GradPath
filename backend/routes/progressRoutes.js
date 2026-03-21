import express from "express";
import { getProgressData } from "../controllers/progressController.js";

const router = express.Router();

router.get("/", getProgressData);

export default router;