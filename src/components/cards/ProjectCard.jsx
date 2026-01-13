import React from "react";
import { formatSmartDate } from "../../utilities/FormatterUtility";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const ProjectCard = ({ project }) => {
  const { name, _id, progress = 0, createdAt, dueDate, status } = project;

  const navigate = useNavigate();

  const statusStyles = {
    "In Progress": "bg-blue-100 text-blue-800",
    completed: "bg-primary/10 text-primary",
    pending: "bg-yellow-700/10 text-yellow-700",
    overdue: "bg-red-100 text-red-800",
    default: "bg-gray-100 text-gray-800",
  };

  const statusClass = statusStyles[status] || statusStyles.default;

  return (
    <div
      onClick={() => navigate(`/dashboard/projects/${_id}`, { state: project })}
      className="flex group cursor-pointer flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative"
    >
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl group-hover:underline font-semibold text-gray-900">
            {name.length > 15 ? `${name.slice(0, 15)}...` : name}
          </h3>

          <div className="absolute right-6 lg:hidden flex">
            <h4 className="text-xs flex items-center gap-0">
              View <ArrowUpRight size={12} />
            </h4>
          </div>

          <div className="w-full">
            <div className="flex justify-between text-sm text-tetiary/80 mb-1">
              <span>Progress</span>
              <span>{Math.round(+progress)}%</span>
            </div>
            <progress
              className="w-full h-2 rounded-full [&::-webkit-progress-value]:bg-primary [&::-webkit-progress-bar]:bg-gray-200 [&::-moz-progress-bar]:bg-primary"
              max={100}
              value={progress}
              aria-label={`Project progress: ${progress}%`}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1 text-sm text-tetiary/80">
            <div>
              <span className="font-medium text-tetiary">Created:</span>{" "}
              {formatSmartDate(createdAt)}
            </div>
            <div>
              <span className="font-medium text-tetiary">Due:</span>{" "}
              {formatSmartDate(dueDate)}
            </div>
          </div>

          <span
            className={`px-3 py-1.5 rounded-full capitalize text-sm font-medium ${statusClass}`}
            aria-label={`Status: ${status}`}
          >
            {status || "Unknown"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
