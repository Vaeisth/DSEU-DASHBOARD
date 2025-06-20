import { useNavigate } from "react-router-dom";
import PendingApprovals from "./PendingApprovals";
import OnDutyOfficers from "./OnDutyOfficers";
import { useQuery } from "@tanstack/react-query";
import { apiRequestAxios } from "../../../utils/api";
import { API_ENDPOINTS } from "../../../config/api.config";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { fetchPendingLeaves } from "../../../utils/apiservice";
import { buttonColors, services } from "./HomePageConstant";

const fetchAttendanceReport = async () => {
  const res = await apiRequestAxios({
    endpoint: API_ENDPOINTS.ATTENDANCE_REPORT,
    method: "GET",
  });
  return res.data.report;
};

const fetchTotalEmployees = async () => {
  const res = await apiRequestAxios({
    endpoint: API_ENDPOINTS.ALL_USERS,
    method: "GET",
  });
  return res.data.data.length;
};

const fetchTodaysAttendance = async () => {
  const res = await apiRequestAxios({
    endpoint: API_ENDPOINTS.TODAYS_ATTENDANCE,
    method: "GET",
  });
  return res.data.data.length;
};

const fetchLeavesApproved = async () => {
  try {
    const res = await apiRequestAxios({
      endpoint: API_ENDPOINTS.LEAVE_REQUESTS_HISTORY,
      method: "GET",
    });
    const allLeaves = res.data.data || [];
    const approvedLeaves = allLeaves.filter(
      (leave) => leave.status === "Approved"
    );
    return approvedLeaves.length;
  } catch (error) {
    console.error("Error fetching approved leaves:", error);
    return 0;
  }
};

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: AttendanceReport } = useQuery({
    queryKey: ["AttendanceReport"],
    queryFn: fetchAttendanceReport,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: totalEmployees,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["totalEmployees"],
    queryFn: fetchTotalEmployees,
    staleTime: 5 * 60 * 1000,
  });

  const { data: todaysAttendance } = useQuery({
    queryKey: ["todaysAttendance"],
    queryFn: fetchTodaysAttendance,
    staleTime: 5 * 60 * 1000,
  });

  const { data: leavesApproved } = useQuery({
    queryKey: ["leavesApproved"],
    queryFn: fetchLeavesApproved,
    staleTime: 5 * 60 * 1000,
  });

  const chartData = [
    { name: "Present", value: AttendanceReport?.present, color: "#4CAF50" },
    { name: "Absent", value: AttendanceReport?.absent, color: "#F44336" },
    { name: "On Duty", value: AttendanceReport?.on_duty, color: "#A3C1E2" },
  ];

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
          onClick={() => navigate("/employees")}
        >
          <h3 className="text-sm font-semibold text-gray-600 mb-1">
            Total Employees
          </h3>
          <p className="text-2xl font-bold text-blue-600">{cardData[0]}</p>
        </div>
        {["Today's Attendance", "Leaves Approved"].map((title, index) => (
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
        ))}
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
      <PendingApprovals queryFn={fetchPendingLeaves} />
      <OnDutyOfficers />
    </div>
  );
};

export default Dashboard;
