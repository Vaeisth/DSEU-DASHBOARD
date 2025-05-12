import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequestAxios } from '../../../utils/api';
import { API_ENDPOINTS } from '../../../config/api.config';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCheck,
  faFileAlt,
  faPlaneDeparture,
  faBullhorn,
  faCalendarAlt,
  faFileArchive,
  faVideo,
  faBoxOpen,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const chartData = [
  { name: "Present", value: 20, color: "#4CAF50" },
  { name: "Absent", value: 5, color: "#F44336" },
  { name: "On Duty", value: 2, color: "#A3C1E2" },
  { name: "On Leave", value: 3, color: "#FFC107" },
];

const services = [
  { name: "Mark Attendance", path: "/mark-attendance", icon: faUserCheck },
  { name: "Apply Leave", path: "/apply-leave", icon: faPlaneDeparture },
  { name: "Leave Status", path: "/leave-status", icon: faClock },
  { name: "Announcements", path: "/announcements", icon: faBullhorn },
  { name: "Holidays", path: "/holidays", icon: faCalendarAlt },
  { name: "File Tracking", path: "/filetracking", icon: faFileArchive },
  { name: "Reports", path: "/reports", icon: faFileAlt },
  { name: "Inventory", path: "/inventory", icon: faBoxOpen },
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
                className={`text-4xl font-bold ${
                  index === 0
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

      {/* Chart + Services */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow w-full lg:w-1/3">
          <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">
            Monthly Attendance
          </h3>
          <div className="w-full h-[250px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={80}
                  innerRadius={50}
                  paddingAngle={5}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-700">
            {chartData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span>{entry.name}</span>
              </div>
            ))}
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
                <FontAwesomeIcon
                  icon={service.icon}
                  className="text-2xl text-gray-800 mb-1"
                />
                <span className="text-sm text-gray-900 text-center">
                  {service.name}
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
    </div>
  );
};

export default Dashboard; 