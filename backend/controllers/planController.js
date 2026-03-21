import { pool } from "../config/db.js";

export const getAllPlans = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      "SELECT * FROM plans WHERE user_id = $1 ORDER BY timestamp DESC",
      [userId]
    );

    const plans = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      semester: row.semester,
      courses: row.courses,
      sections: row.sections,
      totalCredits: row.total_credits,
      timestamp: row.timestamp,
      userId: row.user_id,
      status: row.status,
      advisorComment: row.advisor_comment
    }));

    res.json(plans);
  } catch (error) {
    console.error("Error getting plans:", error);
    res.status(500).json({ error: "Failed to load plans" });
  }
};

export const savePlan = async (req, res) => {
  try {
    const userId = req.user.userId;
    const newPlan = req.body;

    if (!newPlan?.name || !newPlan?.semester || !newPlan?.courses) {
      return res.status(400).json({ error: "Missing required plan fields" });
    }

    await pool.query(
      `
      INSERT INTO plans (user_id, name, semester, courses, sections, total_credits, timestamp, status, advisor_comment)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'Draft', NULL)
      ON CONFLICT (user_id, name)
      DO UPDATE SET
        semester = EXCLUDED.semester,
        courses = EXCLUDED.courses,
        sections = EXCLUDED.sections,
        total_credits = EXCLUDED.total_credits,
        timestamp = EXCLUDED.timestamp,
        status = 'Draft',
        advisor_comment = NULL
      `,
      [
        userId,
        newPlan.name,
        newPlan.semester,
        JSON.stringify(newPlan.courses),
        JSON.stringify(newPlan.sections),
        newPlan.totalCredits,
        newPlan.timestamp
      ]
    );

    const result = await pool.query(
      "SELECT * FROM plans WHERE user_id = $1 ORDER BY timestamp DESC",
      [userId]
    );

    const plans = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      semester: row.semester,
      courses: row.courses,
      sections: row.sections,
      totalCredits: row.total_credits,
      timestamp: row.timestamp,
      userId: row.user_id,
      status: row.status,
      advisorComment: row.advisor_comment
    }));

    res.status(201).json({
      message: "Plan saved successfully",
      plans
    });
  } catch (error) {
    console.error("Error saving plan:", error);
    res.status(500).json({ error: "Failed to save plan" });
  }
};

export const deletePlan = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name } = req.params;

    const deleteResult = await pool.query(
      "DELETE FROM plans WHERE user_id = $1 AND name = $2 RETURNING *",
      [userId, name]
    );

    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ error: "Plan not found" });
    }

    const result = await pool.query(
      "SELECT * FROM plans WHERE user_id = $1 ORDER BY timestamp DESC",
      [userId]
    );

    const plans = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      semester: row.semester,
      courses: row.courses,
      sections: row.sections,
      totalCredits: row.total_credits,
      timestamp: row.timestamp,
      userId: row.user_id,
      status: row.status,
      advisorComment: row.advisor_comment
    }));

    res.json({
      message: "Plan deleted successfully",
      plans
    });
  } catch (error) {
    console.error("Error deleting plan:", error);
    res.status(500).json({ error: "Failed to delete plan" });
  }
};