export const requireAdvisorRole = (req, res, next) => {
  if (req.user.role !== "advisor") {
    return res.status(403).json({ error: "Advisor access required" });
  }

  next();
};