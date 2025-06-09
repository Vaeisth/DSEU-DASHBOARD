import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/ViceChancellorUI/homepage/Dashboard.jsx";
import AttendanceReport from "./components/ViceChancellorUI/attendance/Attendance.jsx";
import WeeklyReport from "./components/ViceChancellorUI/attendance/WeeklyReport.jsx";
import MonthlyReport from "./components/ViceChancellorUI/attendance/MonthlyReport.jsx";
import TrackLeave from "./components/ViceChancellorUI/Leave/TrackLeave.jsx";
import LeaveDetails from "./components/ViceChancellorUI/Leave/LeaveDetails.jsx";
import Announcements from "./components/ViceChancellorUI/Announcements/Announcements.jsx";
import AnnouncementDetails from "./components/ViceChancellorUI/Announcements/AnnouncementDetails.jsx";
import PostAnnouncement from "./components/ViceChancellorUI/Announcements/PostAnnouncement.jsx";
import AttachLinkDrawer from "./components/ViceChancellorUI/Announcements/AttachLinkDrawer.jsx";
import ScheduleDrawer from "./components/ViceChancellorUI/attendance/ScheduleDrawer.jsx";
import CampusList from "./components/ViceChancellorUI/CampusList/CampusList.jsx";
import CampusInfo from "./components/ViceChancellorUI/CampusList/CampusInfo.jsx";
import Profile from "./components/ViceChancellorUI/Profile/Profile.jsx";
import Surveillance from "./components/ViceChancellorUI/surveillance/Surveillance.jsx";
import EmployeeDashboard from "./components/EmployeeUI/homepage/Dashboard.jsx";
import OfficerDetails from "./components/ViceChancellorUI/attendance/OfficerDetails.jsx";
import EmployeeList from "./components/ViceChancellorUI/employees/EmployeeList.jsx";
import EmployeePersonalDetail from "./components/ViceChancellorUI/employees/EmployeeDetail.jsx";
import Calendar from "./components/ViceChancellorUI/Calendar/Calendar.jsx";
import AdminDashboard from "./components/Admin/Dashboard.jsx";
import AdminTrackLeave from "./components/Admin/TrackLeave.jsx";
import InventoryDashboard from "./components/Inventory/Dashboard.jsx";
import VCInventoryDashboard from "./components/ViceChancellorUI/Inventory/InventoryDashboard.jsx";
import CollegeInventoryDashbaord from './components/CollegeInventory/Dashboard.jsx';


import VCLayout from "./layouts/VcLayout.jsx";
import EmployeeLayout from "./layouts/EmployeeLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

import { Toaster } from "react-hot-toast";
import { ProfileProvider } from "./contexts/ProfileContext.jsx";
import ProtectedRoute from "./components/authProtection/ProtectedRoute.jsx";
import ApplyLeave from "./components/Admin/ApplyLeave.jsx";
import OnDuty from "./components/Admin/OnDuty.jsx";
import LeaveRequestForm from "./components/EmployeeUI/homepage/TrackLeave.jsx";
import Leaves from "./components/EmployeeUI/homepage/Leaves.jsx";

// inventory
import InventoryLayout from "./layouts/InventoryLayout.jsx";
import Layout from "./layouts/Layout.jsx";
import CreateStock from "./components/Inventory/CreateStock.jsx";
import ViewAllStocks from "./components/Inventory/ViewAllStocks.jsx";
import StockByGemId from "./components/Inventory/StockByGemId.jsx";
import AllIssuedItems from "./components/Inventory/AllIssuedItems.jsx";
import IncomingRequests from "./components/Inventory/IncomingRequests.jsx";

// college inventory dashboard

function App() {
  return (
    <Router>
      <ProfileProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super_admin",
                  "admin",
                  "employee",
                  "inventory_admin",
                ]}
              >
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/profile" element={<Profile />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/leave-details/:id" element={<LeaveDetails />} />
          </Route>

          {/* VC Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <VCLayout />
              </ProtectedRoute>
            }
          >
            <Route path="vc-dashboard" element={<Dashboard />} />
            <Route path="attendance" element={<AttendanceReport />} />
            <Route path="weekly-report" element={<WeeklyReport />} />
            <Route path="monthly-report" element={<MonthlyReport />} />
            <Route path="track-leave" element={<TrackLeave />} />
            <Route path="announcement/:id" element={<AnnouncementDetails />} />
            <Route path="post" element={<PostAnnouncement />} />
            <Route path="attach-link" element={<AttachLinkDrawer />} />
            <Route path="schedule" element={<ScheduleDrawer />} />
            <Route path="campus" element={<CampusList />} />
            <Route path="campus/:id" element={<CampusInfo />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:employeeId" element={<Profile />} />
            <Route
              path="employee-details/:employeeId"
              element={<EmployeePersonalDetail />}
            />
            <Route path="surveillance" element={<Surveillance />} />
            <Route path="officer-details/:id" element={<OfficerDetails />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route
              path="mark-attendance"
              element={<div>Mark Attendance</div>}
            />
            <Route path="inventory" element={<VCInventoryDashboard />}></Route>
          </Route>

          {/* Employee Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <EmployeeLayout />
              </ProtectedRoute>
            }
          >
            <Route path="employee-dashboard" element={<EmployeeDashboard />} />
            <Route
              path="employee-leave"
              element={<div>Leave Management</div>}
            />
            <Route
              path="employee-announcements"
              element={<div>Announcements</div>}
            />
            <Route path="/leave-request" element={<LeaveRequestForm />} />
            <Route path="/leaves" element={<Leaves />} />
          </Route>

          {/* Admin Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/track-leave" element={<AdminTrackLeave />} />
            <Route path="admin/admin-leave" element={<ApplyLeave />} />
            <Route path="admin/on-duty" element={<OnDuty />} />
          </Route>

          {/* Inventory */}
          <Route
            path="/inventory"
            element={
              <ProtectedRoute allowedRoles={["inventory_admin"]}>
                <InventoryLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<InventoryDashboard />} />
            <Route path="create-stock" element={<CreateStock />} />
            <Route path="view-stocks" element={<ViewAllStocks />} />
            <Route path="stock/:id" element={<StockByGemId />} />
            <Route path="issued-items" element={<AllIssuedItems />} />
            <Route path="incoming-requests" element={<IncomingRequests />} />
          </Route>

            {/* college inventory */}
          <Route
            path="/college-inventory"
            element={
              <ProtectedRoute allowedRoles={["icadmin"]}>
                <InventoryLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<CollegeInventoryDashbaord />} />
          </Route>
        </Routes>
      </ProfileProvider>
    </Router>
  );
}

export default App;
