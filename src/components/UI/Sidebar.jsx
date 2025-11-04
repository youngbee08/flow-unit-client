import React, { useState } from "react";
import { Home, Folder, CheckSquare, MessageSquare, Settings, LogOut, UsersRoundIcon, User2 } from "lucide-react";
import darkLogo from "/dark_logo_text-rbg.png";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [active, setActive] = useState("Overview");

  const links = [
    { name: "Overview", icon: <Home size={23} /> },
    { name: "Tasks", icon: <CheckSquare size={23} /> },
    { name: "Delegators", icon: <UsersRoundIcon size={23} /> },
    { name: "Messages", icon: <MessageSquare size={23} /> },
    { name: "Profile", icon: <User2 size={23} /> },
  ];

  return (
    <div className="h-screen w-64 bg-[#0e2432] text-white flex flex-col justify-between p-4">
      <div className="flex flex-col gap-9">
        <img src={darkLogo} alt="logo" className="w-[100px] h-[60px] object-cover" />

        <nav className="flex flex-col gap-5">
          {links.map((link) => (
            <Link
            to={`/${link.name.toLowerCase()}`}
              key={link.name}
              onClick={() => setActive(link.name)}
              className={`flex items-center gap-3 font-medium p-2 rounded-lg transition-colors
                ${active === link.name ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"}`}
            >
              {link.icon} {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-8">
        <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 text-red-400">
          <LogOut size={20} /> Logout
        </a>
      </div>
    </div>
  );
}