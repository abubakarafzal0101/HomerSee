import React, { createContext, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContextProvider";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();

  const { setToken } = useContext(UserContext);

  // 🔥 LOGIN
  const loginUser = async (formData) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/login`,
        formData,
      );

      if (response?.data?.success) {
        toast.success(response.data.message);

        localStorage.setItem("token", response.data.token);

        // 🔥 trigger update
        setToken(response.data.token);

        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // 🔥 REGISTER
  const registerUser = async (formData) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/register`,
        formData,
      );

      if (response?.data?.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Register Error:", error);
      toast.error(error.response?.data?.message || "Register failed");
    }
  };

  // 🔥 LOGOUT (NO API CALL)
  const logoutUser = () => {
    try {
      localStorage.removeItem("token");

      setToken(null);

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
