import { useQuery } from "@tanstack/react-query";
import { apiRequestAxios } from "../../../utils/api";
import {
  FaBuilding,
  FaUserTie,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa";
import { API_ENDPOINTS } from "../../../config/api.config";
import placeholder from '../../../assets/placeholder-pfp.jpg'

const fetchAllEmployees = async () => {
  const { data } = await apiRequestAxios({
    endpoint: API_ENDPOINTS.ALL_USERS,
    method: "GET",
  });
  return data?.data || [];
};

const EmployeeList = () => {
  const {
    data: employees = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allEmployee"],
    queryFn: fetchAllEmployees,
  });

  // useEffect(() => {
  //   console.log(employees);
  // }, [employees]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600">Loading employees...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Failed to Load Employees
          </h3>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h2 className="text-xl font-bold text-gray-800">All Employees</h2>
            <span className="text-sm text-gray-500">
              Total: {employees.length}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div
              key={employee._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={employee.picture || placeholder}
                    alt={employee.name}
                    className="w-16 h-16 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {employee.name}
                    </h3>
                    <p className="text-sm text-gray-500">{employee.email}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FaBuilding className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{employee.campus?.name || "No Campus"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaUserTie className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{employee.designation?.[0] || "No Designation"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="w-5 h-5 mr-3 text-blue-500" />
                    <span>
                      Joined:{" "}
                      {new Date(employee.date_of_joining).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaEnvelope className="w-5 h-5 mr-3 text-blue-500" />
                    <span className="text-sm">{employee.role}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {employee.department?.map((dept, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
