// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/ViceChancellorUI/homepage/Dashboard.jsx";
import AttendanceReport from "./components/ViceChancellorUI/attendance/Attendance.jsx";
import WeeklyReport from "./components/ViceChancellorUI/attendance/WeeklyReport.jsx";
import MonthlyReport from "./components/ViceChancellorUI/attendance/MonthlyReport.jsx";
import TrackLeave from "./components/ViceChancellorUI/Leave/TrackLeave.jsx";
import LeaveDetails from "./components/ViceChancellorUI/Leave/LeaveDetails.jsx";
import LeaveHistory from "./components/ViceChancellorUI/Leave/leaveHistory.jsx";
import Announcements from "./components/ViceChancellorUI/Announcements/Announcements.jsx";
import AnnouncementDetails from "./components/ViceChancellorUI/Announcements/AnnouncementDetails.jsx";
import PostAnnouncement from "./components/ViceChancellorUI/Announcements/PostAnnouncement.jsx";
import AttachLinkDrawer from "./components/ViceChancellorUI/Announcements/AttachLinkDrawer.jsx";
import ScheduleDrawer from "./components/ViceChancellorUI/Attendance/ScheduleDrawer.jsx";
import Holidays from "./components/ViceChancellorUI/Holidays/Holidays.jsx";
import CampusList from "./components/ViceChancellorUI/CampusList/CampusList.jsx";
import CampusInfo from "./components/ViceChancellorUI/CampusList/CampusInfo.jsx";
import Profile from "./components/ViceChancellorUI/Profile/Profile.jsx";
import InventoryDashboard from "./components/ViceChancellorUI/Inventory/InventoryDashboard.jsx";
import Surveillance from "./components/ViceChancellorUI/surveillance/Surveillance.jsx";
import EmployeeDashboard from "./components/EmployeeUI/homepage/Dashboard.jsx";
import OfficerDetails from "./components/ViceChancellorUI/attendance/OfficerDetails.jsx";
import EmployeeList from "./components/ViceChancellorUI/employees/EmployeeList.jsx";
import EmployeePersonalDetail from "./components/ViceChancellorUI/employees/EmployeeDetail.jsx"; // Fixed path
import Calendar from "./components/ViceChancellorUI/Calendar/Calendar.jsx";
import { Toaster } from "react-hot-toast";
import VCLayout from "./layouts/VcLayout.jsx";
import EmployeeLayout from "./layouts/EmployeeLayout.jsx";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />

        {/* VC routes */}
        <Route path="/" element={<VCLayout />}>
          <Route path="vc-dashboard" element={<Dashboard />} />
          <Route path="attendance" element={<AttendanceReport />} />
          <Route path="weekly-report" element={<WeeklyReport />} />
          <Route path="monthly-report" element={<MonthlyReport />} />
          <Route path="track-leave" element={<TrackLeave />} />
          <Route path="leave-details/:id" element={<LeaveDetails />} />
          <Route path="track-leave/history" element={<LeaveHistory />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="announcement/:id" element={<AnnouncementDetails />} />
          <Route path="post" element={<PostAnnouncement />} />
          <Route path="attach-link" element={<AttachLinkDrawer />} />
          <Route path="schedule" element={<ScheduleDrawer />} />
          <Route path="holidays" element={<Holidays />} />
          <Route path="campus" element={<CampusList />} />
          <Route path="campus/:id" element={<CampusInfo />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:employeeId" element={<Profile />} />
          <Route path="employee-details/:employeeId" element={<EmployeePersonalDetail />} />
          <Route path="inventory" element={<InventoryDashboard />} />
          <Route path="surveillance" element={<Surveillance />} />
          <Route path="officer-details/:id" element={<OfficerDetails />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>

        {/* Employee Routes */}
        <Route path="/" element={<EmployeeLayout />}>
          <Route path="employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="employee-leave" element={<div>Leave Management</div>} />
          <Route path="employee-announcements" element={<div>Announcements</div>} />
          <Route path="employee-profile" element={<div>Profile</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;