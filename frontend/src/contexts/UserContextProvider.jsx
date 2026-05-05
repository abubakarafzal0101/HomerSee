import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();
import { toast } from "react-hot-toast";
import axios from "axios";
const UserContextProvider = ({ children }) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/user/me`, {
        withCredentials: true,
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

  useEffect(() => {
    getCurrentUser();
  }, [serverUrl]);

  const value = { user, getCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
