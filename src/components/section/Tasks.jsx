import React, { useState, useMemo } from "react";
import { User, Calendar, Zap } from "lucide-react";

export default function Tasks({ isSmall = false }) {
  const [tasks] = useState([
    {
      id: 1,
      name: "Design landing page",
      status: "In Progress",
      assignedBy: "Alice",
      date: "2025-08-20",
      priority: "High",
    },
    {
      id: 2,
      name: "Fix authentication bug",
      status: "Pending",
      assignedBy: "John",
      date: "2025-08-18",
      priority: "Medium",
    },
    {
      id: 3,
      name: "Update user dashboard",
      status: "Completed",
      assignedBy: "Sarah",
      date: "2025-08-15",
      priority: "Low",
    },
  ]);

  // ✅ useMemo explained below
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [tasks]);

  const displayedTasks = isSmall ? sortedTasks.slice(0, 3) : sortedTasks;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const paddingClass = isSmall ? "p-4" : "p-6";
  const titleSize = isSmall ? "text-lg" : "text-xl";

  return (
    <div className="mb-16 lg:mb-0 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className={`${paddingClass} border-b border-gray-100 dark:border-gray-700`}>
        <div className="flex justify-between items-center">
          <h2 className={`${titleSize} font-semibold text-gray-800 dark:text-gray-100`}>
            {isSmall ? "Recent Tasks" : "Task Overview"}
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {tasks.length} tasks
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {displayedTasks.map((task, key) => (
          <div
            key={key}
            className={`${paddingClass} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150`}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-gray-900 dark:text-white">{task.name}</h3>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full
                ${
                  task.status === "Completed"
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                    : task.status === "In Progress"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                }`}
              >
                {task.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                <span>Assigned by {task.assignedBy}</span>
              </div>

              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                <span>{formatDate(task.date)}</span>
              </div>

              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                <span
                  className={`font-medium
                  ${
                    task.priority === "High"
                      ? "text-red-600 dark:text-red-400"
                      : task.priority === "Medium"
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {task.priority} Priority
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`${isSmall ? 'block' : 'hidden'} p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700`}>
        <button className="w-full py-2 px-4 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-950 dark:hover:bg-blue-900 transition-colors duration-150">
          View all tasks →
        </button>
      </div>
    </div>
  );
}
