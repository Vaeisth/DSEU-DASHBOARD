import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
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
import EmployeePersonalDetail from "./components/ViceChancellorUI/employees/EmployeeDetail.jsx";
import Calendar from "./components/ViceChancellorUI/Calendar/Calendar.jsx";
import AdminDashboard from "./components/Admin/Dashboard.jsx";
import AdminTrackLeave from "./components/Admin/TrackLeave.jsx";

import VCLayout from "./layouts/VcLayout.jsx";
import EmployeeLayout from "./layouts/EmployeeLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

import { Toaster } from "react-hot-toast";
import { ProfileProvider } from "./contexts/ProfileContext.jsx";
import { RoleRoutes } from "./Constants/roleBasedRoutes.js";
import { showErrorToast } from "./utils/toasts.js";

// Kaam chalau authentication
const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = sessionStorage.getItem("currentRole");

  const isRouteAllowed = (allowedRoutes, currentPath) => {
    return allowedRoutes.some((route) => {
      const routeRegex = new RegExp(
        "^" + route.replace(/:[^/]+/g, "[^/]+") + "$"
      );
      return routeRegex.test(currentPath);
    });
  };

  useEffect(() => {
    if (!role) return;

    const currentPath = location.pathname;

    switch (role) {
      case "super_admin":
        if (!isRouteAllowed(RoleRoutes.superadmin, currentPath)) {
          navigate("/vc-dashboard");
          showErrorToast("Access Denied");
        }
        break;
      case "admin":
        if (!isRouteAllowed(RoleRoutes.admin, currentPath)) {
          navigate("/admin/dashboard");
          showErrorToast("Access Denied");
        }
        break;
      case "employee":
        if (!isRouteAllowed(RoleRoutes.employee, currentPath)) {
          navigate("/employee-dashboard");
          showErrorToast("Access Denied");
        }
        break;
      default:
        break;
    }
  }, [location, role, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* VC Layout */}
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
        <Route
          path="employee-details/:employeeId"
          element={<EmployeePersonalDetail />}
        />
        <Route path="inventory" element={<InventoryDashboard />} />
        <Route path="surveillance" element={<Surveillance />} />
        <Route path="officer-details/:id" element={<OfficerDetails />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="mark-attendance" element={<div>Mark Attendance</div>} />
      </Route>

      {/* Employee Layout */}
      <Route path="/" element={<EmployeeLayout />}>
        <Route path="employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="employee-leave" element={<div>Leave Management</div>} />
        <Route
          path="employee-announcements"
          element={<div>Announcements</div>}
        />
      </Route>

      {/* Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="track-leave" element={<AdminTrackLeave />} />
      </Route>

      {/* <Route path="not-found" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <ProfileProvider>
        <Toaster />
        <AppRoutes />
      </ProfileProvider>
    </Router>
  );
}

export default App;
