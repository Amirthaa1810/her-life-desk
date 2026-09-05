"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiPlayCircle, FiClock, FiTrendingUp } from "react-icons/fi";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import { courses } from "@/lib/courses";

const STORAGE_KEY = "her-life-desk-courses";

const categories = ["All", "Money", "Legal", "Ownership", "Digital Shield", "Career", "Business"];

export default function LearnPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCompletedIds(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const visible = useMemo(() => {
    return courses.filter((c) => {
      const matchCat = category === "All" || c.category === category;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [category, query]);

  const doneCount = courses.filter((c) => completedIds.includes(c.slug)).length;
  const pct = Math.round((doneCount / courses.length) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <PageHeader
        emoji="📚"
        title="Her Learning"
        subtitle="Real courses that teach you, step by step. Read, do the mini-quiz, earn XP."
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold text-slate-500">Courses available</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{courses.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold text-slate-500">Completed by you</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{doneCount}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold text-slate-500">Overall progress</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-rose-500 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-sm font-bold text-slate-700">{pct}%</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                category === c
                  ? "bg-violet-600 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-violet-50"
              }`}
            >
              {c === "Digital Shield" ? "🛡️ Digital Shield" : c}
            </button>
          ))}
        </div>
        <div className="relative md:w-72">
          <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a course..."
            className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c, i) => {
          const done = completedIds.includes(c.slug);
          return (
            <Link key={c.slug} href={`/learn/${c.slug}`} className="group block">
              <div className={`rounded-2xl border bg-white p-0 shadow-sm transition-all card-tilt ${done ? "border-emerald-200" : "border-slate-200"}`}>
                <div className={`relative flex h-28 items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br ${c.gradient}`}>
                  <span className="text-5xl drop-shadow-lg transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
                    {c.art}
                  </span>
                  <span className="absolute left-3 top-3 rounded-full bg-white/25 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur">
                    {c.categoryEmoji} {c.category}
                  </span>
                  {done && (
                    <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                      ✓ Done
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{c.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <Badge tone="success">{c.difficulty}</Badge>
                    <span className="flex items-center gap-1 text-slate-500">
                      <FiClock className="h-3.5 w-3.5" /> {c.minutes} min
                    </span>
                    <span className="flex items-center gap-1 text-amber-600">
                      <FiTrendingUp className="h-3.5 w-3.5" /> +{c.xp} XP
                    </span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3.5 py-1.5 text-xs font-semibold text-violet-700 group-hover:bg-violet-600 group-hover:text-white">
                    {done ? "Review course" : "Start learning"}
                    <FiPlayCircle className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
          No courses match "{query}" — try a different word. 🌸
        </div>
      )}
    </div>
  );
}