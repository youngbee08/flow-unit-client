import React from "react";
import { FaBell } from "react-icons/fa6";
import { useUser } from "../../contexts/UserContext";

const TopNav = ({ pageName }) => {
  const { user } = useUser();
  return (
    <nav className="flex px-4 py-5 items-center w-full justify-between fixed top-0 bg-transparent backdrop-blur-md z-50">
      <div className="">
        <h2 className="text-lg lg:text-[21px] font-bold">{pageName}</h2>
      </div>
      <div className="flex items-center gap-4">
        <FaBell className="text-lg lg:text-xl cursor-pointer" />
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
