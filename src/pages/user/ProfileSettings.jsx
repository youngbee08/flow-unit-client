import React, { useEffect, useState } from "react";
import { User, Lock, Users, AlertTriangle } from "lucide-react";
import { useUser } from "../../contexts/UserContext";
import { useFormik } from "formik";
import {
  PasswordValidationSchema,
  ProfileDetailsValidationSchema,
  TeamValidationSchema,
} from "../../helpers/ProfileValidationSchema";
import { toast } from "sonner";
import api from "../../helpers/api";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/modals/ConfirmDialog";

const ProfileSettings = () => {
  const { user: stateUser } = useUser();
  const backupUser = JSON.parse(localStorage.getItem("user"));
  const user = stateUser || backupUser;

  const appVersion = import.meta.env.VITE_APP_VERSION || "1.0.0";
  const navigate = useNavigate();
  const [teamInfo, setTeamInfo] = useState(null);
  const [fetchingTeamInfo, setFetchingTeamInfo] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

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

  const generalInformationFormik = useFormik({
    initialValues: {
      name: user.name || "",
      userName: user.userName || "",
    },
    enableReinitialize: true,
    validationSchema: ProfileDetailsValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const res = await api.patch("/user/updateProfile", values);
        if (res.status === 200) {
          toast.success("Profile updated successfully");
          navigate("/dashboard/overview");
        }
      } catch (error) {
        // console.log("errorUpdatingProfile", error);
        const errmessage =
          error.response.data.message ||
          error.message ||
          "Failed to update profile";
        toast.error(errmessage);
      }
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    enableReinitialize: true,
    validationSchema: PasswordValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const res = await api.patch("/user/updatePassword", values);
        if (res.status === 200) {
          toast.success("Password updated successfully");
          navigate("/dashboard/overview");
        }
      } catch (error) {
        // console.log("errorUpdatingpassword", error);
        const errmessage =
          error.response.data.message ||
          error.message ||
          "Failed to update password";
        toast.error(errmessage);
      }
    },
  });

  const teamFormik = useFormik({
    initialValues: {
      name: teamInfo?.name || "",
      about: teamInfo?.about || "",
    },
    enableReinitialize: true,
    validationSchema: TeamValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const res = await api.patch("/user/updateTeamInfo", values);
        if (res.status === 200) {
          toast.success("Team info updated successfully");
          navigate("/dashboard/overview");
        }
      } catch (error) {
        // console.log("errorUpdatingTeamInfo", error);
        const errmessage =
          error.response.data.message ||
          error.message ||
          "Failed to update team info";
        toast.error(errmessage);
      }
    },
  });

  const deleteAccount = async () => {
    setDeletingAccount(true);
    try {
      const res = await api.delete("/user/deleteAccount");
      if (res.status === 200) {
        toast.success("Account deleted successfully");
        localStorage.removeItem("dashboardMetrics")
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        navigate("/");
      }
    } catch (error) {
      // console.log("errorDeletingAccount", error);
      const errmessage =
        error.response.data.message ||
        error.message ||
        "Failed to delete account";
      toast.error(errmessage);
    } finally {
      setDeletingAccount(false);
    }
  };

  useEffect(() => {
    fetchTeamInfo();
  }, []);

  return (
    <>
      <div className="relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/95 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-white/20 lg:col-span-2">
            <div className="flex items-center gap-1 mb-6">
              <User className="text-primary text-[14px] lg:text-[28px]" />
              <h2 className="font-bold text-base lg:text-xl text-gray-900">
                General Information
              </h2>
            </div>

            <form
              className="space-y-6"
              onSubmit={generalInformationFormik.handleSubmit}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  id="name"
                  name="name"
                  className="w-full px-5 py-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary transition"
                  onChange={generalInformationFormik.handleChange}
                  onBlur={generalInformationFormik.handleBlur}
                  value={generalInformationFormik.values.name}
                />
                {generalInformationFormik.touched.name &&
                  generalInformationFormik.errors.name && (
                    <span className="text-xs font-medium text-red-500">
                      {generalInformationFormik.errors.name}
                    </span>
                  )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  id="userName"
                  name="userName"
                  className="w-full px-5 py-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary transition"
                  onChange={generalInformationFormik.handleChange}
                  onBlur={generalInformationFormik.handleBlur}
                  value={generalInformationFormik.values.userName}
                />
                {generalInformationFormik.touched.userName &&
                  generalInformationFormik.errors.userName && (
                    <span className="text-xs font-medium text-red-500">
                      {generalInformationFormik.errors.userName}
                    </span>
                  )}
                <p className="mt-2 text-xs lg:text-sm text-amber-600 bg-amber-50 p-3 rounded-xl border border-amber-200">
                  Changing your username will also update your profile avatar
                  and mention links across the platform.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  disabled
                  className="w-full px-5 py-4 rounded-xl bg-gray-200/70 text-gray-500 cursor-not-allowed border border-gray-300"
                  defaultValue={user?.email || ""}
                />
              </div>

              <button
                type="submit"
                disabled={generalInformationFormik.isSubmitting}
                className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 shadow-lg transition"
              >
                {generalInformationFormik.isSubmitting
                  ? "Saving Changes..."
                  : "Save Changes"}
              </button>
            </form>
          </div>

          <form
            onSubmit={passwordFormik.handleSubmit}
            className="bg-white/95 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-primary text-[14px] lg:text-[28px]" />
              <h2 className="font-bold text-base lg:text-xl text-gray-900">
                Password & Security
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Current Password"
                  id="oldPassword"
                  name="oldPassword"
                  className="w-full px-5 py-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary transition"
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.oldPassword}
                />
                {passwordFormik.touched.oldPassword &&
                  passwordFormik.errors.oldPassword && (
                    <span className="text-xs font-medium text-red-500">
                      {passwordFormik.errors.oldPassword}
                    </span>
                  )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="New Password"
                    id="newPassword"
                    name="newPassword"
                    className="w-full px-5 py-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary transition"
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    value={passwordFormik.values.newPassword}
                  />
                  {passwordFormik.touched.newPassword &&
                    passwordFormik.errors.newPassword && (
                      <span className="text-xs font-medium text-red-500">
                        {passwordFormik.errors.newPassword}
                      </span>
                    )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    className="w-full px-5 py-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary transition"
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    value={passwordFormik.values.confirmNewPassword}
                  />
                  {passwordFormik.touched.confirmNewPassword &&
                    passwordFormik.errors.confirmNewPassword && (
                      <span className="text-xs font-medium text-red-500">
                        {passwordFormik.errors.confirmNewPassword}
                      </span>
                    )}
                </div>
              </div>

              <p className="text-sm text-gray-600">Minimum 8 characters</p>

              <button
                type="submit"
                disabled={passwordFormik.isSubmitting || !passwordFormik.values}
                className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 shadow-lg transition"
              >
                {passwordFormik.isSubmitting
                  ? "Updating Password..."
                  : "Update Password"}
              </button>
            </div>
          </form>

          <div className="bg-white/95 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-primary text-[14px] lg:text-[28px]" />
              <h2 className="font-bold text-base lg:text-xl text-gray-900">
                Team Information
              </h2>
            </div>
            {user?.ownerOf ? (
              <form onSubmit={teamFormik.handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team Name
                  </label>
                  <input
                    type="text"
                    placeholder="Team Name"
                    id="name"
                    name="name"
                    className="w-full px-5 py-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary transition"
                    onChange={teamFormik.handleChange}
                    onBlur={teamFormik.handleBlur}
                    value={teamFormik.values.name}
                  />
                  {teamFormik.touched.name && teamFormik.errors.name && (
                    <span className="text-xs font-medium text-red-500">
                      {teamFormik.errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About the Team
                  </label>
                  <textarea
                    placeholder="Describe your team, mission, or purpose..."
                    id="about"
                    name="about"
                    className="w-full px-5 py-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:ring-4 focus:ring-primary transition"
                    rows={6}
                    onChange={teamFormik.handleChange}
                    onBlur={teamFormik.handleBlur}
                    value={teamFormik.values.about}
                  />
                  {teamFormik.touched.about && teamFormik.errors.about && (
                    <span className="text-xs font-medium text-red-500">
                      {teamFormik.errors.about}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={fetchingTeamInfo || teamFormik.isSubmitting}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 shadow-lg transition"
                >
                  {teamFormik.isSubmitting
                    ? "Saving Team Info..."
                    : "Save Team Info"}
                </button>
              </form>
            ) : (
              <>
                <div className="text-center py-12">
                  <h3 className="text-sm lg:text-xl font-medium text-gray-900 mb-4">
                    No team membership found
                  </h3>

                  <p className="text-xs lg:text-sm text-gray-600 mb-8">
                    You need to be part of a team to access team features.
                  </p>

                  <Link
                    to="/dashboard/team"
                    className="inline-flex px-10 py-3.5 bg-primary text-white font-semibold 
               rounded-xl hover:bg-primary/90 transition shadow-sm"
                  >
                    Create a Team →
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="bg-red-50/80 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-red-200 lg:col-span-2 mt-4 mb-18 lg:mb-9">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle size={28} className="text-red-600" />
              <h2 className="font-bold text-2xl text-red-800">Danger Zone</h2>
            </div>

            <p className="text-gray-700 mb-8 text-xs lg:text-base">
              Once you delete your account, there is no going back. All your
              data, tasks, and team information will be permanently removed.
            </p>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-8 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 shadow-lg transition"
            >
              Delete Account
            </button>
          </div>
        </div>

        <div className="absolute -bottom-1 lg:-bottom-11 w-full mx-auto border-gray-200 text-center text-xs text-gray-500">
          <p>FlowUnit • Version {appVersion}</p>
          <p className="mt-1">
            Developed with passion by{" "}
            <a
              className="text-xs underline"
              href="mailto:hello@zenithdevtech.name.ng
"
            >
              Zenith Dev
            </a>{" "}
          </p>
        </div>
      </div>
      <ConfirmDialog
        title="Are you sure you want to delete your account"
        message="Confirming this button will delete all your information on this account permanently."
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={deleteAccount}
        isLoading={deletingAccount}
      />
    </>
  );
};

export default ProfileSettings;
