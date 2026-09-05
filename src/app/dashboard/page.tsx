"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiBookOpen,
  FiBriefcase,
  FiUsers,
  FiMessageCircle,
  FiFileText,
} from "react-icons/fi";
import {
  currentUser,
  pillars,
  getLevelInfo,
  documentReadiness,
} from "@/lib/data";
import ProgressRing from "@/components/ui/ProgressRing";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import RoadmapTimeline from "@/components/RoadmapTimeline";

export default function Dashboard() {
  const [completedActions, setCompletedActions] = useState(1);
  const [otherTasksDone, setOtherTasksDone] = useState<number[]>([]);
  const overallIndex = Math.round(
    pillars.reduce((sum, p) => sum + p.score, 0) / pillars.length
  );
  const { level, tier, tierEmoji, nextAt, tierColor } = getLevelInfo(currentUser.xp);
  const xpToNext = nextAt - currentUser.xp;

  const toggleTask = (id: number) =>
    setOtherTasksDone((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );

  const strongest = [...pillars].sort((a, b) => b.score - a.score)[0];
  const weakest = [...pillars].sort((a, b) => a.score - b.score)[0];

  return (
    <div>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {currentUser.displayName} 🌸
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here's where you stand and what to do next.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Empowerment Index */}
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <ProgressRing
                    value={overallIndex}
                    size={110}
                    color="#7c3aed"
                    label={`${overallIndex}/100`}
                    subLabel="Her Empowerment Index"
                  />
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      HER EMPOWERMENT INDEX
                    </h2>
                    <p className="mt-1 text-sm text-emerald-600">
                      ▲ +{currentUser.indexGrowth} this month
                    </p>
                    <p className="mt-1 max-w-xs text-xs text-slate-500">
                      Your current readiness snapshot — not a judgment.
                    </p>
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                  🔥
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {pillars.map((p) => (
                  <div
                    key={p.key}
                    className="rounded-xl border border-slate-100 bg-slate-50/50 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{p.icon}</span>
                      <span className="text-sm font-bold" style={{ color: p.color }}>
                        {p.score}%
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] font-semibold text-slate-600">
                      {p.label}
                    </p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${p.score}%`, background: p.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-emerald-50 px-4 py-3 ring-1 ring-emerald-100">
                  <p className="text-xs font-semibold text-emerald-700">
                    🟢 Your strongest area
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {strongest.label}
                  </p>
                </div>
                <div className="rounded-xl bg-rose-50 px-4 py-3 ring-1 ring-rose-100">
                  <p className="text-xs font-semibold text-rose-700">
                    🔴 Area needing attention
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {weakest.label}
                  </p>
                </div>
                <div className="rounded-xl bg-amber-50 px-4 py-3 ring-1 ring-amber-100">
                  <p className="text-xs font-semibold text-amber-700">
                    🎯 Biggest opportunity
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    Financial Independence
                  </p>
                </div>
              </div>
            </Card>

            {/* Next best action */}
            <Card className="relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet-600 to-rose-500" />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Badge tone="info">🎯 YOUR NEXT BEST ACTION</Badge>
                  <h2 className="mt-3 text-xl font-bold text-slate-900">
                    Review your important document organization
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Your profile indicates you have financial and ownership
                    interests but haven't yet organized your important records.
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-400">
                    <FiClock className="h-3.5 w-3.5" /> 5 minutes · +60 XP
                  </div>
                </div>
                <Link
                  href="/ownership"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-transform hover:scale-[1.02]"
                >
                  Start 5-Minute Checklist
                  <FiArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-rose-500"
                    style={{ width: `${(completedActions / 7) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {completedActions}/7 recommended actions completed
                </span>
              </div>
            </Card>

            {/* Roadmap */}
            <Card>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900">
                  Your 90-Day Empowerment Roadmap
                </h2>
                <span className="text-sm font-medium text-slate-500">
                  {otherTasksDone.length + currentUser.roadmapDone}/{currentUser.roadmapTotal} tasks
                </span>
              </div>
              <RoadmapTimeline
                completed={otherTasksDone}
                onToggle={toggleTask}
              />
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Level */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Level
                  </p>
                  <p className="mt-1 text-2xl font-extrabold">
                    {tierEmoji} Level {level} — {tier}
                  </p>
                </div>
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                  style={{ background: `${tierColor}22`, color: tierColor }}
                >
                  {tierEmoji}
                </span>
              </div>
              <div className="mt-4">
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-400 to-rose-400"
                    style={{
                      width: `${Math.min(100, (currentUser.xp % 75) / 75 * 100)}%`,
                    }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-slate-300">
                  <span>{currentUser.xp.toLocaleString()} XP</span>
                  <span>{xpToNext} XP until level {level + 1}</span>
                </div>
              </div>
            </Card>

            {/* Streak */}
            <Card className="flex items-center gap-4">
              <span className="text-3xl">🔥</span>
              <div>
                <p className="text-base font-bold text-slate-900">
                  {currentUser.streakDays}-Day Streak
                </p>
                <p className="text-xs text-slate-500">Keep it going today!</p>
              </div>
            </Card>

            {/* Recommended */}
            <Card>
              <h3 className="text-sm font-bold text-slate-900">
                Recommended for you
              </h3>
              <div className="mt-4 space-y-3">
                {[
                  { icon: FiBookOpen, label: "2 learning modules", href: "/learn", sub: "Finance & Career" },
                  { icon: FiBriefcase, label: "3 job opportunities", href: "/jobs", sub: "Near Chennai" },
                  { icon: FiUsers, label: "2 mentors", href: "/network", sub: "Career restart" },
                  { icon: FiMessageCircle, label: "1 expert session", href: "/network", sub: "Legal awareness" },
                  { icon: FiFileText, label: "1 article", href: "/world", sub: "Emergency funds" },
                ].map((rec) => (
                  <Link
                    key={rec.label}
                    href={rec.href}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:bg-slate-50"
                  >
                    <rec.icon className="h-4 w-4 shrink-0 text-violet-500" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-700">
                        {rec.label}
                      </p>
                      <p className="text-xs text-slate-400">{rec.sub}</p>
                    </div>
                    <FiArrowRight className="h-4 w-4 shrink-0 text-slate-300" />
                  </Link>
                ))}
              </div>
            </Card>

            {/* Documents */}
            <Card>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  📁 Her Documents
                </h3>
                <Link
                  href="/ownership"
                  className="text-xs font-semibold text-violet-600 hover:text-violet-700"
                >
                  View
                </Link>
              </div>
              <div className="mt-3 space-y-2">
                {documentReadiness.slice(0, 4).map((d) => (
                  <div
                    key={d.name}
                    className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs"
                  >
                    <span className="text-slate-600">{d.name}</span>
                    <Badge
                      tone={
                        d.statusType === "success"
                          ? "success"
                          : d.statusType === "warning"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {d.status === "Ready" ? "✅" : d.status === "Review" ? "⚠️" : "❌"}{" "}
                      {d.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}