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
  { name: "Announcements", icon: VectorIcon, path: "/announcements" }, // ✅ Updated VectorIcon to navigate to Announcements
  { name: "Holidays", icon: HolidayIcon, path: "/holidays" },
  { name: "Campus List", icon: BuildingIcon, path: "/campus" },
  { name: "File Tracking", icon: FiletrackingIcon, path: "/filetracking" },
  { name: "Surveillance", icon: SurveilanceIcon, path: "/surveillance" },
  { name: "Inventory", icon: InventoryIcon, path: "/inventory" }
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Employee Attendance Dashboard</h2>

      {/* Employee Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Employees</h3>
          <p className="text-3xl font-bold text-blue-600">150</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Today’s Attendance</h3>
          <p className="text-3xl font-bold text-green-600">120</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Leaves Approved</h3>
          <p className="text-3xl font-bold text-red-600">30</p>
        </div>
      </div>

      {/* Attendance Chart & Services Section */}
      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">Employee Attendance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={data} dataKey="value" outerRadius={90}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Services Section */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <div className="grid grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer p-4 transition duration-300 hover:scale-105"
                onClick={() => navigate(service.path)}
              >
                <img src={service.icon} alt={service.name} />
                <h3 className="text-sm font-semibold mt-2">{service.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Approvals Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Pending Approvals</h3>
          <a href="#" className="text-blue-500 text-sm font-medium">See all &gt;</a>
        </div>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="min-w-[250px] bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
               <button className="focus:outline-none">
                        <img
                          src={profile}
                          alt="Profile"
                          className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                        />
                      </button>
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
