import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "lucide-react"; // Optional: lucide-react icon

const AttendanceReport = () => {
  const [campus, setCampus] = useState("");
  const [department, setDepartment] = useState("");
  const [employee, setEmployee] = useState("");
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");

  const navigate = useNavigate();

  const isFormComplete =
    campus &&
    department &&
    employee &&
    reportType &&
    (reportType === "monthly" ? selectedMonth : true) &&
    (reportType === "weekly" || reportType === "custom"
      ? startDate && endDate
      : true);

  const handleGenerateReport = () => {
    if (!isFormComplete) return;

    let reportData = { campus, department, employee, reportType };
    if (reportType === "weekly" || reportType === "custom") {
      reportData = { ...reportData, startDate, endDate };
    } else if (reportType === "monthly") {
      reportData = { ...reportData, selectedMonth };
    }

    console.log("Generating Report:", reportData);

    if (reportType === "monthly") {
      navigate("/monthly-report");
    } else if (reportType === "weekly") {
      navigate("/weekly-report");
    } else {
      alert(`Report Generated:\n${JSON.stringify(reportData, null, 2)}`);
    }
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Campus</label>
            <select
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select campus</option>
              <option value="campus1">Campus 1</option>
              <option value="campus2">Campus 2</option>
            </select>
          </div>

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
            disabled={!isFormComplete}
            className={`w-full mt-6 py-2 text-lg font-semibold rounded-xl transition ${
              isFormComplete
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
