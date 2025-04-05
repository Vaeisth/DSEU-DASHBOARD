import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Reusable/Navbar.jsx";
import Sidebar from "./components/Reusable/Sidebar.jsx";
import Dashboard from "./components/homepage/Dashboard.jsx";
import AttendanceReport from "./components/Attendance/Attendance.jsx";
import Attendence from "./components/Attendance/Attendance.jsx"; // Corrected the filename
import WeeklyReport from "./components/reports/WeeklyReport.jsx";
import MonthlyReport from "./components/reports/MonthlyReport.jsx";
import TrackLeave from "./components/Leave/TrackLeave.jsx";
import LeaveDetails from "./components/Leave/LeaveDetails.jsx";
import Announcements from "./components/Announcements/Announcements.jsx";
import Holidays from "./components/Holidays/Holidays.jsx"; // Import Holidays page
import CampusList from "./components/CampusList/CampusList.jsx"; // Import the CampusList page
import AnnouncementDetails from "./components/Announcements/AnnouncementDetails.jsx";
import PostAnnouncement from "./components/Announcements/PostAnnouncement.jsx"; // Import the new page
import ScheduleDrawer from "./components/Attendance/ScheduleDrawer.jsx";
import AttachLinkDrawer from "./components/Announcements/AttachLinkDrawer.jsx";
import LeaveHistory from "./components/Leave/leaveHistory.jsx";
import CampusInfo from "./components/CampusList/CampusInfo.jsx"; // The new CampusInfo page
import Profile from "./components/Profile/Profile.jsx";
import Inventory from "./components/Inventory/Inventory.jsx";
import InventoryApproved from "./components/Inventory/InventoryApproved.jsx";
import InventoryReject from "./components/Inventory/InventoryReject.jsx";
import Surveillance from "./components/surveillance/Surveillance.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard with Navbar and Sidebar */}
        <Route
          path="/"
          element={
            <div className="flex bg-gray-100 min-h-screen">
              <Sidebar />
              <div className="flex flex-col flex-1">
                <Navbar />
                <Dashboard />
              </div>
            </div>
          }
        />

        {/* Attendance Report without Navbar and Sidebar */}
        <Route path="/attendance" element={<AttendanceReport />} />
        <Route path="/attendance-report" element={<Attendence />} /> {/* Corrected */}
        <Route path="/track-leave" element={<TrackLeave />} />
        <Route path="/weekly-report" element={<WeeklyReport />} />
        <Route path="/monthly-report" element={<MonthlyReport />} />
        <Route path="/leave-details/:id" element={<LeaveDetails />} />
        <Route path="/track-leave/history" element={<LeaveHistory />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/holidays" element={<Holidays />} /> {/* New Route */}
        <Route path="/campus" element={<CampusList />} /> {/* ✅ Route to CampusList */}
        <Route path="/campus-info" element={<CampusInfo />} />
        <Route path="/announcement/:id" element={<AnnouncementDetails />} />
        <Route path="/post" element={<PostAnnouncement />} />  {/* Add this */}
        <Route path="/schedule" element={<ScheduleDrawer />} />
        <Route path="/attach-link" element={<AttachLinkDrawer />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/inventory" element={<Inventory/>} />
        <Route path="/approved" element={<InventoryApproved />} />
        <Route path="/rejected" element={<InventoryReject />} />
        <Route path="/rejected" element={<InventoryReject />} />
        <Route path="/surveillance" element={<Surveillance />} /> {/* ✅ Added */}

      </Routes>
    </Router>
  );
}

export default App;
