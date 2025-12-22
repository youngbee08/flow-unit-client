import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Dropdown from "../../components/Dropdowm";
import { useUser } from "../../contexts/UserContext";
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import api from "../../helpers/api";
import { toast } from "sonner";
import TaskTableSkeleton from "../../components/skeletons/TaskTableSkeleton";

const Tasks = () => {
  const { user: contextUser } = useUser();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = contextUser || storedUser;
  const [openAction, setOpenAction] = useState(null);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [fetchingAssignedTasks, setFetchingAssignedTasks] = useState(false);
  const navigate = useNavigate();
  const [statusFilters, setStatusFilters] = useState("All Statuses");
  const [searchFilters, setSearchFilters] = useState("");
  const fetchAssignedTasks = async () => {
    setFetchingAssignedTasks(true);
    try {
      const params = {
        ...(searchFilters && { search: searchFilters }),
        ...(statusFilters !== "All Statuses" && {
          status: statusFilters?.toLowerCase(),
        }),
      };
      const res = await api.get(`/user/findAssignedTasks`, { params: params });
      if (res.status === 200) {
        setAssignedTasks(res.data.tasks);
      }
    } catch (error) {
      // console.log("error-fetching-assigned-tasks", error);
      const message =
        error.response.data.message ||
        error.message ||
        "Failed to fetch assigned tasks";
      toast.error(message);
    } finally {
      setFetchingAssignedTasks(false);
    }
  };
  useEffect(() => {
    const close = () => setOpenAction(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    fetchAssignedTasks();
  }, [statusFilters, searchFilters]);

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-3 py-2 border-[1.5px] lg:w-[35%] border-gray-300 shadow-2xl bg-white rounded-lg">
          <AiOutlineSearch className="text-tetiary" />
          <input
            type="text"
            placeholder="Search tasks..."
            className=" focus:outline-none w-[80%]"
            value={searchFilters}
            onChange={(e) => setSearchFilters(e.target.value.trim())}
          />
        </div>
        <Dropdown
          value={statusFilters}
          onChange={setStatusFilters}
          options={["All Statuses", "Todo", "Done"]}
        />
      </div>

      <div className="bg-white w-full rounded-lg shadow overflow-x-auto styled-scrollbar">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-tetiary/30">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-tetiary/80">
                TASK NAME
              </th>

              <th className="hidden md:table-cell px-6 py-4 text-sm font-medium text-tetiary/80">
                PROJECT
              </th>

              <th className="hidden lg:table-cell px-6 py-4 text-sm font-medium text-tetiary/80">
                DUE DATE
              </th>

              <th className="px-6 py-4 text-sm font-medium text-tetiary/80">
                STATUS
              </th>

              <th className="hidden lg:table-cell px-6 py-4 text-sm font-medium text-tetiary/80">
                ASSIGNED TO
              </th>

              <th className="px-6 py-4 text-sm font-medium text-tetiary/80">
                ACTIONS
              </th>
            </tr>
          </thead>
          {fetchingAssignedTasks ? (
            <TaskTableSkeleton />
          ) : assignedTasks.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={6} className="py-16">
                  <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <h4 className="text-lg font-semibold text-primary">
                      No tasks found
                    </h4>

                    <p className="text-sm text-tetiary max-w-xs px-3">
                      You don’t have any tasks yet. Tasks will appear here once
                      they’re created or assigned to you.
                    </p>

                    {/* <button
                      className="cursor-pointer
            mt-2 px-4 py-2 rounded-lg
            bg-primary text-white text-sm
            hover:bg-primary/90 transition
          "
                    >
                      Create task
                    </button> */}
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {assignedTasks.map((task, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx + 1 !== assignedTasks.length &&
                    "border-b border-tetiary/30"
                  } hover:bg-gray-50`}
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-start gap-1">
                      <div className="font-medium text-primary">
                        {task.name}
                      </div>
                      <div className="text-sm text-gray-500">ID: {task.id}</div>
                    </div>
                  </td>

                  <td className="hidden md:table-cell px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          idx % 2 === 0 ? "bg-primary" : "bg-tetiary"
                        }`}
                      />
                      <span className="text-primary">{task.project}</span>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4">
                    <span
                      className={
                        task.dueDate.toLowerCase() === "tomorrow"
                          ? "text-red-600 font-medium"
                          : "text-primary"
                      }
                    >
                      {task.dueDate}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex capitalize px-3 py-1 text-sm font-medium rounded-full ${
                        task.status.toLowerCase() === "todo"
                          ? "bg-yellow-800/10 text-yellow-800"
                          : task.status.toLowerCase() === "done"
                          ? "bg-primary/10 text-primary"
                          : ""
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4">
                    {task.assignedTo?._id === user._id ? (
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center text-sm font-medium text-primary">
                          <img
                            src={task?.assignedTo?.profile}
                            alt="assignedUser"
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <span className="ml-2 text-primary">You</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center text-sm font-medium text-primary">
                          <img
                            src={
                              task?.assignedTo?.profile ||
                              "https://api.dicebear.com/8.x/avataaars/svg?seed=anonymous"
                            }
                            alt="assignedUser"
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <span className="ml-2 text-primary">
                          {task?.assignedTo?.userName || "Anonymous"}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenAction(openAction === idx ? null : idx);
                      }}
                      className="text-tetiary hover:text-primary transition-colors cursor-pointer"
                    >
                      <SlOptionsVertical />
                    </button>

                    {openAction === idx && (
                      <div
                        className="
absolute right-6 mt-2 w-36
bg-white border border-tetiary/20
rounded-lg shadow-lg z-50
"
                      >
                        <button
                          onClick={() => {
                            navigate(
                              `/dashboard/projects/${task?.project?._id}`
                            );
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-primary/10"
                        >
                          View project
                        </button>
                        {task.project._createdBy === user._id ? (
                          <>
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-primary/10">
                              Edit
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                              Delete
                            </button>
                          </>
                        ) : (
                          <button className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary/10">
                            Mark as done
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Tasks;
