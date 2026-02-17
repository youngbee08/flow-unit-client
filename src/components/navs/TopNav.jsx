import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { FaBell, FaRegFolder } from "react-icons/fa6";
import { FaRegFileAlt } from "react-icons/fa";
import { ChevronLeft, LogOut, PanelLeft, Search, SearchX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmDialog from "../modals/ConfirmDialog";
import api from "../../helpers/api";
import { toast } from "sonner";
import { useEffect } from "react";
import {
  formatDueMeta,
  formatTimeAgo,
  metaTone,
} from "../../utilities/FormatterUtility";

const TopNav = ({ pageName, pageInfo, showExpandToggle, onExpandSidebar }) => {
  const { user, logout, isLoggingOut } = useUser();
  const navigate = useNavigate();
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  const inputRef = useRef(null);

  const handleLogout = () => logout({ redirect: false });
  const [shouldSearch, setShouldSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const startSearching = async () => {
    setSearching(true);
    try {
      const params = {
        q: query,
      };
      const res = await api.get(`/user/quickSearch`, { params: params });
      if (res.status === 200) {
        setSearchResult(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      // console.log("error-searching", error);
      const message =
        error.response.data.message ||
        error.message ||
        `Failed to search "${query}" `;
      toast.error(message);
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    if (query) {
      startSearching();
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setShouldSearch(true);
      }

      if (e.metaKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setShouldSearch(true);
      }

      if (e.key === "Escape") {
        setShouldSearch(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

          <div className="hidden lg:flex flex-1 justify-center relative">
            <div className="w-full max-w-[360px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, tasks..."
                className="w-full h-10 pl-9 pr-3 rounded-2xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-primary/25"
                onFocus={() => setShouldSearch(true)}
                onBlur={() => setTimeout(() => setShouldSearch(false), 200)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-black/40 border border-black/10 px-2 py-0.5 rounded-md hidden lg:block">
                Ctrl K
              </div>
            </div>
            {shouldSearch && (
              <div
                onMouseDown={(e) => e.preventDefault()}
                className="absolute top-12 w-full max-w-[360px] bg-white border border-black/10 shadow-lg rounded-xl px-2 py-4 z-50"
              >
                {query.trim() === "" ? (
                  <div className="flex flex-col items-center text-center gap-2">
                    <Search className="w-6 h-6 text-black/30" />
                    <p className="text-sm font-medium text-black/70">
                      No search query yet
                    </p>
                    <p className="text-xs text-black/40">
                      Search for projects, tasks, or anything in your workspace
                    </p>
                  </div>
                ) : searching ? (
                  <p className="text-sm text-black/60">
                    Searching for "
                    <span className="font-semibold">{query}</span>"
                  </p>
                ) : Array.isArray(searchResult) && searchResult.length > 0 ? (
                  <div className="flex flex-col gap-2 max-h-80 overflow-auto styled-scrollbar">
                    {searchResult.map((s) => {
                      const isTask = s.type === "task";

                      return (
                        <Link
                          key={s._id || s.id}
                          to={
                            isTask
                              ? `/dashboard/projects/${s.projectId}`
                              : `/dashboard/projects/${s.id}`
                          }
                          onClick={() => setShouldSearch(false)}
                          className="group flex items-center justify-between gap-3 rounded-xl hover:bg-black/[0.04] focus:bg-black/[0.04] outline-none px-3 py-1 pr-3"
                        >
                          <div className="min-w-0 flex items-center gap-2.5">
                            <span className="grid h-8 w-8 place-items-center rounded-lg border border-black/10 bg-white text-black/60">
                              {s.type === "project" ? (
                                <FaRegFolder />
                              ) : (
                                <FaRegFileAlt />
                              )}
                            </span>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="truncate text-[13px] font-medium text-black/80">
                                  {s.name}
                                </span>

                                <span className="shrink-0 rounded-md border border-black/10 bg-black/[0.02] px-1.5 py-0.5 text-[10px] font-medium text-black/50">
                                  {isTask ? "Task" : "Project"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-2">
                            <span
                              className={`text-[11px] whitespace-nowrap ${metaTone(
                                s.type,
                                s.dueDate,
                              )}`}
                            >
                              {isTask
                                ? formatDueMeta(s.dueDate)
                                : `Added ${formatTimeAgo(s.createdAt)} ago`}
                            </span>

                            <span className="text-black/30 opacity-0 group-hover:opacity-100 transition text-xs">
                              ↵
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center gap-2">
                    <SearchX className="w-6 h-6 text-black/30" />
                    <p className="text-sm font-medium text-black/70">
                      No match for <strong>{query}</strong>
                    </p>
                    <p className="text-xs text-black/40">
                      Try a different keyword (project name or task title).
                    </p>
                  </div>
                )}
              </div>
            )}
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
