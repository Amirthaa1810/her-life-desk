"use client";

import { useState } from "react";
import {
  FiArrowRight,
  FiAlertTriangle,
  FiCheckCircle,
  FiShield,
  FiLock,
  FiEye,
  FiCamera,
  FiUserX,
  FiLink,
} from "react-icons/fi";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import LearningGrid from "@/components/ui/LearningGrid";
import type { LearningTopic } from "@/components/ui/LearningGrid";

const emergencyCategories = [
  { id: "digital", label: "Digital / Cyber", emoji: "💻" },
  { id: "financial", label: "Financial", emoji: "💰" },
  { id: "legal", label: "Legal", emoji: "⚖️" },
  { id: "career", label: "Career", emoji: "💼" },
  { id: "business", label: "Business", emoji: "🏪" },
];

const emergencyScenarios: Record<
  string,
  { title: string; urgent: boolean; steps: string[]; resources: { label: string; link: string }[] }[]
> = {
  digital: [
    {
      title: "UPI Fraud — Money transferred to scammer",
      urgent: true,
      steps: [
        "Call your bank's fraud helpline immediately to report the unauthorized transaction.",
        "Report the incident on the National Cyber Crime Portal: cybercrime.gov.in.",
        "Dial Cyber Crime Helpline 1930 for financial fraud assistance.",
        "File a police complaint at your nearest station or through 112.",
        "Block your UPI app and all linked bank accounts until verified.",
        "Take screenshots of the transaction and all communications with the scammer.",
        "Change all passwords for email, bank and UPI apps from a safe device.",
      ],
      resources: [
        { label: "Cyber Crime Portal — cybercrime.gov.in", link: "https://cybercrime.gov.in" },
        { label: "Cyber Crime Helpline: 1930", link: "tel:1930" },
        { label: "Police Emergency: 112", link: "tel:112" },
      ],
    },
    {
      title: "Cyberstalking or Online Harassment",
      urgent: true,
      steps: [
        "Do not respond to the stalker or harasser.",
        "Block the person on all platforms immediately.",
        "Take screenshots of all messages, profiles and interactions as evidence.",
        "Report the incident on cybercrime.gov.in or through helpline 1930.",
        "File a police complaint — stalking is a criminal offence under the IT Act and BNS.",
        "Report to the National Commission for Women if needed.",
        "Inform your employer or HR if the harassment is linked to your workplace.",
      ],
      resources: [
        { label: "Cyber Crime Portal — cybercrime.gov.in", link: "https://cybercrime.gov.in" },
        { label: "National Commission for Women", link: "https://ncw.nic.in" },
        { label: "Police Emergency: 112", link: "tel:112" },
      ],
    },
    {
      title: "OTP Scam — Shared your OTP with someone",
      urgent: true,
      steps: [
        "If you shared an OTP, immediately change your passwords for the compromised account.",
        "Contact your bank to inform them of the potential compromise.",
        "Check your bank/UPI accounts for any unauthorized transactions.",
        "Enable two-factor authentication on all critical accounts.",
        "Report the scammer's number to your telecom provider.",
        "File a report on cybercrime.gov.in if any financial loss occurred.",
        "Monitor your accounts closely for the next 30 days.",
      ],
      resources: [
        { label: "Cyber Crime Portal — cybercrime.gov.in", link: "https://cybercrime.gov.in" },
        { label: "Cyber Crime Helpline: 1930", link: "tel:1930" },
      ],
    },
  ],
  financial: [
    {
      title: "Unauthorized Transaction on Bank Account",
      urgent: true,
      steps: [
        "Call your bank's 24×7 fraud helpline immediately.",
        "Request a temporary freeze on your account or card.",
        "Dispute the transaction formally through the bank.",
        "File a complaint on the RBI Complaints Portal (cms.rbi.org.in) if the bank does not respond.",
        "Report to cybercrime.gov.in if the transaction was online.",
        "File a police complaint with transaction details and screenshots.",
      ],
      resources: [
        { label: "RBI Complaints Portal", link: "https://cms.rbi.org.in" },
        { label: "Cyber Crime Portal — cybercrime.gov.in", link: "https://cybercrime.gov.in" },
        { label: "Cyber Crime Helpline: 1930", link: "tel:1930" },
      ],
    },
    {
      title: "Fake Investment or Loan App",
      urgent: false,
      steps: [
        "Stop all communication with the app or agent immediately.",
        "Do not pay any further fees, processing charges or 'taxes'.",
        "Gather all evidence: messages, screenshots, account numbers shared.",
        "Report the app on cybercrime.gov.in and to your local police.",
        "Check if the app is registered with SEBI or RBI — if not, it is unregulated.",
        "Warn friends and family about the scam.",
      ],
      resources: [
        { label: "Cyber Crime Portal — cybercrime.gov.in", link: "https://cybercrime.gov.in" },
        { label: "SEBI Investor Complaints", link: "https://scores.sebi.gov.in" },
      ],
    },
  ],
  legal: [
    {
      title: "Being Pressured to Sign Something You Don't Understand",
      urgent: false,
      steps: [
        "Do not sign anything under pressure. You always have the right to read and understand a document first.",
        "Ask for a copy of the document to review at your own pace.",
        "Consult a lawyer before signing any legal, financial or employment agreement.",
        "Contact the District Legal Services Authority (DLSA) for free legal aid if you cannot afford a lawyer.",
        "If you signed under duress, a lawyer can advise on your options for revocation.",
      ],
      resources: [
        { label: "District Legal Services Authority (DLSA)", link: "#" },
        { label: "National Legal Aid Cell", link: "https://nalsa.gov.in" },
      ],
    },
  ],
  career: [
    {
      title: "Workplace Discrimination or Harassment",
      urgent: false,
      steps: [
        "Document every incident with dates, times, witnesses and screenshots.",
        "Report to your employer's Internal Complaints Committee (ICC) under the POSH Act.",
        "If ICC is ineffective, file a complaint with the Local Complaints Committee (LCC) at the District Magistrate's office.",
        "Contact the National Commission for Women for guidance.",
        "Consult a lawyer who specializes in employment or women's rights law.",
      ],
      resources: [
        { label: "National Commission for Women", link: "https://ncw.nic.in" },
        { label: "POSH Act Information", link: "https://posh.gov.in" },
      ],
    },
  ],
  business: [
    {
      title: "Being Scammed as a Business Owner (Fake Buyer/Supplier)",
      urgent: false,
      steps: [
        "Stop all further payments or shipments immediately.",
        "Gather all evidence: contracts, messages, payment receipts, account details.",
        "Report to cybercrime.gov.in if the scam was conducted online.",
        "File a police complaint with all documented evidence.",
        "Contact your bank to flag the fraudulent account.",
        "Report to your local Chamber of Commerce or industry body.",
      ],
      resources: [
        { label: "Cyber Crime Portal — cybercrime.gov.in", link: "https://cybercrime.gov.in" },
        { label: "Police Emergency: 112", link: "tel:112" },
      ],
    },
  ],
};

const suspiciousKeywords = [
  "otp", "pin", "password", "prize", "lottery", "refund",
  "card number", "kyc", "investment", "link", "share", "crypto",
  "urgent", "verify", "account", "blocked", "winner", "congratulations",
];

const exampleChips = [
  "Someone is asking me to share my OTP.",
  "I got a message saying I won a lottery prize.",
  "A stranger wants me to click a link to claim a refund.",
  "My bank account is blocked, someone wants me to verify my KYC.",
  "Someone is asking for my card number and CVV.",
  "I got a crypto investment offer that promises 10x returns.",
  "Someone is asking for my UPI PIN to transfer money back.",
];

const learningTopics: LearningTopic[] = [
  {
    emoji: "💸",
    title: "UPI Fraud",
    desc: "How UPI fraud happens, red flags and what to do if you're targeted.",
    mins: 7,
    xp: 35,
    courseSlug: "upi-scams",
  },
  {
    emoji: "🔢",
    title: "OTP Scams",
    desc: "Why you should never share your OTP and how to spot OTP phishing attempts.",
    mins: 5,
    xp: 25,
    courseSlug: "upi-scams",
  },
  {
    emoji: "🏦",
    title: "Banking Scams",
    desc: "Fake bank calls, SMS fraud and how to verify if a communication is genuine.",
    mins: 8,
    xp: 40,
    courseSlug: "upi-scams",
  },
  {
    emoji: "📈",
    title: "Fake Investment Schemes",
    desc: "Spotting get-rich-quick promises, Ponzi schemes and fake crypto offers.",
    mins: 7,
    xp: 35,
  },
  {
    emoji: "👤",
    title: "Fake Profiles",
    desc: "How scammers create fake social media and dating profiles to exploit trust.",
    mins: 6,
    xp: 30,
    courseSlug: "social-media-security",
  },
  {
    emoji: "🆔",
    title: "Identity Theft",
    desc: "What identity theft looks like, how to prevent it and steps if it happens.",
    mins: 9,
    xp: 45,
    courseSlug: "social-media-security",
  },
  {
    emoji: "💬",
    title: "Social-Media Harassment",
    desc: "Handling trolling, doxxing, impersonation and reporting on major platforms.",
    mins: 7,
    xp: 35,
    courseSlug: "social-media-security",
  },
  {
    emoji: "👁️",
    title: "Cyberstalking",
    desc: "Recognizing cyberstalking, legal protections available and how to get help.",
    mins: 8,
    xp: 40,
  },
  {
    emoji: "🔗",
    title: "Suspicious Links",
    desc: "How to evaluate a link before clicking and what happens if you click a phishing link.",
    mins: 5,
    xp: 25,
  },
  {
    emoji: "🔐",
    title: "Account Security (2FA)",
    desc: "Setting up two-factor authentication on email, banking and social media accounts.",
    mins: 6,
    xp: 30,
    courseSlug: "two-factor-auth",
  },
  {
    emoji: "💍",
    title: "Matrimonial / Dating Scams",
    desc: "How romance scams work, warning signs and protecting yourself financially.",
    mins: 7,
    xp: 35,
  },
  {
    emoji: "🎣",
    title: "Phishing",
    desc: "Recognizing phishing emails, messages and calls — and what to do if you fall for one.",
    mins: 6,
    xp: 30,
  },
];

const safeDos = [
  "Do enable two-factor authentication on all important accounts.",
  "Do use strong, unique passwords for each service.",
  "Do keep your phone and apps updated with the latest security patches.",
  "Do report suspicious activity immediately to official helplines.",
  "Do verify any financial request by calling the official number independently.",
  "Do back up important data regularly.",
];

const safeDonts = [
  "Don't share OTPs, PINs or passwords with anyone — even someone claiming to be bank staff.",
  "Don't click links in unsolicited SMS, WhatsApp or email messages.",
  "Don't install apps from unofficial sources or unknown third-party links.",
  "Don't transfer money to someone you've only met online.",
  "Don't overshare personal information on social media — addresses, phone numbers, travel plans.",
  "Don't ignore warning signs — trust your instinct if something feels wrong.",
];

function analyzeText(text: string): { risk: "HIGH" | "MEDIUM" | "LOW"; explanation: string; steps: string[] } {
  const lower = text.toLowerCase();
  const matches = suspiciousKeywords.filter((kw) => lower.includes(kw));

  if (matches.includes("otp") || matches.includes("pin") || matches.includes("card number") || matches.includes("share")) {
    return {
      risk: "HIGH",
      explanation:
        "This situation involves sharing sensitive credentials (OTP, PIN or card details). No legitimate bank, service or company will ever ask you to share these. This is a very common scam pattern.",
      steps: [
        "Do NOT share any OTP, PIN, password or card number with anyone.",
        "End the call or conversation immediately.",
        "If you already shared details, change your passwords/PINs right away.",
        "Contact your bank's fraud helpline immediately.",
        "Report the incident on cybercrime.gov.in or call 1930.",
      ],
    };
  }

  if (matches.includes("prize") || matches.includes("lottery") || matches.includes("winner") || matches.includes("congratulations")) {
    return {
      risk: "HIGH",
      explanation:
        "You have been contacted about a prize or lottery you did not enter. This is a classic scam — no legitimate prize requires you to pay fees or share personal information to claim it.",
      steps: [
        "Do not respond to the message or call.",
        "Do not pay any 'processing fee' or 'tax' to claim a prize.",
        "Block the sender and report the message.",
        "If money was already sent, report to cybercrime.gov.in immediately.",
      ],
    };
  }

  if (matches.includes("refund") || matches.includes("kyc") || matches.includes("blocked") || matches.includes("verify")) {
    return {
      risk: "HIGH",
      explanation:
        "This appears to be a social engineering scam where someone is pretending there is an issue with your account (blocked, KYC, refund) to get you to share information or click a malicious link.",
      steps: [
        "Do not click any links or share any information.",
        "Contact your bank directly using the number on the back of your card or their official website.",
        "Check your account status through the official banking app only.",
        "Report the suspicious message to cybercrime.gov.in.",
      ],
    };
  }

  if (matches.includes("investment") || matches.includes("crypto")) {
    return {
      risk: "MEDIUM",
      explanation:
        "Investment and cryptocurrency offers — especially those promising high or guaranteed returns — carry significant risk. Many are scams. Always verify through SEBI, RBI or official regulatory channels.",
      steps: [
        "Do not invest without thorough independent research.",
        "Verify if the platform/company is registered with SEBI or RBI.",
        "Be skeptical of guaranteed or unusually high returns.",
        "Talk to a trusted financial advisor before committing any money.",
        "Report suspicious schemes on cybercrime.gov.in.",
      ],
    };
  }

  if (matches.includes("link")) {
    return {
      risk: "MEDIUM",
      explanation:
        "You received or were asked to click a link. Suspicious links are used for phishing — to steal your credentials or install malware. Always verify the source before clicking.",
      steps: [
        "Do not click the link.",
        "Verify the sender's identity through a separate channel.",
        "If you clicked the link, run a security scan on your device immediately.",
        "Change passwords for any accounts you accessed from that device.",
      ],
    };
  }

  if (matches.length > 0) {
    return {
      risk: "MEDIUM",
      explanation:
        "This situation contains some elements commonly associated with scams or fraud. While it may not be an immediate threat, proceed with caution and verify any requests through official channels.",
      steps: [
        "Verify any request by contacting the organization directly using official channels.",
        "Do not share personal or financial information until you are certain.",
        "Trust your instincts — if something feels wrong, it probably is.",
        "Report any suspicious activity to cybercrime.gov.in.",
      ],
    };
  }

  return {
    risk: "LOW",
    explanation:
      "This situation does not contain obvious indicators of a scam based on the description provided. However, always stay alert and trust your instincts in any situation that feels uncomfortable.",
    steps: [
      "Stay aware of common scam patterns.",
      "Never share sensitive information with unverified contacts.",
      "Use strong passwords and enable two-factor authentication.",
      "Report anything suspicious even if it turns out to be harmless.",
    ],
  };
}

export default function DigitalShieldPage() {
  const [activeCategory, setActiveCategory] = useState("digital");
  const [openScenario, setOpenScenario] = useState<string | null>(null);
  const [situationInput, setSituationInput] = useState("");
  const [analysisResult, setAnalysisResult] = useState<ReturnType<typeof analyzeText> | null>(null);

  const analyzeSituation = () => {
    if (!situationInput.trim()) return;
    setAnalysisResult(analyzeText(situationInput));
  };

  const handleChipClick = (chip: string) => {
    setSituationInput(chip);
    setAnalysisResult(analyzeText(chip));
  };

  const riskBadgeTone: Record<string, "danger" | "warning" | "success"> = {
    HIGH: "danger",
    MEDIUM: "warning",
    LOW: "success",
  };

  return (
    <div>
      <PageHeader
        emoji="🛡️"
        title="Her Digital Shield"
        subtitle="Protect your money, identity and peace of mind online."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 space-y-12">
        <section>
          <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50 to-violet-50 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              🚨 Something Happened. What Should I Do?
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Select your situation and follow the step-by-step guidance.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {emergencyCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(c.id);
                    setOpenScenario(null);
                  }}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    activeCategory === c.id
                      ? "bg-gradient-to-r from-violet-600 to-rose-500 text-white shadow-md"
                      : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300"
                  }`}
                >
                  <span>{c.emoji}</span>
                  {c.label}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              {emergencyScenarios[activeCategory]?.map((s) => (
                <div key={s.title} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenScenario((prev) => (prev === s.title ? null : s.title))
                    }
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      {s.urgent && <FiAlertTriangle className="h-5 w-5 text-rose-500" />}
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                        {s.urgent && (
                          <p className="mt-0.5 text-xs text-rose-600 font-medium">
                            Urgent — Contact authorities immediately if in danger
                          </p>
                        )}
                      </div>
                    </div>
                    <FiArrowRight
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                        openScenario === s.title ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {openScenario === s.title && (
                    <div className="border-t border-slate-100 p-5 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Steps to Take
                        </h4>
                        <ol className="mt-3 space-y-2">
                          {s.steps.map((step, si) => (
                            <li
                              key={si}
                              className="flex items-start gap-2.5 text-sm text-slate-700"
                            >
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                                {si + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                      {s.resources.length > 0 && (
                        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                          <h4 className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                            <FiShield className="h-3.5 w-3.5" />
                            Official Help Resources
                          </h4>
                          <div className="mt-2 space-y-1.5">
                            {s.resources.map((r) => (
                              <a
                                key={r.label}
                                href={r.link}
                                target={r.link.startsWith("http") ? "_blank" : undefined}
                                rel={r.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="flex items-center gap-1.5 text-xs font-medium text-rose-700 hover:text-rose-900"
                              >
                                <FiLink className="h-3 w-3" />
                                {r.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
              <FiAlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                If you or someone you know is in immediate danger, call{" "}
                <strong>112</strong> (Police Emergency) or{" "}
                <strong>1930</strong> (Cyber Crime Helpline) right away. Time is
                critical in fraud situations.
              </span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            🔍 Is This Suspicious?
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Describe a situation and we&apos;ll assess the risk level and suggest safe steps.
          </p>
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap gap-2 mb-4">
              {exampleChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleChipClick(chip)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600 transition-colors hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                >
                  {chip}
                </button>
              ))}
            </div>
            <textarea
              value={situationInput}
              onChange={(e) => setSituationInput(e.target.value)}
              placeholder="e.g. Someone is asking me to share my OTP to receive a refund…"
              rows={3}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
            <button
              type="button"
              onClick={analyzeSituation}
              disabled={!situationInput.trim()}
              className={`mt-3 rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                situationInput.trim()
                  ? "bg-gradient-to-r from-violet-600 to-rose-500 text-white shadow-lg shadow-violet-500/20 hover:scale-105"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              Analyze Situation
            </button>

            {analysisResult && (
              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold text-slate-900">Risk Level:</h3>
                  <Badge tone={riskBadgeTone[analysisResult.risk]}>
                    {analysisResult.risk}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-slate-700">
                  {analysisResult.explanation}
                </p>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Safe Steps to Take
                  </h4>
                  <ol className="mt-2 space-y-1.5">
                    {analysisResult.steps.map((step, si) => (
                      <li
                        key={si}
                        className="flex items-start gap-2 text-sm text-slate-700"
                      >
                        <FiCheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            📚 Learn & Protect Yourself
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Complete these modules to build your digital safety knowledge.
          </p>
          <div className="mt-6">
            <LearningGrid topics={learningTopics} />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            ✅ Staying Safe — Quick Reference
          </h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                <FiCheckCircle className="h-4 w-4" />
                Do
              </h3>
              <ul className="mt-3 space-y-2">
                {safeDos.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-emerald-800"
                  >
                    <FiCheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
              <h3 className="flex items-center gap-2 text-sm font-bold text-rose-900">
                <FiAlertTriangle className="h-4 w-4" />
                Don&apos;t
              </h3>
              <ul className="mt-3 space-y-2">
                {safeDonts.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-rose-800"
                  >
                    <FiAlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <FiLock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <h3 className="text-sm font-bold text-amber-900">Disclaimer</h3>
            <p className="mt-1 text-xs leading-relaxed text-amber-700">
              Her Digital Shield provides general educational information about
              digital safety and fraud prevention. It is not a substitute for
              professional legal, financial or cybersecurity advice. In case of
              actual fraud or a crime in progress, always contact authorities
              immediately through official helplines (112, 1930) and your bank's
              fraud department. Helpline numbers and official resources may
              change — always verify through official government sources.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
