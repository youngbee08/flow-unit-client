import React, { useEffect, useState } from "react";
import {
  Users,
  Plus,
  Link2,
  Zap,
  CheckCircle,
  MessageSquare,
  Circle,
  Clock,
  FolderOpen,
} from "lucide-react";
import { toast } from "sonner";
import { useUser } from "../../contexts/UserContext";
import NewTeam from "../../components/modals/NewTeam";
import api from "../../helpers/api";
import InviteToTeam from "../../components/modals/InviteToTeam";
import { GoPeople } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import TeamPageSkeleton from "../../components/skeletons/TeamPageSkeleton";

const Teams = () => {
  const { user: contextUser } = useUser();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = contextUser || storedUser;
  const [showNewTeamModal, setShowNewTeamModal] = useState(false);
  const [teamInfo, setTeamInfo] = useState(null);
  const [fetchingTeamInfo, setFetchingTeamInfo] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const navigate = useNavigate();
  const fetchTeamInfo = async () => {
    setFetchingTeamInfo(true);
    try {
      const res = await api.get("/user/myTeam");
      if (res.status === 200) {
        setTeamInfo(res.data.team);
      }
    } catch (error) {
      console.log("errorfetchingTeamInfo", error);
      const errmessage =
        error.response.data.message ||
        error.message ||
        "Failed to fetch team info";
      toast.error(errmessage);
    } finally {
      setFetchingTeamInfo(false);
    }
  };

  useEffect(() => {
    fetchTeamInfo();
  }, []);

  return user?.ownerOf ? (
    fetchingTeamInfo ? (
      <TeamPageSkeleton />
    ) : (
      <>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-3 h-40 max-h-40">
              <h2 className="text-sm lg:text-xl font-semibold text-gray-900">
                About the Team
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {teamInfo?.about}
              </p>
            </div>

            <div className="bg-white h-[350px] max-h-[350px] rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Team Members
                </h2>
                <span className="text-sm text-gray-500">
                  {teamInfo?.members.length}
                </span>
              </div>
              {teamInfo?.members.length === 0 ? (
                <div className="flex flex-col gap-4 items-center justify-center h-[70%]">
                  <div className="bg-tetiary/30 rounded-full text-tetiary p-6 text-xl lg:text-4xl">
                    <GoPeople />
                  </div>
                  <h3 className="text-sm lg:text-[16px] font-semibold flex items-center gap-1">
                    No members yet
                    {teamInfo && (
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
                  {teamInfo?.members.map((member, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-medium text-lg">
                          {member.profile}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {member.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            @{member.userName}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-2 ${
                          member.isDisabled ? "text-gray-500" : "text-primary"
                        } text-sm font-medium`}
                      >
                        <Clock size={18} />
                        <span>
                          {member.isDisabled ? "UNAVAILABLE" : "AVAILABLE"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white h-[340px] rounded-xl shadow-sm p-6 flex flex-col justify-between">
              <div className="">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Projects
                </h2>

                {teamInfo?.projects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[200px] gap-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-tetiary/20 flex items-center justify-center text-tetiary text-2xl">
                      <FolderOpen />
                    </div>

                    <h3 className="text-sm lg:text-base font-semibold text-gray-800">
                      No projects yet
                    </h3>

                    <p className="text-xs lg:text-sm text-gray-500 max-w-[220px]">
                      This team doesn’t have any projects yet. Start one to keep
                      everyone aligned.
                    </p>

                    <button
                      onClick={() => navigate("/dashboard/projects/new")}
                      className="mt-2 text-sm font-semibold text-primary underline cursor-pointer"
                    >
                      Create a project
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto styled-scrollbar">
                    {teamInfo?.projects.slice(0, 2).map((project, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-tetiary/10 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-primary">
                            {project.name}
                          </p>
                          <p className="text-sm capitalize text-tetiary mt-1">
                            {project.status}
                          </p>
                        </div>
                        <Circle
                          size={12}
                          className="text-primary fill-primary"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {teamInfo?.projects.length > 0 && (
                <button
                  onClick={() => navigate("/dashboard/projects")}
                  className="w-full mt-6 text-center rounded-3xl border border-primary py-2 cursor-pointer text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  View All Projects
                </button>
              )}
            </div>
          </div>
        </div>
        <InviteToTeam
          isOpen={showInviteModal}
          onCancel={() => setShowInviteModal(false)}
        />
      </>
    )
  ) : (
    <>
      <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-0">
        <div className="w-full max-w-full sm:max-w-[90%] lg:max-w-[70%] bg-white rounded-2xl shadow-sm p-5 sm:p-8 text-center">
          <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-indigo-50 mb-5 sm:mb-6">
            <Users className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
            No Team Members Yet?
          </h2>

          <p className="text-slate-500 text-sm mb-6 w-full sm:w-[80%] lg:w-[60%] mx-auto">
            It looks like you're flying solo. Start building your dream team by
            inviting colleagues to collaborate on projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <button
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition cursor-pointer"
              onClick={() => setShowNewTeamModal(true)}
            >
              <Plus className="w-4 h-4" />
              Create Your Own Team
            </button>

            <button
              onClick={() =>
                toast.warning(
                  "You aren't eligible to share your invite link yet."
                )
              }
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition cursor-pointer"
            >
              <Link2 className="w-4 h-4" />
              Invite via Link
            </button>
          </div>

          <div className="border-t border-tetiary/30 pt-6">
            <p className="text-xs font-semibold text-slate-400 mb-4 tracking-wide">
              WHY BUILD A TEAM?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 shrink-0">
                  <Zap className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Boost Speed
                  </p>
                  <p className="text-xs text-slate-500">
                    Get projects done faster
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 shrink-0">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Assign Tasks
                  </p>
                  <p className="text-xs text-slate-500">
                    Delegate with clarity
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-50 shrink-0">
                  <MessageSquare className="w-4 h-4 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Better Comms
                  </p>
                  <p className="text-xs text-slate-500">
                    Centralized discussions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewTeam
        isOpen={showNewTeamModal}
        onCancel={() => setShowNewTeamModal(false)}
        otherAction={fetchTeamInfo}
      />
    </>
  );
};

export default Teams;
