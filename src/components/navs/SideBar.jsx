import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Plus, Settings, LogOut } from "lucide-react";
import navItems from "../../lib/navItems";
import { useUser } from "../../contexts/UserContext";
import ConfirmDialog from "../modals/ConfirmDialog";

const SideBar = () => {
  const { user: stateUser, logout, isLoggingOut } = useUser();
  const navigate = useNavigate();
  const [showLogOutModal, setShowLogOutModal] = useState(false);

  const backupUser = JSON.parse(localStorage.getItem("user"));
  const user = stateUser || backupUser;

  const handleLogout = () => {
    logout({ redirect: false });
  };

  return (
    <>
      <aside className="h-full w-full bg-primary p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user?.profile}
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-xs text-white/60">Hello!</p>
            <h4 className="font-semibold capitalize text-white">
              {user?.name || "User"}
            </h4>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard/projects/new")}
          className="
          mb-4 flex items-center gap-2 rounded-xl
          bg-white/10 text-white
          px-4 py-3 font-medium
          border border-white/15
          hover:bg-white/20 transition cursor-pointer
        "
        >
          <Plus size={18} />
          New Project
        </button>

        <p className="text-[10px] tracking-widest text-white/40 px-4 mb-1">
          WORKSPACE
        </p>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `
                flex items-center gap-3 px-4 py-3
                rounded-xl text-sm font-medium transition
                ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-white hover:bg-white/10"
                }
              `
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-1">
          <NavLink
            to="/dashboard/profile-settings"
            className="flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 rounded-xl transition"
          >
            <Settings size={18} />
            Settings
          </NavLink>

          <button
            onClick={() => setShowLogOutModal(true)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-red-300 rounded-xl transition cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
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

export default SideBar;
