import React, { useEffect, useState } from "react";
import api from "../../helpers/api";
import { toast } from "sonner";
import ProjectCard from "../../components/cards/ProjectCard";
import { FaFileImport } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ProjectDashboardSkeleton from "../../components/skeletons/ProjectDashboardSkeleton";

const TaskSmartGenerator = () => {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const navigate = useNavigate();

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
  const handleImport = (project) => {
    const loading = toast.loading(`Importing project "${project.name}"`);

    setTimeout(() => {
      toast.success("Project imported successfully!", { id: loading });
      navigate(`/dashboard/projects/${project._id}/ai/addTask`);
    }, 3000);
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div className="flex flex-col gap-6">
      {projects && (
        <div className="flex flex-col gap-2">
          <h2 className="text-base lg:text-xl font-bold text-primary">
            Import Projects
          </h2>
          <p className="text-sm text-tetiary/80 max-w-xl">
            Import available projects and enhance them with AI-generated task
            breakdowns designed to accelerate execution and improve
            clarity.{" "}
          </p>
        </div>
      )}

      {loadingProjects ? (
        <ProjectDashboardSkeleton />
      ) : !projects || projects.length === 0 ? (
        <div className="h-[70vh] flex flex-col items-center justify-center text-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <FaFileImport className="text-primary text-xl" />
          </div>

          <h3 className="text-lg font-semibold text-primary">
            No Projects Available
          </h3>

          <p className="text-sm text-tetiary/80 max-w-md">
            There are currently no projects available to import. Please check
            back later or create a new project instead.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              cta={{
                label: "Import Project",
                icon: FaFileImport,
                onClick: (project) => handleImport(project),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskSmartGenerator;
