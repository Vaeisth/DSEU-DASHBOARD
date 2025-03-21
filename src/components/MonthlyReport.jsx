import { useNavigate } from "react-router-dom";

const MonthlyReport = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header with Back Button */}
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-2 text-2xl text-blue-600">&#8592;</button>
        <h1 className="text-lg font-semibold">Monthly Attendance Report</h1>
      </div>

      {/* Attendance Report Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-md font-semibold">Monthly Attendance</h2>
        <p className="text-xs text-gray-500">February '24</p>

        {/* Filters */}
        <div className="mt-3 space-y-2">
          <input type="text" className="w-full p-2 border rounded-md text-sm bg-gray-50" placeholder="DSEU Pusa Campus - 1" readOnly />
          <input type="text" className="w-full p-2 border rounded-md text-sm bg-gray-50" placeholder="Information Technology Department" readOnly />
          <input type="text" className="w-full p-2 border rounded-md text-sm bg-gray-50" placeholder="All Employees" readOnly />
        </div>
      </div>

      {/* Employee Attendance List */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-md font-semibold">Employees Monthly Attendance</h3>
        <p className="text-xs text-gray-500">DSEU Pusa Campus - 1</p>

        {/* Employee Cards */}
        <div className="mt-3 space-y-3">
          {[
            { id: 1, name: "Dr. Om Prakash Singh", role: "Campus Director", badge: "Admin" },
            { id: 2, name: "Mr. Dummy Name", role: "Head of Department" },
            { id: 3, name: "Prof. (Dr.) Dummy Name", role: "IT Assistant Professor" },
            { id: 4, name: "Dr. Dummy Name", role: "Assistant Professor" },
          ].map((employee) => (
            <div 
              key={employee.id} 
              className="flex items-center p-3 border rounded-lg bg-gray-50 active:bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/employee-report/${employee.id}`)} // Navigate to individual employee report
            >
              <div className="flex-grow">
                <h4 className="text-sm font-semibold">{employee.name}</h4>
                <p className="text-xs text-gray-500">{employee.role}</p>
              </div>
              {employee.badge && (
                <span className="px-2 py-1 text-xs font-bold text-white bg-blue-500 rounded-md">{employee.badge}</span>
              )}
              <button className="ml-2 text-lg text-gray-600">&#x1F4E5;</button>
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="w-full mt-4 p-3 bg-blue-500 text-white rounded-md text-sm"
      >
        Back to Attendance
      </button>
    </div>
  );
};

export default MonthlyReport;
