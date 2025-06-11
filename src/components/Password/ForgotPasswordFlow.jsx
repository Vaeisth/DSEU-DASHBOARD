import { useState } from "react";
import axios from "axios";

const ForgotPasswordFlow = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/send-otp", { email });
      setMessage("OTP sent to your email.");
      setStep(2);
    } catch (err) {
      setMessage("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/verify-otp", { email, otp });
      setMessage("OTP verified. Set your new password.");
      setStep(3);
    } catch (err) {
      setMessage("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      setMessage("Password reset successfully. You can now log in.");
      setStep(4);
    } catch (err) {
      setMessage("Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>

      {message && <p className="mb-4 text-sm text-blue-600">{message}</p>}

      {step === 1 && (
        <>
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            className="w-full p-2 border mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={sendOtp}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <label className="block mb-2">Enter OTP:</label>
          <input
            type="text"
            className="w-full p-2 border mb-4 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={verifyOtp}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <label className="block mb-2">New Password:</label>
          <input
            type="password"
            className="w-full p-2 border mb-4 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label className="block mb-2">Confirm Password:</label>
          <input
            type="password"
            className="w-full p-2 border mb-4 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            onClick={resetPassword}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </>
      )}

      {step === 4 && (
        <p className="text-green-600">✅ Password reset complete. You may now log in.</p>
      )}
    </div>
  );
};

export default 
;
