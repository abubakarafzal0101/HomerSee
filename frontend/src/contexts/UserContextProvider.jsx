import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

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
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
