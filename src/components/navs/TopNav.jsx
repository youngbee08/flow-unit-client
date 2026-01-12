import React, { useState } from "react";
import { FaBell } from "react-icons/fa6";
import { useUser } from "../../contexts/UserContext";
import { ChevronLeft, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../modals/ConfirmDialog";

const TopNav = ({ pageName, pageInfo, pageUtility }) => {
  const { user, logout, isLoggingOut } = useUser();
  const navigate = useNavigate();
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  const handleLogout = () => {
    logout({ redirect: false });
  };

  return (
    <>
      <nav className="flex px-4 py-5 items-center w-full justify-between fixed top-0 bg-transparent backdrop-blur-md z-50">
        <div className="flex flex-col gap-3">
          <h2
            onClick={() => navigate(-1)}
            className="text-lg lg:text-[21px] font-bold flex items-center gap-0"
          >
            {pageName !== "Overview" && <ChevronLeft className="lg:hidden" />}
            {pageName}
          </h2>
          {pageInfo && (
            <h4 className="text-xs lg:text-sm text-tetiary lg:block hidden w-1/2">
              {pageInfo}
            </h4>
          )}
        </div>
        <div className="flex items-center gap-2">
          {pageUtility?.active && (
            <button
              className="text-white text-sm bg-primary font-semibold hidden lg:flex rounded-xl px-4 cursor-pointer py-2.5"
              onClick={() => navigate("/dashboard/projects/new")}
            >
              {pageUtility?.info}
            </button>
          )}
          {!pageUtility?.active && (
            <div className="flex items-center gap-2 lg:hidden">
              <FaBell
                onClick={() => navigate("/dashboard/notifications")}
                className="text-lg lg:text-xl cursor-pointer"
              />
            </div>
          )}
          <div className="lg:hidden flex items-center gap-3">
            <img
              onClick={() => navigate("/dashboard/profile-settings")}
              src={user?.profile}
              alt="User avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
            <LogOut
              onClick={() => setShowLogOutModal(true)}
              className="text-lg lg:text-xl cursor-pointer"
            />
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
