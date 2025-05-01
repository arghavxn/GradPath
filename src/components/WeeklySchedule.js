import React from "react";
import { courses } from "../data";

const WeeklySchedule = ({ selectedCourses, schedule }) => {
  const timeToHours = (timeString) => {
    const match = timeString.match(/(\d+):(\d+)\s*(am|pm)/i);
    if (!match) return null;
    let [_, h, m, period] = match;
    h = parseInt(h);
    m = parseInt(m);
    if (period.toLowerCase() === "pm" && h !== 12) h += 12;
    if (period.toLowerCase() === "am" && h === 12) h = 0;
    return h + m / 60;
  };

  const parseTimeRange = (timeRange) => {
    const [start, end] = timeRange.split(" - ");
    return {
      start: timeToHours(start),
      end: timeToHours(end),
    };
  };

  const parseDays = (str) => {
    const map = { M: "Monday", T: "Tuesday", W: "Wednesday", R: "Thursday", F: "Friday" };
    return [...str].map((d) => map[d]);
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = Array.from({ length: 12 }, (_, i) => 8 + i); // 8 AM to 8 PM

  const events = [];
  selectedCourses.forEach((id) => {
    const course = courses.find((c) => c.id === id);
    const section = schedule[id];
    if (course && section) {
      const days = parseDays(section.days);
      const { start, end } = parseTimeRange(section.time);
      days.forEach((day) => {
        events.push({ ...course, day, start, end, location: section.location });
      });
    }
  });

  return (
    <div className="overflow-x-auto p-4">
      <div className="grid grid-cols-6 gap-px bg-gray-300 min-w-[900px]">
        <div className="bg-white"></div>
        {days.map((day) => (
          <div key={day} className="text-center font-semibold bg-gray-100 py-2">
            {day}
          </div>
        ))}
        {times.map((hour) => (
          <React.Fragment key={hour}>
            <div className="text-sm text-right pr-2 bg-gray-50 py-2 h-20">
              {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? "PM" : "AM"}
            </div>
            {days.map((day) => {
              const courseHere = events.find(
                (e) =>
                  e.day === day &&
                  Math.floor(e.start) === hour
              );
              return (
                <div key={`${day}-${hour}`} className="relative h-20 bg-white border">
                  {courseHere && (
                    <div
                      className="absolute left-1 right-1 top-1 p-1 text-xs rounded bg-blue-200 text-blue-800 shadow-md"
                      style={{
                        height: `${(courseHere.end - courseHere.start) * 5}rem`,
                      }}
                    >
                      <div className="font-bold truncate">{courseHere.name}</div>
                      <div className="truncate">{courseHere.id}</div>
                      <div className="truncate">{courseHere.location}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;
