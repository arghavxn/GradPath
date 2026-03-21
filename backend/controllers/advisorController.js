import { pool } from "../config/db.js";

export const getAllStudentPlans = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        plans.id,
        plans.name,
        plans.semester,
        plans.courses,
        plans.sections,
        plans.total_credits,
        plans.timestamp,
        plans.status,
        plans.advisor_comment,
        users.id AS user_id,
        users.name AS student_name,
        users.email AS student_email
      FROM plans
      JOIN users ON plans.user_id = users.id
      WHERE users.role = 'student'
      ORDER BY plans.timestamp DESC
      `
    );

    const plans = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      semester: row.semester,
      courses: row.courses,
      sections: row.sections,
      totalCredits: row.total_credits,
      timestamp: row.timestamp,
      status: row.status,
      advisorComment: row.advisor_comment,
      userId: row.user_id,
      studentName: row.student_name,
      studentEmail: row.student_email
    }));

    res.json(plans);
  } catch (error) {
    console.error("Error getting advisor plans:", error);
    res.status(500).json({ error: "Failed to load student plans" });
  }
};

export const reviewStudentPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, advisorComment } = req.body;

    if (!status || !["Approved", "Changes Needed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const result = await pool.query(
      `
      UPDATE plans
      SET status = $1, advisor_comment = $2
      WHERE id = $3
      RETURNING *
      `,
      [status, advisorComment || null, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Plan not found" });
    }

    res.json({
      message: "Plan reviewed successfully",
      plan: result.rows[0]
    });
  } catch (error) {
    console.error("Error reviewing plan:", error);
    res.status(500).json({ error: "Failed to review plan" });
  }
};