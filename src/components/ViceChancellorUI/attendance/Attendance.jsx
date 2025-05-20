import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL, API_ENDPOINTS } from "../../../config/api.config";

const AttendanceReport = () => {
  const [campus_name, setCampus] = useState("");
  const [department, setDepartment] = useState("");
  const [employee, setEmployee] = useState("");
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");

  const navigate = useNavigate();

  const reportMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_ATTENDANCE_REPORT}?campus_name=${encodeURIComponent(campus_name)}`);

      if (!response.ok) {
        throw new Error("Failed to fetch report");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Attendance_Report.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error(error);
      alert("Failed to generate the report.");
    },
  });

  const handleGenerateReport = () => {
    if (!campus_name) return;

    const reportData = {
      campus_name,
    };

    reportMutation.mutate(reportData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-blue-200 px-4 py-10">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border border-gray-200">
        <div className="flex items-center gap-3 mb-8">
          <CalendarIcon className="text-blue-600 w-8 h-8" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Attendance Report</h1>
            <p className="text-sm text-gray-500">Track and generate detailed employee reports</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campus Name</label>
            <input
              value={campus_name}
              onChange={(e) => setCampus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* UI kept for display; data won't be sent */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select department</option>
              <option value="hr">HR</option>
              <option value="engineering">Engineering</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
            <select
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select employee</option>
              <option value="john">John Doe</option>
              <option value="jane">Jane Smith</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <div className="flex gap-6">
              {["weekly", "monthly", "custom"].map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="radio"
                    name="reportType"
                    value={type}
                    checked={reportType === type}
                    onChange={() => setReportType(type)}
                    className="accent-blue-500"
                  />
                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {(reportType === "weekly" || reportType === "custom") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <div className="flex gap-2">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="From"
                  className="w-1/2 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  maxDate={
                    reportType === "weekly"
                      ? new Date(startDate?.getTime() + 6 * 24 * 60 * 60 * 1000)
                      : null
                  }
                  placeholderText="To"
                  className="w-1/2 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          {reportType === "monthly" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Choose a Month</option>
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleGenerateReport}
            disabled={!campus_name || reportMutation.isLoading}
            className={`w-full mt-6 py-2 text-lg font-semibold rounded-xl transition ${
              campus_name && !reportMutation.isLoading
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {reportMutation.isLoading ? "Generating..." : "Generate Report"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
