import React, { createContext, useEffect, useState } from "react";
export const ListingContext = createContext();
import axios from "axios";
import toast from "react-hot-toast";
const ListingContextProvider = ({ children }) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [listings, setListings] = useState([]);
  const [userListings, setUserListings] = useState([]);
  const token = localStorage.getItem("token");
  const fetchListings = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/listing/get-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log("Fetched Listings:", response.data.listings);
        setListings(response.data.listings);
      }
    } catch (error) {
      console.error("Fetch Listings Error:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch listings");
    }
  };

  const deleteListing = async (id) => {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/listing/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        toast.success("Listing deleted successfully");
        fetchListings();
      }
    } catch (error) {
      console.error("Delete Listing Error:", error);
      toast.error(error?.response?.data?.message || "Failed to delete listing");
    }
  };

  const addListing = async (listingData) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/listing/add`,
        listingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        toast.success("Listing added successfully");
        fetchListings();
      }
    } catch (error) {
      console.error("Add Listing Error:", error);
      toast.error(error?.response?.data?.message || "Failed to add listing");
    }
  };

  const updateListingHandler = async (id, listingData) => {
    try {
      const response = await axios.put(
        `${serverUrl}/api/listing/update/${id}`,
        listingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        toast.success("Listing updated successfully");
        fetchListings();
      }
    } catch (error) {
      console.error("Update Listing Error:", error);
      toast.error(error?.response?.data?.message || "Failed to update listing");
    }
  };

  const fetchUserListings = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/listing/get-user-listings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        console.log("Fetched User Listings:", response.data.listings);
        setUserListings(response.data.listings);
      }
    } catch (error) {
      console.error("Fetch User Listings Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch user listings",
      );
    }
  };

  useEffect(() => {
    fetchListings();
    fetchUserListings();
  }, [serverUrl, token]);

  const value = {
    listings,
    deleteListing,
    addListing,
    updateListingHandler,
    userListings,
    fetchUserListings,
    fetchListings,
  };
  return (
    <ListingContext.Provider value={value}>{children}</ListingContext.Provider>
  );
};

export default ListingContextProvider;
