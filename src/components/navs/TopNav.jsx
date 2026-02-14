// TopNav.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { FaBell } from "react-icons/fa6";
import { ChevronLeft, LogOut, PanelLeft, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmDialog from "../modals/ConfirmDialog";

const TopNav = ({
  pageName,
  pageInfo,
  showExpandToggle,
  onExpandSidebar,
}) => {
  const { user, logout, isLoggingOut } = useUser();
  const navigate = useNavigate();
  const [showLogOutModal, setShowLogOutModal] = useState(false);

  const handleLogout = () => logout({ redirect: false });

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-black/5">
        <div className="h-14 px-4 flex items-center gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {pageName !== "Overview" && (
              <button
                onClick={() => navigate(-1)}
                className="lg:hidden p-2 rounded-xl hover:bg-black/5 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <AnimatePresence>
              {showExpandToggle && (
                <motion.button
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.18 }}
                  onClick={onExpandSidebar}
                  className="hidden lg:flex p-2 rounded-xl hover:bg-black/5 transition"
                  title="Expand sidebar"
                  aria-label="Expand sidebar"
                >
                  <PanelLeft className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>

            <div className="min-w-0">
              <h2 className="text-[18px] font-bold truncate">{pageName}</h2>
              {pageInfo && (
                <p className="hidden lg:block text-sm text-tetiary truncate max-w-[520px]">
                  {pageInfo}
                </p>
              )}
            </div>
          </div>

          <div className="hidden lg:flex flex-1 justify-center">
            <div className="w-full max-w-[360px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
              <input
                placeholder="Search projects, tasks..."
                className="w-full h-10 pl-9 pr-3 rounded-2xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-primary/25"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1">
           

            <button
              onClick={() => navigate("/dashboard/notifications")}
              className="h-10 w-10 rounded-2xl grid place-items-center hover:bg-black/5 transition cursor-pointer"
              aria-label="Notifications"
            >
              <FaBell className="text-lg" />
            </button>

            <button
              onClick={() => navigate("/dashboard/profile-settings")}
              className="h-10 w-10 rounded-2xl grid place-items-center hover:bg-black/5 transition cursor-pointer"
              aria-label="Profile"
              title="Profile"
            >
              <img
                src={user?.profile}
                alt="User avatar"
                className="w-9 h-9 rounded-xl object-cover"
              />
            </button>

            <button
              onClick={() => setShowLogOutModal(true)}
              className="h-10 w-10 rounded-2xl grid place-items-center hover:bg-black/5 transition cursor-pointer"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <ConfirmDialog
        isOpen={showLogOutModal}
        onCancel={() => setShowLogOutModal(false)}
        isLoading={isLoggingOut}
        onConfirm={handleLogout}
        title="Are you sure you want to logout?"
        message="This will end your current session, and you might need to log in again."
      />
    </>
  );
};

export default TopNav;
