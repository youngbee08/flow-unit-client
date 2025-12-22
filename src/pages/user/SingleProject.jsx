import React, { useEffect } from "react";
import { FaPen } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const SingleProject = () => {
  const { state } = useLocation();
  const project = state;

  if (!project) {
    return <div>Project not found</div>;
  }
  const {
    name,
    description,
    _id,
    progress = 0,
    createdAt,
    dueDate,
    status,
  } = project;

  // useEffect(() => {
  //   document.title = `${name ? name : ""} - FlowUnit`;
  // }, [name]);

  return (
    <div className="flex flex-col gap-5">
      <div className="px-4 py-4.5 bg-white  rounded-lg w-full flex flex-col gap-4 shadow-lg">
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col gap-1 w-[65%]">
            <h2 className="text-base md:text-xl lg:text-2xl font-bold">
              {name}
            </h2>
            <h5 className="text-sm lg:text-base font-medium text-tetiary">
              {description.length > 72
                ? `${description.slice(0, 72)}...`
                : description}
            </h5>
          </div>
          <div className="flex items-center gap-3 w-[35%] justify-end">
            <button className="bg-tetiary/10 border border-tetiary px-3 py-2 rounded-md cursor-pointer font-semibold flex items-center gap-3">
              <FaPen size={13} />
              Edit
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-between">
          <div className="flex flex-col gap-1"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
