"use client";

import Link from "next/link";
import { useState } from "react";
import { FiCheckCircle, FiArrowRight, FiAlertCircle } from "react-icons/fi";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import LearningGrid, { LearningTopic } from "@/components/ui/LearningGrid";

const readinessQuestions = [
  {
    q: "Do you know whose name the asset is in?",
    hint: "Knowing ownership is the first step to protecting it.",
  },
  {
    q: "Do you know where the ownership documents are?",
    hint: "Locate your physical and digital documents.",
  },
  {
    q: "Have you reviewed relevant nominations?",
    hint: "Nominations say who receives assets in certain situations.",
  },
  {
    q: "Do you understand what happens to your assets under different circumstances?",
    hint: "This includes inheritance, legal and estate-planning basics.",
  },
];

const docRows = [
  { label: "Identity records", status: "Ready", tone: "success" as const },
  { label: "Banking information", status: "Ready", tone: "success" as const },
  { label: "Insurance records", status: "Review", tone: "warning" as const },
  { label: "Property records", status: "Not organized", tone: "danger" as const },
  { label: "Nomination information", status: "Review", tone: "warning" as const },
  { label: "Estate-planning information", status: "Not started", tone: "danger" as const },
];

const learningTopics: LearningTopic[] = [
  {
    emoji: "🏠",
    title: "Property Ownership",
    desc: "Understand ownership documents, titles and what it means to own property.",
    mins: 12,
    xp: 70,
    courseSlug: "ownership-nominations",
  },
  {
    emoji: "🏦",
    title: "Bank Accounts",
    desc: "Know your account types, joint-holder implications and nomination setup.",
    mins: 8,
    xp: 50,
    courseSlug: "banking-basics",
  },
  {
    emoji: "📈",
    title: "Investments",
    desc: "Own your investments with clear records and beneficiary details.",
    mins: 10,
    xp: 60,
  },
  {
    emoji: "🛡️",
    title: "Insurance",
    desc: "Understand your policies, coverage and who claims them if needed.",
    mins: 9,
    xp: 55,
  },
  {
    emoji: "🟡",
    title: "Gold & Assets",
    desc: "Keep track of physical assets like gold, jewellery and valuables.",
    mins: 7,
    xp: 45,
  },
  {
    emoji: "💼",
    title: "Business Ownership",
    desc: "Structures, registration and what owning a business really involves.",
    mins: 11,
    xp: 65,
    courseSlug: "business-registration",
  },
  {
    emoji: "✍️",
    title: "Nominations",
    desc: "Who gets what when — and how to set nominations correctly.",
    mins: 8,
    xp: 50,
    courseSlug: "ownership-nominations",
  },
  {
    emoji: "🧾",
    title: "Wills & Estate Planning",
    desc: "Learn how a will lets you decide where your assets go.",
    mins: 13,
    xp: 75,
    courseSlug: "wills-estate",
  },
  {
    emoji: "🗂️",
    title: "Important Ownership Documents",
    desc: "Find and organize the key documents that prove and protect ownership.",
    mins: 9,
    xp: 55,
  },
];

const eduReminders = [
  "Review important records regularly",
  "Keep copies securely (physical + digital)",
  "Review your nominations",
  "Understand your insurance records",
  "Understand your ownership records",
  "Learn about estate planning",
];

const allCompleteMsg =
  "You're on your way to organized ownership! Keep reviewing these regularly.";

export default function OwnershipPage() {
  const [checked, setChecked] = useState<boolean[]>(
    readinessQuestions.map(() => false)
  );
  const [eduChecked, setEduChecked] = useState<boolean[]>(
    eduReminders.map(() => false)
  );
  const readyCount = checked.filter(Boolean).length;
  const readyPercent = Math.round(
    (readyCount / readinessQuestions.length) * 100
  );

  const overall = Math.round(62);
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - overall / 100);

  const eduAll = eduChecked.every(Boolean);

  const toggleCheck = (i: number) =>
    setChecked((prev) =>
      prev.map((c, idx) => (idx === i ? !c : c))
    );

  const toggleEdu = (i: number) =>
    setEduChecked((prev) =>
      prev.map((c, idx) => (idx === i ? !c : c))
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <PageHeader
        emoji="🏠"
        title="She Owns"
        subtitle="Don't just earn. Own. Understand property, assets, nominations and estate planning."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                🗒️ Ownership Readiness Checklist
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Be honest — this builds your personal snapshot, not a judgment.
            </p>

            <div className="mt-5 space-y-3">
              {readinessQuestions.map((item, i) => {
                const isChecked = checked[i];
                return (
                  <button
                    key={item.q}
                    type="button"
                    onClick={() => toggleCheck(i)}
                    className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                      isChecked
                        ? "border-emerald-200 bg-emerald-50/60"
                        : "border-slate-200 bg-white hover:border-violet-300"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm ${
                        isChecked
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isChecked ? "✅" : "⬜"}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-800">
                        {item.q}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        {item.hint}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-rose-500 transition-all duration-500"
                  style={{ width: `${readyPercent}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {readyPercent}% ready
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900">
              📂 Why Organizing Documents Matters
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Tick off your understanding — complete all to earn bonus XP.
            </p>
            <div className="mt-4 space-y-2">
              {eduReminders.map((r, i) => {
                const on = eduChecked[i];
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => toggleEdu(i)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                      on
                        ? "border-emerald-200 bg-emerald-50/60 text-slate-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-violet-300"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm ${
                        on
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-slate-300"
                      }`}
                    >
                      {on && "✅"}
                    </span>
                    {r}
                  </button>
                );
              })}
            </div>

            {eduAll && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm animate-fade-up">
                <FiCheckCircle className="h-5 w-5 shrink-0 text-emerald-500" />
                <div>
                  <p className="font-bold text-emerald-700">
                    🎉 +50 XP Bonus Earned!
                  </p>
                  <p className="mt-0.5 text-xs text-emerald-700">
                    {allCompleteMsg}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-base font-bold text-slate-900">
                Document Readiness
              </h2>
              <div className="relative mt-4 h-36 w-36">
                <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="12"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    fill="none"
                    stroke="url(#grad)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashoffset}
                    style={{ transition: "stroke-dashoffset 0.6s ease" }}
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {overall}%
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Ready
                  </span>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Your records are partially organized. Good progress — keep
                going!
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900">One-liners</h2>
            <div className="mt-3 space-y-2 text-xs text-slate-600">
              <p className="rounded-lg bg-violet-50 px-3 py-2">
                Ownership ≠ nomination — know which applies to you.
              </p>
              <p className="rounded-lg bg-rose-50 px-3 py-2">
                A will lets you decide, not circumstance.
              </p>
              <p className="rounded-lg bg-amber-50 px-3 py-2">
                Ownership follows name on documents, so check the names.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900">
          📋 Document Readiness Dashboard
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          A quick view of where your important records stand.
        </p>
        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3">Record</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {docRows.map((d) => (
                <tr key={d.label} className="bg-white">
                  <td className="px-4 py-3 text-slate-700">{d.label}</td>
                  <td className="px-4 py-3 text-right">
                    <Badge tone={d.tone}>{d.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-rose-500"
              style={{ width: "62%" }}
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Document Readiness 62%
          </span>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">
          📚 Topics to Explore
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Understand what you own and how to protect it.
        </p>
        <div className="mt-6">
          <LearningGrid topics={learningTopics} />
        </div>
      </div>

      <div className="mt-10 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
        <div>
          <h3 className="text-sm font-bold text-amber-900">
            Educational guidance only
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-amber-800">
            Ownership, nominations, inheritance and wills are governed by
            specific laws that vary by state, religion and asset type. The
            information here is general education. Always consult qualified
            professionals — such as a lawyer — and official government
            resources for your specific situation.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          {
            href: "/money",
            emoji: "💰",
            title: "Her Money",
            desc: "Build financial literacy to fund your assets.",
          },
          {
            href: "/legal",
            emoji: "⚖️",
            title: "Her Legal",
            desc: "Understand your rights, inheritance and property law.",
          },
          {
            href: "/ask",
            emoji: "🤖",
            title: "Ask Her Desk",
            desc: "Get personalized guidance on ownership questions.",
          },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-violet-300 hover:shadow-md"
          >
            <span className="text-3xl">{c.emoji}</span>
            <h3 className="mt-3 flex items-center gap-1 text-base font-bold text-slate-900">
              {c.title}
              <FiArrowRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-violet-500" />
            </h3>
            <p className="mt-1 text-xs text-slate-500">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
