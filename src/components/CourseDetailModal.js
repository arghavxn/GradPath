// CourseDetailModal.js - Improved styling and consistency with other components
import React from "react";
import { courses, courseOfferings, courseDescriptions } from "../data";

const CourseDetailModal = ({ courseId, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  const course = courses.find(c => c.id === courseId);
  if (!course) return null;

  // Get course description and offerings
  const description = courseDescriptions[courseId] || `No description available for ${course.name}.`;
  const offeringData = courseOfferings[courseId] || { semesters: [], sections: [] };
  
  // Find prerequisite courses
  const prereqCourses = course.prerequisites
    .map(id => courses.find(c => c.id === id))
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          {/* Header */}
          <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{course.name}</h3>
                <p className="mt-1 text-sm text-blue-100">{course.id} • {course.credits} Credits</p>
              </div>
              <button
                onClick={onClose}
                className="bg-blue-700 rounded-md text-gray-200 hover:text-white focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 space-y-4">
            {/* Description */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="text-sm font-medium text-blue-700 uppercase mb-2">Description</h4>
              <p className="text-gray-700">{description}</p>
            </div>
            
            {/* Prerequisites */}
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <h4 className="text-sm font-medium text-amber-700 uppercase mb-2">Prerequisites</h4>
              
              {prereqCourses.length > 0 ? (
                <div className="space-y-2">
                  {prereqCourses.map(prereq => (
                    <div key={prereq.id} className="flex items-center bg-white p-2 rounded-md shadow-sm">
                      <span className="inline-flex items-center justify-center bg-amber-100 text-amber-800 rounded text-xs font-medium px-2 py-1">
                        {prereq.id}
                      </span>
                      <span className="ml-3 text-sm text-gray-700">{prereq.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="bg-white p-2 rounded-md shadow-sm text-sm text-gray-500">None</p>
              )}
            </div>
            
            {/* Sections */}
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
              <h4 className="text-sm font-medium text-emerald-700 uppercase mb-2">Available Sections</h4>
              
              {offeringData.sections && offeringData.sections.length > 0 ? (
                <div className="overflow-hidden rounded-md border bg-white shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Section</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Schedule</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instructor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {offeringData.sections.map(section => (
                        <tr key={section.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{section.id}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {section.days ? `${section.days} ${section.time}` : 'Online'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">{section.location || 'TBA'}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{section.instructor || 'TBA'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="bg-white p-2 rounded-md shadow-sm text-sm text-gray-500">
                  No sections available for this course.
                </p>
              )}
            </div>
            
            {/* Offering Pattern */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h4 className="text-sm font-medium text-purple-700 uppercase mb-2">Typically Offered</h4>
              
              <div className="bg-white p-2 rounded-md shadow-sm">
                {offeringData.semesters && offeringData.semesters.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {offeringData.semesters.map(term => (
                      <span key={term} className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                        {term}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No offering information available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailModal;