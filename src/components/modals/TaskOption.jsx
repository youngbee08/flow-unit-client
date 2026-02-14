import React from "react";
import Modal from "./Modal";
import { MdOutlineAutoFixHigh, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const TaskOption = ({ onCancel, isOpen, projecctID }) => {
  const taskOptions = [
    {
      id: "smart",
      title: "Smart Generator",
      description: "Quickly generate tasks in one click.",
      icon: <MdOutlineAutoFixHigh />,
      isNew: true,
      path: `/dashboard/projects/${projecctID}/ai/addTask`,
    },
    {
      id: "manual",
      title: "Manual Creation",
      description: "Create and manage tasks yourself.",
      icon: <MdEdit />,
      path: `/dashboard/projects/${projecctID}/addTask`,
    },
  ];
  if (!isOpen) return null;

  return (
    <Modal customMode showClose onClose={onCancel}>
      <div className="bg-white w-[92%] sm:w-[520px] rounded-2xl flex flex-col gap-5 p-6">
        <div className="text-center">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Choose an option
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Select how you want to create tasks for this project.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {taskOptions.map((option) => (
            <Link
              to={option.path}
              key={option.id}
              className={`
                relative flex items-center gap-4 w-full
                rounded-2xl px-5 py-4 cursor-pointer
                border transition-all duration-200
                ${
                  option.id === "smart"
                    ? "bg-primary/5 border-primary/30 hover:bg-primary/10"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                }
              `}
            >
              {option.isNew && (
                <span className="absolute top-2 right-3 text-[10px] px-2 py-0.5 rounded-full bg-primary text-white font-semibold tracking-wide">
                  NEW
                </span>
              )}

              <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-primary/10 text-primary text-xl">
                {option.icon}
              </div>

              <div className="flex flex-col">
                <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                  {option.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {option.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-[11px] sm:text-xs text-slate-500 text-center">
          !!! Smart Generator helps you start faster.
        </p>
      </div>
    </Modal>
  );
};

export default TaskOption;
