import React from "react";
import { FaBell } from "react-icons/fa6";
import { useUser } from "../../contexts/UserContext";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopNav = ({ pageName, pageInfo, pageUtility }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
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
      <div className="flex items-center gap-4">
        {pageUtility?.active && (
          <button
            className="text-white text-sm bg-primary font-semibold hidden lg:flex rounded-xl px-4 cursor-pointer py-2.5"
            onClick={() => navigate("/dashboard/projects/new")}
          >
            {pageUtility?.info}
          </button>
        )}
        {!pageUtility && (
          <FaBell className="text-lg lg:text-xl cursor-pointer" />
        )}
        <div className="lg:hidden flex items-center gap-3">
          <img
            src={user?.profile}
            alt="User avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
