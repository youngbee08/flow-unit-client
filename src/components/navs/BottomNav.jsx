import React from "react";
import { NavLink } from "react-router-dom";
import navItems from "../../lib/navItems";
import { FaPlus } from "react-icons/fa6";

const BottomNav = () => {
  return (
    <nav
      className="
      fixed bottom-0 left-0 right-0 
      bg-primary rounded-t-3xl
      px-2 sm:px-4 
      py-2 sm:py-1
      flex items-center justify-between
      shadow-lg
      pb-[env(safe-area-inset-bottom)]
    "
    >
      <div className="flex flex-1 justify-around">
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center transition-colors
                ${isActive ? "text-white" : "text-tetiary"}`
              }
            >
              <Icon className="text-lg sm:text-xl mb-0.5" />
            </NavLink>
          );
        })}
      </div>

      <NavLink
        to={"/dashboard/projects/new"}
        className="
          w-12 h-12 sm:w-14 sm:h-14
          bg-white text-primary
          rounded-full
          flex items-center justify-center
          shadow-xl
          -translate-y-7.5 sm:-translate-y-8
        "
      >
        <FaPlus className="text-lg sm:text-xl" />
      </NavLink>

      <div className="flex flex-1 justify-around">
        {navItems.slice(2).map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center transition-colors
                ${isActive ? "text-white" : "text-tetiary"}`
              }
            >
              <Icon className="text-lg sm:text-xl mb-0.5" />
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
