import React, { use, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContext } from "./contexts/UserContextProvider";
const App = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
      </Routes>
    </>
  );
};

export default App;
