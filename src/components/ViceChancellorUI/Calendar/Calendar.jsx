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
    staleTime: 10 * 60 * 1000,
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
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
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

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600 text-sm">Loading calendar...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm max-w-md">
          <div className="text-red-500 text-4xl mb-3">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Failed to Load Calendar</h3>
          <p className="text-gray-600 text-sm">Please try again later or contact support.</p>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaCalendarAlt className="mr-2 text-blue-500 text-3xl" />
              Calendar
            </h2>
            <div className="flex items-center space-x-4">
              <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full">
                <FaChevronLeft className="text-gray-600 text-lg" />
              </button>
              <span className="text-lg font-semibold text-gray-800">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
                <FaChevronRight className="text-gray-600 text-lg" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-sm">
            {weekDays.map((day) => (
              <div key={day} className="text-center py-2 font-semibold text-gray-600">
                {day}
              </div>
            ))}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);
              const isHolidayDay = isHoliday(date);
              const holidayName = getHolidayName(date);

              return (
                <div
                  key={index}
                  className={`aspect-square p-2 relative group rounded-lg transition-colors
                    ${isToday(date) ? "bg-blue-100 border border-blue-300" : ""}
                    ${isHolidayDay ? "bg-red-50 border border-red-200" : "hover:bg-gray-50"}
                  `}
                >
                  <span className="text-gray-800">{index + 1}</span>

                  {isToday(date) && (
                    <span className="absolute top-1 right-1 text-[10px] px-1 py-0.5 bg-blue-600 text-white rounded-full">
                      Today
                    </span>
                  )}

                  {isHolidayDay && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-red-50 rounded-lg">
                      <span className="text-xs text-red-600 font-medium text-center px-1">
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
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Holidays</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {holidays?.map((holiday) => (
              <div
                key={holiday._id}
                className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <h4 className="font-medium text-gray-800 text-base mb-1">
                  {holiday.holiday}
                </h4>
                <p className="text-gray-600 text-sm">
                  {new Date(holiday.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

