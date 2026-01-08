import React, { useState } from "react";
import { User, Users, Lock } from "lucide-react";
import { useUser } from "../../contexts/UserContext";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState(
    window.location.hash.slice(1) || "general"
  );

  React.useEffect(() => {
    const handleHashChange = () => {
      setActiveTab(window.location.hash.slice(1) || "general");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleTabClick = (tab) => {
    window.location.hash = tab;
  };

  const { user: stateUser } = useUser();
  const backupUser = JSON.parse(localStorage.getItem("user"));
  const user = stateUser || backupUser;
  const [profileDetails, setProfileDetails] = useState({
    name: user?.name,
    email: user?.email,
  });

  return (
    <div className="flex h-full w-full gap-5">
      <aside className="w-72 flex-shrink-0 bg-primary p-6 rounded-2xl flex flex-col gap-6 sticky top-6 self-start max-h-[calc(100vh-3rem)] overflow-y-auto">
        <div className="flex flex-col items-center gap-3">
          <img
            src={user.profile}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover ring-2 ring-white/20"
          />
          <div className="flex items-center flex-col">
            <h3 className="text-white capitalize text-xl font-bold">
              {user.name.length > 18
                ? `${user.name.slice(0, 18)}...`
                : user.name}
            </h3>
            <p className="text-white/70 text-sm">
              @
              {user.userName.length > 8
                ? `${user.userName.slice(0, 8)}...`
                : user.userName}
            </p>
          </div>
        </div>
        <nav className="flex flex-col gap-3">
          <button
            onClick={() => handleTabClick("general")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium transition-all ${
              activeTab === "general"
                ? "bg-white/15 shadow-lg"
                : "hover:bg-white/10"
            }`}
          >
            <User size={20} /> General Profile
          </button>
          <button
            onClick={() => handleTabClick("team")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium transition-all ${
              activeTab === "team"
                ? "bg-white/15 shadow-lg"
                : "hover:bg-white/10"
            }`}
          >
            <Users size={20} /> Team Info
          </button>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col gap-8 min-w-0">
        {activeTab === "general" && (
          <>
            <div className="bg-white/95 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-white/20">
              <h2 className="font-bold text-2xl text-gray-900 mb-6">
                General Information
              </h2>
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-5 py-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 mb-6 focus:outline-none focus:ring-4 focus:ring-primary transition"
                defaultValue="Alex"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-5 py-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 mb-6 focus:outline-none focus:ring-4 focus:ring-primary transition"
                defaultValue="alex.johnson@taskmaster.com"
              />
              <textarea
                placeholder="Bio / Role Description"
                className="w-full px-5 py-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:ring-4 focus:ring-primary transition"
                rows={4}
                defaultValue="Senior Project Manager with 5+ years of experience in agile methodologies."
              />
              <button className="mt-8 px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 shadow-lg transition">
                Save Changes
              </button>
            </div>

            {/* Password & Security Card */}
            <div className="bg-white/95 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-white/20">
              <h2 className="font-bold text-2xl text-gray-900 mb-6">
                Password & Security
              </h2>
              <input
                type="password"
                placeholder="Current Password"
                className="w-full px-5 py-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 mb-6 focus:outline-none focus:ring-4 focus:ring-primary transition"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="password"
                  placeholder="New Password"
                  className="px-5 py-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary transition"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="px-5 py-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary transition"
                />
              </div>
              <p className="text-sm text-gray-600 mt-3">Minimum 8 characters</p>
              <button className="mt-8 px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 shadow-lg transition">
                Update Password
              </button>
            </div>

            {/* Danger Zone Card */}
            <div className="bg-red-50/80 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-red-200">
              <h2 className="font-bold text-2xl text-red-800 mb-4">
                Danger Zone
              </h2>
              <p className="text-gray-700 mb-6">
                Once you delete your account, there is no going back. All your
                data, tasks, and team information will be permanently removed.
              </p>
              <button className="px-8 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 shadow-lg transition">
                Delete Account
              </button>
            </div>
          </>
        )}

        {activeTab === "team" && (
          <div className="bg-white/95 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-white/20">
            <h2 className="font-bold text-2xl text-gray-900 mb-6">
              Team Information
            </h2>
            <input
              type="text"
              placeholder="Team Name"
              className="w-full px-5 py-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 mb-6 focus:outline-none focus:ring-4 focus:ring-primary transition"
            />
            <textarea
              placeholder="About the Team"
              className="w-full px-5 py-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:ring-4 focus:ring-primary transition"
              rows={8}
            />
            <button className="mt-8 px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 shadow-lg transition">
              Save Team Info
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
