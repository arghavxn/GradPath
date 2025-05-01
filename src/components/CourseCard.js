// CourseCard.js - Draggable course card component
import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import CourseTooltip from "./CourseTooltip";

const CourseCard = ({ course, index, isOffered, isSelected, onDetailsClick }) => {
  return (
    <Draggable 
      key={course.id} 
      draggableId={course.id} 
      index={index}
      isDragDisabled={!isOffered || isSelected}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-3 p-3 rounded-md border transition-all duration-200 ${
            !isOffered 
              ? 'bg-gray-100 border-gray-200 opacity-75 cursor-not-allowed' 
              : isSelected
                ? 'bg-blue-50 border-blue-200 opacity-75'
                : snapshot.isDragging
                  ? 'bg-blue-50 border-blue-300 shadow-md scale-105'
                  : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm hover:translate-y-[-2px]'
          }`}
        >
          <div className="flex justify-between">
            <div>
              <div 
                className="font-medium text-gray-900 cursor-pointer hover:text-blue-700"
                onClick={(e) => onDetailsClick(course.id, e)}
              >
                {course.name}
              </div>
              <div className="text-sm text-gray-600 flex items-center">
                <CourseTooltip courseId={course.id}>
                  <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs mr-2 cursor-help">
                    {course.id}
                  </span>
                </CourseTooltip>
                <span>{course.credits} credits</span>
              </div>
              
              {course.prerequisites.length > 0 && (
                <div className="mt-2">
                  <div className="text-xs text-gray-500 mb-1">Prerequisites:</div>
                  <div className="flex flex-wrap gap-1">
                    {course.prerequisites.map(prereqId => (
                      <CourseTooltip key={prereqId} courseId={prereqId}>
                        <span className="inline-block px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded cursor-help">
                          {prereqId}
                        </span>
                      </CourseTooltip>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-xs font-medium">
              {isOffered ? (
                <span className="inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Offered
                </span>
              ) : (
                <span className="inline-flex items-center bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Not offered
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default CourseCard;