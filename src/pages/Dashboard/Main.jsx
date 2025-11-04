import React from "react";
import Sidebar from "../../components/UI/Sidebar";
import BottomBar from "../../components/UI/Bottombar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex">
        <Sidebar/>
      </div>

      <div className="lg:hidden flex">
        <BottomBar/>
      </div>

      <div className="flex-1 bg-gray-200 p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
