import { useNavigate } from "react-router-dom";

const MonthlyReport = () => {
  const navigate = useNavigate();

  const employees = [
    { id: 1, name: "Dr. Om Prakash Singh", role: "Campus Director", badge: "Admin" },
    { id: 2, name: "Mr. Dummy Name", role: "Head of Department" },
    { id: 3, name: "Prof. (Dr.) Dummy Name", role: "IT Assistant Professor" },
    { id: 4, name: "Dr. Dummy Name", role: "Assistant Professor" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-lg text-blue-600 hover:text-blue-800 transition"
        >
          &#8592;
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Monthly Attendance Report</h1>
      </div>

      {/* Report Filters */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Report Overview</h2>
        <p className="text-sm text-gray-500 mb-4">February '24</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            className="p-3 border rounded-md text-sm bg-gray-100"
            value="DSEU Pusa Campus - 1"
            readOnly
          />
          <input
            type="text"
            className="p-3 border rounded-md text-sm bg-gray-100"
            value="Information Technology Department"
            readOnly
          />
          <input
            type="text"
            className="p-3 border rounded-md text-sm bg-gray-100"
            value="All Employees"
            readOnly
          />
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="text-xl font-semibold text-gray-800">Employees Monthly Attendance</h3>
        <p className="text-sm text-gray-500 mb-4">DSEU Pusa Campus - 1</p>

        <div className="space-y-4">
          {employees.map((employee) => (
            <div
              key={employee.id}
              onClick={() => navigate(`/employee-report/${employee.id}`)}
              className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 hover:bg-blue-50 transition cursor-pointer"
            >
              <div>
                <h4 className="text-base font-semibold text-gray-800">{employee.name}</h4>
                <p className="text-sm text-gray-500">{employee.role}</p>
              </div>
              <div className="flex items-center gap-2">
                {employee.badge && (
                  <span className="px-2 py-1 text-xs font-bold text-white bg-blue-500 rounded-md">
                    {employee.badge}
                  </span>
                )}
                <span className="text-gray-400 text-lg">&#x1F4E5;</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="w-full mt-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium text-sm transition"
      >
        Back to Attendance
      </button>
    </div>
  );
};

export default MonthlyReport;
