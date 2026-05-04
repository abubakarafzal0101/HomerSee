import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { logoutUser } = useContext(AuthContext);
  return (
    <>
      <h1>
        Homer <span>See</span>
      </h1>

      <input type="search" placeholder="Search..." />

      <div className="profile">
        <h1 className="name">{user?.name || "John Doe"}</h1>
        <Link to={"/profile"}>View Profile</Link>

        {user ? (
          <Link to={"/logout"} onClick={logoutUser}>
            Logout
          </Link>
        ) : (
          <Link to={"/login"}>Login / Signup </Link>
        )}

        <Link to={"/my-listings"}>My Listings</Link>
        <Link to={"/my-bookings"}>My Bookings</Link>
      </div>
    </>
  );
};

export default Navbar;
