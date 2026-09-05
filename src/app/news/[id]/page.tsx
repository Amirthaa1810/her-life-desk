"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiBookmark,
  FiCalendar,
  FiClock,
  FiShare2,
  FiRadio,
} from "react-icons/fi";
import Badge from "@/components/ui/Badge";
import SafeImage from "@/components/ui/SafeImage";
import { newsItems } from "@/lib/content";

const SAVED_KEY = "her-life-desk-saved-news";

export default function NewsArticlePage() {
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);
  const item = newsItems.find((n) => n.id === id);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      const list: number[] = raw ? JSON.parse(raw) : [];
      setSaved(list.includes(id));
    } catch {
      // ignore
    }
  }, [id]);

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="text-5xl">🔍</div>
        <h1 className="mt-4 text-xl font-bold text-slate-900">Story not found</h1>
        <Link
          href="/world"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white"
        >
          <FiArrowLeft /> Back to the news desk
        </Link>
      </div>
    );
  }

  const toggleSave = () => {
    setSaved((s) => {
      const next = !s;
      try {
        const raw = localStorage.getItem(SAVED_KEY);
        const list: number[] = raw ? JSON.parse(raw) : [];
        const updated = next
          ? Array.from(new Set([...list, item.id]))
          : list.filter((x) => x !== item.id);
        localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Story link copied — share it with a friend! 📰");
    } catch {
      // ignore
    }
  };

  const related = newsItems
    .filter((n) => n.id !== item.id && n.tags.some((t) => item.tags.includes(t)))
    .concat(newsItems.filter((n) => n.id !== item.id && n.category === item.category))
    .filter((n, i, arr) => arr.findIndex((x) => x.id === n.id) === i)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/world" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-violet-600">
        <FiArrowLeft className="h-4 w-4" /> Back to News & Daily Affairs
      </Link>

      <div className="relative mt-4 overflow-hidden rounded-3xl shadow-sm">
        <SafeImage src={item.coverImage} fallback={`/news/news-${item.id}.svg`} alt={item.headline} className="h-52 w-full object-cover sm:h-72" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="info">{item.categoryEmoji} {item.category}</Badge>
            {item.breaking && (
              <Badge tone="danger">
                <span className="relative mr-1 inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
                </span>
                Breaking
              </Badge>
            )}
          </div>
          <h1 className="mt-2 text-2xl font-extrabold leading-snug text-white drop-shadow sm:text-3xl">
            {item.headline}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/85">
            <span className="flex items-center gap-1.5">
              <FiRadio className="h-3.5 w-3.5" /> {item.source}
            </span>
            <span className="flex items-center gap-1.5">
              <FiCalendar className="h-3.5 w-3.5" /> {item.date}
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock className="h-3.5 w-3.5" /> 3 min read
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              #{t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSave}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              saved
                ? "border-violet-200 bg-violet-50 text-violet-700"
                : "border-slate-200 bg-white text-slate-600 hover:bg-violet-50"
            }`}
          >
            <FiBookmark className={saved ? "fill-violet-600 text-violet-600" : ""} /> {saved ? "Saved" : "Save story"}
          </button>
          <button
            onClick={share}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            <FiShare2 /> Share
          </button>
        </div>
      </div>

      <article className="mt-5 max-w-2xl">
        <p className="text-lg font-semibold leading-relaxed text-slate-800">{item.summary}</p>
        {item.body.map((para, i) => (
          <p key={i} className="mt-4 text-[15px] leading-[1.9] text-slate-600">
            {para}
          </p>
        ))}
      </article>

      <div className="mt-8 flex items-start gap-3 rounded-2xl bg-slate-50 p-5 text-xs leading-relaxed text-slate-500">
        <span className="text-lg">💡</span>
        <p>
          Educational update for awareness. Always cross-check with official and credible sources
          before acting on any news, and consult professionals for personal advice.
        </p>
      </div>

      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold text-slate-900">More stories you may like</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.id} href={`/news/${r.id}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white card-tilt">
                <SafeImage src={r.coverImage} fallback={`/news/news-${r.id}.svg`} alt="" className="h-28 w-full object-cover" />
                <div className="p-4">
                  <p className="line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-violet-700">
                    {r.headline}
                  </p>
                  <span className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                    <FiCalendar className="h-3 w-3" /> {r.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}