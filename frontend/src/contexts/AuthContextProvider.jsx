import React, { createContext, useContext } from "react";
export const AuthContext = createContext();
import axios from "axios";
import cookie from "cookiejs";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
const AuthContextProvider = ({ children }) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const { getCurrentUser } = useContext(UserContext);
  const loginUser = async (formData) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/login`,
        formData,
        {
          withCredentials: true,
        },
      );
      if (response?.data?.success) {
        toast.success(response.data.message);
        navigate("/");
        getCurrentUser();
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };
  const registerUser = async (formData) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/register`,
        formData,
        {
          withCredentials: true,
        },
      );
      if (response?.data?.success) {
        toast.success(response.data.message);
        navigate("/");
        getCurrentUser();
      }
    } catch (error) {
      console.error("Register Error:", error);
      toast.error(
        error.response?.data?.message || "Register failed. Please try again.",
      );
    }
  };

  const logoutUser = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      if (response?.data?.success) {
        toast.success(response.data.message);
        cookie.remove("token");
        navigate("/login");
        getCurrentUser();
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again.",
      );
    }
  };

  const value = { loginUser, registerUser, logoutUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
