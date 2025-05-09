import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import dseuLogo from "../../assets/logo/DSEULOGO.svg";

// Constants for role types and routes
const ROLES = {
  STORE: "store",
  EMPLOYEE: "employee",
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin"
};

const ROUTES = {
  [ROLES.STORE]: "/store-dashboard",
  [ROLES.EMPLOYEE]: "/employee-dashboard",
  [ROLES.SUPER_ADMIN]: "/vc-dashboard",
  [ROLES.ADMIN]: "/admin-dashboard"
};

// Validation functions
const validateUsername = (username) => {
  return username.length >= 3 && username.length <= 50;
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const loginUser = async (form) => {
  const { username, password } = form;
  
  try {
    const response = await axios.post(
      "/login", 
      new URLSearchParams({
        username: username,
        password: password
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || 
                        error.response?.data?.message || 
                        error.message || 
                        "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "", general: "" });
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
  }, [navigate]);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Set token expiry to 1 hour from now
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 1);

      // Normalize the role to match our constants
      const normalizedRole = data.role?.toLowerCase()?.replace(' ', '_');
      
      sessionStorage.setItem("accessToken", data.access_token);
      sessionStorage.setItem("currentRole", normalizedRole);
      sessionStorage.setItem("tokenExpiry", expiryTime.toISOString());

      const route = ROUTES[normalizedRole];
      if (route) {
        navigate(route);
      } else {
        setErrors(prev => ({
          ...prev,
          general: `Invalid role: ${data.role}. Please contact support.`
        }));
      }
    },
    onError: (error) => {
      setLoginAttempts(prev => prev + 1);
      
      // Improved error handling
      const errorMessage = error.message || 
                          error.response?.data?.detail || 
                          error.response?.data?.message || 
                          "Invalid credentials. Please try again.";
      
      setErrors(prev => ({
        ...prev,
        general: errorMessage
      }));
      
      // More detailed error logging
      console.error("Login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
    },
  });

  const validateForm = () => {
    const newErrors = {
      username: "",
      password: "",
      general: ""
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (loginAttempts >= 5) {
      setErrors(prev => ({
        ...prev,
        general: "Too many login attempts. Please try again later."
      }));
      return;
    }

    if (validateForm()) {
      mutation.mutate(form);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("currentRole");
    sessionStorage.removeItem("tokenExpiry");
    navigate("/");
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
              errors.username ? 'border-red-500' : 'border-gray-300'
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
                errors.password ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading || loginAttempts >= 5}
          className={`w-full py-2 rounded-lg ${
            loginAttempts >= 5 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-semibold transition-colors`}
        >
          {mutation.isLoading ? "Logging in..." : "Login"}
        </button>

        {errors.general && (
          <p className="text-red-500 text-center mt-4 text-sm">{errors.general}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
