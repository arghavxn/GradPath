import { mockTranscript } from "../data/mockTranscript.js";
import { mockCourses } from "../data/mockCourses.js";
import { courseCategories } from "../data/courseCategories.js";

export const getProgressData = (req, res) => {
  try {
    const completedCourses = mockTranscript.completedCourses;

    const totalProgramCredits = mockCourses.reduce(
      (total, course) => total + course.credits,
      0
    );

    const completedCourseObjects = completedCourses
      .map((id) => mockCourses.find((course) => course.id === id))
      .filter(Boolean);

    const completedCredits = completedCourseObjects.reduce(
      (total, course) => total + course.credits,
      0
    );

    const percentageComplete =
      totalProgramCredits > 0
        ? Math.round((completedCredits / totalProgramCredits) * 100)
        : 0;

    const remainingCourses = mockCourses.filter(
      (course) => !completedCourses.includes(course.id)
    );

    const hasPrerequisitesMet = (course) => {
      return course.prerequisites.every((prereq) =>
        completedCourses.includes(prereq)
      );
    };

    const nextAvailableCourses = remainingCourses
      .filter(hasPrerequisitesMet)
      .slice(0, 6);

    const categoryProgress = Object.entries(courseCategories).map(
      ([category, courseIds]) => {
        const total = courseIds.length;
        const completed = courseIds.filter((id) =>
          completedCourses.includes(id)
        ).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        return {
          category,
          completed,
          total,
          percentage
        };
      }
    );

    res.json({
      studentId: mockTranscript.studentId,
      studentName: mockTranscript.studentName,
      currentSemester: mockTranscript.currentSemester,
      gpa: mockTranscript.gpa,
      graduationDate: mockTranscript.graduationDate,
      completedCourses,
      completedCredits,
      totalProgramCredits,
      percentageComplete,
      remainingCourses,
      nextAvailableCourses,
      categoryProgress
    });
  } catch (error) {
    console.error("Error getting progress data:", error);
    res.status(500).json({ error: "Failed to load progress data" });
  }
};