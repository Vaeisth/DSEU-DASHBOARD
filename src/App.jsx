import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Navbar from "./components/ViceChancellorUI/Reusable/Navbar.jsx";
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
import Inventory from "./components/ViceChancellorUI/Inventory/Inventory.jsx";
import InventoryApproved from "./components/ViceChancellorUI/Inventory/InventoryApproved.jsx";
import InventoryReject from "./components/ViceChancellorUI/Inventory/InventoryReject.jsx";
import Surveillance from "./components/ViceChancellorUI/surveillance/Surveillance.jsx";
import EmployeeDashboard from "./components/EmployeeUI/homepage/Dashboard.jsx";
import OfficerDetails from "./components/ViceChancellorUI/attendance/OfficerDetails.jsx";
import EmployeeList from "./components/ViceChancellorUI/employees/EmployeeList.jsx";

// Global Layout with Fixed Navbar
const VCLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    {/* Fixed Navbar */}
    <div className="fixed top-0 left-0 right-0 z-50">
      <Navbar />
    </div>

    {/* Main content area with proper spacing */}
    <main className="pt-20 pb-8 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  </div>
);

// Employee Layout - using the same Navbar component
const EmployeeLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    {/* Fixed Navbar */}
    <div className="fixed top-0 left-0 right-0 z-50">
      <Navbar />
    </div>

    {/* Main content area with proper spacing */}
    <main className="pt-20 pb-8 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/vc-dashboard"
          element={
            <VCLayout>
              <Dashboard />
            </VCLayout>
          }
        />

        <Route path="/attendance" element={<VCLayout><AttendanceReport /></VCLayout>} />
        <Route path="/weekly-report" element={<VCLayout><WeeklyReport /></VCLayout>} />
        <Route path="/monthly-report" element={<VCLayout><MonthlyReport /></VCLayout>} />
        <Route path="/track-leave" element={<VCLayout><TrackLeave /></VCLayout>} />
        <Route path="/leave-details/:id" element={<VCLayout><LeaveDetails /></VCLayout>} />
        <Route path="/track-leave/history" element={<VCLayout><LeaveHistory /></VCLayout>} />
        <Route path="/announcements" element={<VCLayout><Announcements /></VCLayout>} />
        <Route path="/announcement/:id" element={<VCLayout><AnnouncementDetails /></VCLayout>} />
        <Route path="/post" element={<VCLayout><PostAnnouncement /></VCLayout>} />
        <Route path="/attach-link" element={<VCLayout><AttachLinkDrawer /></VCLayout>} />
        <Route path="/schedule" element={<VCLayout><ScheduleDrawer /></VCLayout>} />
        <Route path="/holidays" element={<VCLayout><Holidays /></VCLayout>} />
        <Route path="/campus" element={<VCLayout><CampusList /></VCLayout>} />
        <Route path="/campus/:id" element={<VCLayout><CampusInfo /></VCLayout>} />
        <Route path="/profile" element={<VCLayout><Profile /></VCLayout>} />
        <Route path="/inventory" element={<VCLayout><Inventory /></VCLayout>} />
        <Route path="/approved" element={<VCLayout><InventoryApproved /></VCLayout>} />
        <Route path="/rejected" element={<VCLayout><InventoryReject /></VCLayout>} />
        <Route path="/surveillance" element={<VCLayout><Surveillance /></VCLayout>} />
        <Route path="/officer-details/:id" element={<VCLayout><OfficerDetails /></VCLayout>} />
        <Route path="/employees" element={<VCLayout><EmployeeList /></VCLayout>} />

        {/* Employee Routes */}
        <Route
          path="/employee-dashboard"
          element={
            <EmployeeLayout>
              <EmployeeDashboard />
            </EmployeeLayout>
          }
        />
        <Route
          path="/employee-leave"
          element={
            <EmployeeLayout>
              <div>Leave Management</div>
            </EmployeeLayout>
          }
        />
        <Route
          path="/employee-announcements"
          element={
            <EmployeeLayout>
              <div>Announcements</div>
            </EmployeeLayout>
          }
        />
        <Route
          path="/employee-profile"
          element={
            <EmployeeLayout>
              <div>Profile</div>
            </EmployeeLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
