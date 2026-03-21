import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import planRoutes from "./routes/planRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import advisorRoutes from "./routes/advisorRoutes.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GradPath backend is running.");
});

app.use("/api/progress", progressRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/advisor", advisorRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});