"use client";

import { useMemo, useState } from "react";
import { FiSearch, FiMapPin, FiShield, FiUsers, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { mentors } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

type FilterKey = "All" | string;

const categoryTabs: { key: string; display: string }[] = [
  { key: "All", display: "All" },
  { key: "Career Mentor", display: "Career Mentor" },
  { key: "Mental Health", display: "Mental Health" },
  { key: "Legal", display: "Legal" },
  { key: "Financial", display: "Financial" },
  { key: "Entrepreneurship", display: "Entrepreneurship" },
];

const categoryOverview = [
  { emoji: "👩‍💼", title: "Career Mentors", subtitle: "Restart, grow and own your career", filter: "Career Mentor" },
  { emoji: "🧠", title: "Mental Health Professionals", subtitle: "Guidance for wellbeing and balance", filter: "Mental Health" },
  { emoji: "⚖️", title: "Legal Professionals", subtitle: "Know and protect your rights", filter: "Legal" },
  { emoji: "💰", title: "Financial Experts", subtitle: "Build independence and confidence", filter: "Financial" },
  { emoji: "🚀", title: "Entrepreneurship Experts", subtitle: "Start and scale your venture", filter: "Entrepreneurship" },
  { emoji: "🌸", title: "Women Empowerment Experts", subtitle: "Holistic support for your journey", filter: "All" },
];

function normalizeCategory(category: string): string {
  if (category === "Career Mentor" || category === "Careers") return "Career Mentor";
  return category;
}

const gradients = [
  "from-violet-600 to-rose-500",
  "from-rose-500 to-orange-400",
  "from-violet-500 to-indigo-500",
  "from-rose-400 to-pink-500",
  "from-indigo-500 to-violet-500",
  "from-fuchsia-500 to-rose-500",
];

export default function NetworkPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [search, setSearch] = useState("");
  const [requested, setRequested] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return mentors.filter((m) => {
      const matchesCategory =
        activeFilter === "All" ||
        normalizeCategory(m.category) === activeFilter ||
        normalizeCategory(m.category).toLowerCase().includes(activeFilter.toLowerCase());
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.expertise.toLowerCase().includes(q) ||
        m.languages.some((l) => l.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, search]);

  const toggleRequest = (id: number) => {
    setRequested((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleFilter = (filter: FilterKey) => {
    setActiveFilter(filter);
  };

  return (
    <div>
      <PageHeader
        emoji="🤝"
        title="Her Network"
        subtitle="Discover and connect with verified mentors, experts and professionals."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <section>
          <div className="flex items-center gap-3">
            <FiUsers className="h-5 w-5 text-violet-600" />
            <h2 className="text-xl font-bold text-slate-900">Explore by Speciality</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryOverview.map((c) => (
              <button
                key={c.title}
                onClick={() => handleFilter(c.filter)}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-2xl transition-colors group-hover:bg-gradient-to-br group-hover:from-violet-600 group-hover:to-rose-500">
                  {c.emoji}
                </span>
                <span>
                  <span className="block text-sm font-bold text-slate-900">{c.title}</span>
                  <span className="block text-xs text-slate-500">{c.subtitle}</span>
                </span>
                <FiArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-violet-500" />
              </button>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Find Your Mentor</h2>
              <p className="mt-1 text-sm text-slate-500">
                {filtered.length} {filtered.length === 1 ? "professional" : "professionals"} available.
              </p>
            </div>
            <div className="relative lg:w-72">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <FiSearch className="h-4 w-4" />
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, expertise or language…"
                className="w-full rounded-full border border-slate-300 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categoryTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleFilter(tab.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeFilter === tab.key
                    ? "bg-gradient-to-r from-violet-600 to-rose-500 text-white shadow-lg shadow-violet-500/20"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-700"
                }`}
              >
                {tab.display}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <Card className="mt-6 text-center">
              <p className="text-3xl">🔍</p>
              <p className="mt-2 text-sm font-semibold text-slate-700">No professionals found</p>
              <p className="mt-1 text-sm text-slate-500">Try a different category or search term.</p>
            </Card>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((m, idx) => {
                const isRequested = requested.has(m.id);
                const cat = normalizeCategory(m.category);
                const activatableCats = ["Career Mentor", "Mental Health", "Legal", "Financial", "Entrepreneurship"];
                const tone = activatableCats.includes(cat)
                  ? ("success" as "success" | "warning" | "danger" | "info")
                  : ("info" as "success" | "warning" | "danger" | "info");
                return (
                  <Card key={m.id}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold text-white shadow-md ${
                            gradients[idx % gradients.length]
                          }`}
                        >
                          {m.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <div>
                          <h3 className="text-base font-bold text-slate-900">{m.name}</h3>
                          <p className="text-xs text-slate-400">
                            {m.categoryEmoji} {cat}
                          </p>
                        </div>
                      </div>
                      {m.verified ? (
                        <Badge tone="success">✅ Verified</Badge>
                      ) : (
                        <Badge tone="warning">Credentials pending</Badge>
                      )}
                    </div>

                    <p className="mt-4 text-sm text-slate-600">{m.expertise}</p>

                    <div className="mt-3">
                      <Badge tone="info">{m.experience}</Badge>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {m.languages.map((lang) => (
                        <span
                          key={lang}
                          className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 space-y-1.5 text-sm text-slate-600">
                      <p className="flex items-center gap-2">
                        <FiMapPin className="h-4 w-4 text-violet-500" /> {m.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <FiShield className="h-4 w-4 text-rose-500" /> Available: {m.availability}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleRequest(m.id)}
                      className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                        isRequested
                          ? "bg-emerald-500 text-white hover:bg-emerald-600"
                          : "bg-gradient-to-r from-violet-600 to-rose-500 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02]"
                      }`}
                    >
                      {isRequested ? (
                        <>
                          <FiCheckCircle className="h-4 w-4" /> Requested ✓
                        </>
                      ) : (
                        "Connect"
                      )}
                    </button>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="mt-6 flex items-start gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-500">
            <FiShield className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
            <span>
              Credentials verified where indicated. Not every expert is a licensed
              professional — review credentials before engaging.
            </span>
          </div>
        </section>

        <section className="mt-12">
          <Card className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-2xl">
              🛡️
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-slate-900">
                Safety & Confidentiality
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Your connections and conversations are private. Never share OTPs, bank
                details or sensitive documents with anyone you've contacted here. Report
                any suspicious behavior to the Her Life Desk team.
              </p>
            </div>
          </Card>
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-rose-500 p-8 text-white shadow-lg shadow-violet-500/20">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold">Grow in Community</h2>
              <p className="mt-1 max-w-md text-sm text-white/80">
                Join Her Circle — a supportive space where women share wins, ask questions and lift each other up.
              </p>
            </div>
            <Link
              href="/circle"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-700 shadow-lg transition-transform hover:scale-[1.02]"
            >
              Join Her Circle
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
