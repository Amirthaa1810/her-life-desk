"use client";

import { useMemo, useState } from "react";
import {
  FiSearch,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiCheckCircle,
  FiPlus,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiBriefcase,
  FiAlertTriangle,
} from "react-icons/fi";
import { jobs, ALL_JOBS_LOCATIONS } from "@/lib/data";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

const jobTypes = ["All", "Full-time", "Part-time"];
const workTypes = ["All", "Remote", "On-site", "Hybrid"];

const salaryBands = [
  { label: "Any salary", min: 0, max: Infinity },
  { label: "₹8,000 - ₹15,000", min: 8000, max: 15000 },
  { label: "₹15,000 - ₹25,000", min: 15001, max: 25000 },
  { label: "₹25,000 and above", min: 25001, max: Infinity },
];

function formatSalary(min: number, max: number) {
  if (max === Infinity) return `₹${min.toLocaleString("en-IN")}+`;
  return `₹${min.toLocaleString("en-IN")} - ₹${max.toLocaleString("en-IN")}/mo`;
}

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [customLocations, setCustomLocations] = useState<string[]>([]);
  const [newLocation, setNewLocation] = useState("");
  const [jobType, setJobType] = useState("All");
  const [workType, setWorkType] = useState("All");
  const [salaryBand, setSalaryBand] = useState(salaryBands[0]);
  const [sortBy, setSortBy] = useState<"default" | "salary">("default");
  const [applied, setApplied] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);
  const [postedJobs, setPostedJobs] = useState<typeof jobs>([]);
  const [postForm, setPostForm] = useState({ title: "", company: "", location: "", salary: "" });

  const allLocations = useMemo(
    () => ["All", ...ALL_JOBS_LOCATIONS.filter((l) => !customLocations.includes(l)), ...customLocations],
    [customLocations]
  );

  const addLocation = () => {
    const city = newLocation.trim();
    if (!city) return;
    if (ALL_JOBS_LOCATIONS.some((l) => l.toLowerCase() === city.toLowerCase()) || customLocations.some((l) => l.toLowerCase() === city.toLowerCase())) {
      setNewLocation("");
      return;
    }
    setCustomLocations((c) => [...c, city]);
    setSelectedLocation(city);
    setNewLocation("");
  };

  const removeCustomLocation = (city: string) => {
    setCustomLocations((c) => c.filter((x) => x !== city));
    if (selectedLocation === city) setSelectedLocation("All");
  };

  const results = useMemo(() => {
    let list = [...jobs, ...postedJobs];
    const q = query.toLowerCase();
    if (q) {
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (selectedLocation !== "All") list = list.filter((j) => j.location === selectedLocation);
    if (jobType !== "All") list = list.filter((j) => j.type === jobType);
    if (workType !== "All") list = list.filter((j) => j.workType === workType);
    list = list.filter((j) => j.minSalary >= salaryBand.min && j.minSalary <= salaryBand.max);
    if (sortBy === "salary") list = [...list].sort((a, b) => b.minSalary - a.minSalary);
    return list;
  }, [query, selectedLocation, jobType, workType, salaryBand, sortBy, postedJobs]);

  const toggleApply = (id: number) =>
    setApplied((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const submitPosting = () => {
    if (!postForm.title.trim() || !postForm.location.trim()) return;
    setPostedJobs((prev) => [
      {
        id: Date.now(),
        title: postForm.title.trim(),
        company: postForm.company.trim() || "Our Community Employer",
        location: postForm.location.trim(),
        type: "Full-time",
        hours: "To be discussed",
        workType: "On-site",
        salary: postForm.salary.trim() || "To be discussed",
        minSalary: 0,
        maxSalary: 0,
        skills: [],
        remote: false,
        verified: false,
        featured: false,
        experience: "Open to all",
        description: "A new opportunity posted by employers in our community.",
        posted: "Just now",
      },
      ...prev,
    ]);
    setPostForm({ title: "", company: "", location: "", salary: "" });
  };

  return (
    <div>
      <div className="border-b border-slate-200 bg-gradient-to-r from-violet-50 via-white to-rose-50">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm ring-1 ring-slate-200">
                💼
              </span>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Her Jobs</h1>
                <p className="text-sm text-slate-500">
                  Find work near you or remote — with full pay details, clear
                  requirements and trusted listings.
                </p>
              </div>
            </div>
            <Badge tone="success">
              <FiCheckCircle className="h-3.5 w-3.5" /> {results.length} opportunities available
            </Badge>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Filters */}
          <div className="space-y-5 lg:col-span-1">
            <Card>
              <h3 className="text-sm font-bold text-slate-900">🔍 Search & Filters</h3>

              <div className="relative mt-3">
                <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search jobs…"
                  className="w-full rounded-xl border border-slate-300 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                />
              </div>

              <p className="mt-4 text-xs font-semibold text-slate-500">📍 Location</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {allLocations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setSelectedLocation(loc)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      selectedLocation === loc
                        ? "bg-violet-600 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-violet-300"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>

              <div className="mt-2 flex items-center gap-2">
                <input
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addLocation()}
                  placeholder="Add your own location…"
                  className="flex-1 rounded-xl border border-slate-300 px-3 py-1.5 text-xs outline-none focus:border-violet-500"
                />
                <button
                  type="button"
                  onClick={addLocation}
                  className="rounded-xl bg-violet-50 p-2 text-violet-600 hover:bg-violet-100"
                  aria-label="Add custom location"
                >
                  <FiPlus className="h-4 w-4" />
                </button>
              </div>
              {customLocations.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {customLocations.map((loc) => (
                    <span key={loc} className="inline-flex items-center gap-1 rounded-full bg-fuchsia-50 px-3 py-1 text-xs font-medium text-fuchsia-700 ring-1 ring-fuchsia-200">
                      {loc}
                      <button type="button" onClick={() => removeCustomLocation(loc)} aria-label={`Remove ${loc}`}>
                        <FiX className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <p className="mt-4 text-xs font-semibold text-slate-500">💼 Job type</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {jobTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setJobType(t)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      jobType === t ? "bg-violet-600 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-violet-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <p className="mt-4 text-xs font-semibold text-slate-500">🏠 Work mode</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {workTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setWorkType(t)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      workType === t ? "bg-violet-600 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-violet-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <p className="mt-4 text-xs font-semibold text-slate-500">💰 Salary</p>
              <select
                value={salaryBand.label}
                onChange={(e) => setSalaryBand(salaryBands.find((s) => s.label === e.target.value) ?? salaryBands[0])}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-violet-500"
              >
                {salaryBands.map((s) => (
                  <option key={s.label} value={s.label}>{s.label}</option>
                ))}
              </select>

              <p className="mt-4 text-xs font-semibold text-slate-500">↕️ Sort</p>
              <div className="mt-2 flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setSortBy("default")}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${sortBy === "default" ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600"}`}
                >
                  Latest
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy("salary")}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${sortBy === "salary" ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600"}`}
                >
                  Highest pay
                </button>
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-bold text-slate-900">🏢 Post an opportunity</h3>
              <p className="mt-1 text-xs text-slate-400">
                Are you an employer or business? List jobs for women in your area.
              </p>
              <div className="mt-3 space-y-2">
                <input
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  placeholder="Job title"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs outline-none focus:border-violet-500"
                />
                <input
                  value={postForm.company}
                  onChange={(e) => setPostForm({ ...postForm, company: e.target.value })}
                  placeholder="Company name"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs outline-none focus:border-violet-500"
                />
                <input
                  value={postForm.location}
                  onChange={(e) => setPostForm({ ...postForm, location: e.target.value })}
                  placeholder="Location"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs outline-none focus:border-violet-500"
                />
                <input
                  value={postForm.salary}
                  onChange={(e) => setPostForm({ ...postForm, salary: e.target.value })}
                  placeholder="Salary (e.g. ₹12,000/mo)"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs outline-none focus:border-violet-500"
                />
              </div>
              <button
                type="button"
                onClick={submitPosting}
                disabled={!postForm.title.trim() || !postForm.location.trim()}
                className="mt-3 w-full rounded-full bg-gradient-to-r from-violet-600 to-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 disabled:opacity-40"
              >
                Publish posting
              </button>
              <p className="mt-2 text-[11px] text-slate-400">Postings show instantly as community opportunities.</p>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-600">
                Showing <span className="font-bold text-slate-900">{results.length}</span>{" "}
                {results.length === 1 ? "job" : "jobs"}
                {selectedLocation !== "All" && (
                  <span className="text-slate-400"> in {selectedLocation}</span>
                )}
              </p>
            </div>

            {results.length === 0 && (
              <Card className="py-14 text-center">
                <span className="text-4xl">🔎</span>
                <p className="mt-3 text-sm font-semibold text-slate-600">No jobs match your filters just yet.</p>
                <p className="mt-1 text-xs text-slate-400">Try clearing a filter or adding your own location.</p>
              </Card>
            )}

            {results.map((job) => {
              const isOpen = expanded === job.id;
              const isApplied = applied.has(job.id);
              return (
                <article
                  key={job.id}
                  className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-base font-bold text-slate-900">{job.title}</h2>
                          {job.featured && <Badge tone="warning">🌟 Featured</Badge>}
                          {job.verified ? (
                            <Badge tone="success">
                              <FiCheckCircle className="h-3 w-3" /> Verified
                            </Badge>
                          ) : (
                            <Badge tone="warning">⚠️ Unverified</Badge>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm font-medium text-slate-500">{job.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{job.workType === "Remote" ? "🌐" : job.workType === "Hybrid" ? "🏢" : "📍"}</span>
                        <Badge tone="info">{job.workType}</Badge>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <FiMapPin className="h-4 w-4 text-violet-500" /> {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <FiBriefcase className="h-4 w-4 text-violet-500" /> {job.type} · {job.experience}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <FiClock className="h-4 w-4 text-violet-500" /> {job.hours}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <FiDollarSign className="h-4 w-4 text-emerald-500" />
                        <span className="font-semibold text-emerald-700">{job.salary}</span>
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.skills.map((s) => (
                        <span key={s} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : job.id)}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700"
                      >
                        {isOpen ? "Show less" : "View details"}
                        {isOpen ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
                      </button>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Posted {job.posted}</span>
                        <button
                          type="button"
                          onClick={() => toggleApply(job.id)}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                            isApplied
                              ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300"
                              : "bg-gradient-to-r from-violet-600 to-rose-500 text-white shadow-lg shadow-violet-500/20 hover:opacity-90"
                          }`}
                        >
                          {isApplied ? "✓ Applied" : "Apply now"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="animate-fade-up border-t border-slate-100 bg-slate-50/60 p-5">
                      <h3 className="text-sm font-bold text-slate-900">About this role</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{job.description}</p>
                      <h3 className="mt-4 text-sm font-bold text-slate-900">What you'll need</h3>
                      <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
                        <li>• {job.experience} of relevant experience.</li>
                        <li>• Skills: {job.skills.join(", ") || "Basic computer literacy."}</li>
                        <li>• Willing to work {job.hours.toLowerCase()} ({job.workType}).</li>
                      </ul>
                      <div className="mt-4 rounded-xl bg-white p-4 ring-1 ring-slate-200">
                        <p className="text-xs font-semibold text-slate-500">💡 How to apply safely</p>
                        <ul className="mt-1.5 space-y-1 text-xs text-slate-500">
                          <li>• Apply through the employer's official channel or email.</li>
                          <li>• Never pay any fee to get or start a job.</li>
                          <li>• If a posting asks for money or OTP, stop and report it.</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12">
        <Card className="flex items-start gap-3 border-amber-200 bg-amber-50">
          <FiAlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <span className="font-bold">Stay safe:</span> a genuine employer will
            never ask you to pay for an application, training or a job offer.
            If something feels wrong, trust your instinct and report it. Look
            for the <span className="font-semibold">✅ Verified</span> badge, but
            verify employers independently too.
          </p>
        </Card>
      </div>
    </div>
  );
}