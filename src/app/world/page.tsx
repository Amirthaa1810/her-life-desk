"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FiSearch, FiRadio, FiCalendar, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { newsItems, dailyAffairs } from "@/lib/content";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SafeImage from "@/components/ui/SafeImage";

const categories = ["All", ...Array.from(new Set(newsItems.map((n) => n.category)))];

export default function WorldPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [doneTips, setDoneTips] = useState<number[]>([]);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      newsItems.filter((n) => {
        const catOk = activeCategory === "All" || n.category === activeCategory;
        const q = query.toLowerCase();
        return (
          catOk &&
          (!q ||
            n.headline.toLowerCase().includes(q) ||
            n.summary.toLowerCase().includes(q) ||
            n.tags.some((t) => t.toLowerCase().includes(q)))
        );
      }),
    [activeCategory, query]
  );

  const toggleTip = (id: number) => {
    setDoneTips((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));
    setExpandedTip(null);
  };

  const topStory = filtered.find((n) => n.breaking) ?? filtered[0];

  return (
    <div>
      <div className="border-b border-slate-200 bg-gradient-to-r from-violet-50 via-white to-rose-50">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm ring-1 ring-slate-200 animate-bounce-soft">
                📰
              </span>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  News & Daily Affairs
                </h1>
                <p className="text-sm text-slate-500">
                  Tap any story to read it — updates, daily dose and quick tips in plain language.
                </p>
              </div>
            </div>
            <Badge tone="info">
              <FiRadio className="h-3.5 w-3.5" /> Updates for women
            </Badge>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Daily affairs */}
            <Card className="overflow-hidden">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
                  🌱 Today's Daily Dose
                </h2>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  {doneTips.length}/{dailyAffairs.length} read
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {dailyAffairs.map((d) => {
                  const done = doneTips.includes(d.id);
                  const open = expandedTip === d.id;
                  return (
                    <div
                      key={d.id}
                      className={`rounded-xl border p-4 transition-colors ${
                        done
                          ? "border-emerald-200 bg-emerald-50/60"
                          : "border-slate-100 bg-slate-50/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{d.emoji}</span>
                        <button
                          type="button"
                          onClick={() => toggleTip(d.id)}
                          className={done ? "text-emerald-500" : "text-slate-300 hover:text-emerald-500"}
                          aria-label="Mark as read"
                        >
                          <FiCheckCircle className="h-5 w-5" />
                        </button>
                      </div>
                      <h3 className="mt-2 text-sm font-bold text-slate-900">{d.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        {open ? d.summary : d.summary.slice(0, 64) + (d.summary.length > 64 ? "…" : "")}
                      </p>
                      <button
                        type="button"
                        onClick={() => setExpandedTip(open ? null : d.id)}
                        className="mt-1 text-xs font-semibold text-violet-600 hover:underline"
                      >
                        {open ? "Show less" : "Read more"}
                      </button>
                      <p
                        className={`mt-2 text-xs font-medium text-violet-700 ${
                          open ? "" : "line-clamp-1"
                        }`}
                      >
                        💡 {d.quickTip}
                      </p>
                    </div>
                  );
                })}
              </div>
              {doneTips.length === dailyAffairs.length && (
                <p className="animate-pop mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
                  🎉 You've read today's whole daily dose. Come back tomorrow!
                </p>
              )}
            </Card>

            {/* News */}
            <div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
                  📌 Latest News
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
                  </span>
                </h2>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search news…"
                    className="w-full rounded-full border border-slate-300 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 sm:w-56"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      activeCategory === c
                        ? "bg-violet-600 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-violet-300"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {topStory && (
                <Link href={`/news/${topStory.id}`} className="group mt-5 block">
                  <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm card-tilt">
                    <SafeImage
                      src={topStory.coverImage}
                      fallback={`/news/news-${topStory.id}.svg`}
                      alt={topStory.headline}
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-56"
                    />
                    <div className="p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="info">{topStory.categoryEmoji} {topStory.category}</Badge>
                        {topStory.breaking && (
                          <Badge tone="danger">
                            <span className="relative mr-1 flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
                            </span>
                            Breaking
                          </Badge>
                        )}
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-violet-700">
                        {topStory.headline}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-500">{topStory.summary}</p>
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="h-3.5 w-3.5" /> {topStory.date} · {topStory.source}
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold text-violet-600">
                          Read full story <FiArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {filtered
                  .filter((n) => !topStory || n.id !== topStory.id)
                  .map((n) => (
                    <Link key={n.id} href={`/news/${n.id}`} className="group block">
                      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm card-tilt">
                        <div className="relative">
                          <SafeImage
                            src={n.coverImage}
                            fallback={`/news/news-${n.id}.svg`}
                            alt={n.headline}
                            className="h-32 w-full object-cover"
                          />
                          {n.breaking && (
                            <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 ring-1 ring-rose-200">
                              <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
                              </span>
                              Breaking
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <span>{n.categoryEmoji} {n.category}</span>
                            <span>·</span>
                            <span>{n.date}</span>
                          </div>
                          <h3 className="mt-1.5 line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-violet-700">
                            {n.headline}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-xs text-slate-500">{n.summary}</p>
                        </div>
                      </article>
                    </Link>
                  ))}
              </div>

              {filtered.length === 0 && (
                <Card className="py-12 text-center text-slate-400">No news matches your filters.</Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-violet-600 to-rose-500 text-white">
              <h3 className="text-base font-bold">🌸 Did you know?</h3>
              <p className="mt-2 text-sm leading-relaxed text-violet-50">
                Reading the news is a superpower. Understanding what changes
                around you helps you protect your rights, money and career.
              </p>
              <Link
                href="/learn"
                className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-violet-700"
              >
                Grow my skills <FiArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Card>

            <Card>
              <h3 className="text-sm font-bold text-slate-900">💡 Quick tips for the day</h3>
              <div className="mt-3 space-y-2">
                {[
                  { emoji: "🔍", tip: "Verify news sources before sharing." },
                  { emoji: "💾", tip: "Keep official helplines saved in your phone." },
                  { emoji: "📅", tip: "Set aside 5 minutes daily for updates." },
                  { emoji: "🗣️", tip: "Discuss important updates with family." },
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
                    <span>{t.emoji}</span>
                    <span>{t.tip}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <FiCheckCircle className="h-4 w-4 text-emerald-500" /> Your news habits
              </h3>
              <div className="mt-3 space-y-2 text-xs text-slate-500">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                  <span>Daily dose completed</span>
                  <span className="font-bold text-emerald-600">{doneTips.length}/{dailyAffairs.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                  <span>Read a story</span>
                  <span className="font-semibold text-violet-600">Tap any card above ✨</span>
                </div>
              </div>
            </Card>

            <Card className="border-amber-200 bg-amber-50">
              <p className="text-xs leading-relaxed text-amber-800">
                ⚠️ For legal, financial and health news, prefer official and
                credible sources. Always verify before acting on any information.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}