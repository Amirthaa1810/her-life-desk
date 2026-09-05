"use client";

import { FiCheckCircle, FiCircle } from "react-icons/fi";

const roadmap = [
  {
    phase: "Month 1 — KNOW",
    emoji: "🌱",
    tasks: [
      { id: 101, title: "Learn basic legal rights", xp: 50 },
      { id: 102, title: "Learn financial fundamentals", xp: 50 },
      { id: 103, title: "Learn digital-security practices", xp: 45 },
    ],
  },
  {
    phase: "Month 2 — ORGANIZE",
    emoji: "📁",
    tasks: [
      { id: 104, title: "Organize important documents", xp: 60 },
      { id: 105, title: "Review financial records", xp: 40 },
      { id: 106, title: "Learn about nominations", xp: 45 },
      { id: 107, title: "Understand basic ownership concepts", xp: 50 },
    ],
  },
  {
    phase: "Month 3 — GROW",
    emoji: "🚀",
    tasks: [
      { id: 108, title: "Identify career opportunities", xp: 45 },
      { id: 109, title: "Identify skill gaps", xp: 35 },
      { id: 110, title: "Learn relevant skills", xp: 60 },
      { id: 111, title: "Explore entrepreneurship opportunities", xp: 50 },
      { id: 112, title: "Connect with mentors/experts", xp: 40 },
    ],
  },
];

export default function RoadmapTimeline({
  completed,
  onToggle,
}: {
  completed: number[];
  onToggle: (id: number) => void;
}) {
  return (
    <div className="mt-6 space-y-8">
      {roadmap.map((phase) => (
        <div key={phase.phase}>
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <span className="text-lg">{phase.emoji}</span> {phase.phase}
          </h3>
          <div className="mt-3 space-y-2">
            {phase.tasks.map((task) => {
              const done = completed.includes(task.id);
              return (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => onToggle(task.id)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                    done
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {done ? (
                      <FiCheckCircle className="h-5 w-5 shrink-0 text-emerald-500" />
                    ) : (
                      <FiCircle className="h-5 w-5 shrink-0 text-slate-300" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        done ? "text-emerald-700 line-through" : "text-slate-700"
                      }`}
                    >
                      {task.title}
                    </span>
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    +{task.xp} XP
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}