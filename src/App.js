// App.js - Updated to remove theme selection from login page
import React, { useState, useEffect } from "react";
import Roadmap from "./components/Roadmap";
import CoursePlanner from "./components/CoursePlanner";
import ProgressPage from "./components/ProgressPage";
import { students } from "./data";
import "./index.css";

const App = () => {
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activePage, setActivePage] = useState("roadmap");
  const [savedSchedules, setSavedSchedules] = useState({});
  
  // Load saved schedules from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedSchedules');
    if (saved) {
      setSavedSchedules(JSON.parse(saved));
    }
    
    // Check if user was previously logged in
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const storedStudentID = localStorage.getItem('studentID');
    
    if (loggedInStatus === 'true' && storedStudentID) {
      const student = students.find(s => s.id === storedStudentID);
      if (student) {
        setIsLoggedIn(true);
        setSelectedStudent(student);
        setStudentID(storedStudentID);
      }
    }
  }, []);
  
  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const student = students.find(student => student.id === studentID);
    if (student && password === "password123") {
      setIsLoggedIn(true);
      setSelectedStudent(student);
      
      // Save login state to localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('studentID', studentID);
    } else {
      alert("Invalid credentials. Try using ID: C001 and password: password123");
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedStudent(null);
    
    // Clear login state from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('studentID');
  };
  
  // Handle schedule save
  const handleScheduleSave = (updatedSchedules) => {
    setSavedSchedules(updatedSchedules);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-blue-700 mb-2">Degree Navigator</h1>
              <div className="h-1 w-24 mx-auto bg-blue-600 rounded-full mb-4"></div>
              <p className="mt-2 text-gray-600">Plan your academic journey with confidence</p>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105">
              <div className="h-2 bg-blue-600"></div>
              <div className="px-8 py-10">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Welcome Back</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="studentID">
                      Student ID
                    </label>
                    <input
                      id="studentID"
                      type="text"
                      placeholder="Enter your student ID"
                      value={studentID}
                      onChange={(e) => setStudentID(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                      required
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                    >
                      Log In
                    </button>
                  </div>
                </form>
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p className="py-2 px-3 bg-gray-50 rounded-md">Demo credentials: ID: C001, Password: password123</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">© 2025 Degree Navigator • All rights reserved</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Header */}
          <header className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white">Degree Navigator</h1>
                <p className="text-blue-100">Welcome, {selectedStudent.name}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
                <button
                  onClick={() => setActivePage("roadmap")}
                  className={`px-3 py-5 text-sm font-medium border-b-2 focus:outline-none transition-colors ${
                    activePage === "roadmap"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
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
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Progress
                  </div>
                </button>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="pb-12 pt-4">
            {activePage === "roadmap" ? (
              <Roadmap
                completedCourses={selectedStudent.completedCourses}
              />
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
                  <h3 className="text-xl font-bold text-blue-600">Degree Navigator</h3>
                  <p className="text-sm text-gray-500 mt-2">Your personal academic planning assistant</p>
                </div>
                
                <div className="grid grid-cols-2 gap-8 md:gap-16">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Resources</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href="https://www.mvsu.edu/sites/default/files/2024_2025_academic_calendar.pdf" className="text-gray-500 hover:text-gray-700">Academic Calendar</a></li>
                      <li><a href="https://www.mvsu.edu/sites/default/files/computerscience-academicmap-2021-2023-a.pdf" className="text-gray-500 hover:text-gray-700">Academic Map</a></li>
                      <li><a href="https://www.mvsu.edu/Mathematics-Computer-and-Information-Sciences-Syllabus-List" className="text-gray-500 hover:text-gray-700">Course Syllabi</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-8 pt-8 text-center">
                <p className="text-sm text-gray-500">
                  © 2025 Degree Navigator - Student Academic Planning Tool
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;
