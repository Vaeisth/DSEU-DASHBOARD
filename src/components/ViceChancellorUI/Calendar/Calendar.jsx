import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { fetchHolidays } from "../../../utils/apiservice";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const {
    data: holidays,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["holidays"],
    queryFn: fetchHolidays,
  });

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const isHoliday = (date) => {
    if (!holidays) return false;
    const dateStr = date.toISOString().split("T")[0];
    return holidays.some((holiday) => holiday.date === dateStr);
  };

  const getHolidayName = (date) => {
    if (!holidays) return "";
    const dateStr = date.toISOString().split("T")[0];
    const holiday = holidays.find((h) => h.date === dateStr);
    return holiday ? holiday.holiday : "";
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600">Loading calendar information...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Failed to Load Calendar
          </h3>
          <p className="text-gray-600">
            Please try again later or contact support if the problem persists.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[95%] mx-auto px-4">
        {/* Calendar Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaCalendarAlt className="mr-3 text-blue-500 text-4xl" />
              Academic Calendar
            </h2>
            <div className="flex items-center space-x-6">
              <button
                onClick={prevMonth}
                className="p-3 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaChevronLeft className="text-gray-600 text-xl" />
              </button>
              <span className="text-2xl font-semibold text-gray-800">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button
                onClick={nextMonth}
                className="p-3 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaChevronRight className="text-gray-600 text-xl" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center py-3 font-semibold text-gray-600 text-lg"
              >
                {day}
              </div>
            ))}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                index + 1
              );
              const isHolidayDay = isHoliday(date);
              const holidayName = getHolidayName(date);

              return (
                <div
                  key={index}
                  className={`aspect-square p-4 relative group ${
                    isHolidayDay
                      ? "bg-red-50 border-2 border-red-200"
                      : "hover:bg-gray-50"
                  } rounded-xl transition-colors`}
                >
                  <span className="text-gray-800 text-lg">{index + 1}</span>
                  {isHolidayDay && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-red-50 rounded-xl">
                      <span className="text-base text-red-600 font-medium text-center px-2">
                        {holidayName}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Holiday List */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Upcoming Holidays
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {holidays?.map((holiday) => (
              <div
                key={holiday._id}
                className="flex items-center p-6 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-lg mb-2">
                    {holiday.holiday}
                  </h4>
                  <p className="text-gray-600">
                    {new Date(holiday.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
