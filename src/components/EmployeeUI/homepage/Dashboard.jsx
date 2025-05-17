import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequestAxios } from '../../../utils/api';
import { API_ENDPOINTS } from '../../../config/api.config';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileExcel,
  faFilePowerpoint,
} from "@fortawesome/free-solid-svg-icons";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const services = [
  { label: 'Attendance', icon: <AssignmentIndIcon fontSize="large" />, color: '#e3f0fa', path: '/attendance' },
  { label: 'Track Leaves', icon: <EventNoteIcon fontSize="large" />, color: '#f3e6fa', path: '/track-leaves' },
  { label: 'Announcements', icon: <AnnouncementIcon fontSize="large" />, color: '#fae3e3', path: '/announcements' },
  { label: 'Calendar', icon: <CalendarMonthIcon fontSize="large" />, color: '#faf7e3', path: '/calendar' },
  { label: 'On Duty', icon: <AccessTimeIcon fontSize="large" />, color: '#e3faf7', path: '/on-duty' },
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

// Sample announcement data (you can replace this with an API call if needed)
const announcements = [
  {
    facultyName: "Faculty name",
    designation: "Designation name",
    timestamp: "2d ago",
    title: "B.Tech admission open session 2024 - 25",
    description: "Lorem ipsum dolor sit amet, dummy dolor sit...",
    files: [
      { name: "File_can be....", icon: faFilePdf, color: "text-red-500" },
      { name: "File.can be....", icon: faFileExcel, color: "text-green-500" },
      { name: "+1", icon: null, color: "text-gray-500" },
      { name: "File.can be....", icon: faFilePowerpoint, color: "text-purple-500" },
    ],
  },
  // Add more announcement objects if needed
];

const fetchAttendanceStatus = async () => {
  const res = await apiRequestAxios({
    endpoint: API_ENDPOINTS.EMPLOYEE_ATTENDANCE_STATUS,
    method: 'GET'
  });
  return res.data;
};

const fetchLeaveBalance = async () => {
  const res = await apiRequestAxios({
    endpoint: API_ENDPOINTS.EMPLOYEE_LEAVE_BALANCE,
    method: 'GET'
  });
  return res.data;
};

const fetchPendingApprovals = async () => {
  const res = await apiRequestAxios({
    endpoint: API_ENDPOINTS.EMPLOYEE_PENDING_APPROVALS,
    method: 'GET'
  });
  return res.data;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [showReasonPopup, setShowReasonPopup] = useState(false);
  const [reason, setReason] = useState("");

  const { data: attendanceStatus, isLoading: attendanceLoading } = useQuery({
    queryKey: ["attendanceStatus"],
    queryFn: fetchAttendanceStatus,
  });

  const { data: leaveBalance, isLoading: leaveLoading } = useQuery({
    queryKey: ["leaveBalance"],
    queryFn: fetchLeaveBalance,
  });

  const { data: pendingApprovals, isLoading: approvalsLoading } = useQuery({
    queryKey: ["pendingApprovals"],
    queryFn: fetchPendingApprovals,
  });

  const handleToggleChange = () => {
    if (!isOnDuty) {
      // If turning ON "On Duty", show the reason popup
      setShowReasonPopup(true);
    } else {
      // If turning OFF "On Duty", just toggle without popup
      setIsOnDuty(false);
    }
  };

  const handleSave = () => {
    setIsOnDuty(true);
    setShowReasonPopup(false);
    // Here you would typically call an API to update the duty status
  };

  const handleCancel = () => {
    setShowReasonPopup(false);
    // Keep the duty status as it was
  };

  const cardData = [
    attendanceLoading ? "..." : attendanceStatus?.status || "Not Marked",
    leaveLoading ? "..." : leaveBalance?.balance || 0,
    approvalsLoading ? "..." : pendingApprovals?.length || 0,
  ];

  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen w-full mt-[-3rem]">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {["Today's Status", "Leave Balance", "Pending Approvals"].map(
          (title, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow flex flex-col items-center"
            >
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {title}
              </h3>
              <p
                className={`text-4xl font-bold ${index === 0
                    ? "text-green-600"
                    : index === 1
                      ? "text-blue-600"
                      : "text-orange-600"
                  }`}
              >
                {cardData[index]}
              </p>
            </div>
          )
        )}
      </div>

      {/* Attendance UI + Services */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10">
        {/* Attendance Status UI */}
        <div className="w-full lg:w-1/3 space-y-4">
          {/* On Duty Card */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-800">On Duty</h3>
                <p className="text-gray-600">Sat, 25 May, 2024</p>
                <div className="flex items-center mt-2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>Punch in 8:40 AM</span>
                </div>
              </div>
              <div className="relative inline-block w-14 h-7 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle"
                  className="absolute w-0 h-0 opacity-0"
                  checked={isOnDuty}
                  onChange={handleToggleChange}
                />
                <label
                  htmlFor="toggle"
                  className={`block overflow-hidden h-7 rounded-full ${isOnDuty ? 'bg-blue-600' : 'bg-gray-300'} cursor-pointer`}
                >
                  <span
                    className={`block h-7 w-7 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${isOnDuty ? 'translate-x-7' : 'translate-x-0'}`}
                  ></span>
                </label>
              </div>
            </div>
          </div>

          {/* Today's Attendance Card */}
          <div className="bg-white p-2 rounded-2xl shadow flex flex-row gap-5">
            <div className="flex justify-between  items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Your today's attendance</h3>
                <p className="text-gray-600">Sat, 25 May, 2024</p>
                <div className="flex items-center mt-2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>Punch in 8:30 AM</span>
                </div>
              </div>
              <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Present
              </span>
            </div>

            <div className="flex justify-between items-center">
              <button className="text-blue-500 font-semibold">Today</button>
              <div className="relative w-24 h-24">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="10"
                  />
                  {/* Progress circle - 4/8 = 50% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset="125.6"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xl font-bold">4/8</span>
                  <span className="text-sm text-gray-500">hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="bg-white p-6 rounded-2xl shadow w-full lg:w-2/3">
          <h3 className="text-xl font-bold text-gray-700 mb-6">Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={`flex flex-col justify-center items-center cursor-pointer p-4 h-[100px] rounded-xl shadow hover:shadow-lg transform transition-transform hover:scale-105 ${buttonColors[index]}`}
                onClick={() => navigate(service.path)}
              >
                {/* Render MUI icon directly */}
                <div className="mb-2">{service.icon}</div>
                <span className="text-sm text-gray-900 text-center">
                  {service.label}
                </span>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <h3 className="text-xl font-bold text-gray-700 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
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
          <h3 className="text-xl font-bold text-gray-700">Latest Announcements</h3>
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
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full" /> {/* Placeholder for faculty image */}
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {announcement.facultyName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {announcement.designation}
                    </p>
                  </div>
                </div>
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
                  <span className="text-blue-500 cursor-pointer hover:underline">
                    More
                  </span>
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {announcement.files.map((file, fileIndex) => (
                  <button
                    key={fileIndex}
                    className="flex items-center gap-2 px-3 py-1 border border-blue-300 rounded-full text-sm text-gray-700"
                  >
                    {file.icon && (
                      <FontAwesomeIcon
                        icon={file.icon}
                        className={`text-sm ${file.color}`}
                      />
                    )}
                    <span>{file.name}</span>
                  </button>
                ))}
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
                <button
                  className="bg-blue-500 text-white px-8 py-2 rounded-full font-medium"
                  onClick={handleSave}
                >
                  Save
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