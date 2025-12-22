import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { User } from "lucide-react";
import { toast } from "sonner";
import api from "../../helpers/api";

const InviteToTeam = ({ isOpen, onCancel }) => {
  if (!isOpen) return null;
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const findUser = async () => {
    setFetchingUsers(true);
    try {
      const res = await api.get(`/user/findUser/${username}`);
      if (res.status === 200 || res.status === 404) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log("error-finding-users", error);
      const message =
        error.response.data.message || error.message || "Failed to find users";
      toast.error(message);
    } finally {
      setFetchingUsers(false);
    }
  };
  useEffect(() => {
    if (username.trim()) {
      findUser();
    } else {
      setUsers([]);
    }
  }, [username]);

  return (
    <Modal customMode showClose onClose={onCancel}>
      <div className="bg-white w-[350px] rounded-2xl px-3 py-4 max-h-[300px] overflow-y-auto styled-scrollbar pr-6 flex flex-col gap-4">
        <h3 className="text-sm lg:text-lg font-semibold">Invite new member</h3>
        <div className="flex flex-col gap-9">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-tetiary group-focus-within:text-primary transition-colors">
              <User size={20} />
            </div>
            <input
              type="text"
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-tetiary placeholder-slate-400"
              placeholder="Provide user username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                e.key === "Backspace" && setSelectedUser(null);
              }}
            />
            {username && !selectedUser && (
              <div className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-[90] overflow-hidden">
                {fetchingUsers ? (
                  <div className="px-4 py-3 text-sm text-tetiary">
                    Searching…
                  </div>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => setSelectedUser(user)}
                      className="
            w-full flex items-center gap-3 px-4 py-3
            hover:bg-primary/10 transition-colors
            text-left
          "
                    >
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden cursor-pointer">
                        {user.profile ? (
                          <img
                            src={user.profile}
                            alt={user.userName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-primary text-sm font-semibold">
                            {user.userName[0]?.toUpperCase()}
                          </span>
                        )}
                      </div>

                      <span className="text-sm font-medium text-primary">
                        {user.userName}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-tetiary">
                    No users found
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-end items-center gap-4">
            <button
              className="bg-primary/10 px-3 py-2.5 cursor-pointer rounded-md"
              onClick={() => {
                onCancel();
              }}
            >
              Cancel
            </button>
            <button
              disabled={!selectedUser || fetchingUsers}
              className="bg-primary text-white px-3 py-2.5 cursor-pointer rounded-md"
            >
              Invite
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InviteToTeam;
