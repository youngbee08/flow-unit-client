import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Users, CheckCircle2, ArrowUpRight, FolderKanban } from "lucide-react";

const ProjectCard = ({ project, cta }) => {
  const navigate = useNavigate();

  const {
    name,
    _id,
    status,
    description,
    tasks,
    teamMembers,
    members,
    progress,
  } = project;

  const statusStyles = {
    "In Progress": "bg-blue-100 text-blue-800",
    completed: "bg-primary/10 text-primary",
    pending: "bg-yellow-700/10 text-yellow-700",
    overdue: "bg-red-100 text-red-800",
    Active: "bg-green-100 text-green-800",
    active: "bg-green-100 text-green-800",
    default: "bg-gray-100 text-gray-800",
  };

  const statusClass = statusStyles[status] || statusStyles.default;

  const stats = useMemo(() => {
    const membersCount =
      members?.length ?? teamMembers?.length ?? project?.team?.length ?? 0;

    const tasksCount =
      tasks?.length ?? project?.taskCount ?? project?.totalTasks ?? 0;

    return { membersCount, tasksCount };
  }, [members, teamMembers, tasks, project]);

  const shortTitle = name?.length > 22 ? `${name.slice(0, 22)}…` : name;
  const shortDesc =
    description?.trim()?.length > 70
      ? `${description.trim().slice(0, 70)}…`
      : description?.trim() ||
        "Track tasks, progress, and deadlines in one place.";

  const defaultCTA = {
    label: "Open Project",
    onClick: () => navigate(`/dashboard/projects/${_id}`, { state: project }),
    icon: ArrowUpRight,
  };

  const finalCTA = {
    ...defaultCTA,
    ...cta,
  };

  const Icon = finalCTA.icon || ArrowUpRight;

  return (
    <div
      onClick={defaultCTA.onClick}
      className="flex group cursor-pointer flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative"
    >
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 grid place-items-center">
            <FolderKanban className="w-5 h-5 text-primary" />
          </div>

          <span
            className={`px-3 py-1.5 rounded-full capitalize text-xs font-semibold ${statusClass}`}
          >
            {status || "Unknown"}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:underline">
            {shortTitle || "Untitled Project"}
          </h3>
          <div className="w-full h-1 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-700"
              style={{
                width: `${Math.min(100, Math.max(0, Math.round(+progress)))}%`,
              }}
            />
          </div>

          <p className="text-sm text-tetiary/80 leading-snug">{shortDesc}</p>
        </div>
        <div className="flex items-center gap-5 text-xs text-tetiary/80">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>
              <span className="font-semibold text-primary">
                {stats.membersCount}
              </span>{" "}
              Members
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>
              <span className="font-semibold text-primary">
                {stats.tasksCount}
              </span>{" "}
              Tasks
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            finalCTA.onClick(project);
          }}
          className="cursor-pointer w-full mt-1 bg-primary text-white rounded-xl py-3 font-semibold text-sm hover:opacity-95 transition flex items-center justify-center gap-2"
        >
          {finalCTA.label}
          {Icon && <Icon size={16} />}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
