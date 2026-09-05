"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiZap,
  FiDollarSign,
  FiCheckCircle,
  FiArrowRight,
  FiUsers,
  FiTrendingUp,
  FiShoppingBag,
  FiStar,
  FiEdit,
  FiBarChart2,
  FiAward,
  FiMapPin,
  FiBookOpen,
  FiChevronDown,
} from "react-icons/fi";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SafeImage from "@/components/ui/SafeImage";

type SkillKey = "idea" | "market" | "financial" | "digital";

const areas: { key: SkillKey; label: string; emoji: string; hint: string }[] = [
  { key: "idea", label: "Business idea", emoji: "💡", hint: "How clear and validated is your idea?" },
  { key: "market", label: "Market knowledge", emoji: "🔍", hint: "Do you know your customers and competitors?" },
  { key: "financial", label: "Financial planning", emoji: "💰", hint: "Budgeting, costs and funding readiness?" },
  { key: "digital", label: "Digital marketing", emoji: "📱", hint: "Reaching customers through online channels?" },
];

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?fm=jpg&q=60&w=1200&auto=format&fit=crop`;

const features = [
  { emoji: "💡", title: "Idea exploration", desc: "Turn a spark into a clearly defined business idea and value proposition.", href: "/learn/business-registration", cta: "Take the course" },
  { emoji: "📊", title: "Readiness assessment", desc: "Rate your skills and get a personalized launch roadmap. Try it above.", href: null, cta: "" },
  { emoji: "📝", title: "Registration guidance", desc: "Understand the basics of registering and legally starting a business.", href: "/learn/business-registration", cta: "Take the course" },
  { emoji: "💰", title: "Financial planning", desc: "Learn to budget your startup costs and plan for sustainability.", href: "/learn/budgeting-savings", cta: "Take the course" },
  { emoji: "🏦", title: "Funding information", desc: "Explore loans, grants and schemes that support women entrepreneurs.", href: "/learn/business-registration", cta: "Take the course" },
  { emoji: "🏛️", title: "Government schemes", desc: "Discover central and state-level schemes designed for women-led businesses.", href: "/world", cta: "Read the news" },
  { emoji: "🎨", title: "Branding guidance", desc: "Shape a simple brand identity, name and visual presence.", href: "/learn/digital-marketing", cta: "Take the course" },
  { emoji: "📱", title: "Digital marketing", desc: "Reach customers with social media, local listings and online selling.", href: "/learn/digital-marketing", cta: "Take the course" },
  { emoji: "🧾", title: "Accounting basics", desc: "Track income, expenses and simple records from day one.", href: "/learn/needs-vs-wants", cta: "Take the course" },
  { emoji: "👥", title: "Customer discovery", desc: "Talk to real customers early and shape your offer around them.", href: "/circle", cta: "Ask her circle" },
  { emoji: "🤝", title: "Mentorship", desc: "Connect with entrepreneurs and experts who can guide your journey.", href: "/network", cta: "Find a mentor" },
];

const schemes = [
  { name: "Mudra Yojana for Women", emoji: "🏦", focus: "Loans up to ₹10 lakh for small businesses without collateral", who: "Aspiring and existing women micro-entrepreneurs", tag: "Loan scheme" },
  { name: "Stand-Up India", emoji: "🚀", focus: "Bank loans for women and SC/ST entrepreneurs starting greenfield enterprises", who: "Women entrepreneurs starting a new venture", tag: "Loan scheme" },
  { name: "State-Run Women Enterprise Schemes", emoji: "🏛️", focus: "Subsidies, grants and training through state women development corporations", who: "Women entrepreneurs by state", tag: "State scheme" },
  { name: "Self-Help Group (SHG) Programs", emoji: "🤝", focus: "Micro-credit and collective support for women-led small businesses", who: "Women in self-help groups", tag: "Micro-credit" },
];

const startSmallTips = [
  { emoji: "🧺", tip: "Begin with one product or service you can deliver reliably." },
  { emoji: "🏠", tip: "Start from home to keep overheads low while you test demand." },
  { emoji: "👥", tip: "Sell to your first 10 customers personally — their feedback is gold." },
  { emoji: "📱", tip: "Use free tools: WhatsApp Business, Instagram and local marketplaces." },
  { emoji: "✍️", tip: "Track every rupee you spend and earn from day one." },
  { emoji: "⏰", tip: "Protect time for your business in small, consistent daily blocks." },
];

const roadmapNames: Record<SkillKey, string> = {
  idea: "Business Idea",
  market: "Market Knowledge",
  financial: "Financial Planning",
  digital: "Digital Marketing",
};

export default function BusinessPage() {
  const [ratings, setRatings] = useState<Record<SkillKey, number>>({
    idea: 3,
    market: 3,
    financial: 3,
    digital: 3,
  });
  const [budget, setBudget] = useState("");
  const [roadmap, setRoadmap] = useState<{ label: string; area: SkillKey | null }[] | null>(null);
  const [done, setDone] = useState<number[]>([]);
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);

  const setRating = (key: SkillKey, value: number) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
    setRoadmap(null);
    setDone([]);
  };

  const generateRoadmap = () => {
    const sorted = (Object.keys(ratings) as SkillKey[]).sort(
      (a, b) => ratings[a] - ratings[b]
    );
    const weakest = sorted.slice(0, 2);
    const strongest = sorted.slice(-2);
    const steps: { label: string; area: SkillKey | null }[] = [];

    weakest.forEach((area) => {
      if (area === "financial") {
        steps.push({ label: "Build a simple startup budget: startup costs, monthly expenses and a break-even estimate.", area });
        steps.push({ label: "Reserve an emergency buffer and set up a separate business savings account.", area });
      } else if (area === "digital") {
        steps.push({ label: "Set up one free channel (e.g. Instagram or WhatsApp Business) and post your first 5 posts.", area });
        steps.push({ label: "Learn digital marketing basics to reach your first customers online.", area });
      } else if (area === "idea") {
        steps.push({ label: "Narrow your idea to one clear value proposition and test it with 5 potential customers.", area });
      } else if (area === "market") {
        steps.push({ label: "Research your target customers and 3 competitors to sharpen your offer.", area });
      }
    });

    if (strongest.includes("financial") || budget) {
      steps.push({ label: "Apply the budget you created toward a realistic minimum viable launch.", area: "financial" });
    }
    if (strongest.includes("idea")) {
      steps.push({ label: "Prototype your idea and share it with a trusted mentor for feedback.", area: "idea" });
    }
    if (strongest.includes("digital")) {
      steps.push({ label: "Run a small pilot promo on one channel and measure which message works.", area: "digital" });
    }
    steps.push({ label: "Review your first progress and connect with a business mentor over a check-in.", area: null });

    setRoadmap(steps);
    setDone([]);
  };

  const toggleStep = (index: number) => {
    setDone((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const progress = roadmap ? Math.round((done.length / roadmap.length) * 100) : 0;

  return (
    <div>
      <PageHeader
        emoji="🚀"
        title="Her Business"
        subtitle="From idea to launch — a guided launchpad for women entrepreneurs."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <section className="relative overflow-hidden rounded-3xl shadow-sm">
          <SafeImage
            src={photo("photo-1573497019940-1c28c88b4f3e")}
            fallback="https://images.unsplash.com/photo-1552664730-d307ca884978?fm=jpg&q=60&w=1200&auto=format&fit=crop"
            alt="Indian women entrepreneurs working in an office"
            className="h-64 w-full object-cover sm:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <h2 className="text-2xl font-extrabold text-white drop-shadow sm:text-3xl">
              Your business. Your rules. 🚀
            </h2>
            <p className="mt-1 max-w-xl text-sm text-white/85">
              Start, fund and grow a business that fits your life — with courses,
              schemes and a personal launch roadmap.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Business Readiness Profile
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Rate your readiness across 4 areas (1 = just starting, 5 = confident) and add an estimated budget.
                </p>
              </div>
              <FiBarChart2 className="h-6 w-6 text-violet-500" />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {areas.map((area) => (
                <div key={area.key} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{area.emoji}</span>
                    <p className="text-sm font-bold text-slate-800">{area.label}</p>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{area.hint}</p>
                  <div className="mt-3 flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => setRating(area.key, n)}
                        aria-label={`${area.label} ${n} of 5`}
                        className={`h-9 flex-1 rounded-lg text-sm font-bold transition-colors ${
                          ratings[area.key] >= n
                            ? "bg-gradient-to-r from-violet-600 to-rose-500 text-white"
                            : "bg-white text-slate-400 ring-1 ring-slate-200 hover:ring-violet-300"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold text-slate-700">
                Estimated startup budget (₹)
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <FiDollarSign className="h-4 w-4" />
                </div>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. 50000"
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                />
              </div>
              <p className="mt-1 text-xs text-slate-400">
                This helps tailor your roadmap. You can start with any amount.
              </p>
            </div>

            <button
              onClick={generateRoadmap}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-transform hover:scale-[1.02]"
            >
              <FiZap className="h-4 w-4" />
              Generate My Launch Roadmap
            </button>
          </Card>

          {roadmap && (
            <Card className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  🗺️ Your Personalized Launch Roadmap
                </h3>
                <Badge tone={progress === 100 ? "success" : "info"}>
                  {done.length}/{roadmap.length} done
                </Badge>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-rose-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-semibold text-slate-500">
                {progress === 0
                  ? "Start with the low-readiness areas to build confidence."
                  : progress === 100
                  ? "Roadmap complete — you're launch-ready! 🎉"
                  : `${progress}% complete — keep going!`}
              </p>
              <ol className="mt-5 space-y-3">
                {roadmap.map((step, i) => {
                  const isDone = done.includes(i);
                  return (
                    <li key={i}>
                      <button
                        onClick={() => toggleStep(i)}
                        className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                          isDone
                            ? "border-emerald-200 bg-emerald-50"
                            : "border-slate-100 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            isDone
                              ? "bg-emerald-500 text-white"
                              : "bg-violet-100 text-violet-700"
                          }`}
                        >
                          {isDone ? <FiCheckCircle className="h-4 w-4" /> : i + 1}
                        </span>
                        <span className="flex-1">
                          <span className="flex items-center gap-2">
                            {step.area && (
                              <Badge tone="info">{roadmapNames[step.area]}</Badge>
                            )}
                          </span>
                          <span
                            className={`mt-1 block text-sm ${
                              isDone
                                ? "text-slate-400 line-through"
                                : "text-slate-700"
                            }`}
                          >
                            {step.label}
                          </span>
                        </span>
                        {isDone && (
                          <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </Card>
          )}
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-3">
            <FiShoppingBag className="h-5 w-5 text-violet-600" />
            <h2 className="text-xl font-bold text-slate-900">
              Courses & Tools to Help You Launch
            </h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Tap any card to open the related course or tool — every one works.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-xl transition-colors group-hover:bg-gradient-to-br group-hover:from-violet-600 group-hover:to-rose-500">
                      {f.emoji}
                    </span>
                    <FiArrowRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-violet-600" />
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{f.desc}</p>
                  {f.href && (
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-violet-600">
                      {f.cta} →
                    </span>
                  )}
                </>
              );
              return f.href ? (
                <Link
                  key={f.title}
                  href={f.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all card-tilt"
                >
                  {inner}
                </Link>
              ) : (
                <div key={f.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-3">
            <FiAward className="h-5 w-5 text-rose-500" />
            <h2 className="text-xl font-bold text-slate-900">
              Funding & Government Schemes
            </h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Tap a scheme to expand it and see how to apply. Educational overview only.
          </p>

          <div className="relative mt-6 overflow-hidden rounded-2xl">
            <SafeImage
              src={photo("photo-1554224155-6726b3ff858f")}
              fallback="https://images.unsplash.com/photo-1554224154-26032ffc0d07?fm=jpg&q=60&w=1200&auto=format&fit=crop"
              alt="Finance and budgeting tools on a desk"
              className="h-40 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-900/60 to-transparent" />
            <p className="absolute bottom-3 left-4 right-4 text-sm font-bold text-white drop-shadow">
              🏦 Loans, grants and support built for women-led businesses.
            </p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {schemes.map((s) => {
              const open = expandedScheme === s.name;
              return (
                <Card key={s.name} className="cursor-pointer" >
                  <button
                    type="button"
                    onClick={() => setExpandedScheme(open ? null : s.name)}
                    className="w-full text-left"
                  >
                    <div className="flex w-full items-start justify-between">
                      <span className="text-3xl">{s.emoji}</span>
                      <span className="flex items-center gap-2">
                        <Badge tone="info">{s.tag}</Badge>
                        <FiChevronDown
                          className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
                        />
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-bold text-slate-900">{s.name}</h3>
                    <p className="mt-2 text-sm text-slate-600">{s.focus}</p>
                    <p className="mt-3 text-xs text-slate-400">
                      <span className="font-semibold text-slate-600">Who it's for:</span> {s.who}
                    </p>
                  </button>
                  {open && (
                    <div className="animate-fade-up mt-4 rounded-xl bg-violet-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-violet-700">
                        How to apply
                      </p>
                      <ol className="mt-2 list-inside list-decimal space-y-1 text-xs text-violet-900">
                        <li>Keep your Aadhaar, PAN and a business record ready.</li>
                        <li>Visit the official government or bank portal for this scheme.</li>
                        <li>Fill the application with your business details and sales history.</li>
                        <li>Never pay any agent for a government loan — legitimate loans have no advance fees.</li>
                      </ol>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
            <FiEdit className="mt-0.5 h-4 w-4 shrink-0" />
            Scheme details, availability and guidelines change frequently. Always verify
            current details on official government portals before applying.
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-3">
            <FiStar className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900">Start Small</h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Practical tips to launch lean and learn fast.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {startSmallTips.map((t) => (
              <div
                key={t.tip}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-rose-200 hover:bg-rose-50/40"
              >
                <span className="text-xl">{t.emoji}</span>
                <p className="text-sm text-slate-700">{t.tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-rose-500 p-8 text-white shadow-lg shadow-violet-500/20">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold">Grow with a Mentor</h2>
              <p className="mt-1 max-w-md text-sm text-white/80">
                Connect with verified entrepreneurs and experts who've launched businesses before you.
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm font-medium text-white/90">
                <FiUsers className="h-4 w-4" /> Mentorship builds confidence and direction.
              </div>
            </div>
            <Link
              href="/network"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-700 shadow-lg transition-transform hover:scale-[1.02]"
            >
              Find a Mentor
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-start gap-3">
            <FiBookOpen className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
            <div>
              <p className="text-sm font-bold text-slate-800">Still exploring? Learn the basics first.</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Link href="/learn/business-registration" className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-4 py-1.5 text-xs font-bold text-violet-700 hover:bg-violet-100">
                  Business Registration course
                </Link>
                <Link href="/learn/digital-marketing" className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-4 py-1.5 text-xs font-bold text-violet-700 hover:bg-violet-100">
                  Digital Marketing course
                </Link>
                <Link href="/learn/budgeting-savings" className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-4 py-1.5 text-xs font-bold text-violet-700 hover:bg-violet-100">
                  Budgeting course
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-start gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-500">
          <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <span>
            <strong>Disclaimer:</strong> All content on Her Business is educational only.
            Verify current scheme details on official government portals and consult
            qualified professionals for legal and financial matters before making decisions.
          </span>
        </div>
      </div>
    </div>
  );
}