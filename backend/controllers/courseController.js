import { mockCourses } from "../data/mockCourses.js";

export const getAllCourses = (req, res) => {
  try {
    res.json(mockCourses);
  } catch (error) {
    console.error("Error getting courses:", error);
    res.status(500).json({ error: "Failed to load courses" });
  }
};