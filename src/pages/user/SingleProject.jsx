import React, { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { formatSmartDate } from "../../utilities/FormatterUtility";
import { BsCalendar, BsCalendarX } from "react-icons/bs";
import { useUser } from "../../contexts/UserContext";
import { SlOptionsVertical } from "react-icons/sl";
import api from "../../helpers/api";
import { toast } from "sonner";
import SingleProjectSkeleton from "../../components/skeletons/SingleProjectSkeleton";
import ConfirmDialog from "../../components/modals/ConfirmDialog";
import EditTask from "../../components/modals/EditTask";
import EditProject from "../../components/modals/EditProject";

const SingleProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [fetchingProjectDetails, setFetchingProjectDetails] = useState(false);
  const [openAction, setOpenAction] = useState(null);
  const { user: contextUser } = useUser();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = contextUser || storedUser;
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completingTask, setCompletingTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditProjectModal, setShowProjectEditModal] = useState(false);
  const [showDeleteProjectModal, setShowProjectDeleteModal] = useState(false);
  const [deletingProject, setDeletingProject] = useState(false);

  const fetchProjectDetails = async () => {
    setFetchingProjectDetails(true);
    try {
      const res = await api.get(`/user/project/${id}`);
      if (res.status === 200) {
        setProject(res.data.project);
      }
    } catch (error) {
      console.log("errorfetchingProjectDetails", error);
      const errMessage =
        error.response.data.message ||
        error.message ||
        "Failed to fetch product details";
      toast.error(errMessage);
    } finally {
      setFetchingProjectDetails(false);
    }
  };

  const completeTask = async () => {
    setCompletingTask(true);
    try {
      const res = await api.patch(`/user/updateTask/${selectedTask._id}`, {
        projectID: project._id,
        status: "done",
      });
      if (res.status === 200) {
        toast.success("Task completed successful");
        fetchProjectDetails();
        setShowCompleteModal(false);
      }
    } catch (error) {
      // console.log("errorCompletingTask", error);
      const errMessage =
        error.response.data.message ||
        error.message ||
        "Failed to complete task";
      toast.error(errMessage);
    } finally {
      setCompletingTask(false);
    }
  };

  const deleteTask = async () => {
    setDeletingTask(true);
    try {
      const res = await api.delete(
        `/user/deleteTask?taskID=${selectedTask?._id}&projectID=${project?._id}`
      );
      if (res.status === 200) {
        toast.success("Task deleted successful");
        fetchProjectDetails();
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.log("errorDeletingTask", error);
      const errMessage =
        error.response.data.message || error.message || "Failed to delete task";
      toast.error(errMessage);
    } finally {
      setDeletingTask(false);
    }
  };

  const deleteProject = async () => {
    setDeletingProject(true);
    try {
      const res = await api.delete(`/user/deleteProject/${project._id}`);
      if (res.status === 200) {
        toast.success("Project deleted successful");
        location.replace("/dashboard/overview");
        setShowProjectDeleteModal(false);
      }
    } catch (error) {
      console.log("errorDeletingProject", error);
      const errMessage =
        error.response.data.message ||
        error.message ||
        "Failed to delete project";
      toast.error(errMessage);
    } finally {
      setDeletingProject(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  useEffect(() => {
    const close = () => setOpenAction(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    document.title = `${project?.name ? project?.name : ""} - FlowUnit`;
  }, [project?.name]);

  if (fetchingProjectDetails) return <SingleProjectSkeleton />;

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary text-2xl font-bold">!</span>
        </div>

        <h2 className="text-lg lg:text-xl font-bold text-primary">
          Project not found
        </h2>

        <p className="text-sm text-tetiary max-w-sm px-4">
          The project you’re trying to access doesn’t exist or may have been
          removed.
        </p>
        <Link
          to={"/dashboard/projects"}
          className="mt-3 px-4 py-2 text-sm rounded-xl bg-primary text-white transition cursor-pointer"
        >
          Go back to projects
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-9 lg:gap-5">
        <div className="px-4 py-4.5 bg-white  rounded-lg w-full flex flex-col gap-4 shadow-lg">
          <div className="flex justify-between items-start lg:items-center gap-4 border-b border-tetiary/20 lg:pb-5 pb-3">
            <div className="flex flex-col gap-1 w-[65%]">
              <h2 className="text-base md:text-xl lg:text-2xl font-bold">
                {project.name}
              </h2>
              <h5 className="text-xs lg:text-sm font-medium text-tetiary hidden md:flex lg:flex">
                {project.description.length > 40
                  ? `${project.description.slice(0, 40)}...`
                  : project.description}
              </h5>
              <h5 className="text-xs lg:text-sm font-medium text-tetiary sm:flex flex lg:hidden md:hidden">
                {project.description.length > 15
                  ? `${project.description.slice(0, 15)}...`
                  : project.description}
              </h5>
            </div>
            <div className="flex items-center gap-3 w-[35%] justify-end">
              <button
                className="bg-tetiary/10 border border-tetiary px-3 py-2 rounded-md cursor-pointer font-semibold hidden sm:flex md:flex lg:flex items-center gap-3"
                onClick={() => setShowProjectEditModal(true)}
              >
                <FaPen size={13} />
                Edit
              </button>
              <button
                className="bg-red-600/10 border border-red-600/20 text-red-600 px-3 py-2 rounded-md cursor-pointer font-semibold hidden sm:flex md:flex lg:flex items-center gap-3"
                onClick={() => setShowProjectDeleteModal(true)}
              >
                <FaTrash size={13} />
                Delete
              </button>
              <button
                className="bg-tetiary/10 border border-tetiary px-3 py-2 rounded-md cursor-pointer font-semibold flex sm:hidden md:hidden lg:hidden items-center gap-3"
                onClick={() => setShowProjectEditModal(true)}
              >
                <FaPen size={13} />
              </button>
              <button
                className="bg-red-600/10 border border-red-600/20 text-red-600 px-3 py-2 rounded-md cursor-pointer font-semibold flex sm:hidden md:hidden lg:hidden items-center gap-3"
                onClick={() => setShowProjectDeleteModal(true)}
              >
                <FaTrash size={13} />
              </button>
            </div>
          </div>
          <div className="flex lg:items-center gap-6 lg:gap-13 lg:justify-between md:justify-between w-full lg:flex-row flex-col md:flex-row">
            <div className="flex flex-col gap-1 lg:w-1/2 md:w-1/2">
              <div className="flex justify-between w-full">
                <h2 className="text-sm lg:text-base font-semibold">
                  Project Progress
                </h2>
                <h2 className="text-xl lg:text-2xl font-bold">
                  {Math.round(+project.progress)}%
                </h2>
              </div>
              <div className="w-full">
                <progress
                  className="w-full h-2 rounded-full [&::-webkit-progress-value]:bg-primary [&::-webkit-progress-bar]:bg-gray-200 [&::-moz-progress-bar]:bg-primary"
                  max={100}
                  value={project.progress}
                  aria-label={`Project progress: ${project.progress}%`}
                />
              </div>
            </div>
            <div className="flex flex-col gap-0 w-1/2">
              <h2 className="text-tetiary uppercase font-bold text-sm lg:text-base">
                Timeline
              </h2>
              <div className="flex flex-col gap-1">
                <h3 className="text-tetiary text-xs lg:text-sm font-semibold flex items-center gap-1">
                  <BsCalendar />
                  Created:{" "}
                  <span className="text-primary">
                    {formatSmartDate(project.createdAt)}
                  </span>
                </h3>
                <h3 className="text-tetiary text-xs lg:text-sm font-semibold flex items-center gap-1">
                  <BsCalendarX />
                  Due:{" "}
                  <span className="text-primary">
                    {formatSmartDate(project.dueDate)}
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <h2 className="text-base lg:text-xl font-bold">Tasks</h2>
              {project.tasks && (
                <h4 className="bg-primary/20 text-xs lg:text-sm font-medium rounded-lg px-2">
                  {project?.tasks?.length} Total
                </h4>
              )}
            </div>
            <div className="">
              <Link
                to={`/dashboard/projects/${project?._id}/addTask`}
                className="bg-primary px-5 py-2 rounded-xl cursor-pointer text-white text-xs font-semibold lg:text-sm shadow-lg flex items-center gap-2"
              >
                <FaPlus /> New Task
              </Link>
            </div>
          </div>
          <div className="bg-white w-[98%] mx-auto rounded-lg shadow overflow-x-auto styled-scrollbar">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-tetiary/30">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-tetiary/80">
                    TASK NAME
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
              {project.tasks.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={6} className="py-16">
                      <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <h4 className="text-lg font-semibold text-primary">
                          No tasks found
                        </h4>

                        <p className="text-sm text-tetiary max-w-xs px-3">
                          You don’t have any tasks yet. Tasks will appear here
                          once they’re created or assigned to you.
                        </p>

                        <Link
                          to={`/dashboard/projects/${project?._id}/addTask`}
                          className="cursor-pointer
            mt-2 px-4 py-2 rounded-xl
            bg-primary text-white text-sm
            hover:bg-primary/90 transition
          "
                        >
                          Create task
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {project.tasks.map((task, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        idx + 1 !== project.tasks.length &&
                        "border-b border-tetiary/30"
                      } hover:bg-gray-50`}
                      onMouseOver={() => setSelectedTask(task)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-start gap-1">
                          <div className="font-medium text-primary">
                            {task.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: TS-{task?._id?.slice(0, 4)}
                          </div>
                        </div>
                      </td>

                      <td className="hidden lg:table-cell px-6 py-4">
                        <span
                          className={
                            formatSmartDate(task.dueDate).toLowerCase() ===
                              "tomorrow" ||
                            formatSmartDate(task.dueDate).toLowerCase() ===
                              "today"
                              ? "text-red-600 font-medium"
                              : "text-primary"
                          }
                        >
                          {formatSmartDate(task.dueDate)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex capitalize px-3 py-1 text-sm font-medium rounded-full ${
                            task?.status?.toLowerCase() === "todo"
                              ? "bg-yellow-800/10 text-yellow-800"
                              : task?.status?.toLowerCase() === "done"
                              ? "bg-primary/10 text-primary"
                              : ""
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="hidden lg:table-cell px-6 py-4">
                        {task.assignedTo === user._id ? (
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center text-sm font-medium text-primary">
                              <img
                                src={user?.profile}
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
                            {project.createdBy === user._id ? (
                              <>
                                {task.status === "todo" && (
                                  <>
                                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-primary/10">
                                      Re-assign task
                                    </button>
                                    <button
                                      onClick={() => setShowEditModal(true)}
                                      className="w-full text-left px-4 py-2 text-sm hover:bg-primary/10"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => setShowCompleteModal(true)}
                                      className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary/10"
                                    >
                                      Mark as done
                                    </button>
                                  </>
                                )}

                                <button
                                  onClick={() => setShowDeleteModal(true)}
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  Delete
                                </button>
                              </>
                            ) : task.assignedTo === user._id ? (
                              task.status === "todo" && (
                                <button
                                  onClick={() => setShowCompleteModal(true)}
                                  className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary/10"
                                >
                                  Mark as done
                                </button>
                              )
                            ) : null}
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
      </div>
      <ConfirmDialog
        isOpen={showCompleteModal}
        title="Update task's status?"
        message="Confirming the button below will mark this task as done permanently."
        onCancel={() => setShowCompleteModal(false)}
        isLoading={completingTask}
        onConfirm={completeTask}
      />
      <ConfirmDialog
        isOpen={showDeleteModal}
        title="Delete Task"
        message="Confirming the button below will delete this task permanently."
        onCancel={() => setShowDeleteModal(false)}
        isLoading={deletingTask}
        onConfirm={deleteTask}
      />
      <ConfirmDialog
        isOpen={showDeleteProjectModal}
        title="Delete Project"
        message="Confirming the button below will delete this project permanently."
        onCancel={() => setShowProjectDeleteModal(false)}
        isLoading={deletingProject}
        onConfirm={deleteProject}
      />
      <EditTask
        onCancel={() => setShowEditModal(false)}
        isOpen={showEditModal}
        task={selectedTask}
        otherAction={fetchProjectDetails}
        optionalID={project._id}
      />
      <EditProject
        isOpen={showEditProjectModal}
        onCancel={() => setShowProjectEditModal(false)}
        project={project}
        otherAction={fetchProjectDetails}
      />
    </>
  );
};

export default SingleProject;
