import React from "react";

const MemberCardSkeleton = () => {
  return (
    <div className="flex rounded-md px-2 items-center gap-6 animate-pulse">
      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />

      <div className="flex flex-col gap-2">
        <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-600 rounded" />
      </div>
    </div>
  );
};

export default MemberCardSkeleton;
