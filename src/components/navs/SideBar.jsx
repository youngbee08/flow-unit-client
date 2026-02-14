// SideBar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Plus, Settings, Sparkles } from "lucide-react";
import navItems from "../../lib/navItems";
import { useUser } from "../../contexts/UserContext";

const NEW_FEATURE = {
  title: "Smart Generator",
  description: "Quickly generate tasks in one click.",
  badge: "NEW",
  path: "/dashboard/smart-generator",
  icon: Sparkles,
};

const SideBar = ({ collapsed = false }) => {
  const { user: stateUser } = useUser();
  const navigate = useNavigate();

  const backupUser = JSON.parse(localStorage.getItem("user"));
  const user = stateUser || backupUser;

  const FeatureIcon = NEW_FEATURE.icon;

  return (
    <aside className="h-full w-full bg-primary p-4 flex flex-col border-r border-white/10">
      <div
        className={`flex items-center rounded-2xl p-2 ${
          collapsed ? "justify-center" : "gap-3"
        }`}
      >
        <img
          src={user?.profile}
          alt="User avatar"
          className="w-10 h-10 rounded-xl object-cover"
        />

        {!collapsed && (
          <div className="leading-tight text-left">
            <p className="text-[11px] text-white/60">Welcome back</p>
            <h4 className="font-semibold text-white capitalize">
              {user?.name || "User"}
            </h4>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate("/dashboard/projects/new")}
        className={`mt-4 rounded-2xl border border-white/15 bg-white/10 hover:bg-white/15 transition text-white font-semibold cursor-pointer ${
          collapsed
            ? "h-12 w-full grid place-items-center"
            : "px-4 py-3 flex items-center gap-2"
        }`}
        title="New Project"
      >
        <Plus size={18} />
        {!collapsed && <span>New Project</span>}
      </button>

      {!collapsed && (
        <p className="text-[10px] tracking-widest text-white/40 px-2 mt-6 mb-2">
          WORKSPACE
        </p>
      )}

      <nav className="mt-2 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              title={collapsed ? item.name : undefined}
              className={({ isActive }) =>
                `flex items-center rounded-2xl transition font-semibold
                ${collapsed ? "justify-center h-12" : "gap-3 px-3 py-3"}
                ${
                  isActive
                    ? "bg-white/18 text-white"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {!collapsed && <span className="truncate">{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-2">
        {!collapsed ? (
          <button
            onClick={() => navigate(NEW_FEATURE.path)}
            title={`${NEW_FEATURE.title} (${NEW_FEATURE.badge})`}
            className="w-full text-left rounded-2xl border border-white/15 bg-white/10 hover:bg-white/15 transition p-3 cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 grid place-items-center">
                <FeatureIcon size={18} className="text-white" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-white font-semibold truncate">
                    {NEW_FEATURE.title}
                  </h4>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-white/15 text-white font-semibold">
                    {NEW_FEATURE.badge}
                  </span>
                </div>
                <p className="text-white/70 text-sm mt-0.5 truncate">
                  {NEW_FEATURE.description}
                </p>
              </div>
            </div>
          </button>
        ) : (
          <button
            onClick={() => navigate(NEW_FEATURE.path)}
            title={`${NEW_FEATURE.title} (${NEW_FEATURE.badge})`}
            className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 hover:bg-white/15 transition grid place-items-cente cursor-pointerr"
          >
            <FeatureIcon size={18} className="text-white" />
          </button>
        )}

        <NavLink
          to="/dashboard/profile-settings"
          title={collapsed ? "Settings" : undefined}
          className={`flex items-center rounded-2xl transition font-semibold text-white/85 hover:bg-white/10 hover:text-white
            ${collapsed ? "justify-center h-12" : "gap-3 px-3 py-3"}`}
        >
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default SideBar;
