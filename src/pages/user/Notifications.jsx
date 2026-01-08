import React from "react";
import { Bell } from "lucide-react";

const Notifications = () => {
  return (
    <div className="h-[50vh] w-full flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Bell className="h-8 w-8 text-primary" />
        </div>

        <h2 className="text-lg font-semibold text-gray-800">
          No notifications yet
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          You’re all caught up. Important updates and alerts will be sent
          directly to your inbox when available.
        </p>
      </div>
    </div>
  );
};

export default Notifications;
