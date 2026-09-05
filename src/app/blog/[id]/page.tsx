"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft, FiBookmark, FiClock, FiShare2, FiHeart } from "react-icons/fi";
import FloatingEmojis from "@/components/ui/FloatingEmojis";
import Badge from "@/components/ui/Badge";
import SafeImage from "@/components/ui/SafeImage";
import { blogPosts } from "@/lib/content";

export default function BlogPostPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);
  const post = blogPosts.find((p) => p.id === id);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="text-5xl">🔍</div>
        <h1 className="mt-4 text-xl font-bold text-slate-900">Article not found</h1>
        <Link
          href="/blog"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white"
        >
          <FiArrowLeft /> Back to Her Blog
        </Link>
      </div>
    );
  }

  const related = blogPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 3);

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied — share it with a friend! 💕");
    } catch {
      // ignore
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-violet-600">
        <FiArrowLeft className="h-4 w-4" /> Back to Her Blog
      </Link>

      <div className="relative mt-4 overflow-hidden rounded-3xl shadow-sm">
        <SafeImage src={post.coverImage} fallback={`/blog/cover-${post.id}.svg`} alt={post.title} className="h-56 w-full object-cover sm:h-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <FloatingEmojis items={["⭐", "🌸", "💜", "🌷"]} className="mix-blend-normal" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
          <Badge tone="info">{post.categoryEmoji} {post.category}</Badge>
          <h1 className="mt-2 text-2xl font-extrabold leading-snug text-white drop-shadow sm:text-3xl">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-rose-500 text-sm font-bold text-white">
            {post.author.charAt(0)}
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">{post.author}</p>
            <p className="text-xs text-slate-500">
              {post.authorRole} · {post.date} · {post.readTime} read
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              liked ? "border-rose-200 bg-rose-50 text-rose-600" : "border-slate-200 bg-white text-slate-600 hover:bg-rose-50"
            }`}
          >
            <FiHeart className={liked ? "fill-rose-500 text-rose-500" : ""} /> {liked ? "Loved" : "Love"}
          </button>
          <button
            onClick={() => setSaved(!saved)}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              saved ? "border-violet-200 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:bg-violet-50"
            }`}
          >
            <FiBookmark className={saved ? "fill-violet-600 text-violet-600" : ""} /> {saved ? "Saved" : "Save"}
          </button>
          <button
            onClick={share}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            <FiShare2 /> Share
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            #{t}
          </span>
        ))}
      </div>

      <article className="mt-6 max-w-2xl">
        {post.body.map((para, i) => (
          <p
            key={i}
            className={`text-[15px] leading-[1.9] ${
              i === 0 ? "text-lg font-semibold text-slate-800" : "text-slate-600"
            }`}
          >
            {para}
          </p>
        ))}
      </article>

      <div className="mt-8 flex items-start gap-3 rounded-2xl bg-violet-50 p-5 text-sm text-violet-800">
        <span className="text-xl">💜</span>
        <p>
          <b>Knowledge is power.</b> Share this article with a friend — every woman who knows her
          rights is one step stronger.
        </p>
      </div>

      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold text-slate-900">You may also like</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.id} href={`/blog/${r.id}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white card-tilt">
                <SafeImage src={r.coverImage} fallback={`/blog/cover-${r.id}.svg`} alt="" className="h-28 w-full object-cover" />
                <div className="p-4">
                  <p className="line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-violet-700">
                    {r.title}
                  </p>
                  <span className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                    <FiClock className="h-3 w-3" /> {r.readTime}
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