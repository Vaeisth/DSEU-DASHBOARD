import React, { useState } from "react";
import { FaTimes, FaCalendarAlt, FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ScheduleDrawer = ({ onClose }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState({ hour: 9, minute: 41, period: "AM" });

  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateSelect = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    setIsCalendarOpen(false);
  };

  const handleTimeSelect = (hour, minute, period) => {
    setSelectedTime({ hour, minute, period });
    setIsTimePickerOpen(false);
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white p-5 rounded-t-2xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Schedule</h2>
        <button onClick={onClose}>
          <FaTimes size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Date Input */}
      <div className="mt-4">
        <p className="text-gray-600">Date</p>
        <div className="flex items-center border border-gray-300 p-2 rounded-lg mt-1 cursor-pointer" onClick={() => setIsCalendarOpen(true)}>
          <span className="flex-1 text-gray-800">
            {selectedDate.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
          </span>
          <FaCalendarAlt className="text-gray-500" />
        </div>
      </div>

      {/* Time Input */}
      <div className="mt-4">
        <p className="text-gray-600">Time</p>
        <div className="flex items-center border border-gray-300 p-2 rounded-lg mt-1 cursor-pointer" onClick={() => setIsTimePickerOpen(true)}>
          <span className="flex-1 text-gray-800">{`${selectedTime.hour}:${selectedTime.minute} ${selectedTime.period}`}</span>
          <FaClock className="text-gray-500" />
        </div>
      </div>

      {/* Schedule Button */}
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6">Schedule</button>

      {/* Calendar Modal */}
      {isCalendarOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg w-80 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 text-center">Select a day</h2>

            {/* Month & Year Navigation */}
            <div className="flex justify-between items-center mt-4">
              <button onClick={handlePrevMonth} className="p-2 bg-gray-200 rounded-full">
                <FaChevronLeft />
              </button>
              <p className="text-lg font-semibold">{`${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</p>
              <button onClick={handleNextMonth} className="p-2 bg-gray-200 rounded-full">
                <FaChevronRight />
              </button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 text-center text-gray-500 font-semibold mt-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="p-2">{day}</div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 text-center">
              {Array(firstDayOfMonth).fill(null).map((_, i) => (
                <div key={i} className="p-2 text-gray-300"></div>
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  className={`p-2 rounded-lg ${
                    selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth()
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button onClick={() => setIsCalendarOpen(false)} className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg">
                Cancel
              </button>
              <button onClick={() => setIsCalendarOpen(false)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time Picker Modal */}
      {isTimePickerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg w-72">
            <h2 className="text-lg font-semibold text-gray-800">Select time</h2>

            <div className="flex justify-center space-x-4 mt-4">
              {/* Hour Selector */}
              <select className="border p-2 rounded-lg" value={selectedTime.hour} onChange={(e) => handleTimeSelect(e.target.value, selectedTime.minute, selectedTime.period)}>
                {[...Array(12).keys()].map((hour) => (
                  <option key={hour + 1} value={hour + 1}>{hour + 1}</option>
                ))}
              </select>

              {/* Minute Selector */}
              <select className="border p-2 rounded-lg" value={selectedTime.minute} onChange={(e) => handleTimeSelect(selectedTime.hour, e.target.value, selectedTime.period)}>
                {[...Array(60).keys()].map((minute) => (
                  <option key={minute} value={minute < 10 ? `0${minute}` : minute}>
                    {minute < 10 ? `0${minute}` : minute}
                  </option>
                ))}
              </select>

              {/* AM/PM Selector */}
              <select className="border p-2 rounded-lg" value={selectedTime.period} onChange={(e) => handleTimeSelect(selectedTime.hour, selectedTime.minute, e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button onClick={() => setIsTimePickerOpen(false)} className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg">
                Cancel
              </button>
              <button onClick={() => setIsTimePickerOpen(false)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleDrawer;
