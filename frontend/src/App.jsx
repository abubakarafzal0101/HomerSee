import React, { use, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContext } from "./contexts/UserContextProvider";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import MyListings from "./pages/MyListings";
import SingleListing from "./pages/SingleListing";
import AllListings from "./pages/AllListings";
import MyBookings from "./pages/MyBookings";
const App = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/about" element={user ? <About /> : <Login />} />
        <Route path="/contact" element={user ? <Contact /> : <Login />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
        <Route
          path="/listing/:id"
          element={user ? <SingleListing /> : <Login />}
        />
        <Route
          path="/my-listings"
          element={user ? <MyListings /> : <Login />}
        />
        <Route
          path="/all-listings"
          element={user ? <AllListings /> : <Login />}
        />
        <Route
          path="/my-bookings"
          element={user ? <MyBookings /> : <Login />}
        />
      </Routes>
    </>
  );
};

export default App;
