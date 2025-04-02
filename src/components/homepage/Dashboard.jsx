import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUserCheck, faFileAlt, faPlaneDeparture, 
  faBullhorn, faCalendarAlt, faUniversity, 
  faFileArchive, faVideo, faBoxOpen 
} from "@fortawesome/free-solid-svg-icons";

const data = [
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
  { name: "Holidays", path: "/holidays", icon: faCalendarAlt },
  { name: "Campus List", path: "/campus", icon: faUniversity },
  { name: "File Tracking", path: "/filetracking", icon: faFileArchive },
  { name: "Surveillance", path: "/surveillance", icon: faVideo },
  { name: "Inventory", path: "/inventory", icon: faBoxOpen },
];


const buttonColors = [
  "bg-[#C4DAFA]", "bg-[#EFFBEA]", "bg-[#F1D9FC]", "bg-[#FBD5D7]",
  "bg-[#FBF5EA]", "bg-[#FBC4DF]", "bg-[#FCDFE0]", "bg-[#C6FFEB]", "bg-[#A3EEE7]",
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen ml-64">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Employee Attendance Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Total Employees", "Today’s Attendance", "Leaves Approved"].map((title, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <p className={`text-4xl font-bold ${index === 1 ? "text-green-600" : index === 2 ? "text-red-600" : "text-blue-600"}`}>
              {[150, 120, 30][index]}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-8">
      <div className="flex flex-col items-center w-full md:w-1/3 bg-white p-6 rounded-xl shadow-md">
  <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">Employee Attendance</h3>

  <div className="flex justify-center items-center w-full">
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={80} innerRadius={50} paddingAngle={5}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  <div className="flex flex-wrap justify-center gap-3 mt-5 text-sm text-gray-700">
    {data.map((entry, index) => (
      <div key={index} className="flex items-center gap-2">
        <div className="rounded-full w-5 h-5" style={{ backgroundColor: entry.color }}></div>
        <p className="font-medium">{entry.name}</p>
      </div>
    ))}
  </div>
</div>


        <div className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow-md">
  <h3 className="text-xl font-bold text-gray-700 mb-4">Services</h3>
  <div className="grid grid-cols-3 gap-5">
    {services.map((service, index) => (
      <div
        key={index}
        className={`w-[225px] h-[100px] flex flex-col justify-center items-center cursor-pointer p-7 text-white font-semibold rounded-lg shadow hover:shadow-md transition-transform transform hover:scale-105 ${buttonColors[index]}`}
        onClick={() => navigate(service.path)}
      >
        <FontAwesomeIcon icon={service.icon} className="text-3xl text-gray-800 mb-1" />
        <h3 className="text-sm text-gray-900">{service.name}</h3>
      </div>
    ))}
  </div>
</div>


      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Pending Approvals</h3>
          <a href="#" className="text-blue-500 text-sm font-medium hover:underline">See all &gt;</a>
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