import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Reusable/Navbar.jsx";
// import Sidebar from "./components/Reusable/Sidebar.jsx"; // Removed
import Dashboard from "./components/homepage/Dashboard.jsx";
import AttendanceReport from "./components/attendance/Attendance.jsx";
import Attendence from "./components/attendance/Attendance.jsx"; // Corrected the filename
import WeeklyReport from "./components/attendance/WeeklyReport.jsx";
import MonthlyReport from "./components/attendance/MonthlyReport.jsx";
import TrackLeave from "./components/Leave/TrackLeave.jsx";
import LeaveDetails from "./components/Leave/LeaveDetails.jsx";
import Announcements from "./components/Announcements/Announcements.jsx";
import Holidays from "./components/Holidays/Holidays.jsx";
import CampusList from "./components/CampusList/CampusList.jsx";
import AnnouncementDetails from "./components/Announcements/AnnouncementDetails.jsx";
import PostAnnouncement from "./components/Announcements/PostAnnouncement.jsx";
import ScheduleDrawer from "./components/Attendance/ScheduleDrawer.jsx";
import AttachLinkDrawer from "./components/Announcements/AttachLinkDrawer.jsx";
import LeaveHistory from "./components/Leave/leaveHistory.jsx";
import CampusInfo from "./components/CampusList/CampusInfo.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Inventory from "./components/Inventory/Inventory.jsx";
import InventoryApproved from "./components/Inventory/InventoryApproved.jsx";
import InventoryReject from "./components/Inventory/InventoryReject.jsx";
import Surveillance from "./components/surveillance/Surveillance.jsx";
import Inventory_campus from "./components/Inventory_Campus/Inventory_compus.jsx";
import RequestInventory from "./components/Inventory_Campus/RequestInventory.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard with full width, no Sidebar */}
        <Route
          path="/"
          element={
            <div className="bg-gray-100 min-h-screen w-full flex flex-col">
              <Navbar />
              <main className="flex-grow p-4">
                <Dashboard />
              </main>
            </div>
          }
        />



        {/* Other routes without Sidebar */}
        <Route path="/attendance" element={<AttendanceReport />} />
        <Route path="/attendance-report" element={<Attendence />} />
        <Route path="/track-leave" element={<TrackLeave />} />
        <Route path="/weekly-report" element={<WeeklyReport />} />
        <Route path="/monthly-report" element={<MonthlyReport />} />
        <Route path="/leave-details/:id" element={<LeaveDetails />} />
        <Route path="/track-leave/history" element={<LeaveHistory />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/campus" element={<CampusList />} />
        <Route path="/campus-info" element={<CampusInfo />} />
        <Route path="/announcement/:id" element={<AnnouncementDetails />} />
        <Route path="/post" element={<PostAnnouncement />} />
        <Route path="/schedule" element={<ScheduleDrawer />} />
        <Route path="/attach-link" element={<AttachLinkDrawer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/approved" element={<InventoryApproved />} />
        <Route path="/rejected" element={<InventoryReject />} />
        <Route path="/surveillance" element={<Surveillance />} />
        <Route path="/inventory_campus" element={<Inventory_campus />} />
        <Route path="/request" element={<RequestInventory />} />
      </Routes>
    </Router>
  );
}

export default App;
