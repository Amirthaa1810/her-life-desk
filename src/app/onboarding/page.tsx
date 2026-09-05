"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";

interface Step {
  id: string;
  title: string;
  subtitle: string;
}

const steps: Step[] = [
  { id: "basic", title: "Basic Profile", subtitle: "Tell us about yourself" },
  { id: "stakes", title: "Your Life Snapshot", subtitle: "Quick questions about your situation" },
  { id: "goals", title: "Goals", subtitle: "What do you want to achieve?" },
  { id: "done", title: "Your Profile", subtitle: "Building your index" },
];

function Choice({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string | string[];
  onChange: (v: string) => void;
}) {
  const isMulti = Array.isArray(value);
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {options.map((opt) => {
        const selected = isMulti ? value.includes(opt) : value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selected
                ? "border-violet-600 bg-violet-50 text-violet-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [profile, setProfile] = useState({
    displayName: "",
    ageGroup: "",
    location: "",
    education: "",
    employment: "",
    profession: "",
    language: "",
    careerBreakYears: "",
    goals: [] as string[],
  });

  const step = steps[stepIndex];

  const setField = (key: string, value: string | string[]) =>
    setProfile((p) => ({ ...p, [key]: value }));

  const canProceed = () => {
    if (stepIndex === 0) return !!profile.displayName;
    return true;
  };

  const handleNext = () => {
    if (stepIndex === steps.length - 1) {
      try {
        localStorage.setItem(
          "her-life-desk-profile",
          JSON.stringify({
            name: profile.displayName,
            location: profile.location,
            ageGroup: profile.ageGroup,
            education: profile.education,
            employment: profile.employment,
            profession: profile.profession,
            language: profile.language,
            goals: profile.goals,
          })
        );
      } catch {
        // storage unavailable, continue
      }
      router.push("/dashboard");
      return;
    }
    setStepIndex((i) => i + 1);
  };

  const goalOptions = [
    "Become financially independent",
    "Understand my legal rights",
    "Build assets",
    "Restart my career",
    "Find a job",
    "Start a business",
    "Improve digital safety",
    "Improve financial literacy",
    "Organize important documents",
    "Find a mentor",
    "Find a career expert",
    "Learn new skills",
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
      >
        <FiArrowLeft className="h-4 w-4" /> Back to home
      </Link>

      <div className="mt-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Build Your Life Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Understand your situation. We personalize everything around it.
        </p>

        {/* Progress */}
        <div className="mt-6 flex items-center gap-2">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={`h-1.5 flex-1 rounded-full ${
                i <= stepIndex ? "bg-gradient-to-r from-violet-600 to-rose-500" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-xs font-medium text-slate-400">
          Step {stepIndex + 1} of {steps.length} — {step.title}
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {stepIndex === 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-900">{step.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{step.subtitle}</p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700">
                  What should we call you? <span className="text-slate-400">(Display name)</span>
                </label>
                <input
                  type="text"
                  value={profile.displayName}
                  onChange={(e) => setField("displayName", e.target.value)}
                  placeholder="e.g. Amirthaa"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Age group</label>
                <Choice
                  options={["18-25", "26-35", "36-45", "46-60", "60+"]}
                  value={profile.ageGroup}
                  onChange={(v) => setField("ageGroup", v)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setField("location", e.target.value)}
                  placeholder="e.g. Chennai"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Education</label>
                <Choice
                  options={["School", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD"]}
                  value={profile.education}
                  onChange={(v) => setField("education", v)}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Employment status</label>
                <Choice
                  options={["Working full-time", "Working part-time", "On career break", "Homemaker", "Looking for work", "Running a business"]}
                  value={profile.employment}
                  onChange={(v) => setField("employment", v)}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Profession / Field</label>
                <input
                  type="text"
                  value={profile.profession}
                  onChange={(e) => setField("profession", e.target.value)}
                  placeholder="e.g. Marketing"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Preferred language</label>
                <Choice
                  options={["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali"]}
                  value={profile.language}
                  onChange={(v) => setField("language", v)}
                />
              </div>
            </div>
          </div>
        )}

        {stepIndex === 1 && (
          <div>
            <h2 className="text-lg font-bold text-slate-900">{step.title}</h2>
            <p className="mt-1 text-sm text-slate-500">
              No right or wrong answers. This helps us build your readiness snapshot.
            </p>

            {[
              { q: "Do you have your own bank account?", yes: "Yes", no: "Not yet" },
              { q: "Do you have emergency savings?", yes: "Yes", no: "No savings yet" },
              { q: "Do you understand basic financial concepts?", yes: "Comfortable", no: "Still learning" },
              { q: "Do you have insurance?", yes: "Yes", no: "Not yet" },
              { q: "Do you understand your basic legal rights?", yes: "Yes", no: "Not fully" },
              { q: "Do you know whose name your assets are registered in?", yes: "Yes", no: "Not sure" },
              { q: "Do you know where your important documents are?", yes: "Yes", no: "Not organized" },
              { q: "Do you use two-factor authentication?", yes: "Yes", no: "Not yet" },
              { q: "Can you recognize common scams?", yes: "Confident", no: "Not confident" },
              { q: "Are you currently working outside home?", yes: "Yes", no: "No" },
              { q: "Do you currently run a business?", yes: "Yes", no: "No" },
              { q: "Do you know how to report cybercrime?", yes: "Yes", no: "No" },
            ].map((item) => (
              <div key={item.q} className="mt-5">
                <p className="text-sm font-semibold text-slate-700">{item.q}</p>
                <div className="mt-2 flex gap-3">
                  <button
                    type="button"
                    className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    ✅ {item.yes}
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700"
                  >
                    📝 {item.no}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {stepIndex === 2 && (
          <div>
            <h2 className="text-lg font-bold text-slate-900">{step.title}</h2>
            <p className="mt-1 text-sm text-slate-500">
              Select everything you'd love to achieve.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {goalOptions.map((goal) => {
                const selected = profile.goals.includes(goal);
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() =>
                      setField(
                        "goals",
                        selected
                          ? profile.goals.filter((g) => g !== goal)
                          : [...profile.goals, goal]
                      )
                    }
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      selected
                        ? "border-violet-600 bg-violet-50 text-violet-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {goal}
                    {selected && <FiCheck className="h-4 w-4 text-violet-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {stepIndex === 3 && (
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-rose-500 text-4xl shadow-lg shadow-violet-500/25">
              🌸
            </div>
            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Your profile is ready, {profile.displayName || "friend"}!
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              We've analyzed your situation. Now let's build your Her
              Empowerment Index and discover your Next Best Action.
            </p>
            <div className="mx-auto mt-6 max-w-sm space-y-2 text-left">
              {[
                "Your current readiness snapshot",
                "Your strongest areas & gaps",
                "Your Next Best Action",
                "A personalized 30/60/90-day roadmap",
                "Mentors, jobs & learning matched to you",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <FiCheck className="h-4 w-4 shrink-0 text-emerald-500" /> {item}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            disabled={stepIndex === 0}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiArrowLeft className="h-4 w-4" /> Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-rose-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            {stepIndex === steps.length - 1 ? "See My Dashboard" : "Continue"}
            <FiArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}