import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";

import {
  Menu,
  X,
  User,
  LogOut,
  Search,
  LayoutGrid,
  Home,
  Info,
  Phone,
  List,
  Bookmark,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { logoutUser } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/all-listings", label: "Listings", icon: LayoutGrid },
    { to: "/about", label: "About", icon: Info },
    { to: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-10 py-4">
        {/* LOGO */}
        <Link
          to="/"
          className="cursor-pointer text-xl font-semibold tracking-tight"
        >
          Homer <span className="text-gray-400">See</span>
        </Link>

        {/* SEARCH */}
        <div className="hidden md:flex items-center gap-2 bg-white/60 border border-gray-200 px-3 py-2 rounded-xl w-1/3 shadow-sm">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="search"
            placeholder="Search listings..."
            className="bg-transparent outline-none w-full text-sm cursor-pointer"
          />
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="cursor-pointer text-gray-600 hover:text-black transition"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(true)}
            className="cursor-pointer md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu />
          </button>

          {/* PROFILE */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 border border-gray-200 backdrop-blur-md shadow-sm hover:shadow-md transition"
            >
              <User className="w-4 h-4" />
              <span className="text-sm hidden sm:block">
                {user?.name || "Guest"}
              </span>
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl overflow-hidden"
                >
                  {[
                    { to: "/profile", icon: User, label: "Profile" },
                    { to: "/my-listings", icon: List, label: "My Listings" },
                    {
                      to: "/my-bookings",
                      icon: Bookmark,
                      label: "My Bookings",
                    },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="cursor-pointer flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-sm"
                    >
                      <item.icon size={16} />
                      {item.label}
                    </Link>
                  ))}

                  {user ? (
                    <button
                      onClick={logoutUser}
                      className="cursor-pointer flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 w-full text-left text-sm"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="cursor-pointer block px-4 py-3 hover:bg-gray-100 text-sm"
                    >
                      Login / Signup
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* MOBILE TOP DROPDOWN MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* dropdown panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="fixed top-[64px] left-0 right-0 mx-auto w-[92%] max-w-md 
                         bg-white/90 backdrop-blur-xl border border-gray-200 
                         shadow-2xl rounded-2xl z-50 p-4"
            >
              {/* header */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-base">Menu</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              {/* links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="cursor-pointer flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-100 transition text-sm"
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
