import React, { useState } from "react";
import { users } from "../../Constants/Users.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === form.username && u.password === form.password
    );

    if (user) {
      localStorage.setItem("role", user.role);

      switch (user.role) {
        case "VC":
          navigate("/vc-dashboard");
          break;
        case "Store":
          navigate("/store-dashboard");
          break;
        case "Employee":
          navigate("/employee-dashboard");
          break;
        case "SuperAdmin":
          navigate("/admin-dashboard");
          break;
        default:
          setError("Unknown role.");
      }
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-1">Log in to continue</p>
        </div>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition duration-200"
        >
          Log In
        </button>

        {error && (
          <p className="text-red-500 mt-4 text-center text-sm">{error}</p>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
