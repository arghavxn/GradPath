import React, { useEffect, useState } from "react";
import { authFetch } from "../utils/api";

const AdvisorDashboard = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentDrafts, setCommentDrafts] = useState({});

  const fetchPlans = async () => {
    try {
      const res = await authFetch("/api/advisor/plans");

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to load advisor plans");
      }

      setPlans(data);
    } catch (error) {
      console.error("Error fetching advisor plans:", error);
      alert("Failed to load advisor plans.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleCommentChange = (planId, value) => {
    setCommentDrafts((prev) => ({
      ...prev,
      [planId]: value
    }));
  };

  const reviewPlan = async (planId, status) => {
    try {
      const res = await authFetch(`/api/advisor/plans/${planId}/review`, {
  	method: "PUT",
  	body: JSON.stringify({
   	 status,
    	 advisorComment: commentDrafts[planId] || ""
  	})
  });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to review plan");
      }

      await fetchPlans();
      alert(`Plan marked as ${status}.`);
    } catch (error) {
      console.error("Error reviewing plan:", error);
      alert("Failed to review plan.");
    }
  };

  if (loading) {
    return <div className="p-6">Loading advisor dashboard...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Advisor Dashboard</h2>

      {plans.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-gray-500">
          No student plans available yet.
        </div>
      ) : (
        <div className="space-y-6">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{plan.name}</h3>
                    <p className="text-sm text-gray-500">
                      Student: {plan.studentName} ({plan.studentEmail})
                    </p>
                    <p className="text-sm text-gray-500">Semester: {plan.semester}</p>
                  </div>

                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        plan.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : plan.status === "Changes Needed"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {plan.status || "Draft"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {(plan.courses || []).map((courseId) => (
                      <span
                        key={courseId}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                      >
                        {courseId}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Advisor Comment</h4>
                  <textarea
                    value={commentDrafts[plan.id] ?? plan.advisorComment ?? ""}
                    onChange={(e) => handleCommentChange(plan.id, e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Leave feedback for the student..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => reviewPlan(plan.id, "Approved")}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => reviewPlan(plan.id, "Changes Needed")}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    Request Changes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvisorDashboard;