import { Navigate, useLocation } from "react-router-dom";
import { showErrorToast } from "../../utils/toasts";

let toastShown = false; 

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = sessionStorage.getItem("accessToken");
  const role = sessionStorage.getItem("currentRole");
  const location = useLocation();

  if (!token) {
    if (!toastShown) {
      showErrorToast("Your session expired! Please login again");
      toastShown = true;
      setTimeout(() => (toastShown = false), 300); 
    }
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    console.log(role);
    
    if (!toastShown) {
      showErrorToast("Permission denied!");
      toastShown = true;
      setTimeout(() => (toastShown = false), 300);
    }

    if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (role === "employee") return <Navigate to="/employee-dashboard" replace />;
    if (role === "super_admin") return <Navigate to="/vc-dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
