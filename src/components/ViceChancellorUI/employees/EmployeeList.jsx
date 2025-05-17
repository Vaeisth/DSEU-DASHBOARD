import { useQuery } from "@tanstack/react-query";
import { FaBuilding, FaUserTie, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
import placeholder from "../../../assets/placeholder-pfp.jpg";
import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchAllEmployees } from "../../../utils/apiservice";
import { debounce } from "lodash";
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// Add custom styles to hide scrollbars
const styles = {
  hideScrollbar: {
    scrollbarWidth: 'none',  /* Firefox */
    msOverflowStyle: 'none',  /* IE and Edge */
    '&::-webkit-scrollbar': {  /* Chrome, Safari and Opera */
      display: 'none'
    }
  }
};

const EmployeeList = () => {
  const [inputField, setInputField] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const {
    data: employees = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allEmployee"],
    queryFn: fetchAllEmployees,
    retry: 1,
  });

  // Memoize the filtered employees to prevent unnecessary recalculations
  const filteredEmployees = useMemo(() => {
    if (!searchInput) return employees;
    const searchLower = searchInput.toLowerCase();
    return employees.filter((employee) =>
      employee.name?.toLowerCase().includes(searchLower)
    );
  }, [employees, searchInput]);

  // Debounced search with useCallback to maintain reference stability
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchInput(value);
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    setInputField(e.target.value);
    debouncedSearch(e.target.value);
  };

  // Cell renderer for virtualized grid
  const Cell = useCallback(({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 3 + columnIndex;
    if (index >= filteredEmployees.length) return null;
    
    const employee = filteredEmployees[index];
    return (
      <div style={style} className="p-3">
        <Link
          to={`/employee-details/${employee._id}`}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full block"
        >
          <div className="p-6">
            <div className="flex items-center gap-4">
              <img
                src={employee.picture || placeholder}
                alt={employee.name || "Employee"}
                className="w-16 h-16 rounded-full object-cover border border-gray-200"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {employee.name || "Unknown"}
                </h3>
                <p className="text-sm text-gray-500">{employee.email || "No email"}</p>
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
                  {employee.date_of_joining
                    ? new Date(employee.date_of_joining).toLocaleDateString()
                    : "Not specified"}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaEnvelope className="w-5 h-5 mr-3 text-blue-500" />
                <span className="text-sm">{employee.role || "Not specified"}</span>
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
                )) || <span className="text-gray-500 text-xs">No departments</span>}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }, [filteredEmployees]);

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
          <p className="text-gray-600">{error.message || "Please try again later."}</p>
        </div>
      </div>
    );

  if (employees.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Employees Found</h3>
          <p className="text-gray-600">There are no employees to display.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h2 className="text-xl font-bold text-gray-800">All Employees</h2>
            <span className="text-sm text-gray-500">
              Total: {filteredEmployees.length}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row min-w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <input
          type="text"
          value={inputField}
          onChange={handleInputChange}
          placeholder="Search by employee name..."
          className="px-4 py-2 rounded-xl border-2 border-blue-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300 shadow-sm w-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-200px)] overflow-hidden">
        <AutoSizer>
          {({ height, width }) => {
            const columnCount = Math.min(3, Math.floor(width / 400));
            const rowCount = Math.ceil(filteredEmployees.length / columnCount);
            const columnWidth = width / columnCount;
            const rowHeight = 400;

            return (
              <div className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
                <Grid
                  columnCount={columnCount}
                  columnWidth={columnWidth}
                  height={height}
                  rowCount={rowCount}
                  rowHeight={rowHeight}
                  width={width}
                  className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]"
                >
                  {Cell}
                </Grid>
              </div>
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
};

export default EmployeeList;