import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../../Constants/Users.js";
import dseuLogo from "../../assets/logo/DSEULOGO.svg";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("currentRole");
    if (role) {
      switch (role) {
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
          break;
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) =>
        u.username === form.username.trim() &&
        u.password === form.password.trim()
    );

    if (user) {
      sessionStorage.setItem("currentRole", user.role);

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
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
        >
          Login
        </button>

        {error && (
          <p className="text-red-500 text-center mt-4 text-sm">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
