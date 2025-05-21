import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const services = [
  {
    label: "Attendance",
    icon: <AssignmentIndIcon fontSize="large" />,
    color: "#e3f0fa",
    path: "/attendance",
  },
  {
    label: "Track Leaves",
    icon: <EventNoteIcon fontSize="large" />,
    color: "#f3e6fa",
    path: "/track-leaves",
  },
  {
    label: "Announcements",
    icon: <AnnouncementIcon fontSize="large" />,
    color: "#fae3e3",
    path: "/announcements",
  },
  {
    label: "Calendar",
    icon: <CalendarMonthIcon fontSize="large" />,
    color: "#faf7e3",
    path: "/calendar",
  },
  {
    label: "Leave Request",
    icon: <EventNoteIcon fontSize="large" />,
    color: "#f3e6fa",
    path: "/Leave-request",
  },
];

const buttonColors = [
  "bg-[#C4DAFA]",
  "bg-[#EFFBEA]",
  "bg-[#F1D9FC]",
  "bg-[#FBD5D7]",
  "bg-[#FBF5EA]",
  "bg-[#FBC4DF]",
  "bg-[#FCDFE0]",
  "bg-[#C6FFEB]",
];

const announcements = [
  {
    timestamp: "2d ago",
    title: " admission open session 2024 - 25",
    description: "Lorem ipsum dolor sit amet, dummy dolor sit",
  },
  // Add more announcement objects if needed
];

const Dashboard = () => {
  const navigate = useNavigate();

  const [showReasonPopup, setShowReasonPopup] = useState(false);
  const [reason, setReason] = useState("");

  const handleCancel = () => {
    setShowReasonPopup(false);
    // Keep the duty status as it was
  };

  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen w-full mt-[-3rem]">
      {/* Cards */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10 items-stretch">
        {/* Attendance Status UI */}
        <div className="w-full lg:w-1/3">
          {/* Today's Attendance Card */}
          <div className="bg-white rounded-2xl shadow flex flex-col justify-between p-8 h-full w-full gap-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">
                  Your Today's Attendance
                </h3>
                <p className="text-gray-500 text-sm">
                  {new Date().toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Present
              </span>
            </div>

            <div className="flex justify-between items-center mt-auto">
              <div className="flex flex-col">
                <button className="text-blue-500 font-semibold text-lg">
                  Today
                </button>
                <span className="text-sm text-gray-500 mt-1">
                  8 hours required
                </span>
              </div>

              <div className="relative w-36 h-36">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="10"
                  />

                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="skyblue"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset="125.6"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold">4/8</span>
                  <span className="text-sm text-gray-500">hours</span>
                  <span className="text-xs text-gray-400 mt-1">(50%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white p-6 rounded-2xl shadow w-full h-full">
            <h3 className="text-xl font-bold text-gray-700 mb-6">Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-center items-center cursor-pointer p-4 h-[100px] rounded-xl shadow hover:shadow-lg transform transition-transform hover:scale-105 ${buttonColors[index]}`}
                  onClick={() => navigate(service.path)}
                >
                  <div className="mb-2">{service.icon}</div>
                  <span className="text-sm text-gray-900 text-center">
                    {service.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <h3 className="text-xl font-bold text-gray-700 mb-6">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Leave request approved</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Announcements */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-700">
            Latest Announcements
          </h3>
          <button
            onClick={() => navigate("/announcements")}
            className="text-blue-500 font-semibold flex items-center gap-1 hover:underline"
          >
            See all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className="bg-blue-50 p-4 rounded-lg flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {announcement.timestamp}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  {announcement.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {announcement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <div className="w-2 h-2 bg-gray-300 rounded-full" />
            <div className="w-2 h-2 bg-gray-300 rounded-full" />
            <div className="w-2 h-2 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>

      {showReasonPopup && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Reason for Turning On Duty
                </label>
                <textarea
                  className="w-full h-40 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Write here..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <button
                  className="border border-blue-500 text-blue-500 px-6 py-2 rounded-full font-medium"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
