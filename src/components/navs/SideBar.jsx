import React from "react";
import { NavLink } from "react-router-dom";
import navItems from "../../lib/navItems";
import { useUser } from "../../contexts/UserContext";

const SideBar = () => {
  const { user: stateUser } = useUser();
  const backupUser = localStorage.getItem("user");
  const user = stateUser || backupUser;
  return (
    <div className="h-full w-full bg-primary rounded-r-2xl p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <img
          src={user.profile}
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="leading-tight">
          <p className="text-sm text-white">Hello!</p>
          <h4 className="font-semibold capitalize text-white">{user.name}</h4>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-white text-primary shadow-sm"
                    : "text-white hover:bg-white/40"
                }`
              }
            >
              <Icon className="text-lg" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default SideBar;
