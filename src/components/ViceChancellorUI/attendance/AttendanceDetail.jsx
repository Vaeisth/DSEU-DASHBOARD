import React from "react";
import { useNavigate } from "react-router-dom";

const AttendanceDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-2 text-xl">&#8592;</button>
        <h1 className="text-xl font-semibold">Attendance</h1>
      </div>

      {/* Employee Info */}
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
        <img src="https://i.pravatar.cc/50" alt="User" className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h2 className="text-lg font-semibold">Name</h2>
          <p className="text-sm text-gray-500">Occupation Name</p>
          <p className="text-sm text-gray-500">Campus name</p>
        </div>
      </div>

      {/* Attendance List */}
      <div className="mt-4">
        {["Fri 17", "Thu 16", "Wed 15", "Mon 13", "Sun 12", "Sat 11", "Fri 10", "Thu 09"].map((date, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-2">
            <p className="text-sm text-gray-500">{date}</p>
            <div className="flex justify-between items-center">
              <p className={`font-semibold ${index % 2 === 0 ? 'text-green-600' : 'text-red-600'}`}>
                {index % 2 === 0 ? "Present" : "Absent"}
              </p>
              <span className={`px-3 py-1 text-xs font-medium ${index % 2 === 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-full`}>{
                index % 2 === 0 ? "75%" : "0%"
              }</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceDetail;
