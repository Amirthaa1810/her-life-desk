"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FiShield,
  FiDollarSign,
  FiSearch,
  FiBriefcase,
  FiZap,
  FiLock,
  FiKey,
  FiUsers,
  FiMessageCircle,
  FiBookOpen,
  FiArrowRight,
  FiHeart,
  FiSend,
  FiTrendingUp,
} from "react-icons/fi";
import { pillars, communityPosts, currentUser, getLevelInfo } from "@/lib/data";
import ProgressRing from "@/components/ui/ProgressRing";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const wants = [
  { icon: FiShield, label: "Understand my rights", href: "/legal", emoji: "⚖️" },
  { icon: FiDollarSign, label: "Improve my finances", href: "/money", emoji: "💰" },
  { icon: FiSearch, label: "Find a job", href: "/jobs", emoji: "💼" },
  { icon: FiBriefcase, label: "Restart my career", href: "/careers", emoji: "🌱" },
  { icon: FiZap, label: "Start a business", href: "/business", emoji: "🚀" },
  { icon: FiLock, label: "Protect myself online", href: "/digital-shield", emoji: "🛡️" },
  { icon: FiKey, label: "Understand ownership", href: "/ownership", emoji: "🏠" },
  { icon: FiUsers, label: "Find a mentor", href: "/network", emoji: "🤝" },
  { icon: FiMessageCircle, label: "Talk to an expert", href: "/ask", emoji: "🧠" },
  { icon: FiBookOpen, label: "Read & learn", href: "/blog", emoji: "📚" },
];

const dailyPicks = [
  {
    emoji: "🎯",
    title: "Your Next Best Action",
    desc: "Review and organize one important document today.",
    href: "/vault",
    cta: "Open Vault",
  },
  {
    emoji: "💼",
    title: "Fresh opportunities",
    desc: "3 job openings were posted near Chennai today.",
    href: "/jobs",
    cta: "Browse Jobs",
  },
  {
    emoji: "🛡️",
    title: "Quick safety win",
    desc: "Learn to spot one new scam pattern in 5 minutes.",
    href: "/digital-shield",
    cta: "Stay Safe",
  },
  {
    emoji: "📰",
    title: "The daily dose",
    desc: "Read today's 5 quick updates in trusting language.",
    href: "/world",
    cta: "Read News",
  },
  {
    emoji: "🌱",
    title: "Today's learning",
    desc: "One short module grows your Empowerment Index.",
    href: "/learn",
    cta: "Start Learning",
  },
];

const tickerItems = [
  "🎉 Priya reached GOLD LEVEL",
  "🚀 Anita started her home bakery",
  "🎓 Meera completed her coding certificate",
  "💼 Divya returned to work after a break",
  "🔥 Kavya keeps a 30-day learning streak",
  "🛡️ Sneha enabled two-factor authentication",
  "🏆 Ritu finished the 90-day roadmap",
];

function greeting(): { text: string; emoji: string } {
  const h = new Date().getHours();
  if (h < 12) return { text: "Good morning", emoji: "🌅" };
  if (h < 17) return { text: "Good afternoon", emoji: "☀️" };
  if (h < 21) return { text: "Good evening", emoji: "🌇" };
  return { text: "Good night", emoji: "🌙" };
}

export default function Home() {
  const [profile, setProfile] = useState({ name: "", location: "", goals: [] as string[] });
  const [feed, setFeed] = useState(communityPosts);
  const [postText, setPostText] = useState("");
  const [postCategory, setPostCategory] = useState("Achievement");
  const [reacted, setReacted] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("her-life-desk-profile") ?? "null");
      if (saved) setProfile(saved);
    } catch {
      // fall back to defaults
    }
  }, []);

  const overallIndex = useMemo(
    () => Math.round(pillars.reduce((sum, p) => sum + p.score, 0) / pillars.length),
    []
  );
  const { level, tier, tierEmoji } = getLevelInfo(currentUser.xp);
  const g = greeting();
  const dayOfYear = Math.floor(Date.now() / 86400000);
  const pick = dailyPicks[dayOfYear % dailyPicks.length];

  const displayName = profile.name || currentUser.displayName;

  const publishPost = () => {
    const text = postText.trim();
    if (!text) return;
    setFeed([
      {
        id: Date.now(),
        author: displayName,
        avatarColor: "#7c3aed",
        time: "Just now",
        content: `${postCategory === "Achievement" ? "🎉 " : ""}${text}`,
        reacts: 1,
        comments: 0,
        tags: [postCategory],
      },
      ...feed,
    ]);
    setPostText("");
  };

  const like = (id: number) =>
    setReacted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f5f1fb] via-white to-[#fdf1f6]">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />
        <span className="animate-floating pointer-events-none absolute left-[8%] top-24 text-2xl opacity-60">🌸</span>
        <span className="animate-floating pointer-events-none absolute right-[12%] top-16 text-3xl opacity-50" style={{ animationDelay: "0.8s" }}>🦋</span>
        <span className="animate-floating pointer-events-none absolute bottom-24 left-[18%] text-2xl opacity-50" style={{ animationDelay: "1.6s" }}>💫</span>
        <span className="animate-floating pointer-events-none absolute right-[6%] bottom-20 text-2xl opacity-60" style={{ animationDelay: "2.2s" }}>🌷</span>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge tone="info">
                <span className="animate-wiggle inline-block">🌸</span> Personalized for {displayName}
              </Badge>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {g.text}, {displayName} {g.emoji}
              </h1>
              <p className="mt-3 text-lg font-semibold tracking-wide text-slate-700">
                Know. Own. Protect. Earn. Grow.
              </p>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-500">
                Your personalized digital companion for building knowledge,
                independence, safety, career and financial confidence.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="animate-pulse-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-rose-500 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/25 transition-transform hover:scale-[1.02]"
                >
                  Open My Dashboard
                  <FiArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-colors hover:border-slate-400"
                >
                  Update My Profile
                </Link>
              </div>

              <div className="mt-6 rounded-xl bg-white/70 px-4 py-3 ring-1 ring-slate-200 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  🎯 Picked for you today
                </p>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm text-slate-700">
                    <span className="mr-1.5">{pick.emoji}</span>
                    <span className="font-bold text-slate-900">{pick.title}:</span> {pick.desc}
                  </p>
                  <Link href={pick.href} className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700">
                    {pick.cta} <FiArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative animate-fade-up">
                <div className="absolute inset-0 -m-4 rounded-3xl bg-gradient-to-br from-violet-500/20 to-rose-500/20 blur-xl" />
                <Card className="relative w-full max-w-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Her Empowerment Index
                      </p>
                      <p className="mt-1 text-sm text-slate-500">Your readiness snapshot</p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-lg text-white">
                      {tierEmoji}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center justify-center gap-6">
                    <ProgressRing value={overallIndex} size={130} color="#7c3aed" label={`${overallIndex}/100`} subLabel="Empowerment" />
                    <div className="space-y-2.5">
                      {pillars.slice(0, 4).map((p) => (
                        <div key={p.key} className="flex items-center gap-2">
                          <span className="text-base">{p.icon}</span>
                          <div>
                            <p className="text-[11px] font-medium text-slate-500">{p.label}</p>
                            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                              <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: p.color }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="text-xs text-slate-600">🟢 Digital Safety</span>
                    <span className="text-xs text-slate-600">🔴 Ownership</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden border-y border-violet-100 bg-white py-2.5">
        <div className="flex w-max animate-ticker gap-12 whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-sm font-medium text-slate-600">{item}</span>
          ))}
        </div>
      </div>

      {/* I want to */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-center text-2xl font-bold text-slate-900">“I want to…”</h2>
        <p className="mt-2 text-center text-sm text-slate-500">Start with what you want — we'll build your path.</p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {wants.map((w) => (
            <Link
              key={w.label}
              href={w.href}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center transition-all hover:-translate-y-1 hover:border-violet-300 hover:shadow-md"
            >
              <span className="text-2xl transition-transform group-hover:scale-125">{w.emoji}</span>
              <span className="text-sm font-medium text-slate-700">{w.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Community feed */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                  <FiHeart className="h-5 w-5 text-rose-500" /> Her Circle — happening now
                </h2>
                <Link href="/circle" className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700">
                  Open Circle <FiArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <Card className="mt-5">
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder={`Share something lovely, ${displayName} 🌸 e.g. "Started my first course today!"`}
                  rows={2}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-violet-300 focus:bg-white"
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {["Achievement", "Learning", "Career", "Encouragement"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setPostCategory(c)}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          postCategory === c ? "bg-rose-50 text-rose-600 ring-1 ring-rose-200" : "text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={publishPost}
                    disabled={!postText.trim()}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-rose-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
                  >
                    <FiSend className="h-4 w-4" /> Post
                  </button>
                </div>
              </Card>

              <div className="mt-5 space-y-4">
                {feed.slice(0, 4).map((post) => {
                  const liked = reacted.has(post.id);
                  return (
                    <Card key={post.id} className="p-5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: post.avatarColor }}>
                          {post.author[0]}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{post.author}</p>
                          <p className="text-xs text-slate-400">{post.time}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">{post.content}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => like(post.id)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                            liked ? "bg-rose-50 text-rose-600" : "text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          {liked ? "❤️" : "🤍"} {post.reacts + (liked ? 1 : 0)}
                        </button>
                        {post.tags.map((t) => (
                          <span key={t} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
                            {t}
                          </span>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div className="space-y-5 lg:col-span-2">
              <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">Your journey</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-2xl font-extrabold">{tierEmoji} Level {level} — {tier}</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-rose-300">🔥 {currentUser.streakDays} days</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="animate-shimmer h-full w-2/3 rounded-full bg-gradient-to-r from-violet-400 to-rose-400" />
                </div>
                <p className="mt-2 text-xs text-slate-300">{currentUser.xp.toLocaleString()} points · keep going!</p>
                <Link href="/journey" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-violet-300 hover:text-violet-200">
                  <FiTrendingUp className="h-4 w-4" /> See all achievements
                </Link>
              </Card>

              <Card>
                <h3 className="text-sm font-bold text-slate-900">🏅 Today's champions</h3>
                <div className="mt-3 space-y-2">
                  {[
                    { name: "Riya", note: "18 modules this month", emoji: "💎" },
                    { name: "Priya", note: "21-day streak", emoji: "🥇" },
                    { name: "Meera", note: "30-day challenge done", emoji: "🥈" },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span>{c.emoji}</span>
                        <span className="text-sm font-semibold text-slate-700">{c.name}</span>
                      </div>
                      <span className="text-xs text-slate-400">{c.note}</span>
                    </div>
                  ))}
                </div>
                <Link href="/journey" className="mt-3 inline-block text-xs font-semibold text-violet-600 hover:text-violet-700">
                  Show {profile.name || "my"} rank →
                </Link>
              </Card>

              <Card>
                <h3 className="text-sm font-bold text-slate-900">🗂️ Your documents</h3>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-2xl">🔐</span>
                  <p className="text-xs leading-relaxed text-slate-500">
                    Keep important documents tracked in your private, password-protected Vault.
                  </p>
                </div>
                <Link href="/vault" className="mt-3 inline-flex items-center gap-1 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700">
                  <FiKey className="h-3.5 w-3.5" /> Open Vault
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick features */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-center text-2xl font-bold text-slate-900">Everything you need, all in one place</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { emoji: "📊", title: "Empowerment Index", desc: "A measurable readiness score across six pillars.", href: "/dashboard" },
            { emoji: "🗺️", title: "Personalized Roadmap", desc: "A 90-day plan built around your situation.", href: "/dashboard" },
            { emoji: "📰", title: "News & Daily Affairs", desc: "Today's updates in plain, trusting language.", href: "/world" },
            { emoji: "✍️", title: "Her Blog", desc: "Guides and stories from women empowering women.", href: "/blog" },
            { emoji: "📁", title: "Documents Vault", desc: "A private password-protected space for records.", href: "/vault" },
            { emoji: "🛡️", title: "Digital Shield", desc: "Spot scams and protect your money and identity.", href: "/digital-shield" },
            { emoji: "💼", title: "Her Jobs", desc: "Verified opportunities with full pay details.", href: "/jobs" },
            { emoji: "🌸", title: "Her Circle", desc: "A supportive community for achievements.", href: "/circle" },
          ].map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-violet-300 hover:shadow-md"
            >
              <span className="block text-3xl transition-transform group-hover:scale-110">{f.emoji}</span>
              <h3 className="mt-2 text-sm font-bold text-slate-900">{f.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-violet-600 to-rose-500 py-14">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <span className="text-4xl">🌸</span>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Every big step starts small</h2>
          <p className="mt-2 text-violet-100">
            Do one thing today. Your future self will thank you.
          </p>
          <Link
            href="/dashboard"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-violet-700 shadow-lg transition-transform hover:scale-[1.02]"
          >
            Take My Next Best Action
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}