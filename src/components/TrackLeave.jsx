import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFilter } from "react-icons/fa";

const TrackLeave = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requests");

  const leaveRequests = [
    {
      id: 1,
      name: "Puneet Kumar Singh",
      role: "Designation Name",
      campus: "Campus name",
      leaveDays: "1 Days off",
      leaveType: "Schedule leave",
      startDate: "24 May 24",
      endDate: "24 May 24",
      status: "Pending Approval",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      color: "blue",
    },
    {
      id: 2,
      name: "Ms. Mona Lisa",
      role: "Designation Name",
      campus: "Campus name",
      leaveDays: "2 Days off",
      leaveType: "Casual leave",
      startDate: "02 Jun 24",
      endDate: "03 Jun 24",
      status: "Pending Approval",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      color: "orange",
    },
  ];

  const leaveHistory = [
    {
      id: 1,
      name: "John Doe",
      role: "Designation Name",
      campus: "Campus name",
      leaveDays: "1 Days off",
      leaveType: "Schedule leave",
      startDate: "24 May 24",
      endDate: "24 May 24",
      status: "Approved",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      color: "green",
    },
    {
      id: 2,
      name: "Alice Johnson",
      role: "Designation Name",
      campus: "Campus name",
      leaveDays: "2 Days off",
      leaveType: "Casual leave",
      startDate: "02 Jun 24",
      endDate: "03 Jun 24",
      status: "Approved",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      color: "green",
    },
    {
      id: 3,
      name: "David Smith",
      role: "Designation Name",
      campus: "Campus name",
      leaveDays: "6 Days off",
      leaveType: "Casual leave",
      startDate: "19 Jul 24",
      endDate: "24 Jul 24",
      status: "Rejected",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      color: "red",
    },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-2 text-2xl text-blue-600">
          <FaArrowLeft />
        </button>
        <h1 className="text-lg font-semibold">Track Leave</h1>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-200 p-1 rounded-lg mb-4">
        <button
          className={`flex-1 py-2 rounded-lg ${
            activeTab === "requests" ? "bg-white shadow-md font-semibold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Request(s)
        </button>
        <button
          className={`flex-1 py-2 rounded-lg ${
            activeTab === "history" ? "bg-white shadow-md font-semibold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
      </div>

      {/* Pending Requests Section */}
      {activeTab === "requests" && (
        <div>
          <h2 className="text-md font-semibold">Pending requests</h2>
          <p className="text-xs text-gray-500">You will get leave request of all campus directors and registrars under DSEU</p>
          <p className="text-sm font-medium mt-1">Total: {leaveRequests.length}</p>

          {/* Leave Request List */}
          <div className="space-y-3">
            {leaveRequests.map((leave) => (
              <div
                key={leave.id}
                className="bg-white p-4 rounded-lg shadow-md flex items-center cursor-pointer"
                onClick={() => navigate(`/leave-details/${leave.id}`)}
              >
                <div className={`w-1.5 h-full ${leave.color === "blue" ? "bg-blue-500" : "bg-orange-500"} rounded-l-lg`}></div>
                <img src={leave.image} alt={leave.name} className="w-12 h-12 rounded-full mx-3" />
                <div className="flex-grow">
                  <h4 className="text-sm font-semibold">{leave.name}</h4>
                  <p className="text-xs text-gray-500">{leave.role}</p>
                  <p className="text-xs text-gray-500">{leave.campus}</p>
                  <p className={`text-xs font-semibold text-${leave.color}-600`}>{leave.leaveDays} · {leave.leaveType}</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">📅 {leave.startDate} &nbsp; ⬇️ &nbsp; 📅 {leave.endDate}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-bold text-white bg-${leave.color}-500 rounded-md`}>{leave.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History Section */}
      {activeTab === "history" && (
        <div>
          <h2 className="text-md font-semibold">History</h2>
          <p className="text-xs text-gray-500">You will get leave request of all campus directors and registrars under DSEU</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-semibold">Total: 105</span>
            <button className="text-blue-600 text-sm flex items-center">
              <FaFilter className="mr-1" />
              Filter
            </button>
          </div>

          {/* Leave History List */}
          <div className="space-y-3 mt-3">
            {leaveHistory.map((leave) => (
              <div key={leave.id} className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className={`w-1.5 h-full ${leave.color === "green" ? "bg-green-500" : "bg-red-500"} rounded-l-lg`}></div>
                <img src={leave.image} alt={leave.name} className="w-12 h-12 rounded-full mx-3" />
                <div className="flex-grow">
                  <h4 className="text-sm font-semibold">{leave.name}</h4>
                  <p className="text-xs text-gray-500">{leave.role}</p>
                  <p className="text-xs text-gray-500">{leave.campus}</p>
                  <p className={`text-xs font-semibold ${leave.color === "green" ? "text-green-600" : "text-red-600"}`}>
                    {leave.leaveDays} · {leave.leaveType}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">📅 {leave.startDate} &nbsp; ⬇️ &nbsp; 📅 {leave.endDate}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-bold text-white bg-${leave.color}-500 rounded-md`}>{leave.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackLeave;
