import React, { useEffect, useMemo, useState } from "react";
import { Sparkles, CheckCircle2, Loader2 } from "lucide-react";

const DEFAULT_STEPS = [
  { title: "Analyzing project", desc: "Reading project context and goals…" },
  { title: "Understanding requirements", desc: "Extracting key deliverables…" },
  { title: "Generating tasks", desc: "Creating task list with priorities…" },
  { title: "Organizing structure", desc: "Grouping tasks into milestones…" },
  { title: "Finalizing output", desc: "Cleaning up and preparing your list…" },
];

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const TaskGenLoading = ({
  steps = DEFAULT_STEPS,
  intervalMs = 1400,
  loop = true,
  title = "Generating tasks with AI",
  subtitle = "Hang tight, we’re building a clear plan for your project.",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev + 1;
        if (next >= steps.length) return loop ? 0 : prev;
        return next;
      });
    }, intervalMs);

    return () => clearInterval(t);
  }, [steps.length, intervalMs, loop]);

  const progressPct = useMemo(() => {
    const base = (activeIndex + 1) / steps.length;
    return clamp(Math.round(base * 100), 5, 95);
  }, [activeIndex, steps.length]);

  return (
    <div className="w-full">
      <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 grid place-items-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-primary">
                {title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Working…
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Progress</span>
            <span>{progressPct}%</span>
          </div>

          <div className="h-2 w-full rounded-full bg-black/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {steps.map((s, idx) => {
            const isDone = idx < activeIndex;
            const isActive = idx === activeIndex;

            return (
              <div
                key={s.title}
                className={`flex items-start gap-3 rounded-2xl border p-3 transition
                  ${
                    isActive
                      ? "border-primary/25 bg-primary/5"
                      : "border-black/5 bg-white"
                  }`}
              >
                <div className="pt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : isActive ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-black/15" />
                  )}
                </div>

                <div className="min-w-0">
                  <p
                    className={`font-semibold ${
                      isActive ? "text-primary" : "text-primary/90"
                    }`}
                  >
                    {s.title}
                    {isActive ? "…" : ""}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            Tip: You can keep this tab open, results will appear automatically.
          </p>

          <div className="sm:hidden flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Working…
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskGenLoading;
