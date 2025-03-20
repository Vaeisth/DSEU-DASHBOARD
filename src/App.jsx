import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AttendanceReport from "./components/Attendence.jsx";
import Attendence from "./components/Attendence"; // Corrected the filename
import WeeklyReport from "./components/WeeklyReport";
import MonthlyReport from "./components/MonthlyReport";
import TrackLeave from "./components/TrackLeave";
import LeaveDetails from "./components/LeaveDetails";
import Announcements from "./components/Announcements";
import Holidays from "./components/Holidays"; // Import Holidays page
import CampusList from "./components/CampusList"; // Import the CampusList page
import AnnouncementDetails from "./components/AnnouncementDetails";
import PostAnnouncement from "./components/PostAnnouncement"; // Import the new page
import ScheduleDrawer from "./components/ScheduleDrawer";
import AttachLinkDrawer from "./components/AttachLinkDrawer";
import LeaveHistory from "./components/leaveHistory";
import CampusInfo from "./components/CampusInfo"; // The new CampusInfo page
import Profile from "./components/Profile";
import Inventory from "./components/Inventory";







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
        <Route path="/" element={<TrackLeave />} />
        <Route path="/leave-details/:id" element={<LeaveDetails />} />
        <Route path="/track-leave/history" element={<LeaveHistory />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/holidays" element={<Holidays />} /> {/* New Route */}
        <Route path="/campus" element={<CampusList />} /> {/* ✅ Route to CampusList */}
        <Route path="/campus-info" element={<CampusInfo />} />
        <Route path="/announcement/:id" element={<AnnouncementDetails />} />
        <Route path="/post" element={<PostAnnouncement />} />  {/* Add this */}
        <Route path="/schedule" element={<ScheduleDrawer />} />
        <Route path="/attach-link" element={<AttachLinkDrawer />} />
        <Route path="/" element={<Navbar/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/inventory" element={<Inventory/>} />
        

        

      </Routes>
    </Router>
  );
}

export default App;
