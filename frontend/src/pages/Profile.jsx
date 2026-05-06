import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "motion/react";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineX,
  HiOutlineCheck,
  HiOutlineShieldCheck,
  HiOutlinePencilAlt,
} from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Spinner = () => (
  <AiOutlineLoading3Quarters className="animate-spin" size={16} />
);

/* ── labeled input ── */
const Field = ({ icon: Icon, label, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold tracking-wide text-gray-400 uppercase pl-1">
      {label}
    </label>
    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl focus-within:border-gray-400 focus-within:bg-white transition-all">
      <Icon className="text-gray-300 shrink-0" size={16} />
      <input
        className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-300"
        {...props}
      />
    </div>
  </div>
);

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
    setFormData({ name: user?.name || "", email: user?.email || "" });
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoadingProfile(true);
    try {
      await updateProfile(formData);
    } finally {
      setLoadingProfile(false);
    }
  };

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

  const initials = user?.name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen bg-[#f8f8f6] py-12 px-4"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── page label ── */}
        <div className="max-w-xl mx-auto mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">
              Settings
            </p>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mt-0.5">
              My Profile
            </h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* ── avatar header strip ── */}
          <div className="bg-gray-900 px-8 pt-8 pb-10 relative">
            <div className="flex items-end gap-4">
              {/* avatar */}
              <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center text-2xl font-bold shrink-0">
                {initials}
              </div>
              <div className="pb-0.5">
                <p className="text-white font-semibold text-lg leading-tight">
                  {user?.name}
                </p>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
            </div>
            {/* subtle grid texture */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 24px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 24px)",
              }}
            />
          </div>

          {/* ── form body ── */}
          <div className="px-8 py-8">
            <div className="flex items-center gap-2 mb-6">
              <HiOutlinePencilAlt className="text-gray-400" size={16} />
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Account Information
              </h3>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <Field
                icon={HiOutlineUser}
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
              />

              <Field
                icon={HiOutlineMail}
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loadingProfile}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors cursor-pointer disabled:opacity-60 mt-2"
              >
                {loadingProfile ? (
                  <>
                    <Spinner /> Saving changes…
                  </>
                ) : (
                  <>
                    <HiOutlineCheck size={16} /> Save Changes
                  </>
                )}
              </motion.button>
            </form>

            {/* divider */}
            <div className="flex items-center gap-3 my-7">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-300 font-medium">
                Security
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* change password */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowPopup(true)}
              className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 border border-red-100 py-3.5 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors cursor-pointer"
            >
              <HiOutlineLockClosed size={15} />
              Change Password
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ── password modal ── */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                    <HiOutlineShieldCheck className="text-white" size={16} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-gray-900">
                      Change Password
                    </h2>
                    <p className="text-xs text-gray-400">
                      Update your account password
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer text-gray-400"
                >
                  <HiOutlineX size={17} />
                </button>
              </div>

              {/* modal body */}
              <div className="px-6 py-6">
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <Field
                    icon={HiOutlineLockClosed}
                    label="Current Password"
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                  />

                  <Field
                    icon={HiOutlineLockClosed}
                    label="New Password"
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                  />

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loadingPassword}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors cursor-pointer disabled:opacity-60 mt-1"
                  >
                    {loadingPassword ? (
                      <>
                        <Spinner /> Updating…
                      </>
                    ) : (
                      <>
                        <HiOutlineCheck size={16} /> Update Password
                      </>
                    )}
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="w-full text-gray-400 text-sm py-2 hover:text-gray-600 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default Profile;
