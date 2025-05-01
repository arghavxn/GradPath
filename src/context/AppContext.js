// src/context/AppContext.js
import React, { createContext, useState, useContext } from "react";
// Create a context for app-wide state management
const AppContext = createContext();
// Hook to use context easily in components
export const useAppContext = () => useContext(AppContext);
export const AppProvider = ({ children }) => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("Fall 2025");
  return (
    <AppContext.Provider value={{ completedCourses, setCompletedCourses, selectedSemester, setSelectedSemester }}>
      {children}
    </AppContext.Provider>
  );
};