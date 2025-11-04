import React from "react";
import { Home, UsersRoundIcon, CheckSquare, MessageSquare, User2 } from "lucide-react";
import {Link} from "react-router-dom"

export default function BottomBar() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0e2432] text-white flex justify-around items-center p-4 md:hidden">
      <Link to="/overview" className="flex flex-col items-center text-xs">
        <Home size={20} />
        Overview
      </Link>
      <Link to="/tasks" className="flex flex-col items-center text-xs">
        <CheckSquare size={20} />
        Tasks
      </Link>
      <Link to="/delegators" className="flex flex-col items-center text-xs">
        <UsersRoundIcon size={20} />
        Delegators
      </Link>
      <Link to="#" className="flex flex-col items-center text-xs">
        <MessageSquare size={20} />
        Messages
      </Link>
      <Link to="/profile" className="flex flex-col items-center text-xs">
        <User2 size={20} />
        Profile
      </Link>
    </div>
  );
}
