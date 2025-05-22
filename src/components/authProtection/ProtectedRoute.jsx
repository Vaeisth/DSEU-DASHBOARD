import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { showErrorToast } from "../../utils/toasts";

// Persistent across component mounts
let toastCooldown = false;

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = sessionStorage.getItem("accessToken");
  const role = sessionStorage.getItem("currentRole");
  const location = useLocation();

  useEffect(() => {
    if (!toastCooldown) {
      if (!token) {
        showErrorToast("Your session expired! Please login again");
      } else if (!allowedRoles.includes(role)) {
        showErrorToast("Permission denied!");
      }

      toastCooldown = true;
      setTimeout(() => {
        toastCooldown = false;
      }, 1000); // 1s cooldown to avoid double firing
    }
  }, [token, role, allowedRoles]);

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    switch (role) {
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "employee":
        return <Navigate to="/employee-dashboard" replace />;
      case "super_admin":
        return <Navigate to="/vc-dashboard" replace />;
      case "inventory_admin":
        return <Navigate to="/inventory/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
