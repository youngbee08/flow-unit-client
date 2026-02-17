import React, { useEffect, useState } from "react";
import ProjectCard from "../../components/cards/ProjectCard";
import { useUser } from "../../contexts/UserContext";
import { GiPaperPlane } from "react-icons/gi";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import api from "../../helpers/api";
import { toast } from "sonner";
import ProjectDashboardSkeleton from "../../components/skeletons/ProjectDashboardSkeleton";

const Projects = () => {
  const { dashboardMetrics } = useUser();
  const storedMetrics = JSON.parse(localStorage.getItem("dashboardMetrics"));
  const metrics = dashboardMetrics || storedMetrics;
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await api.get("/user/myProjects?type=all");
      if (res.status === 200) {
        setProjects(res.data.projects);
      }
    } catch (error) {
      // console.log("errorfetchingProjects", error);
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
    fetchProjects();
  }, []);

  const statuses = [
    {
      name: "active",
      value: metrics?.total_projects,
      tag: "All",
      color: "primary",
    },
    {
      name: "Pending Tasks",
      value: metrics?.pending_tasks,
      tag: "! Attention",
      color: "red-600",
    },
    {
      name: "completed",
      value: metrics?.completed_projects,
      tag: "Total Completed",
      color: "tetiary/80",
    },
  ];

  return loadingProjects ? (
    <ProjectDashboardSkeleton />
  ) : projects.length === 0 ? (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="relative inline-block mb-12">
          <div className="absolute -left-4 -bottom-1 bg-primary p-3 rounded-full text-white text-sm font-bold">
            <FaCheck />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 inline-block">
            <div className="w-full mx-auto">
              <GiPaperPlane className="text-2xl lg:text-4xl text-center" />
            </div>
          </div>

          <div className="absolute -top-4 -right-8">
            <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary transition">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 4V16M4 10H16"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <h2 className="text-base lg:text-2xl font-bold mb-4">
          No Projects Yet? Let's get started!
        </h2>
        <p className="text-tetiary mb-10 leading-relaxed lg:text-sm text-xs">
          It looks like your workspace is fresh. Create your first project to
          organize tasks, collaborate with your team, and track progress
          effectively.
        </p>

        <button
          onClick={() => navigate("/dashboard/projects/new")}
          className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary transition flex items-center gap-3 mx-auto cursor-pointer shadow-lg text-xs lg:text-sm"
        >
          <div className="bg-white text-primary p-1 rounded-full">
            <svg
              width="15"
              height="15"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 4V16M4 10H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          Create Your First Project
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-5">
      <div className="bg-white px-4 py-4.5 shadow-lg flex justify-between items-center rounded-xl">
        <div className="w-full lg:w-[40%] flex flex-col gap-2">
          <h2 className="text-sm lg:text-[17px] font-semibold">
            Your Project Landscape
          </h2>
          <p className="text-tetiary/80 font-medium text-xs lg:text-sm">
            Welcome to your project command center. Review the status of your
            active initiatives, track upcoming deadlines, and ensure team
            alignment. Use this space to maintain organized and efficient
            workflows across all departments.
          </p>
        </div>
        <div className="lg:flex items-center gap-4 hidden">
          {statuses.map((status, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <h3 className="uppercase text-tetiary/80 font-bold text-xs lg:text-sm">
                {status.name}
              </h3>
              <div className="flex items-center gap-2">
                <h2 className={`text-${status.color} text-3xl font-bold`}>
                  {status.value}
                </h2>
                <h4
                  className={`text-${status.color} text-xs lg:text-sm font-bold`}
                >
                  {status.tag}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-2 grid-row-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
