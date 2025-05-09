import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import dseuLogo from "../../assets/logo/DSEULOGO.svg";

const loginUser = async (form) => {
  const { username, password } = form;
  
  const response = await axios.post(
    "/login", 
    new URLSearchParams({
      grant_type: "password",
      username: username,
      password: password,
      scope: "",
      client_id: "", 
      client_secret: "", 
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
};

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const role = sessionStorage.getItem("currentRole");
    if (role || token) {
      switch (role) {
        case "Store":
          navigate("/store-dashboard");
          break;
        case "Employee":
        case "employee":
          navigate("/employee-dashboard");
          break;
        case "SuperAdmin":
          navigate("/admin-dashboard");
          break;
        default:
          break;
      }
    }
  }, [navigate]);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      sessionStorage.setItem("accessToken", data.access_token);
      sessionStorage.setItem("currentRole", data.role);

      switch (data.role) {
        case "super_admin":
          navigate("/vc-dashboard");
          break;
        case "Store":
          navigate("/store-dashboard");
          break;
        case "employee":
        case "Employee":
          navigate("/employee-dashboard");
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        default:
          setError("Unknown role.");
      }
    },
    onError: (error) => {
      const msg = error.response?.data?.detail || "Invalid credentials or server error.";
      setError(msg.toString());
      console.error("Login error:", error.response?.data);
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); 
    mutation.mutate(form);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("currentRole");
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
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
        >
          {mutation.isLoading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="text-red-500 text-center mt-4 text-sm">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
