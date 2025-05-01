// Roadmap.js - Improved course separation and layout
import React, { useState } from "react";
import { courses, academicRoadmap } from "../data";

const Roadmap = ({ completedCourses }) => {
  const [expandedSemester, setExpandedSemester] = useState(0);
  
  // Calculate progress metrics
  const totalProgramCredits = academicRoadmap.reduce((total, semester) => 
    total + (semester.totalCredits || 0), 0
  );
  
  const completedCredits = completedCourses
    .map(id => courses.find(c => c.id === id))
    .filter(Boolean)
    .reduce((total, course) => total + course.credits, 0);
  
  const percentageComplete = Math.round((completedCredits / totalProgramCredits) * 100);
  
  // Toggle semester expansion
  const toggleSemester = (index) => {
    setExpandedSemester(expandedSemester === index ? null : index);
  };
  
  return (
    <div className="p-6 max-w-6xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Academic Roadmap</h2>
	<div className="card mb-8">
        <div className="card-header bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
          <h3 className="text-xl font-bold mb-2">Degree Progress</h3>
          <p className="text-sm text-blue-100">Track your journey toward graduation</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-r border-gray-200 pr-6">
              <h4 className="text-gray-600 mb-2">Credits Completed</h4>
              <p className="text-2xl font-bold">{completedCredits} <span className="text-gray-500 text-lg font-normal">/ {totalProgramCredits}</span></p>
            </div>

            <div className="border-r border-gray-200 pr-6">
              <h4 className="text-gray-600 mb-2">Completion</h4>
              <p className="text-2xl font-bold">{percentageComplete}%</p>
              <div className="progress-bar mt-2">
                <div className={`progress-bar-fill ${percentageComplete === 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${percentageComplete}%` }}></div>
              </div>
            </div>

            <div>
              <h4 className="text-gray-600 mb-2">Expected Graduation</h4>
              <p className="text-2xl font-bold">May 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {academicRoadmap.map((semester, index) => {
          const completedSemesterCourses = semester.courses.filter(courseId => 
            completedCourses.includes(courseId)
          );

          const semesterProgress = Math.round((completedSemesterCourses.length / semester.courses.length) * 100);
          const isExpanded = expandedSemester === index;

          return (
            <div key={index} className="card shadow-sm hover:shadow-md transition-all duration-200">
              <div 
                className={`p-4 flex justify-between items-center cursor-pointer border-l-4 ${
                  semesterProgress === 100 
                    ? 'border-green-500' 
                    : semesterProgress > 0 
                    ? 'border-blue-500' 
                    : 'border-gray-300'
                }`}
                onClick={() => toggleSemester(index)}
              >
                <div>
                  <h3 className="text-lg font-semibold">{semester.semester}</h3>
                  <p className="text-sm text-gray-600">{semester.totalCredits} credits • {completedSemesterCourses.length}/{semester.courses.length} courses</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-20 bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        semesterProgress === 100 ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${semesterProgress}%` }}
                    ></div>
                  </div>

                  <div className="w-5 h-5 flex-shrink-0">
                    <svg
                      className={`w-full h-full transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 border-t">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prerequisites</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {semester.courses.map(courseId => {
                          const course = courses.find(c => c.id === courseId);
                          if (!course) return null;

                          const isCompleted = completedCourses.includes(courseId);
                          const prereqsMet = course.prerequisites.every(prereq => 
                            completedCourses.includes(prereq)
                          );

                          return (
                            <tr key={courseId} className="hover:bg-gray-50">
                              <td className="px-4 py-4">
                                <div className="font-medium">{course.id}</div>
                                <div className="text-sm text-gray-500">{course.name}</div>
                              </td>
                              <td className="px-4 py-4 text-sm">{course.credits}</td>
                              <td className="px-4 py-4 text-sm">
                                {course.prerequisites.length > 0 ? (
                                  <div className="flex flex-wrap gap-1">
                                    {course.prerequisites.map(prereqId => {
                                      const isPrereqCompleted = completedCourses.includes(prereqId);

                                      return (
                                        <span 
                                          key={prereqId}
                                          className={`inline-block px-2 py-1 text-xs rounded ${
                                            isPrereqCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                          }`}
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
                              <td className="px-4 py-4">
                                {isCompleted ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Completed
                                  </span>
                                ) : prereqsMet ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    Available
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
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
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;