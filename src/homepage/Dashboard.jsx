import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import HolidayIcon from "../assets/icons/Holiday.png";
import ReportsIcon from "../assets/icons/Reports.png";
import BuildingIcon from "../assets/icons/Building.png";
import VectorIcon from "../assets/icons/Vector.png";
import AttendanceIcon from "../assets/icons/Attendance.png";
import TrackleaveIcon from "../assets/icons/Trackleave.png";
import FiletrackingIcon from "../assets/icons/Filetracking.png";
import SurveilanceIcon from "../assets/icons/Surveilance.png";
import InventoryIcon from "../assets/icons/Inventory.png";
import profile from "../assets/logo/profile.png";

const data = [
  { name: "Present", value: 50, color: "#4CAF50" },
  { name: "Absent", value: 20, color: "#F44336" },
  { name: "On Duty", value: 67, color: "#A3C1E2" },
  { name: "On Leave", value: 30, color: "#FFC107" },
];

const services = [
  { name: "Attendance", icon: AttendanceIcon, path: "/attendance" },
  { name: "Reports", icon: ReportsIcon, path: "/reports" },
  { name: "Track Leave", icon: TrackleaveIcon, path: "/track-leave" },
  { name: "Announcements", icon: VectorIcon, path: "/announcements" },
  { name: "Holidays", icon: HolidayIcon, path: "/holidays" },
  { name: "Campus List", icon: BuildingIcon, path: "/campus" },
  { name: "File Tracking", icon: FiletrackingIcon, path: "/filetracking" },
  { name: "Surveillance", icon: SurveilanceIcon, path: "/surveillance" },
  { name: "Inventory", icon: InventoryIcon, path: "/inventory" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen ml-64">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Employee Attendance Dashboard
      </h2>

      {/* Employee Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Total Employees', 'Today’s Attendance', 'Leaves Approved'].map((title, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <p className={`text-4xl font-bold ${index === 1 ? 'text-green-600' : index === 2 ? 'text-red-600' : 'text-blue-600'}`}>{[150, 120, 30][index]}</p>
          </div>
        ))}
      </div>

      {/* Attendance Chart & Services Section */}
      <div className="mt-8 flex flex-col md:flex-row gap-8 ">
        {/* Employee Attendance Chart */}
        <div className="flex flex-col items-center w-full md:w-1/3 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
            Employee Attendance
          </h3>
          <ResponsiveContainer width="90%" height={210}>
            <PieChart>
              <Pie data={data} dataKey="value" outerRadius={80}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
      
                <div className="flex flex-col gap-2 mt-4 text-sm text-gray-700">
            {data.map((entry, index) => (
              <span key={index} className="flex items-center gap-2">
                <div className={`rounded-full w-4 h-4`} style={{ backgroundColor: entry.color }}></div>
                <p>{entry.name}</p>
              </span>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Services</h3>
          <div className="grid grid-cols-3 gap-5">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition-transform transform hover:scale-105"
                onClick={() => navigate(service.path)}
              >
                <img src={service.icon} alt={service.name} className="w-12 h-12" />
                <h3 className="text-sm font-semibold mt-2 text-gray-700">{service.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Approvals Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Pending Approvals</h3>
          <a href="#" className="text-blue-500 text-sm font-medium hover:underline">
            See all &gt;
          </a>
        </div>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="min-w-[250px] bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
              <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">Name</p>
                <p className="text-xs text-gray-500">Organization Name</p>
                <p className="text-xs text-gray-400">2 days ago</p>
              </div>
              <button className="text-blue-500 text-sm font-medium">⋯</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
