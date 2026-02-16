import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import navItems from "../../lib/navItems";
import { FaPlus } from "react-icons/fa6";
import { Sparkles, FolderPlus, X } from "lucide-react";
import { MdOutlineAutoFixHigh } from "react-icons/md";

const BottomNav = () => {
  const navigate = useNavigate();
  const [openSheet, setOpenSheet] = useState(false);

  const goAddProject = () => {
    setOpenSheet(false);
    navigate("/dashboard/projects/new");
  };

  const goAddTasksAI = () => {
    setOpenSheet(false);
    navigate("/dashboard/tasks/smart-generator");
  };

  return (
    <>
      {openSheet && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenSheet(false)}
            aria-label="Close options"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 pb-6 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-base text-primary">
                What do you want to create?
              </h4>
              <button
                className="w-9 h-9 rounded-xl grid place-items-center hover:bg-black/5"
                onClick={() => setOpenSheet(false)}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={goAddProject}
                className="w-full flex items-center justify-between gap-3 p-4 rounded-2xl border border-black/10 hover:bg-black/5 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-black/5 grid place-items-center">
                    <FolderPlus className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h5 className="font-semibold text-primary">Add Project</h5>
                    <p className="text-sm text-gray-500">
                      Create a project and add tasks manually.
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={goAddTasksAI}
                className="w-full flex items-center justify-between gap-3 p-4 rounded-2xl border border-black/10 hover:bg-black/5 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 grid place-items-center">
                    <MdOutlineAutoFixHigh className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h5 className="font-semibold text-primary">
                        Add Tasks with AI
                      </h5>
                      <span className="text-[11px] px-2 py-1 rounded-full bg-primary text-white font-semibold">
                        NEW
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Generate tasks into automatically in one click.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          bg-primary rounded-t-2xl
          px-2 sm:px-4 py-2 sm:py-1
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
                  `flex flex-col gap-1 items-center transition-colors
                  ${isActive ? "text-white" : "text-tetiary"}`
                }
              >
                <Icon className="text-lg sm:text-xl mb-0.5" />
                <h5 className="text-xs font-semibold">{item.name}</h5>
              </NavLink>
            );
          })}
        </div>

        <button
          onClick={() => setOpenSheet(true)}
          className="
            w-12 h-12 sm:w-14 sm:h-14
            bg-white text-primary
            rounded-full
            flex items-center justify-center
            shadow-xl
            -translate-y-7.5 sm:-translate-y-8
            relative
          "
          aria-label="Create"
        >
          <FaPlus className="text-lg sm:text-xl" />

          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
        </button>

        <div className="flex flex-1 justify-around">
          {navItems.slice(2).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col gap-1 items-center transition-colors
                  ${isActive ? "text-white" : "text-tetiary"}`
                }
              >
                <Icon className="text-lg sm:text-xl mb-0.5" />
                <h5 className="text-xs font-semibold">{item.name}</h5>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default BottomNav;
