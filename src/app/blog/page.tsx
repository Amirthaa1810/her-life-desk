"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FiSearch, FiClock, FiBookmark, FiUser, FiArrowRight } from "react-icons/fi";
import { blogPosts } from "@/lib/content";
import Card from "@/components/ui/Card";
import SafeImage from "@/components/ui/SafeImage";

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<number[]>([]);

  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];

  const filtered = useMemo(
    () =>
      blogPosts.filter((p) => {
        const catOk = activeCategory === "All" || p.category === activeCategory;
        const q = query.toLowerCase();
        const qOk =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.author.toLowerCase().includes(q);
        return catOk && qOk;
      }),
    [activeCategory, query]
  );

  const toggleSaved = (id: number) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div>
      <div className="border-b border-slate-200 bg-gradient-to-r from-violet-50 via-white to-rose-50">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm ring-1 ring-slate-200 animate-bounce-soft">
              ✍️
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Her Blog
              </h1>
              <p className="text-sm text-slate-500">
                Stories, guides and ideas from women empowering women.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Featured story */}
        <Link href={`/blog/${featured.id}`} className="group block">
          <div className="relative overflow-hidden rounded-3xl shadow-sm">
            <SafeImage
              src={featured.coverImage}
              fallback={`/blog/cover-${featured.id}.svg`}
              alt={featured.title}
              className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
              <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-900">
                🌟 Featured story
              </span>
              <h2 className="mt-3 max-w-2xl text-2xl font-extrabold leading-snug text-white drop-shadow sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/85">{featured.excerpt}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/80">
                <span className="flex items-center gap-1.5">
                  <FiUser className="h-3.5 w-3.5" /> {featured.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiClock className="h-3.5 w-3.5" /> {featured.readTime} read
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-white group-hover:underline">
                  Read the story <FiArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        </Link>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
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
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts…"
              className="w-full rounded-full border border-slate-300 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 sm:w-64"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group block">
              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all card-tilt">
                <div className="relative">
                  <SafeImage
                    src={post.coverImage}
                    fallback={`/blog/cover-${post.id}.svg`}
                    alt={post.title}
                    className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                    {post.categoryEmoji} {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="text-base font-bold leading-snug text-slate-900 group-hover:text-violet-700">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <FiUser className="h-3.5 w-3.5" /> {post.author}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <FiClock className="h-3.5 w-3.5" /> {post.readTime}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleSaved(post.id);
                        }}
                        className={saved.includes(post.id) ? "text-violet-600" : "text-slate-300 hover:text-violet-500"}
                        aria-label="Save post"
                      >
                        <FiBookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <Card className="py-12 text-center text-slate-400">
            No posts match your search. Try another keyword. 🌸
          </Card>
        )}

        <div className="mt-12 grid items-center gap-6 rounded-3xl bg-gradient-to-br from-rose-50 to-violet-50 p-6 sm:grid-cols-2 sm:p-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900">🌸 Contribute</h3>
            <p className="mt-2 text-sm text-slate-500">
              Are you an experienced contributor? We welcome trusted voices on
              rights, finance, careers, entrepreneurship and more.
            </p>
          </div>
          <div className="flex justify-start sm:justify-end">
            <Link
              href="/circle"
              className="rounded-full bg-gradient-to-r from-violet-600 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Join Her Circle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}