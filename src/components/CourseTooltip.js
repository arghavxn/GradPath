// CourseTooltip.js - Simple component for showing course descriptions on hover
import React, { useState } from "react";
import { courseDescriptions } from "../data";

const CourseTooltip = ({ courseId, children }) => {
  const [show, setShow] = useState(false);
  const description = courseDescriptions[courseId] || "No description available";
  
  return (
    <div
      className="inline-block relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute z-50 w-72 p-3 bg-white rounded-md shadow-lg border border-gray-200 text-sm text-gray-700 left-0 top-full mt-1">
          <div className="font-medium text-blue-700 mb-1">{courseId}</div>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default CourseTooltip;