"use client";

import { useState } from "react";
import { FiLock, FiStar, FiAward, FiZap, FiTrendingUp, FiShare2, FiX } from "react-icons/fi";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { currentUser, getLevelInfo, achievements, leaderboard, leaderboardMyRank } from "@/lib/data";

const tiers = [
  { name: "BRONZE", emoji: "🌱", range: "L1–10", color: "#b45309", border: "border-amber-300" },
  { name: "SILVER", emoji: "🥈", range: "L11–25", color: "#94a3b8", border: "border-slate-300" },
  { name: "GOLD", emoji: "🥇", range: "L26–50", color: "#f59e0b", border: "border-yellow-400" },
  { name: "DIAMOND", emoji: "💎", range: "L51–75", color: "#0ea5e9", border: "border-sky-400" },
  { name: "EMPOWERMENT LEGEND", emoji: "👑", range: "L76–100", color: "#a855f7", border: "border-purple-400" },
];

const xpActivities = [
  { label: "Complete learning modules", xp: 50 },
  { label: "Complete checklists", xp: 40 },
  { label: "Finish empowerment-plan tasks", xp: 60 },
  { label: "Take assessments", xp: 35 },
  { label: "Learn financial literacy", xp: 45 },
  { label: "Learn legal awareness", xp: 50 },
  { label: "Improve digital safety", xp: 35 },
  { label: "Complete career tasks", xp: 55 },
  { label: "Participate in community", xp: 25 },
  { label: "Maintain streaks", xp: 20 },
];

const unlockTips: Record<number, string> = {
  4: "Complete the Legal Awareness learning modules to unlock this achievement.",
  5: "Finish all career-development activities to unlock this badge.",
  6: "Complete the entrepreneurship readiness track to unlock.",
  8: "Maintain a 30-day learning streak to unlock this achievement.",
};

export default function JourneyPage() {
  const { level, tier, tierEmoji, nextAt, tierColor } = getLevelInfo(currentUser.xp);
  const xpProgress = ((currentUser.xp % 75) / 75) * 100;
  const xpToNext = nextAt - currentUser.xp;
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div>
      <PageHeader
        emoji="🎮"
        title="My Journey"
        subtitle="Your gamified empowerment path — earn XP, level up, unlock badges."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 space-y-8">
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">Level</p>
              <p className="mt-1 text-3xl font-extrabold">
                {tierEmoji} LEVEL {level} — {tier}
              </p>
              <div className="mt-5">
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-400 to-rose-400"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-slate-300">
                  <span>{currentUser.xp.toLocaleString()} XP</span>
                  <span>{xpToNext} XP until next level</span>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="text-lg font-bold">{currentUser.streakDays} Days</p>
                    <p className="text-xs text-slate-400">Learning Streak</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FiZap className="h-6 w-6 text-yellow-400" />
                  <div>
                    <p className="text-lg font-bold">{currentUser.xp.toLocaleString()} XP</p>
                    <p className="text-xs text-slate-400">Total Experience</p>
                  </div>
                </div>
              </div>
            </div>
            <span
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-4xl"
              style={{ background: `${tierColor}22`, color: tierColor }}
            >
              {tierEmoji}
            </span>
          </div>
        </Card>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Level System</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {tiers.map((t) => {
              const isCurrent = t.name === tier;
              return (
                <div
                  key={t.name}
                  className={`rounded-2xl border-2 ${t.border} bg-white p-5 text-center shadow-sm relative ${isCurrent ? "ring-2 ring-offset-2" : "opacity-70"}`}
                  style={isCurrent ? { boxShadow: `0 0 0 2px ${tierColor}` } : undefined}
                >
                  {isCurrent && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600 to-rose-500 px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide">
                      Your tier
                    </span>
                  )}
                  <span className="text-3xl">{t.emoji}</span>
                  <p className="mt-2 text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.range}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4">How to Earn XP</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {xpActivities.map((a) => (
              <div
                key={a.label}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <span className="text-sm font-medium text-slate-700">{a.label}</span>
                <span className="shrink-0 ml-3 rounded-full bg-gradient-to-r from-violet-600 to-rose-500 px-2.5 py-0.5 text-xs font-bold text-white">
                  +{a.xp} XP
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Achievements</h2>
            <Badge tone="info">{unlockedCount}/{achievements.length} unlocked</Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((a) => (
              <div key={a.id} className="relative">
                <button
                  onClick={() =>
                    setExpandedTip(expandedTip === a.id ? null : a.id)
                  }
                  className={`w-full rounded-2xl border border-slate-200 p-5 text-left shadow-sm transition-transform hover:scale-[1.01] ${
                    a.unlocked
                      ? "bg-gradient-to-br from-violet-50 via-rose-50 to-amber-50"
                      : "bg-slate-50 opacity-60 grayscale"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{a.emoji}</span>
                    <Badge tone={a.unlocked ? "success" : "warning"}>
                      {a.unlocked ? "Unlocked" : "Locked"}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm font-bold text-slate-900">{a.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{a.desc}</p>
                </button>
                {!a.unlocked && expandedTip === a.id && unlockTips[a.id] && (
                  <div className="mt-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                    💡 {unlockTips[a.id]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Her Champions</h2>
          <Card className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="pb-3 pr-4">Rank</th>
                  <th className="pb-3 pr-4">Champion</th>
                  <th className="pb-3 pr-4">Level</th>
                  <th className="pb-3 pr-4">XP</th>
                  <th className="pb-3">Highlight</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => {
                  const medal =
                    entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : `#${entry.rank}`;
                  return (
                    <tr
                      key={entry.rank}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="py-3 pr-4 font-bold text-slate-900">{medal}</td>
                      <td className="py-3 pr-4 font-semibold text-slate-800">
                        <span className="mr-2">{entry.badge}</span>
                        {entry.user}
                      </td>
                      <td className="py-3 pr-4 text-slate-600">L{entry.level}</td>
                      <td className="py-3 pr-4 font-medium text-violet-600">
                        {entry.xp.toLocaleString()}
                      </td>
                      <td className="py-3 text-xs text-slate-500">{entry.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>

          <div className="mt-4">
            <Card className="bg-gradient-to-r from-violet-50 to-rose-50">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-rose-500 text-white">
                  <FiTrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">My Rank</p>
                  <p className="text-sm text-slate-600">
                    You are currently <span className="font-bold text-violet-600">#{leaderboardMyRank.rank}</span> · {leaderboardMyRank.xpToNext} XP until the next position.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-transform hover:scale-[1.02]"
          >
            <FiStar className="h-4 w-4" />
            🎉 Preview achievement card
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 p-8 shadow-2xl ring-1 ring-amber-200">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <FiX className="h-5 w-5" />
              </button>
              <div className="text-center">
                <span className="text-5xl">🏆</span>
                <h3 className="mt-4 text-xl font-extrabold text-slate-900">
                  GOLD LEVEL UNLOCKED
                </h3>
                <p className="mt-2 text-sm text-slate-600">3,200 XP</p>
                <p className="mt-1 text-sm text-slate-600">18 Learning Modules Completed</p>
                <p className="mt-1 text-sm text-slate-600">🔥 14-Day Learning Streak</p>
                <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-transform hover:scale-[1.02]">
                  <FiShare2 className="h-4 w-4" />
                  Share to Her Circle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
