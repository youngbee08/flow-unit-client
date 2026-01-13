import React, { useEffect, useMemo, useRef, useState } from "react";
import Modal from "./Modal";
import { User } from "lucide-react";
import { toast } from "sonner";
import api from "../../helpers/api";

const AssignTask = ({ isOpen, onCancel, teamId, taskId, onAssigned }) => {
  const [query, setQuery] = useState("");
  const [members, setMembers] = useState([]);
  const [fetchingMembers, setFetchingMembers] = useState(false);

  const [selectedMember, setSelectedMember] = useState(null);
  const [assigning, setAssigning] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const containerRef = useRef(null);
  const hasFetchedRef = useRef(false);
  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setMembers([]);
      setSelectedMember(null);
      setIsDropdownOpen(false);
      setFetchingMembers(false);
      setAssigning(false);
      hasFetchedRef.current = false;
    }
  }, [isOpen]);

  const fetchMembers = async () => {
    if (!teamId) return toast.error("Missing teamId");
    if (fetchingMembers) return;

    setFetchingMembers(true);
    try {
      const res = await api.get(`/user/myTeam`);
      if (res.status === 200) setMembers(res.data.team.members || []);
      hasFetchedRef.current = true;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch team members";
      toast.error(message);
    } finally {
      setFetchingMembers(false);
    }
  };

  const filteredMembers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => {
      const name = (m?.name || "").toLowerCase();
      const userName = (m?.userName || m?.username || "").toLowerCase();
      const email = (m?.email || "").toLowerCase();
      return name.includes(q) || userName.includes(q) || email.includes(q);
    });
  }, [members, query]);

  const assignMember = async () => {
    if (!taskId) return toast.error("Missing taskId");
    if (!selectedMember?._id) return toast.error("Select a member first");

    setAssigning(true);
    try {
      const url = `/user/assignTask?task=${encodeURIComponent(
        taskId
      )}&member=${encodeURIComponent(selectedMember._id)}`;

      const res = await api.post(url);
      if (res.status === 200) {
        toast.success(
          `${selectedMember.userName || selectedMember.name} assigned`
        );
        onCancel();
        onAssigned();
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to assign task";
      toast.error(message);
    } finally {
      setAssigning(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal customMode showClose onClose={onCancel}>
      <div
        ref={containerRef}
        className="bg-white w-[380px] rounded-2xl px-3 py-4 max-h-[340px] overflow-y-auto styled-scrollbar pr-6 flex flex-col gap-4"
      >
        <h3 className="text-sm lg:text-lg font-semibold">Assign task</h3>

        {selectedMember && (
          <div className="bg-primary/10 text-primary px-3 py-2 rounded-xl text-sm flex items-center justify-between">
            <span className="font-medium">
              Assigned to: {selectedMember.userName || selectedMember.name}
            </span>
            <button
              type="button"
              className="text-xs underline"
              onClick={() => setSelectedMember(null)}
            >
              Change
            </button>
          </div>
        )}

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-tetiary group-focus-within:text-primary transition-colors">
            <User size={20} />
          </div>

          <input
            type="text"
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-tetiary placeholder-slate-400"
            placeholder="Click to load team members, then search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setIsDropdownOpen(true);
              if (!hasFetchedRef.current) fetchMembers();
            }}
            onClick={() => {
              setIsDropdownOpen(true);
              if (!hasFetchedRef.current) fetchMembers();
            }}
            disabled={selectedMember}
          />

          {isDropdownOpen && !selectedMember && (
            <div className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-[90] overflow-hidden max-h-[180px] overflow-y-auto styled-scrollbar">
              {fetchingMembers ? (
                <div className="px-4 py-3 text-sm text-tetiary">
                  Loading team members…
                </div>
              ) : filteredMembers.length > 0 ? (
                filteredMembers.map((user) => {
                  const label = user.userName || user.username || user.name;
                  return (
                    <button
                      key={user._id}
                      type="button"
                      onClick={() => {
                        setSelectedMember(user);
                        setIsDropdownOpen(false);
                        setQuery("");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors text-left"
                    >
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                        {user.profile ? (
                          <img
                            src={user.profile}
                            alt={label}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-primary text-sm font-semibold">
                            {(label?.[0] || "?").toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="flex-1">
                        <span className="text-sm font-medium text-primary">
                          {label}
                        </span>
                        {user.email && (
                          <p className="text-xs text-tetiary">{user.email}</p>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-sm text-tetiary">
                  No team members found
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end items-center gap-4">
          <button
            className="bg-primary/10 px-3 py-2.5 cursor-pointer rounded-md"
            disabled={assigning}
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            disabled={!selectedMember || fetchingMembers || assigning}
            onClick={assignMember}
            className="bg-primary text-white px-3 py-2.5 cursor-pointer rounded-md"
          >
            {assigning ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignTask;
