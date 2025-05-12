import { useState } from "react";

const useLoginForm = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "", general: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "username") {
      if (value.length > 5) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setErrors((prev) => ({ ...prev, username: "Enter a valid email address" }));
        } else {
          setErrors((prev) => ({ ...prev, username: "" }));
        }
      } else {
        setErrors((prev) => ({ ...prev, username: "" }));
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters." }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }
  };

  return { form, errors, setForm, setErrors, handleChange };
};

export default useLoginForm;
