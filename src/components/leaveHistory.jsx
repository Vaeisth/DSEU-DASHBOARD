import { IoArrowBack } from "react-icons/io5";
import { FaCheckCircle, FaTimes, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LeaveHistory() {
  const navigate = useNavigate();

  const leaveHistory = [
    {
      week: "Last week",
      dateRange: "26/05/24 - 31/05/24",
      requests: [
        {
          id: 1,
          name: "John Doe",
          designation: "Designation Name",
          campus: "Campus name",
          daysOff: "1 Days off",
          leaveType: "Schedule leave",
          startDate: "24 May 24",
          endDate: "24 May 24",
          status: "Approved",
          image: "https://randomuser.me/api/portraits/men/5.jpg",
        },
      ],
    },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-2 text-2xl text-blue-600">
          <IoArrowBack />
        </button>
        <h1 className="text-lg font-semibold">Leave History</h1>
      </div>

      <p className="text-xs text-gray-500">
        You will get leave requests of all campus directors and registrars under DSEU.
      </p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm font-semibold">Total: 105</span>
        <button className="text-blue-600 text-sm flex items-center">
          <FaFilter className="mr-1" />
          Filter
        </button>
      </div>

      {/* Leave Requests */}
      {leaveHistory.map((weekData, index) => (
        <div key={index} className="mt-4">
          <h3 className="text-sm font-semibold">
            {weekData.week} <span className="text-xs text-gray-500">{weekData.dateRange}</span>
          </h3>
          {weekData.requests.map((request) => (
            <div
              key={request.id}
              className={`bg-white p-4 rounded-lg shadow-md mt-2 border-l-4 ${
                request.status === "Approved" ? "border-green-500" : "border-red-500"
              }`}
            >
              <div className="flex items-center">
                <img
                  src={request.image}
                  alt={request.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div className="flex-grow">
                  <h4 className="text-sm font-semibold">{request.name}</h4>
                  <p className="text-xs text-gray-500">{request.designation}</p>
                  <p className="text-xs text-gray-500">{request.campus}</p>
                  <p className="text-xs font-semibold mt-1">
                    {request.daysOff} ·{" "}
                    <span
                      className={`${
                        request.leaveType.includes("Casual")
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {request.leaveType}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">📅 {request.startDate}</p>
                  <p className="text-xs text-gray-500">📅 {request.endDate}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    request.status === "Approved"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  } flex items-center`}
                >
                  {request.status === "Approved" ? (
                    <FaCheckCircle className="mr-1" />
                  ) : (
                    <FaTimes className="mr-1" />
                  )}
                  {request.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default LeaveHistory;
