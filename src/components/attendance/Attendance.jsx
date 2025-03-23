import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AttendanceReport = () => {
  const [campus, setCampus] = useState("");
  const [department, setDepartment] = useState("");
  const [employee, setEmployee] = useState("");
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");

  const navigate = useNavigate(); // For navigation

  const isFormComplete =
    campus && department && employee && reportType &&
    (reportType === "monthly" ? selectedMonth : true) &&
    (reportType === "weekly" || reportType === "custom" ? startDate && endDate : true);

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
      navigate("/monthly-report"); // Navigate to Monthly Report Page
    } else if (reportType === "weekly") {
      navigate("/weekly-report"); // Navigate to Weekly Report Page
    } else {
      alert(`Report Generated:\n${JSON.stringify(reportData, null, 2)}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800">Attendance</h2>
      <p className="text-sm text-gray-600">Track attendance with reports.</p>

      {/* Campus Dropdown */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Campus</label>
        <select
          className="mt-1 block w-full p-3 border rounded-lg"
          value={campus}
          onChange={(e) => setCampus(e.target.value)}
        >
          <option value="">Select campus</option>
          <option value="campus1">Campus 1</option>
          <option value="campus2">Campus 2</option>
        </select>
      </div>

      {/* Department Dropdown */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Department</label>
        <select
          className="mt-1 block w-full p-3 border rounded-lg"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select department</option>
          <option value="hr">HR</option>
          <option value="engineering">Engineering</option>
        </select>
      </div>

      {/* Employee Dropdown */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Employee</label>
        <select
          className="mt-1 block w-full p-3 border rounded-lg"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        >
          <option value="">Select employee</option>
          <option value="john">John Doe</option>
          <option value="jane">Jane Smith</option>
        </select>
      </div>

      {/* Report Type Selection */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Select Report Type</label>
        <div className="mt-2">
          {["weekly", "monthly", "custom"].map((type) => (
            <label key={type} className="flex items-center mt-2">
              <input
                type="radio"
                name="reportType"
                value={type}
                className="h-4 w-4 text-blue-500"
                onChange={() => setReportType(type)}
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">{type} Report</span>
            </label>
          ))}
        </div>
      </div>

      {/* Weekly & Custom Report Calendar UI */}
      {(reportType === "weekly" || reportType === "custom") && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Select Date Range</label>
          <div className="mt-2 flex gap-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="p-2 border rounded-lg w-full"
              placeholderText="From"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={reportType === "weekly" ? new Date(startDate?.getTime() + 6 * 24 * 60 * 60 * 1000) : null}
              className="p-2 border rounded-lg w-full"
              placeholderText="To"
            />
          </div>
        </div>
      )}

      {/* Monthly Report Dropdown */}
      {reportType === "monthly" && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Select Month</label>
          <select
            className="mt-2 block w-full p-3 border rounded-lg"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Choose a Month</option>
            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      )}

      {/* Generate Report Button */}
      <div className="mt-6">
        <button
          onClick={handleGenerateReport}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default AttendanceReport;
