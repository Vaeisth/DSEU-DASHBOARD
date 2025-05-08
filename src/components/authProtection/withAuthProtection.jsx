/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuthProtection = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("access_token");

    useEffect(() => {
      if (!token) {
        navigate("/");
      }
    }, [token, navigate]);

    if (!token) return null;

    return <WrappedComponent {...props} />;
  };
};

export default withAuthProtection;
