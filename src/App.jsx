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

// Global Layout with Fixed Navbar
const VCLayout = ({ children }) => (
  <div className="bg-gray-100 min-h-screen w-full">
    <div className="fixed top-0 w-full z-50">
      <Navbar />
    </div>
    {/* Add top padding to offset navbar height */}
    <main className="pt-20 p-4">{children}</main>
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
        <Route path="/campus-info" element={<VCLayout><CampusInfo /></VCLayout>} />
        <Route path="/profile" element={<VCLayout><Profile /></VCLayout>} />
        <Route path="/inventory" element={<VCLayout><Inventory /></VCLayout>} />
        <Route path="/approved" element={<VCLayout><InventoryApproved /></VCLayout>} />
        <Route path="/rejected" element={<VCLayout><InventoryReject /></VCLayout>} />
        <Route path="/surveillance" element={<VCLayout><Surveillance /></VCLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
