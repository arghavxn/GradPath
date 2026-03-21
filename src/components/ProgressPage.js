import React, { useState, useEffect } from "react";
import { courses, academicRoadmap, courseCategories } from "../data";
import AIAssistantPanel from "./AIAssistantPanel";

const ProgressPage = ({ completedCourses, gpa = 3.7, graduationDate = "May 2026" }) => {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [backendData, setBackendData] = useState(null);

useEffect(() => {
  fetch("http://localhost:5000/api/progress")
    .then(res => res.json())
    .then(data => {
      console.log("Backend data:", data);
      setBackendData(data);
    })
    .catch(err => console.error(err));
}, []);
  
  // Calculate progress metrics
  const totalProgramCredits = courses.reduce((total, course) => total + course.credits, 0);

  const completedCredits = completedCourses
    .map(id => courses.find(c => c.id === id))
    .filter(Boolean)
    .reduce((total, course) => total + course.credits, 0);

  const percentageComplete = Math.round((completedCredits / totalProgramCredits) * 100);

  // Calculate category completion percentages
  const categoryProgress = Object.entries(courseCategories).map(([category, courseIds]) => {
    const totalInCategory = courseIds.length;
    const completedInCategory = courseIds.filter(id => completedCourses.includes(id)).length;
    const percentage = totalInCategory > 0 ? Math.round((completedInCategory / totalInCategory) * 100) : 0;
    
if (!backendData) {
  return <div className="p-6">Loading...</div>;
}
    return {
      category,
      completed: completedInCategory,
      total: totalInCategory,
      percentage
    };
  });

  // Get remaining courses
  const remainingCourseIds = courses
    .filter(course => !completedCourses.includes(course.id))
    .map(course => course.id);

  const remainingCourses = remainingCourseIds
    .map(id => courses.find(c => c.id === id))
    .filter(Boolean);

  // Check prerequisites
  const hasPrerequisitesMet = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return true;
    
    return course.prerequisites.every(prereq => completedCourses.includes(prereq));
  };

  // Get next available courses
  const nextAvailableCourses = remainingCourses
    .filter(course => hasPrerequisitesMet(course.id))
    .slice(0, 6);

  // Get displayed remaining courses
  const displayedRemainingCourses = showAllCourses 
    ? remainingCourses 
    : remainingCourses.slice(0, 10);

  // Custom color for progress bars and elements
  const getColorClass = (percentage) => {
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Academic Progress</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card hover:shadow-md transition-all">
          <div className="card-header bg-blue-50 border-b border-blue-100">
            <h3 className="text-lg font-bold text-blue-700">Overall Progress</h3>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Completion</span>
                <span className="font-medium">{percentageComplete}%</span>
              </div>
              <div className="progress-bar">
                <div className={`progress-bar-fill ${getColorClass(percentageComplete)}`} style={{ width: `${percentageComplete}%` }}></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Credits Completed</span>
                <span className="font-medium">{completedCredits}/{totalProgramCredits}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Credits Remaining</span>
                <span className="font-medium">{totalProgramCredits - completedCredits}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Graduation</span>
                <span className="font-medium">{graduationDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card hover:shadow-md transition-all">
          <div className="card-header bg-green-50 border-b border-green-100">
            <h3 className="text-lg font-bold text-green-700">Academic Standing</h3>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="text-5xl font-bold text-green-600 mr-4">{gpa.toFixed(2)}</div>
              <div>
                <div className="font-medium">Current GPA</div>
                <div className="text-sm text-green-600">Excellent</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="progress-bar">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(gpa / 4) * 100}%` }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0.0</span>
                <span>1.0</span>
                <span>2.0</span>
                <span>3.0</span>
                <span>4.0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card hover:shadow-md transition-all">
          <div className="card-header bg-indigo-50 border-b border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-700">Course Completion</h3>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {categoryProgress.map(category => (
                <div key={category.category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">{category.category}</span>
                    <span className="font-medium">{category.completed}/{category.total}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className={`progress-bar-fill ${getColorClass(category.percentage)}`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AIAssistantPanel
        completedCourses={completedCourses}
        gpa={gpa}
        graduationDate={graduationDate}
        nextAvailableCourses={nextAvailableCourses}
        remainingCourses={remainingCourses}
        categoryProgress={categoryProgress}
      />
      <div className="card mb-8 hover:shadow-md transition-all">
        <div className="card-header bg-purple-50 border-b border-purple-100">
          <h3 className="text-xl font-bold text-purple-700">Recommended Next Courses</h3>
          <p className="text-sm text-purple-600">Courses available to take based on your completed prerequisites</p>
        </div>

        <div className="p-6">
          {nextAvailableCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nextAvailableCourses.map(course => (
                <div 
                  key={course.id} 
                  className="border border-gray-200 rounded-md p-4 hover:border-purple-300 hover:shadow-sm transition-all bg-white"
                >
                  <div className="font-medium text-gray-900">{course.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{course.id} • {course.credits} credits</div>

                  {course.prerequisites.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Prerequisites met:</div>
                      <div className="flex flex-wrap gap-1">
                        {course.prerequisites.map(prereqId => (
                          <span key={prereqId} className="status-badge status-badge-success">
                            {prereqId}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-2 text-gray-500">All available courses completed! Check back next semester.</p>
            </div>
          )}
        </div>
      </div>

      <div className="card overflow-hidden hover:shadow-md transition-all">
        <div className="card-header bg-blue-50 border-b border-blue-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-blue-700">Remaining Requirements</h3>
          <span className="text-sm text-blue-600">{remainingCourses.length} courses remaining</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prerequisites</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedRemainingCourses.map(course => {
                const prereqsMet = hasPrerequisitesMet(course.id);

                return (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{course.id}</div>
                      <div className="text-sm text-gray-500">{course.name}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {course.credits}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {course.prerequisites.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {course.prerequisites.map(prereqId => {
                            const isCompleted = completedCourses.includes(prereqId);
                            return (
                              <span 
                                key={prereqId} 
                                className={`status-badge ${isCompleted ? 'status-badge-success' : 'status-badge-warning'}`}
                              >
                                {prereqId}
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {prereqsMet ? (
                        <span className="status-badge status-badge-info flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                          </svg>
                          Available
                        </span>
                      ) : (
                        <span className="status-badge status-badge-warning flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Prerequisites Needed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {remainingCourses.length > 10 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
            <button 
              onClick={() => setShowAllCourses(!showAllCourses)} 
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              {showAllCourses ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Show Less
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  View all {remainingCourses.length} remaining courses
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;