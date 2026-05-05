import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { FaUser, FaEnvelope, FaLock, FaTimes } from "react-icons/fa";

const Profile = () => {
  const [showPopup, setShowPopup] = useState(false);

  const { user, updateProfile, updatePassword } = useContext(UserContext);

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // PROFILE UPDATE
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoadingProfile(true);

    try {
      await updateProfile(formData);
    } finally {
      setLoadingProfile(false);
    }
  };

  // PASSWORD UPDATE
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoadingPassword(true);

    try {
      await updatePassword(passwordData);
      setShowPopup(false);
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-sm p-10">
          {/* HEADER */}
          <div className="flex items-center gap-5 mb-10">
            <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-semibold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-semibold">{user?.name}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>

          {/* FORM */}
          <h3 className="text-lg font-semibold mb-6">Account Information</h3>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            {/* NAME */}
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-4 rounded-2xl">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-base"
                placeholder="Full name"
              />
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-4 rounded-2xl">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-base"
                placeholder="Email"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loadingProfile}
              className="cursor-pointer w-full bg-black text-white py-4 rounded-2xl text-base font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loadingProfile ? (
                <>
                  <span className="loader"></span>
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </button>
          </form>

          {/* PASSWORD */}
          <button
            onClick={() => setShowPopup(true)}
            className="cursor-pointer mt-8 w-full bg-red-500 text-white py-4 rounded-2xl text-base font-medium hover:bg-red-600 transition"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl relative">
            <button
              onClick={() => setShowPopup(false)}
              className="cursor-pointer absolute top-4 right-4"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-semibold mb-6">Change Password</h2>

            <form onSubmit={handleUpdatePassword} className="space-y-5">
              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                placeholder="Old Password"
                className="w-full px-4 py-4 bg-gray-100 rounded-2xl outline-none text-base"
              />

              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="New Password"
                className="w-full px-4 py-4 bg-gray-100 rounded-2xl outline-none text-base"
              />

              <button
                type="submit"
                disabled={loadingPassword}
                className="cursor-pointer w-full bg-black text-white py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loadingPassword ? (
                  <>
                    <span className="loader"></span>
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* LOADER CSS */}
      <style>
        {`
          .loader {
            width: 16px;
            height: 16px;
            border: 2px solid #fff;
            border-top: 2px solid transparent;
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <Footer />
    </>
  );
};

export default Profile;
