import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Users, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import api from "../../helpers/api";
import assets from "../../assets/assets";

function Invitation() {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);

  useEffect(() => {
    const fetchInvite = async () => {
      if (!teamId || !token) {
        setLoading(false);
        toast.error("Invalid invitation link");
        return;
      }

      try {
        setLoading(true);
        const res = await api.get(`/user/findTeam/${teamId}`);

        const teamData = res.data?.team ?? res.data;
        setTeam(teamData);
      } catch (error) {
        const errMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Invalid or expired invitation";
        toast.error(errMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchInvite();
  }, [teamId, token]);

  const handleAccept = async () => {
    if (!teamId || !token) return toast.error("Invalid invitation link");
    try {
      setActing(true);

      const res = await api.post(`/user/acceptInvitation/${teamId}/${token}`);

      if (res.status === 200) {
        toast.success("Invitation accepted 🎉");
        navigate("/dashboard/team");
      }
    } catch (error) {
      const errMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to accept invitation";
      toast.error(errMessage);
    } finally {
      setActing(false);
    }
  };

  const handleDecline = async () => {
    if (!teamId || !token) return toast.error("Invalid invitation link");
    try {
      setActing(true);

      const res = await api.post(`/user/declineInvitation/${token}`);

      if (res.status === 200) {
        toast.success("Invitation declined");
        navigate("/dashboard/overview");
      }
    } catch (error) {
      const errMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to decline invitation";
      toast.error(errMessage);
    } finally {
      setActing(false);
    }
  };

  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-gradient-to-b from-primary/10 via-white to-white px-4 py-10 font-sans text-slate-800">
      <div className="w-full max-w-[560px]">
        <div className="flex items-center lg:justify-center gap-0 mb-2 lg:mb-7">
          <div className="w-24 h-24">
            <img src={assets.DarkLogo} alt="Logo" className="w-full h-full" />
          </div>
          <span className="hidden -translate-x-4 lg:flex text-2xl font-bold text-blue-900 tracking-tight">
            FlowUnit
          </span>
        </div>

        <div className="bg-white rounded-[28px] shadow-xl shadow-slate-900/10 border border-slate-100 px-6 sm:px-10 py-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-tetiary hover:text-slate-800 transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="text-center space-y-2 mt-4">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Users className="text-primary" size={22} />
            </div>

            {loading ? (
              <>
                <h1 className="text-3xl sm:text-4xl font-bold text-primary">
                  Loading invitation...
                </h1>
                <p className="text-tetiary">Fetching team details.</p>
              </>
            ) : team ? (
              <>
                <h1 className="text-3xl sm:text-4xl font-bold text-primary">
                  Team invitation
                </h1>
                <p className="text-tetiary">
                  You’ve been invited to join{" "}
                  <span className="font-semibold text-slate-900">
                    {team?.name}
                  </span>
                  .
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl sm:text-4xl font-bold text-primary">
                  Invitation not valid
                </h1>
                <p className="text-tetiary">
                  This invitation might be expired or already used.
                </p>
              </>
            )}
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleAccept}
              disabled={loading || !team || acting}
              className="w-full bg-primary/90 hover:bg-primary text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/20
                         active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                         inline-flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={18} />
              {acting ? "Please wait..." : "Accept"}
            </button>

            <button
              type="button"
              onClick={handleDecline}
              disabled={loading || !team || acting}
              className="w-full bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold py-3.5 rounded-xl
                         active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                         inline-flex items-center justify-center gap-2"
            >
              <XCircle size={18} className="text-red-600" />
              {acting ? "Please wait..." : "Decline"}
            </button>
          </div>

          <p className="text-center text-xs text-slate-500 mt-6">
            If you don’t recognize this invite, you can safely decline it.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Invitation;
