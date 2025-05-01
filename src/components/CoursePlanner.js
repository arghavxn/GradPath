// CoursePlanner.js - Fixed version with proper weekly schedule and correct syntax
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { courses, courseOfferings } from "../data";
import CourseTooltip from "./CourseTooltip";
import CourseDetailModal from "./CourseDetailModal";
import WeeklySchedule from "./WeeklySchedule";
import CourseCard from "./CourseCard";

const CoursePlanner = ({ completedCourses, onScheduleSave }) => {
  // State variables
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("Fall 2025");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [totalCredits, setTotalCredits] = useState(0);
  const [savedSchedules, setSavedSchedules] = useState(() => {
    const saved = localStorage.getItem('savedSchedules');
    return saved ? JSON.parse(saved) : {};
  });
  const [scheduleName, setScheduleName] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  
  // Course detail modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  
  const MAX_CREDITS = 18;
  const timesOverlap = (startA, endA, startB, endB) => {
  return startA < endB && startB < endA;
};

const parseTime = (time) => {
  const [start, end] = time.split(" - ");
  const toHour = (t) => {
    const [h, m, meridian] = t.match(/(\d+):(\d+)\s*(am|pm)/i).slice(1);
    let hour = parseInt(h), min = parseInt(m);
    if (meridian.toLowerCase() === "pm" && hour !== 12) hour += 12;
    if (meridian.toLowerCase() === "am" && hour === 12) hour = 0;
    return hour + min / 60;
  };
  return [toHour(start), toHour(end)];
};

const checkTimeConflict = (newCourseId, newSection, currentSchedule) => {
  const newDays = newSection.days;
  const [newStart, newEnd] = parseTime(newSection.time);

  for (const [courseId, section] of Object.entries(currentSchedule)) {
    if (!section || courseId === newCourseId) continue;

    const existingDays = section.days;
    const [existStart, existEnd] = parseTime(section.time);

    for (const day of [...newDays]) {
      if (existingDays.includes(day)) {
        if (timesOverlap(newStart, newEnd, existStart, existEnd)) {
          return true;
        }
      }
    }
  }

  return false;
};

  
  // Function to open the course details modal
  const openCourseDetails = (courseId, e) => {
    // Prevent triggering draggable events
    if (e) {
      e.stopPropagation();
    }
    setSelectedCourseId(courseId);
    setModalOpen(true);
  };
  
  // Filter available courses based on prerequisites and completed courses
  useEffect(() => {
    const filtered = courses.filter(course => {
      return !completedCourses.includes(course.id) && 
             course.prerequisites.every(prereq => completedCourses.includes(prereq));
    });
    setAvailableCourses(filtered);
    
    // Load any existing schedule for the selected semester
    loadScheduleForSemester(selectedSemester);
  }, [completedCourses, selectedSemester]);
  
  // Check if a course is offered in the selected semester
  const isCourseOffered = (courseId) => {
    const courseData = courseOfferings[courseId];
    if (!courseData) return true; // Assume offered if we have no data
    const semester = selectedSemester.split(" ")[0];
    return courseData.semesters.includes(semester);
  };
  
  // Get course sections for a course
  const getCourseSections = (courseId) => {
    const courseData = courseOfferings[courseId];
    if (!courseData) return [];
    
    return courseData.sections || [];
  };
  
  // Handle drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    const courseId = result.draggableId;
    const course = courses.find(c => c.id === courseId);
    
    if (!course) return;
    
    // Only add course if it's being dragged from available to selected
    if (source.droppableId === "available-courses" && destination.droppableId === "selected-courses") {
      // Check if course is already selected
      if (selectedCourses.includes(courseId)) {
        alert("This course is already in your schedule.");
        return;
      }
      
      // Check credit limit
      const newCredits = totalCredits + course.credits;
      if (newCredits > MAX_CREDITS) {
        alert(`Adding this course would exceed the maximum of ${MAX_CREDITS} credits for the semester.`);
        return;
      }
      
      // Add to selected courses
      setSelectedCourses([...selectedCourses, courseId]);
      setTotalCredits(newCredits);
      
     const sections = getCourseSections(courseId);
if (sections.length > 0) {
  const defaultSection = sections[0];

  if (checkTimeConflict(courseId, defaultSection, schedule)) {
    alert(`Time conflict detected when adding ${course.name}. Please choose another section or course.`);
    return;
  }

  setSchedule({
    ...schedule,
    [courseId]: defaultSection
  });
}

    }
  };
  
  // Remove course from selection
  const removeCourse = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    setTotalCredits(totalCredits - course.credits);
    
    // Remove from schedule
    const newSchedule = { ...schedule };
    delete newSchedule[courseId];
    setSchedule(newSchedule);
  };
  
  // Save the current schedule
  const saveSchedule = () => {
    if (selectedCourses.length === 0) {
      alert("Please add courses to your schedule before saving.");
      return;
    }
    
    if (!scheduleName.trim()) {
      alert("Please enter a name for your schedule.");
      return;
    }
    
    // Create a new schedule object
    const newSchedule = {
      name: scheduleName,
      semester: selectedSemester,
      courses: selectedCourses,
      sections: schedule,
      totalCredits,
      timestamp: new Date().toISOString()
    };
    
    // Update saved schedules
    const updatedSchedules = {
      ...savedSchedules,
      [scheduleName]: newSchedule
    };
    
    // Save to state and localStorage
    setSavedSchedules(updatedSchedules);
    localStorage.setItem('savedSchedules', JSON.stringify(updatedSchedules));
    
    // Show success message
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    
    // If onScheduleSave prop exists, call it
    if (onScheduleSave) {
      onScheduleSave(updatedSchedules);
    }
  };
  
  // Delete a saved schedule
  const deleteSchedule = (scheduleName) => {
    setDeleteConfirm(scheduleName);
  };
  
  // Confirm deletion of a schedule
  const confirmDeleteSchedule = () => {
    const updatedSchedules = { ...savedSchedules };
    delete updatedSchedules[deleteConfirm];
    
    // Update state and localStorage
    setSavedSchedules(updatedSchedules);
    localStorage.setItem('savedSchedules', JSON.stringify(updatedSchedules));
    
    // Clear confirmation
    setDeleteConfirm("");
    
    // If onScheduleSave prop exists, call it
    if (onScheduleSave) {
      onScheduleSave(updatedSchedules);
    }
  };
  
  // Cancel deletion
  const cancelDeleteSchedule = () => {
    setDeleteConfirm("");
  };
  
  // Load a saved schedule
  const loadSchedule = (scheduleName) => {
    const savedSchedule = savedSchedules[scheduleName];
    if (!savedSchedule) return;
    
    setSelectedSemester(savedSchedule.semester);
    setSelectedCourses(savedSchedule.courses);
    setSchedule(savedSchedule.sections);
    setTotalCredits(savedSchedule.totalCredits);
    setScheduleName(savedSchedule.name);
  };
  
  // Load schedule for selected semester
  const loadScheduleForSemester = (semester) => {
    // Find a saved schedule for this semester
    const schedulesForSemester = Object.values(savedSchedules).filter(
      schedule => schedule.semester === semester
    );
    
    if (schedulesForSemester.length > 0) {
      // Load the most recent schedule for this semester
      const mostRecent = schedulesForSemester.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      )[0];
      
      setSelectedCourses(mostRecent.courses);
      setSchedule(mostRecent.sections);
      setTotalCredits(mostRecent.totalCredits);
      setScheduleName(mostRecent.name);
    } else {
      // Reset the planner if no saved schedule exists
      setSelectedCourses([]);
      setSchedule({});
      setTotalCredits(0);
      setScheduleName("");
    }
  };
  
  // Update selected section for a course
  const updateCourseSection = (courseId, sectionId) => {
    const courseData = courseOfferings[courseId];
    if (!courseData) return;
    
    const section = courseData.sections.find(section => section.id === sectionId);
    if (!section) return;
    
    setSchedule({
      ...schedule,
      [courseId]: section
    });
  };
  
  return (
    <div className="p-6 max-w-6xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Course Planner</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Semester Selector */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Semester</label>
          <select 
            value={selectedSemester} 
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Fall 2025">Fall 2025</option>
            <option value="Spring 2026">Spring 2026</option>
            <option value="Fall 2026">Fall 2026</option>
            <option value="Spring 2027">Spring 2027</option>
          </select>
        </div>
        
        {/* Credit Counter */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Credits</label>
          <div className="flex items-center">
            <span className={`text-2xl font-bold ${totalCredits > MAX_CREDITS ? 'text-red-600' : 'text-gray-900'}`}>
              {totalCredits}
            </span>
            <span className="text-gray-500 mx-1">/</span>
            <span className="text-gray-500">{MAX_CREDITS}</span>
          </div>
          <div className="progress-bar mt-2">
            <div 
              className={`progress-bar-fill ${totalCredits > MAX_CREDITS ? 'bg-red-600' : 'bg-blue-600'}`}
              style={{ width: `${Math.min(totalCredits / MAX_CREDITS * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">

        {/* Available Courses */}
        <div className="card">
          <div className="card-header bg-blue-50 border-b border-blue-100">
            <h3 className="text-lg font-semibold text-blue-700">Available Courses</h3>
            <p className="text-sm text-blue-600">Drag courses to add to your schedule</p>
          </div>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="available-courses">
              {(provided) => (
                <div 
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                  className="p-4 min-h-[400px] max-h-[600px] overflow-y-auto"
                >
                  {availableCourses.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No available courses for this semester</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {availableCourses.map((course, index) => {
                        const isOffered = isCourseOffered(course.id);
                        const isSelected = selectedCourses.includes(course.id);
                        
                        return (
                          <CourseCard 
                            key={course.id}
                            course={course} 
                            index={index}
                            isOffered={isOffered}
                            isSelected={isSelected}
                            onDetailsClick={openCourseDetails}
                          />
                        );
                      })}
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            
            {/* Selected Courses & Schedule */}
            <div className="lg:col-span-2">
              {/* Save Schedule Form */}
              <div className="card mb-6">
                <div className="card-header bg-green-50 border-b border-green-100">
                  <h3 className="text-lg font-semibold text-green-700">Schedule Management</h3>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Name</label>
                      <input
                        type="text"
                        value={scheduleName}
                        onChange={(e) => setScheduleName(e.target.value)}
                        placeholder="Enter a name for your schedule"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <button 
                        onClick={saveSchedule}
                        className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        disabled={selectedCourses.length === 0 || !scheduleName.trim()}
                      >
                        Save Schedule
                      </button>
                    </div>
                  </div>
                  
                  {saveSuccess && (
                    <div className="mt-3 p-2 rounded-md bg-green-100 text-green-800 text-sm">
                      Schedule saved successfully!
                    </div>
                  )}
                  
                  {/* Saved Schedules */}
                  {Object.keys(savedSchedules).length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Your Saved Schedules</h4>
                      <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md divide-y">
                        {Object.values(savedSchedules).map((saved) => (
                          <div 
                            key={saved.name} 
                            className="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                          >
                            <div onClick={() => loadSchedule(saved.name)}>
                              <div className="font-medium">{saved.name}</div>
                              <div className="text-xs text-gray-500">
                                {saved.semester} • {saved.courses.length} courses • {saved.totalCredits} credits
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 border border-blue-200 rounded"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  loadSchedule(saved.name);
                                }}
                              >
                                Load
                              </button>
                              <button 
                                className="text-red-600 hover:text-red-800 text-sm px-2 py-1 border border-red-200 rounded"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteSchedule(saved.name);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Delete confirmation */}
                      {deleteConfirm && (
                        <div className="mt-3 p-3 border border-red-200 rounded-md bg-red-50">
                          <p className="text-sm text-red-800 mb-2">
                            Are you sure you want to delete "{deleteConfirm}"?
                          </p>
                          <div className="flex justify-end space-x-2">
                            <button
                              className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                              onClick={cancelDeleteSchedule}
                            >
                              Cancel
                            </button>
                            <button
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              onClick={confirmDeleteSchedule}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="card mb-6">
                <div className="card-header bg-blue-50 border-b border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-700">Selected Courses</h3>
                </div>
                
                <Droppable droppableId="selected-courses">
                  {(provided) => (
                    <div 
                      ref={provided.innerRef} 
                      {...provided.droppableProps}
                      className="p-4 min-h-[200px] border-2 border-dashed border-gray-300 rounded-md m-4"
                      style={{ background: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      {selectedCourses.length === 0 ? (
                        <div className="text-center py-8">
                          <div className="text-gray-400 mb-2">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <p className="text-gray-500">Drag courses here to build your schedule</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedCourses.map((courseId, index) => {
                            const course = courses.find(c => c.id === courseId);
                            if (!course) return null;
                          
                            const section = schedule[courseId];
                            const courseData = courseOfferings[courseId] || {};
                            const sections = courseData.sections || [];
                            
                            return (
                              <div key={courseId} className="flex justify-between items-start p-4 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm">
                                <div className="flex-1">
                                  {/* Course name with click handler */}
                                  <div 
                                    className="font-medium text-lg cursor-pointer hover:text-blue-700"
                                    onClick={() => openCourseDetails(courseId)}
                                  >
                                    {course.name}
                                  </div>
                                  
                                  {/* Course ID with tooltip */}
                                  <div className="flex items-center mt-1">
                                    <CourseTooltip courseId={course.id}>
                                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs mr-2 cursor-help">
                                        {course.id}
                                      </span>
                                    </CourseTooltip>
                                    <span className="text-sm text-gray-600">{course.credits} credits</span>
                                  </div>
                                  
                                  {/* Section selection */}
                                  {sections.length > 0 && (
                                    <div className="mt-2">
                                      <label className="block text-xs text-gray-500 mb-1">Section:</label>
                                      <select 
                                        value={section?.id || ''}
                                        onChange={(e) => updateCourseSection(courseId, e.target.value)}
                                        className="block w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                      >
                                        {sections.map(s => (
                                          <option key={s.id} value={s.id}>
                                            {s.id} - {s.days} {s.time || 'Online'} - {s.instructor || 'TBA'}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  )}
                                  
                                  {section && (
                                    <div className="mt-2 p-2 bg-gray-50 rounded-md text-sm">
                                      <div className="flex items-center text-gray-700 mb-1">
                                        <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {section.days ? `${section.days} ${section.time}` : 'Online'}
                                      </div>
                                      
                                      <div className="flex items-center text-gray-700">
                                        <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {section.location || 'TBA'}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                
                                <button 
                                  onClick={() => removeCourse(courseId)}
                                  className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                                  aria-label="Remove course"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
              
              {/* Weekly Schedule Visual */}
              <WeeklySchedule 
                selectedCourses={selectedCourses}
                schedule={schedule}
              />
            </div>
          </DragDropContext>
        </div>
      </div>
      
      {/* Course Detail Modal */}
      <CourseDetailModal
        courseId={selectedCourseId}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default CoursePlanner;