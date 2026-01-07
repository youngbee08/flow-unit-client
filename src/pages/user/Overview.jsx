import React, { useEffect, useState } from "react";
import OverviewCard from "../../components/cards/OverviewCard";
import ProjectCard from "../../components/cards/ProjectCard";
import { useUser } from "../../contexts/UserContext";
import TaskCard from "../../components/cards/TaskCard";
import { RxValueNone } from "react-icons/rx";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import MemberCard from "../../components/cards/MemberCard";
import { GoPeople } from "react-icons/go";
import { toast } from "sonner";
import api from "../../helpers/api";
import TaskCardSkeleton from "../../components/skeletons/TaskSkeleton";
import MemberCardSkeleton from "../../components/skeletons/MemberSkeleton";
import InviteToTeam from "../../components/modals/InviteToTeam";

const Overview = () => {
  const {
    dashboardMetrics,
    refreshUser,
    token: contextToken,
  } = useUser();
  const storedMetrics = JSON.parse(localStorage.getItem("dashboardMetrics"));
  const storedToken = localStorage.getItem("token");
  const token = contextToken || storedToken;

  const metrics = dashboardMetrics || storedMetrics;
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [fetchingAssignedTasks, setFetchingAssignedTasks] = useState(false);
  const [team, setTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [fetchingTeamMembers, setFetchingTeamMembers] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const overviewItems = [
    {
      title: "Total Projects",
      value: metrics?.total_projects,
      pageName: "All Projects",
      pageUrl: "/dashboard/projects",
    },
    {
      title: "Pending Tasks",
      value: metrics?.pending_tasks,
      pageName: "Assigned Tasks",
      pageUrl: "/dashboard/tasks",
    },
    {
      title: "Completed",
      value: metrics?.completed_projects,
      pageName: "All Projects",
      pageUrl: "/dashboard/projects",
    },
  ];

  const fetchAssignedTasks = async () => {
    setFetchingAssignedTasks(true);
    try {
      const res = await api.get("/user/findAssignedTasks");
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

  const fetchTeamMembers = async () => {
    setFetchingTeamMembers(true);
    try {
      const res = await api.get("/user/myTeam");
      if (res.status === 200) {
        if (res.data.team) {
          setTeam(res.data.team);
          if (res.data.team.members) {
            setTeamMembers(res.data.team.members);
          } else {
            setTeamMembers([]);
          }
        } else {
          setTeam(null);
        }
      }
    } catch (error) {
      // console.log("error-fetching-team-members", error);
      const message =
        error.response.data.message ||
        error.message ||
        "Failed to fetch team members";
      toast.error(message);
    } finally {
      setFetchingTeamMembers(false);
    }
  };

  
  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await api.get("/user/myProjects?type=all");
      if (res.status === 200) {
        setProjects(res.data.projects);
      }
    } catch (error) {
      console.log("errorfetchingProjects", error);
      const errmessage =
        error.response.data.message ||
        error.message ||
        "Failed to fetch project";
      toast.error(errmessage);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchAssignedTasks();
    fetchTeamMembers();
    fetchProjects()
  }, []);

  useEffect(() => {
    refreshUser(token);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5 lg:gap-7">
        <div className="flex items-center gap-3 lg:overflow-hidden overflow-x-scroll no-scrollbar justify-between">
          {overviewItems.map((item, idx) => (
            <OverviewCard item={item} key={idx} />
          ))}
        </div>
        <div className="flex items-stretch justify-between gap-5 flex-col md:flex-row sm:flex-row lg:flex-row">
          <div className="w-full relative lg:w-[65%] flex flex-col gap-5 bg-white rounded-2xl px-2 py-5 h-[350px]">
            <div className="flex px-2 justify-between items-center">
              <h2 className="text-lg lg:text-xl font-bold">Assigned Tasks</h2>
              {assignedTasks.length > 0 && (
                <Link
                  to={"/dashboard/tasks"}
                  className="text-primary text-xs lg:text-sm underline font-semibold flex gap-0 cursor-pointer items-center"
                >
                  View all
                  <ArrowUpRight size={14} />
                </Link>
              )}
            </div>
            {fetchingAssignedTasks ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TaskCardSkeleton key={i} />
              ))
            ) : assignedTasks.length === 0 ? (
              <div className="flex flex-col gap-4 items-center justify-center h-full">
                <div className="bg-tetiary/30 rounded-full text-tetiary p-6 text-xl lg:text-4xl">
                  <RxValueNone />
                </div>
                <h3 className="text-sm lg:text-[16px] font-semibold">
                  No Assigned Tasks
                </h3>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-5 max-h-[330px] overflow-y-auto styled-scrollbar pr-4">
                  {assignedTasks.map((task, idx) => (
                    <TaskCard task={task} key={idx} />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="w-full relative lg:w-[35%] flex flex-col gap-5 bg-white rounded-2xl px-2 py-5 h-[350px]">
            <div className="flex px-2 justify-between items-center">
              <h2 className="text-lg lg:text-xl font-bold">Team Members</h2>
              {team && (
                <div
                  onClick={() => setShowInviteModal(true)}
                  className="text-primary font-semibold flex gap-0 cursor-pointer items-center p-3 rounded-full hover:bg-tetiary/30"
                >
                  <FaPlus size={14} />
                </div>
              )}
            </div>
            {fetchingTeamMembers ? (
              Array.from({ length: 4 }).map((_, i) => (
                <MemberCardSkeleton key={i} />
              ))
            ) : teamMembers.length === 0 ? (
              <div className="flex flex-col gap-4 items-center justify-center h-full">
                <div className="bg-tetiary/30 rounded-full text-tetiary p-6 text-xl lg:text-4xl">
                  <GoPeople />
                </div>
                <h3 className="text-sm lg:text-[16px] font-semibold flex items-center gap-1">
                  No members yet
                  {team && (
                    <span
                      className="text-primary underline font-bold cursor-pointer"
                      onClick={() => setShowInviteModal(true)}
                    >
                      , Invite new member
                    </span>
                  )}
                </h3>
              </div>
            ) : (
              <div className="flex flex-col gap-5 max-h-[330px] overflow-y-auto styled-scrollbar pr-4">
                {teamMembers.map((member, idx) => (
                  <MemberCard member={member} key={idx} />
                ))}
              </div>
            )}
          </div>
        </div>
        {loadingProjects
          ? ""
          : projects.length > 0 && (
              <div className="w-full flex flex-col gap-5">
                <h2 className="text-lg lg:text-xl font-bold">My Projects</h2>
                <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-2 grid-row-2">
                  {projects.slice(0, 6).map((project, idx) => (
                    <ProjectCard project={project} key={idx} />
                  ))}
                </div>
              </div>
            )}
      </div>
      <InviteToTeam
        isOpen={showInviteModal}
        onCancel={() => setShowInviteModal(false)}
      />
    </>
  );
};

export default Overview;
