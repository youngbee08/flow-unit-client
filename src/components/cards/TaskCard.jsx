import React from "react";
import { CiCircleAlert } from "react-icons/ci";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const TaskCard = ({ task }) => {
  const { name, description, status } = task;
  return (
    <div className="flex hover:bg-tetiary/30 p-2 rounded-md cursor-pointer transition-all items-center gap-5">
      <div
        className={`p-2 rounded-full text-sm lg:text-lg text-white ${
          status === "todo" ? "bg-yellow-700" : "bg-primary"
        }`}
      >
        {status === "todo" ? <CiCircleAlert /> : <IoCheckmarkDoneCircle />}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm lg:text-[16px] font-semibold">{name}</h3>
        <p className="text-tetiary text-xs lg:text-sm font-medium">
          {description.length > 40
            ? `${description.slice(0, 40)}...`
            : description}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
