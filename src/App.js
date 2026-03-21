import React, { useState, useEffect } from "react";
import Roadmap from "./components/Roadmap";
import CoursePlanner from "./components/CoursePlanner";
import ProgressPage from "./components/ProgressPage";
import { students } from "./data";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import AdvisorDashboard from "./pages/AdvisorDashboard";

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activePage, setActivePage] = useState("roadmap");
  const [savedSchedules, setSavedSchedules] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("savedSchedules");
    if (saved) {
      setSavedSchedules(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setSelectedStudent(null);
      return;
    }

    if (user.role === "student") {
      const fallbackStudent =
        students.find((s) => s.id === "C001") || students[0] || null;
      setSelectedStudent(fallbackStudent);
      setActivePage("roadmap");
    } else if (user.role === "advisor") {
      setSelectedStudent(null);
      setActivePage("advisor");
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setSelectedStudent(null);
  };

  const handleScheduleSave = (updatedSchedules) => {
    setSavedSchedules(updatedSchedules);
  };

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  if (user.role === "student" && !selectedStudent) {
    return <div className="p-6">Loading student profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <svg
                className="w-8 h-8 mr-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l6.16-3.422A12.083 12.083 0 0118 16.5c0 1.105-2.686 2-6 2s-6-.895-6-2c0-1.61-.056-3.156-.16-4.922L12 14z"
                />
              </svg>
              <h1 className="text-3xl font-bold text-white">GradPath</h1>
            </div>
            <p className="text-blue-100 ml-11">Welcome, {user.name}</p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {user.role === "student" && (
              <>
                <button
                  onClick={() => setActivePage("roadmap")}
                  className={`px-3 py-5 text-sm font-medium border-b-2 focus:outline-none transition-colors ${
                    activePage === "roadmap"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Academic Roadmap
                  </div>
                </button>

                <button
                  onClick={() => setActivePage("planner")}
                  className={`px-3 py-5 text-sm font-medium border-b-2 focus:outline-none transition-colors ${
                    activePage === "planner"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Course Planner
                  </div>
                </button>

                <button
                  onClick={() => setActivePage("progress")}
                  className={`px-3 py-5 text-sm font-medium border-b-2 focus:outline-none transition-colors ${
                    activePage === "progress"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Progress
                  </div>
                </button>
              </>
            )}

            {user.role === "advisor" && (
              <button
                onClick={() => setActivePage("advisor")}
                className={`px-3 py-5 text-sm font-medium border-b-2 focus:outline-none transition-colors ${
                  activePage === "advisor"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2a4 4 0 014-4h6m-6 0l3-3m-3 3l3 3M7 7h10M7 11h4m-4 4h2M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  Advisor Dashboard
                </div>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-12 pt-4">
        {user.role === "advisor" ? (
          <AdvisorDashboard />
        ) : activePage === "roadmap" ? (
          <Roadmap completedCourses={selectedStudent.completedCourses} />
        ) : activePage === "planner" ? (
          <CoursePlanner
            completedCourses={selectedStudent.completedCourses}
            onScheduleSave={handleScheduleSave}
          />
        ) : (
          <ProgressPage
            completedCourses={selectedStudent.completedCourses}
            gpa={selectedStudent.gpa}
            graduationDate={selectedStudent.graduationDate}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold text-blue-600">GradPath</h3>
              <p className="text-sm text-gray-500 mt-2">
                Your personal academic planning assistant
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:gap-16">
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-3">
                  Resources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.mvsu.edu/sites/default/files/2024_2025_academic_calendar.pdf"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Academic Calendar
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.mvsu.edu/sites/default/files/computerscience-academicmap-2021-2023-a.pdf"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Academic Map
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.mvsu.edu/Mathematics-Computer-and-Information-Sciences-Syllabus-List"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Course Syllabi
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2025 GradPath - Student Academic Planning Tool
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;