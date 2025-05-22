import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useLoginForm from "../../hooks/useLoginForm";
import { loginUser } from "../../utils/apiservice";
import dseuLogo from "../../assets/logo/DSEULOGO.svg";
import { showSuccessToast, showErrorToast } from "../../utils/toasts";
import { Eye, EyeOff } from "lucide-react";

// Constants for role types and routes
const ROLES = {
  STORE: "store",
  EMPLOYEE: "employee",
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  INVENTORY_ADMIN: "inventory_admin",
};

const ROUTES = {
  [ROLES.STORE]: "/store-dashboard",
  [ROLES.EMPLOYEE]: "/employee-dashboard",
  [ROLES.SUPER_ADMIN]: "/vc-dashboard",
  [ROLES.ADMIN]: "/admin/dashboard",
  [ROLES.INVENTORY_ADMIN]: '/employee-dashboard',
};

// Validation functions
const validateUsername = (username) => {
  return username.length >= 3 && username.length <= 50;
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const Login = () => {
  const { form, errors, handleChange, setErrors } = useLoginForm();
  // const [loginAttempts, setLoginAttempts] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("currentRole");
    sessionStorage.removeItem("tokenExpiry");
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const role = sessionStorage.getItem("currentRole");
    const tokenExpiry = sessionStorage.getItem("tokenExpiry");

    // Check if both token and role exist and token hasn't expired
    if (token && role && tokenExpiry && new Date(tokenExpiry) > new Date()) {
      const route = ROUTES[role];
      if (route) {
        navigate(route);
      }
    } else {
      // Clear invalid session data
      handleLogout();
    }
  }, [navigate, handleLogout]);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Set token expiry to 1 hour from now
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 1);

      // Normalize the role to match our constants
      const normalizedRole = data.role?.toLowerCase()?.replace(" ", "_");

      sessionStorage.setItem("accessToken", data.access_token);
      sessionStorage.setItem("currentRole", normalizedRole);
      sessionStorage.setItem("tokenExpiry", expiryTime.toISOString());

      const route = ROUTES[normalizedRole];
      if (route) {
        navigate(route);
      } else {
        setErrors((prev) => ({
          ...prev,
          general: `Invalid role: ${data.role}. Please contact support.`,
        }));
      }
      showSuccessToast("Logged in successfully");
    },

    onError: (error) => {
      
      const errorMessage =
        error.message ||
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Invalid credentials. Please try again.";

      setErrors((prev) => ({
        ...prev,
        general: errorMessage,
      }));

      // More detailed error logging
      console.error("Login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });
      showErrorToast("Invalid Credentials");
     
    },
  });
  
  const validateForm = () => {
    const newErrors = {
      username: "",
      password: "",
      general: "",
    };

    if (!validateUsername(form.username)) {
      newErrors.username = "Username must be between 3 and 50 characters";
    }

    if (!validatePassword(form.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (validateForm()) {
      mutation.mutate(form);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg"
      >
        <div className="flex justify-center mb-4">
          <img src={dseuLogo} alt="Logo" className="w-16 h-auto" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.username ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className={`w-full py-2 rounded-lg ${
            mutation.isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-300`}
        >
          {mutation.isLoading ? "Logging in..." : "Login"}
        </button>

        {errors.general && (
          <p className="text-red-500 text-center mt-4 text-sm">
            {errors.general}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
