import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { apiRequestAxios } from "../../../utils/api";
import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaCalendarAlt,
  FaUserTie,
  FaBuilding,
  FaUniversity,
  FaCreditCard,
} from "react-icons/fa";

const fetchEmployeeDetails = async (employeeId) => {
    try {
      const allUsersResponse = await apiRequestAxios({
        endpoint: "/superadmin/all-users",
        method: "GET",
      });

      console.log("All users response:", allUsersResponse.data);

      const employee = allUsersResponse.data.data.find(
        (user) => user._id === employeeId
      );

      if (employee) {
        return employee;
      } else {
        throw new Error("Employee not found in user list");
      }
    } catch(error) {
      console.error(error);
    }
};

const EmployeePersonalDetail = () => {
  const { employeeId } = useParams();

  const {
    data: employeeData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["employeeDetails", employeeId],
    queryFn: () => fetchEmployeeDetails(employeeId),
    retry: 1,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600">Loading employee details...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Failed to Load Employee Details
          </h3>
          <p className="text-gray-600">
            {error.message || "Please try again later or contact support."}
          </p>
        </div>
      </div>
    );

  if (!employeeData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/employees"
                className="text-blue-500 hover:text-blue-600 transition-colors"
              >
                <FaArrowLeft className="w-5 h-5" />
              </Link>
              <h2 className="text-xl font-bold text-gray-800 ml-4">
                Employee Details
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>
              <div className="px-6 pb-6">
                <div className="flex justify-center">
                  <div className="relative -mt-16">
                    <img
                      src={
                        employeeData.picture ||
                        "https://via.placeholder.com/150"
                      }
                      alt="Employee"
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  </div>
                </div>
                <div className="text-center mt-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {employeeData.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {employeeData.designation?.join(", ") || "No Designation"}
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-center text-gray-600">
                      <FaUniversity className="mr-2" />
                      <span>
                        {employeeData.campus?.name || "Unknown Campus"}
                      </span>
                    </div>
                    <div className="flex items-center justify-center text-gray-600">
                      <FaUserTie className="mr-2" />
                      <span className="capitalize">
                        {employeeData.staff_type || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm mt-8 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <FaEnvelope className="w-5 h-5 mr-3 text-blue-500" />
                  <a
                    href={`mailto:${employeeData.email}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {employeeData.email}
                  </a>
                </div>
                {employeeData.phone && (
                  <div className="flex items-center text-gray-600">
                    <FaPhone className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{employeeData.phone}</span>
                  </div>
                )}
                {employeeData.address && (
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{employeeData.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <FaIdCard className="mr-2 text-blue-500" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Full Name
                  </label>
                  <p className="text-gray-800 font-medium">
                    {employeeData.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Gender
                  </label>
                  <p className="text-gray-800 font-medium capitalize">
                    {employeeData.gender || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Date of Birth
                  </label>
                  <p className="text-gray-800 font-medium">
                    {employeeData.dob || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Email
                  </label>
                  <p className="text-gray-800 font-medium">
                    {employeeData.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <FaBuilding className="mr-2 text-blue-500" />
                Work Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Date of Joining
                  </label>
                  <p className="text-gray-800 font-medium">
                    {employeeData.date_of_joining || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Staff Type
                  </label>
                  <p className="text-gray-800 font-medium capitalize">
                    {employeeData.staff_type || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Campus
                  </label>
                  <p className="text-gray-800 font-medium">
                    {employeeData.campus?.name || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Designation
                  </label>
                  <p className="text-gray-800 font-medium">
                    {employeeData.designation?.join(", ") || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <FaCreditCard className="mr-2 text-blue-500" />
                Bank Details
              </h3>
              <div className="text-center py-8">
                <p className="text-gray-500 italic">
                  Bank details are currently unavailable
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Please contact the administration for assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePersonalDetail;
