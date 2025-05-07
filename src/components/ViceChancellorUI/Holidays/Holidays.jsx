import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./tailwind-calendar.css"; 

const holidays2025 = [
  { name: "New Year’s Day", date: "2025-01-01" },
  { name: "Lohri", date: "2025-01-13" },
  { name: "Makar Sankranti", date: "2025-01-14" },
  { name: "Republic Day", date: "2025-01-26" },
  { name: "Basant Panchami", date: "2025-02-04" },
  { name: "Shivaji Jayanti", date: "2025-02-19" },
  { name: "Maha Shivratri", date: "2025-03-01" },
  { name: "Holi", date: "2025-03-14" },
  { name: "Good Friday", date: "2025-03-29" },
  { name: "Ram Navmi", date: "2025-04-06" },
  { name: "Mahavir Jayanti", date: "2025-04-10" },
  { name: "Id-ul-Fitr", date: "2025-04-11" },
  { name: "Buddha Purnima", date: "2025-05-08" },
  { name: "Bakrid / Eid al-Adha", date: "2025-06-07" },
  { name: "Muharram", date: "2025-07-27" },
  { name: "Independence Day", date: "2025-08-15" },
  { name: "Raksha Bandhan", date: "2025-08-18" },
  { name: "Janmashtami", date: "2025-08-26" },
  { name: "Ganesh Chaturthi", date: "2025-09-08" },
  { name: "Gandhi Jayanti", date: "2025-10-02" },
  { name: "Dussehra", date: "2025-10-03" },
  { name: "Diwali", date: "2025-11-21" },
  { name: "Guru Nanak Jayanti", date: "2025-11-27" },
  { name: "Christmas Day", date: "2025-12-25" },
];

const Holidays = () => {
  const [date, setDate] = useState(new Date());

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];
      const holiday = holidays2025.find((h) => h.date === formattedDate);
      return holiday ? (
        <div className="text-[10px] text-red-500 text-center font-semibold mt-1">
          {holiday.name}
        </div>
      ) : null;
    }
    return null;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Holiday Calendar 2025</h2>
      <p className="text-center text-gray-600 mb-8">Hover on a date to see holiday info</p>

      <div className="flex justify-center">
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={tileContent}
          className="REACT-CALENDAR w-full max-w-4xl rounded-lg overflow-hidden shadow-lg bg-white"
        />
      </div>
    </div>
  );
};

export default Holidays;
