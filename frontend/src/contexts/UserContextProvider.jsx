import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // 🔥 fetch user when token changes
  const getCurrentUser = async (currentToken) => {
    try {
      if (!currentToken) {
        setUser(null);
        return;
      }

      const response = await axios.get(`${serverUrl}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response?.data?.success) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Get Current User Error:", error);
      setUser(null);
    }
  };

  const updateProfile = async (formData) => {
    try {
      const response = await axios.put(
        `${serverUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.success) {
        toast.success("Profile updated successfully");
        getCurrentUser(token); // Refresh user data
      }
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error(error?.response?.data?.message || "Failed to update profile");
    }
  };

  const updatePassword = async (passwordData) => {
    try {
      const response = await axios.put(
        `${serverUrl}/api/user/update-password`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.success) {
        toast.success("Password updated successfully");
      }
    } catch (error) {
      console.error("Update Password Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update password",
      );
    }
  };

  // 🔥 auto run when token changes
  useEffect(() => {
    getCurrentUser(token);
  }, [token]);

  // 🔥 sync across tabs
  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", syncToken);
    return () => window.removeEventListener("storage", syncToken);
  }, []);

  const value = {
    user,
    setUser,
    token,
    setToken,
    getCurrentUser,
    updateProfile,
    updatePassword,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
