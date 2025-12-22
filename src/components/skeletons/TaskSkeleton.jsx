import React from "react";

const TaskCardSkeleton = () => {
  return (
    <div className="flex p-2 rounded-md items-center gap-5 animate-pulse">
      <div className="p-3 rounded-full bg-gray-300 dark:bg-gray-700" />

      <div className="flex flex-col gap-2 w-full">
        <div className="h-4 w-20 lg:w-40 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-3 w-40 lg:w-64 bg-gray-200 dark:bg-gray-600 rounded" />
      </div>
    </div>
  );
};

export default TaskCardSkeleton;
