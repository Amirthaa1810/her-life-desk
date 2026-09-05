"use client";

import { useState } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiAlertTriangle,
  FiShield,
  FiLock,
  FiEye,
} from "react-icons/fi";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import LearningGrid from "@/components/ui/LearningGrid";
import type { LearningTopic } from "@/components/ui/LearningGrid";

const rights = [
  {
    id: "equal-pay",
    title: "Right to Equal Pay",
    emoji: "💰",
    highlighted: false,
    detail:
      "Under the Equal Remuneration Act, 1976 and later the Code on Wages, 2019, women have the right to receive equal wages for equal work or work of a similar nature. An employer cannot pay a woman less than a man for performing the same duties.",
    help: "If you are being paid less than male colleagues for the same work, you can file a complaint with the Labour Commissioner or approach the appropriate court.",
  },
  {
    id: "work",
    title: "Right to Work",
    emoji: "💼",
    highlighted: false,
    detail:
      "Every woman has the right to work and cannot be discriminated against in hiring, promotion, or terms of employment based on gender. Employers must treat women equally in all aspects of employment.",
    help: "Approach the Labour Commissioner or the Equal Opportunity Commission if you face gender-based discrimination at any stage of employment.",
  },
  {
    id: "harassment",
    title: "Right Against Harassment at Workplace",
    emoji: "🛡️",
    highlighted: true,
    detail:
      "The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act) guarantees every woman the right to a workplace free from sexual harassment. Employers with 10+ employees must form an Internal Complaints Committee (ICC).",
    help: "Report to your employer's Internal Complaints Committee (ICC). If the ICC does not act, you can file a complaint with the Local Complaints Committee (LCC) at the District Magistrate's office within 3 months of the incident.",
  },
  {
    id: "property",
    title: "Right to Property & Inheritance",
    emoji: "🏠",
    highlighted: false,
    detail:
      "Women have equal rights to property inheritance under the Hindu Succession Act (amended 2005), which gives daughters equal coparcenary rights in ancestral property. Similar protections exist under other personal laws and the Indian Succession Act for other communities.",
    help: "Consult a property lawyer. The District Legal Services Authority (DLSA) provides free legal aid for eligible individuals.",
  },
  {
    id: "protection",
    title: "Right to Equal Protection of the Law",
    emoji: "⚖️",
    highlighted: false,
    detail:
      "Article 14 of the Constitution guarantees equality before law and equal protection. Article 15 prohibits discrimination on grounds of sex. These fundamental rights form the backbone of all women's rights in India.",
    help: "Approach the National/State Human Rights Commission or approach the High Court under Article 226 for violation of fundamental rights.",
  },
  {
    id: "safe-workplace",
    title: "Right to a Safe Workplace",
    emoji: "🔒",
    highlighted: false,
    detail:
      "Every woman has the right to a workplace that is safe and free from threats to her physical and psychological well-being. This includes adequate lighting, CCTV where appropriate, transport safety provisions, and anti-harassment policies.",
    help: "Report unsafe conditions to the Labour Inspector or the police. Employers who fail to provide a safe workplace can be penalized under various labour and criminal laws.",
  },
];

const helpResources = [
  {
    name: "National Commission for Women",
    contact: "ncw.nic.in | Helpline: 7827-170-170",
    tone: "info" as const,
  },
  {
    name: "State Women Helpline",
    contact: "181 (24×7 toll-free)",
    tone: "success" as const,
  },
  {
    name: "District Legal Services Authority",
    contact: "Free legal aid at your nearest District Court complex",
    tone: "info" as const,
  },
  {
    name: "Police Emergency",
    contact: "112 (immediate danger or threat)",
    tone: "danger" as const,
  },
  {
    name: "Labour Helpline",
    contact: "1800-11-1213 (employer disputes & workplace rights)",
    tone: "warning" as const,
  },
];

const topics: LearningTopic[] = [
  {
    emoji: "💵",
    title: "Equal Pay",
    desc: "Understand the Equal Remuneration Act and your right to fair wages.",
    mins: 6,
    xp: 30,
    courseSlug: "legal-rights",
  },
  {
    emoji: "🛡️",
    title: "Sexual Harassment at Workplace (POSH Act)",
    desc: "Know the POSH Act, your employer's obligations, and how to file a complaint.",
    mins: 10,
    xp: 50,
    courseSlug: "legal-rights",
  },
  {
    emoji: "🤰",
    title: "Maternity Benefits",
    desc: "Learn about the Maternity Benefit Act — leave duration, eligibility, and protections.",
    mins: 7,
    xp: 35,
  },
  {
    emoji: "🏢",
    title: "Right to a Safe Workplace",
    desc: "What makes a workplace legally safe, and what employers must provide.",
    mins: 5,
    xp: 25,
  },
  {
    emoji: "📢",
    title: "Reporting Harassment",
    desc: "Step-by-step guide: ICC, LCC, timelines, and how to document an incident.",
    mins: 8,
    xp: 40,
    courseSlug: "legal-rights",
  },
];

const quizQuestions = [
  {
    q: "An employer can legally pay a woman less than a man for the same job if she has fewer years of experience.",
    answer: false,
    explanation:
      "Equal pay is based on equal work or work of similar nature. Minor differences in experience do not justify paying women less.",
  },
  {
    q: "The POSH Act requires every employer with 10 or more employees to constitute an Internal Complaints Committee.",
    answer: true,
    explanation:
      "Correct. The POSH Act (2013) mandates that employers with 10 or more employees set up an ICC to handle workplace sexual harassment complaints.",
  },
  {
    q: "Under the Hindu Succession Act (amended 2005), daughters have equal coparcenary rights in ancestral property as sons.",
    answer: true,
    explanation:
      "Correct. The 2005 amendment gave daughters equal rights as coparceners in ancestral Hindu joint family property.",
  },
  {
    q: "The National Commission for Women can directly adjudicate criminal cases.",
    answer: false,
    explanation:
      "The NCW is a quasi-judicial body that investigates complaints and makes recommendations. It does not adjudicate criminal cases — those go through the court system.",
  },
];

export default function LegalPage() {
  const [openRight, setOpenRight] = useState<string | null>("harassment");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean | null>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const toggleRight = (id: string) => {
    setOpenRight((prev) => (prev === id ? null : id));
  };

  const handleQuizAnswer = (qi: number, answer: boolean) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qi]: answer }));
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
  };

  const quizScore = quizSubmitted
    ? quizQuestions.reduce(
        (score, q, i) => score + (quizAnswers[i] === q.answer ? 1 : 0),
        0
      )
    : 0;

  const quizComplete = quizQuestions.every((_, i) => quizAnswers[i] !== undefined && quizAnswers[i] !== null);

  return (
    <div>
      <PageHeader
        emoji="⚖️"
        title="Know Your Rights"
        subtitle="Basic legal awareness every woman deserves — in plain language."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 space-y-12">
        <section>
          <h2 className="text-xl font-bold text-slate-900">
            🔍 Rights Explorer
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Tap any right to learn more in simple terms.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rights.map((r) => (
              <div key={r.id}>
                <button
                  type="button"
                  onClick={() => toggleRight(r.id)}
                  className={`w-full rounded-2xl border p-5 text-left transition-all ${
                    openRight === r.id
                      ? "border-violet-300 bg-violet-50 shadow-md"
                      : "border-slate-200 bg-white shadow-sm hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{r.emoji}</span>
                    {r.highlighted && (
                      <Badge tone="warning">Most relevant to you</Badge>
                    )}
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-900">
                    {r.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1 text-xs text-violet-600">
                    {openRight === r.id ? "Close" : "Read more"}
                    <FiArrowRight className="h-3 w-3" />
                  </div>
                </button>
                {openRight === r.id && (
                  <div className="mt-2 rounded-2xl border border-violet-200 bg-white p-5 shadow-sm">
                    <p className="text-sm leading-relaxed text-slate-700">
                      {r.detail}
                    </p>
                    <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
                      <FiShield className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      <div>
                        <p className="text-xs font-bold text-amber-800">
                          Where to seek help
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-amber-700">
                          {r.help}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            📞 Where to Seek Help
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Official resources for legal assistance and emergency support.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {helpResources.map((r) => (
              <div
                key={r.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{r.name}</h3>
                  <Badge tone={r.tone}>
                    {r.tone === "danger" ? "Emergency" : r.tone === "warning" ? "Support" : "Official"}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-slate-600">{r.contact}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
            <FiAlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Helpline numbers and referral services may change. Always verify
              through official government websites. The information provided here
              is for educational reference only.
            </span>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            📚 Workplace Rights — Learn More
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Complete these modules to build your understanding of workplace legal protections.
          </p>
          <div className="mt-6">
            <LearningGrid topics={topics} />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            ✅ Check Your Legal Awareness
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Answer true or false to test what you know.
          </p>
          <div className="mt-6 space-y-4">
            {quizQuestions.map((q, qi) => (
              <div
                key={qi}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-medium text-slate-900">
                  {qi + 1}. {q.q}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleQuizAnswer(qi, true)}
                    disabled={quizSubmitted}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                      quizAnswers[qi] === true
                        ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    True
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuizAnswer(qi, false)}
                    disabled={quizSubmitted}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                      quizAnswers[qi] === false
                        ? "bg-rose-100 text-rose-700 ring-1 ring-rose-300"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    False
                  </button>
                </div>
                {quizSubmitted && (
                  <div
                    className={`mt-3 rounded-xl p-3 text-xs leading-relaxed ${
                      quizAnswers[qi] === q.answer
                        ? "bg-emerald-50 text-emerald-800"
                        : "bg-rose-50 text-rose-800"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold">
                      {quizAnswers[qi] === q.answer ? (
                        <FiCheckCircle className="h-3.5 w-3.5" />
                      ) : (
                        <FiAlertTriangle className="h-3.5 w-3.5" />
                      )}
                      {quizAnswers[qi] === q.answer ? "Correct!" : "Not quite."}
                    </div>
                    <p className="mt-1">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-4">
              {!quizSubmitted && (
                <button
                  type="button"
                  onClick={submitQuiz}
                  disabled={!quizComplete}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                    quizComplete
                      ? "bg-gradient-to-r from-violet-600 to-rose-500 text-white shadow-lg shadow-violet-500/20 hover:scale-105"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Submit Answers
                </button>
              )}
              {quizSubmitted && (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-rose-500 text-lg font-bold text-white">
                      {quizScore}/{quizQuestions.length}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {quizScore === quizQuestions.length
                          ? "Perfect score!"
                          : "Good effort!"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {quizScore === quizQuestions.length
                          ? "You scored full marks. You know your rights well!"
                          : "Review the explanations above to strengthen your understanding."}
                      </p>
                    </div>
                    <Badge tone="warning">+50 XP</Badge>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <FiLock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <h3 className="text-sm font-bold text-amber-900">Disclaimer</h3>
            <p className="mt-1 text-xs leading-relaxed text-amber-700">
              This page provides general educational information about women's
              legal rights in India. It is not a substitute for professional legal
              advice. Laws vary by jurisdiction, community and individual
              circumstances. For specific legal issues, please consult a
              qualified legal professional or reach out to the official resources
              listed above.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
