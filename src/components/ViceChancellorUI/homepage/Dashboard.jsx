import React from "react";
import { useNavigate } from "react-router-dom";
import PendingApprovals from "./PendingApprovals";
import OnDutyOfficers from "./OnDutyOfficers";
import { useQuery } from "@tanstack/react-query";
import { apiRequestAxios } from '../../../utils/api';

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
  faUniversity,
  faFileArchive,
  faVideo,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FaUsers } from "react-icons/fa";

const chartData = [
  { name: "Present", value: 50, color: "#4CAF50" },
  { name: "Absent", value: 20, color: "#F44336" },
  { name: "On Duty", value: 67, color: "#A3C1E2" },
  { name: "On Leave", value: 30, color: "#FFC107" },
];

const services = [
  { name: "Attendance", path: "/attendance", icon: faUserCheck },
  { name: "Reports", path: "/reports", icon: faFileAlt },
  { name: "Track Leave", path: "/track-leave", icon: faPlaneDeparture },
  { name: "Announcements", path: "/announcements", icon: faBullhorn },
  { name: "Calender", path: "/holidays", icon: faCalendarAlt },
  { name: "Campus List", path: "/campus", icon: faUniversity },
  { name: "File Tracking", path: "/filetracking", icon: faFileArchive },
  { name: "Surveillance", path: "/surveillance", icon: faVideo },
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
  "bg-[#A3EEE7]",
];

const fetchTotalEmployees = async () => {
 
  const res = await apiRequestAxios({ url: 'http://134.209.144.96:8081/superadmin/all-users', method: 'GET' });
  return res.data.data.length;
};

const fetchTodaysAttendance = async () => {
  const res = await apiRequestAxios({ url: 'http://134.209.144.96:8081/superadmin/todays-attendance', method: 'GET' });
  return res.data.data.length;
};
const fetchLeavesApproved = async () => {
 
  const res = await apiRequestAxios({ url: 'http://134.209.144.96:8081/superadmin/get-leave-requests-history', method: 'GET' });
  return res.data.data.length;
};

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: totalEmployees, isLoading, isError } = useQuery({
    queryKey: ["totalEmployees"],
    queryFn: fetchTotalEmployees,
  });
  const { data: todaysAttendance } = useQuery({
    queryKey: ["todaysAttendance"],
    queryFn: fetchTodaysAttendance,
  });
  const { data: leavesApproved } = useQuery({
    queryKey: ["leavesApproved"],
    queryFn: fetchLeavesApproved,
  });

  const cardData = [
    isLoading ? "..." : isError ? "Nan" : totalEmployees,
    todaysAttendance,
    leavesApproved,
  ];

  return (
    <div className="space-y-4">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div 
          className="bg-white p-3 rounded-lg shadow flex flex-col items-center cursor-pointer"
          onClick={() => navigate('/employees')}
        >
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Total Employees</h3>
          <p className="text-2xl font-bold text-blue-600">{cardData[0]}</p>
        </div>
        {["Today's Attendance", "Leaves Approved"].map(
          (title, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-lg shadow flex flex-col items-center"
            >
              <h3 className="text-sm font-semibold text-gray-600 mb-1">
                {title}
              </h3>
              <p
                className={`text-2xl font-bold ${
                  index === 1
                    ? "text-green-600"
                    : index === 2
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {cardData[index + 1]}
              </p>
            </div>
          )
        )}
      </div>

      {/* Chart + Services */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Pie Chart */}
        <div className="bg-white p-3 rounded-lg shadow w-full lg:w-1/3">
          <h3 className="text-sm font-bold text-gray-700 mb-3 text-center">
            Employee Attendance
          </h3>
          <div className="w-full h-[200px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={60}
                  innerRadius={40}
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
          <div className="flex flex-wrap justify-center gap-2 mt-3 text-xs text-gray-700">
            {chartData.map((entry, index) => (
              <div key={index} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="bg-white p-3 rounded-lg shadow w-full lg:w-2/3">
          <h3 className="text-sm font-bold text-gray-700 mb-3">Services</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2">
            {services.map((service, index) => (
              <div
                key={index}
                className={`flex flex-col justify-center items-center cursor-pointer p-2 h-[80px] rounded-lg shadow hover:shadow-md transform transition-transform hover:scale-105 ${buttonColors[index]}`}
                onClick={() => navigate(service.path)}
              >
                <FontAwesomeIcon
                  icon={service.icon}
                  className="text-xl text-gray-800 mb-1"
                />
                <span className="text-xs text-gray-900 text-center">
                  {service.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Components */}
      <PendingApprovals />
      <OnDutyOfficers />
    </div>
  );
};

export default Dashboard;
