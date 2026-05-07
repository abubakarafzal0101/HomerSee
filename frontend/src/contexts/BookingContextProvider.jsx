import React, { createContext, useEffect, useState } from "react";
export const BookingContext = createContext();
import axios from "axios";
import toast from "react-hot-toast";
const BookingContextProvider = ({ children }) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const token = localStorage.getItem("token");
  const [bookings, setBookings] = useState([]);

  const fetchUserBookings = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/booking/get-user-bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        console.log("Fetched User Bookings:", response.data.bookings);
        setBookings(response.data.bookings);
      }
    } catch (error) {
      console.error("Fetch User Bookings Error:", error);
    }
  };
  const addBooking = async (id, bookingData) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/booking/add/${id}`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);

        fetchUserBookings();

        return response.data;
      }
    } catch (error) {
      console.error("Add Booking Error:", error);

      toast.error(error?.response?.data?.message || "Failed to add booking");
    }
  };
  useEffect(() => {
    fetchUserBookings();
  }, [token, serverUrl]);
  const value = { fetchUserBookings, bookings, addBooking };
  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export default BookingContextProvider;
