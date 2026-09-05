"use client";

import { useRef, useState, useEffect } from "react";
import { FiSend, FiBookOpen, FiArrowRight, FiAlertCircle, FiFileText, FiUsers } from "react-icons/fi";
import Badge from "@/components/ui/Badge";

interface Message {
  role: "user" | "bot";
  content: string;
}

interface Analysis {
  categories: string[];
  summary: string;
  meaning: string;
  education: string[];
  nextSteps: string[];
  checklist: string[];
  documents: string[];
  officialResources: { label: string; desc: string }[];
  sections: { label: string; href: string }[];
  recommendedActions: string[];
  experts: string[];
  disclaimer: string;
}

const knowledgeBase: { keywords: string[]; analysis: Analysis }[] = [
  {
    keywords: ["house", "property", "buy", "flat", "apartment", "land"],
    analysis: {
      categories: ["Property", "Finance", "Legal", "Ownership"],
      summary: "This is a significant ownership decision involving legal, financial and ownership preparation.",
      meaning: "Buying a home combines legal registration, financial planning, loan understanding and long-term ownership responsibilities. Being prepared on all fronts protects you from pitfalls.",
      education: [
        "Understand the difference between title deed, sale deed and encumbrance certificate.",
        "Verify the seller's ownership and clear title before paying any advance.",
        "Understand how a home loan works: EMI, down payment, interest types and charges.",
        "Learn about registration costs, stamp duty and other legal charges in your state.",
      ],
      nextSteps: [
        "List what matters most: budget, location, size, resale.",
        "Get the property documents checked by a qualified lawyer.",
        "Compare home-loan offers from at least 2–3 banks.",
        "Plan your down payment and monthly EMI budget together.",
      ],
      checklist: [
        "Confirm the property has a clear title.",
        "Check for encumbrance (no unpaid loans/dues on it).",
        "Verify that the sale deed will be registered.",
        "Review the loan offer carefully before signing.",
        "Keep copies of all documents safe.",
      ],
      documents: [
        "Sale deed / title deed",
        "Encumbrance certificate",
        "Approved building plan",
        "Property tax receipts",
        "Identity & address proof",
        "Loan sanction letter",
      ],
      officialResources: [
        { label: "State registration department", desc: "For property registration and stamp duty" },
        { label: "Your local sub-registrar office", desc: "For verifying/renewing encumbrances" },
      ],
      sections: [
        { label: "Ownership library", href: "/ownership" },
        { label: "Her Money", href: "/money" },
        { label: "Legal awareness", href: "/legal" },
      ],
      recommendedActions: [
        "Finish the Ownership Readiness Checklist.",
        "Complete the 'Ownership & Nominations Explained' module.",
        "Book a session with a qualified property lawyer.",
      ],
      experts: ["Adv. Meena K (Property & Women's Rights)", "Anitha V (Financial literacy)"],
      disclaimer: "This is general educational information, not professional legal or financial advice. For your specific purchase, consult a qualified lawyer and financial advisor.",
    },
  },
  {
    keywords: ["career break", "restart", "start again", "stopped working", "back to work"],
    analysis: {
      categories: ["Career Break", "Career", "Skills", "Financial Independence"],
      summary: "You're planning a return to work after a break — this is a structured journey, and you're asking the right question.",
      meaning: "Returning after a career break is a common, well-supported path. The key is a progressive plan: refresh skills, rebuild confidence, then demonstrate and apply.",
      education: [
        "Employers today value returners; many companies run dedicated returnship programs.",
        "Your break years can be framed positively — management, patience, organization.",
        "You may need to refresh technical skills and current industry practices.",
      ],
      nextSteps: [
        "Take the Career Restart Assessment to get your personalized roadmap.",
        "Identify 2–3 target roles that match your experience and interest.",
        "Refresh your resume and create a LinkedIn profile.",
        "Start with one relevant course or certification.",
      ],
      checklist: [
        "Update my resume for my desired role.",
        "Create/refresh LinkedIn profile.",
        "Take the Career Restart Assessment.",
        "Enroll in one refresher course.",
        "Reach out to 2 career mentors.",
      ],
      documents: [
        "Updated resume",
        "Portfolio or work samples (if relevant)",
        "Certifications & certificates",
        "References from prior employers",
      ],
      officialResources: [
        { label: "National Career Service (India)", desc: "Career counseling and job search support" },
        { label: "Skill development programs", desc: "Re-skilling and up-skilling initiatives" },
      ],
      sections: [
        { label: "Her Second Career", href: "/careers" },
        { label: "Her Jobs", href: "/jobs" },
        { label: "Her Network", href: "/network" },
      ],
      recommendedActions: [
        "Complete the Career Restart Assessment.",
        "Add 3 target jobs to your job tracker.",
        "Schedule a session with a career mentor.",
      ],
      experts: ["Dr. Kavitha R (Career restart)", "Saranya M (Interview prep)"],
      disclaimer: "Career guidance provided here is educational. Outcomes vary by industry, location and individual circumstances.",
    },
  },
  {
    keywords: ["otp", "upi", "scam", "fraud", "fake", "suspicious", "phishing", "stolen", "scammer"],
    analysis: {
      categories: ["Digital Safety", "Financial", "Cyber"],
      summary: "⚠️ This involves a potentially serious fraud or scam situation. Act carefully and promptly.",
      meaning: "If someone asks for your OTP or PIN, or an amount was sent to an unknown account, this is a high-risk indicator. Scammers rely on urgency — slow down and verify.",
      education: [
        "Real banks and services NEVER ask for your OTP, PIN or card details.",
        "Never share OTPs, even with someone claiming to be bank staff.",
        "Always verify requests through official channels before acting.",
        "Payment requests to personal accounts for 'refunds' are a common fraud pattern.",
      ],
      nextSteps: [
        "Do NOT share further details. End any such call immediately.",
        "If money was transferred to a scammer, report it to your bank right away.",
        "Block any suspicious numbers and report them.",
        "Report cyber fraud through the official portal.",
      ],
      checklist: [
        "I have not shared my OTP/PIN with anyone.",
        "I have noted the transaction details.",
        "I have contacted my bank's fraud helpline.",
        "I have reported the incident officially.",
      ],
      documents: [
        "Bank statement/transaction details",
        "Screenshot of the suspicious message (without sharing it)",
        "Sender's number / account details",
      ],
      officialResources: [
        { label: "Cyber Crime Portal (India)", desc: "Report fraud/report at cybercrime.gov.in" },
        { label: "Your bank's fraud helpline", desc: "Call immediately for disputed transactions" },
        { label: "National Cyber Crime Helpline", desc: "1930 for financial fraud assistance (India)" },
      ],
      sections: [
        { label: "Her Digital Shield", href: "/digital-shield" },
        { label: "Something Happened", href: "/digital-shield" },
      ],
      recommendedActions: [
        "Complete the 'Spotting UPI & Payment Scams' module.",
        "Check your account security settings.",
        "Enable two-factor authentication everywhere.",
      ],
      experts: ["Her Life Desk Safety Team (via Her Network)"],
      disclaimer: "Educational guidance only. In fraud cases, always report through official bank channels and the National Cyber Crime Portal immediately.",
    },
  },
  {
    keywords: ["loan", "borrow", "credit", "emi", "debt"],
    analysis: {
      categories: ["Finance", "Credit"],
      summary: "Let's build a clear understanding of loans and credit so you borrow safely.",
      meaning: "Loans can help you build assets — but only when you understand interest, EMIs, credit scores and your repayment capacity.",
      education: [
        "Your credit score affects whether and at what rate you get loans.",
        "Compare the total cost (principal + interest) before choosing a loan.",
        "Never borrow more than you can comfortably repay.",
        "Avoid unregistered 'instant loan' apps — they are often traps.",
      ],
      nextSteps: [
        "Calculate your monthly repayment capacity.",
        "Check your credit score for free.",
        "Compare offers from reputable banks only.",
        "Read every loan agreement before signing.",
      ],
      checklist: [
        "Understand my credit score.",
        "Know the interest rate and total cost.",
        "Read the loan agreement fully.",
        "Avoid unofficial lenders/apps.",
      ],
      documents: [
        "Income proof",
        "Identity and address proof",
        "Bank statements",
        "Existing loan details (if any)",
      ],
      officialResources: [
        { label: "Your bank / RBI-registered institution", desc: "For verified loan products" },
      ],
      sections: [
        { label: "Her Money", href: "/money" },
        { label: "Her Money: Loans", href: "/money" },
      ],
      recommendedActions: ["Complete the financial basics modules.", "Learn about credit scores in Her Money."],
      experts: ["Anitha V (Financial literacy)"],
      disclaimer: "Educational information only. For specific loan decisions, consult a qualified financial professional.",
    },
  },
  {
    keywords: ["business", "start", "entrepreneur", "shop", "sell", "venture", "fund"],
    analysis: {
      categories: ["Entrepreneurship", "Business", "Finance"],
      summary: "You're thinking about starting a business — a powerful path to independence.",
      meaning: "Successful businesses start with validation, planning and a step-by-step launch. You don't need everything figured out — you need the right first steps.",
      education: [
        "Validate your idea by talking to potential customers early.",
        "Understand basic registration options for small businesses.",
        "Funding options include self-funding, small loans and government schemes.",
        "Start small: test your first product or service quickly.",
      ],
      nextSteps: [
        "Complete the Business Readiness Profile.",
        "Define one clear product/service to start with.",
        "Research basic registration requirements.",
        "Explore relevant government schemes for women entrepreneurs.",
      ],
      checklist: [
        "My business idea is clearly defined.",
        "I know my target customer.",
        "I have a simple budget plan.",
        "I understand registration basics.",
      ],
      documents: [
        "Adhaar/PAN for registration",
        "Business plan (one page is fine to start)",
        "Bank details for a business account",
      ],
      officialResources: [
        { label: "Udyam registration", desc: "MSME registration portal (India)" },
        { label: "State women enterprise schemes", desc: "Check your state's women entrepreneurship programs" },
      ],
      sections: [
        { label: "Her Business", href: "/business" },
        { label: "Her Network", href: "/network" },
      ],
      recommendedActions: [
        "Take the Business Readiness Assessment.",
        "Learn digital marketing basics.",
        "Connect with a business mentor.",
      ],
      experts: ["Rekha Nair (Small business & funding)", "Deepa M (Digital marketing)"],
      disclaimer: "Educational guidance only. Business and tax decisions should involve qualified professionals where required.",
    },
  },
  {
    keywords: ["mentor", "expert", "network", "connect", "guidance", "advice"],
    analysis: {
      categories: ["Network", "Career", "Mentorship"],
      summary: "Seeking a mentor is one of the smartest moves you can make.",
      meaning: "A good mentor shortens your learning curve, opens doors and builds your confidence. Choose mentors whose expertise matches your current goal.",
      education: [
        "Most mentors provide guidance, not guarantees.",
        "Come to sessions with clear questions.",
        "Build relationships genuinely — not just for a job.",
      ],
      nextSteps: [
        "Browse mentors in Her Network.",
        "Shortlist 2–3 mentors matching your goal.",
        "Review their expertise, languages and availability.",
        "Reach out with a short, clear message.",
      ],
      checklist: [
        "Know my mentoring goal.",
        "Shortlisted 3 mentors.",
        "Prepared my first question.",
        "Set up a session.",
      ],
      documents: [],
      officialResources: [],
      sections: [
        { label: "Her Network", href: "/network" },
      ],
      recommendedActions: ["Connect with 2 career mentors.", "Join Her Circle and introduce yourself."],
      experts: ["Dr. Kavitha R", "Rekha Nair", "Deepa M"],
      disclaimer: "Mentor profiles show expertise; credentials are verified where indicated. Always use your own judgment.",
    },
  },
  {
    keywords: ["will", "inheritance", "estate", "inherited", "nomination", "asset"],
    analysis: {
      categories: ["Legal", "Ownership", "Financial"],
      summary: "Inheritance and estate-planning questions are deeply personal — and very practical once you know the basics.",
      meaning: "Understanding what happens to assets (property, savings, insurance) is essential. Nomination and wills are the two most powerful tools you can use.",
      education: [
        "Nomination tells the institution who receives assets in certain situations.",
        "A will lets you decide exactly how your assets are distributed.",
        "Ownership is different from nomination — know which applies.",
        "Laws differ depending on religion, region and asset type.",
      ],
      nextSteps: [
        "List all your assets and who they're registered to.",
        "Review nominations on bank accounts, insurance and investments.",
        "Learn basic will/estate-planning concepts.",
        "Consult a qualified lawyer for your specific situation.",
      ],
      checklist: [
        "I have a list of my assets.",
        "I know who is nominated where.",
        "I understand the difference between ownership and nomination.",
        "I have a trustworthy legal contact.",
      ],
      documents: [
        "Asset ownership documents",
        "Bank/insurance nomination forms",
        "Existing will (if any)",
      ],
      officialResources: [
        { label: "Legal-aid services", desc: "District Legal Services Authority in your area" },
      ],
      sections: [
        { label: "Say: Ownership", href: "/ownership" },
        { label: "Say: Legal", href: "/legal" },
      ],
      recommendedActions: ["Complete the nominations module.", "Finish the Ownership Readiness Checklist."],
      experts: ["Adv. Meena K (Women's rights & property)"],
      disclaimer: "Educational information. Wills and inheritance are governed by specific laws — always consult a qualified lawyer for your individual situation.",
    },
  },
  {
    keywords: ["salary", "income", "budget", "save", "savings", "invest", "money", "monthly", "earn"],
    analysis: {
      categories: ["Finance", "Financial Independence"],
      summary: "Building financial independence starts with simple habits — track, budget, save, protect.",
      meaning: "Financial independence isn't about earning a huge salary. It's about control: knowing where money goes and building a safety net.",
      education: [
        "The 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
        "An emergency fund of 3–6 months of expenses is your first goal.",
        "A separate savings account makes it easier to save.",
        "Avoid 'get-rich-quick' schemes promising high returns fast.",
      ],
      nextSteps: [
        "Track your income and expenses for one month.",
        "Set a simple monthly budget.",
        "Start an emergency fund — even ₹500/month builds up.",
        "Learn the basics of banking and digital payments.",
      ],
      checklist: [
        "I have my own bank account.",
        "I track my monthly expenses.",
        "I have a savings plan.",
        "I know my emergency-fund goal.",
      ],
      documents: ["Bank account details", "Monthly expense record", "Income details"],
      officialResources: [],
      sections: [
        { label: "Her Money", href: "/money" },
        { label: "Her Money Simulator", href: "/money" },
      ],
      recommendedActions: ["Try the Money Simulator with your real income.", "Start the emergency-fund module."],
      experts: ["Anitha V (Financial literacy)"],
      disclaimer: "Educational information, not personalized investment advice.",
    },
  },
];

const fallbackAnalysis: Analysis = {
  categories: ["Personalized Guidance"],
  summary: "Here's a structured starting point for your question.",
  meaning: "Because this is a general topic, here are safe, practical steps you can explore across the platform.",
  education: [
    "Every topic on Her Life Desk has dedicated learning modules.",
    "Use the recommended sections to go deeper.",
    "Book a session with a matching expert from Her Network.",
  ],
  nextSteps: [
    "Explore the relevant Her Life Desk section below.",
    "Complete the suggested learning module.",
    "Take the related assessment or checklist.",
  ],
  checklist: [
    "Review the relevant education module.",
    "Note one action you can do today.",
    "Plan to revisit in one week.",
  ],
  documents: [],
  officialResources: [],
  sections: [
    { label: "Her World", href: "/world" },
    { label: "Her Network", href: "/network" },
  ],
  recommendedActions: ["Browse learning modules in Her World.", "Ask a specialist via Her Network."],
  experts: ["Her Life Desk experts"],
  disclaimer: "General educational information. For legal, financial or medical matters, always consult qualified professionals.",
};

function matchAnalysis(query: string): Analysis {
  const q = query.toLowerCase();
  let best: Analysis | null = null;
  let bestScore = 0;
  for (const entry of knowledgeBase) {
    const score = entry.keywords.reduce(
      (acc, kw) => (q.includes(kw) ? acc + 1 : acc),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      best = entry.analysis;
    }
  }
  return best ?? fallbackAnalysis;
}

function renderAnalysis(a: Analysis): string {
  const lines: string[] = [];
  lines.push(`I found these areas: ${a.categories.join(" · ")}`);
  lines.push(``);
  lines.push(`**What this means:** ${a.summary}`);
  lines.push(``);
  lines.push(`**Understanding:** ${a.meaning}`);
  lines.push(``);
  lines.push(`**What you can learn:**`);
  a.education.forEach((e) => lines.push(`• ${e}`));
  if (a.nextSteps.length) {
    lines.push(``);
    lines.push(`**Your next steps:**`);
    a.nextSteps.forEach((s) => lines.push(`1. ${s}`));
  }
  if (a.checklist.length) {
    lines.push(``);
    lines.push(`**Quick checklist:**`);
    a.checklist.forEach((c) => lines.push(`☐ ${c}`));
  }
  if (a.officialResources.length) {
    lines.push(``);
    lines.push(`**Official resources to consider:**`);
    a.officialResources.forEach((r) => lines.push(`• ${r.label} — ${r.desc}`));
  }
  lines.push(``);
  lines.push(`_${a.disclaimer}_`);
  return lines.join("\n");
}

const suggestions = [
  "I want to buy a house. What should I understand before doing it?",
  "I stopped working for five years and want to start again.",
  "Someone asked me to share an OTP. Is this suspicious?",
  "I want to start a small business from home.",
  "What should I know about wills and nominations?",
  "How do I build an emergency fund?",
];

export default function AskPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hi! I'm Ask Her Desk 🌸 — your personal guidance companion. Ask me anything about your rights, finances, career, business, digital safety, ownership or anything on your mind.",
    },
  ]);
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text?: string) => {
    const query = (text ?? input).trim();
    if (!query) return;
    const matched = matchAnalysis(query);
    setMessages((m) => [...m, { role: "user", content: query }]);
    setAnalysis(matched);
    setShowAnalysis(true);
    setMessages((m) => [
      ...m,
      { role: "bot", content: renderAnalysis(matched) },
    ]);
    setInput("");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-rose-500 text-xl text-white shadow-lg shadow-violet-500/20">
              🤖
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Ask Her Desk</h1>
              <p className="text-sm text-slate-500">
                Describe your situation — we'll show you what it means and what to do.
              </p>
            </div>
          </div>

          <div className="mt-6 h-[420px] space-y-4 overflow-y-auto rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-gradient-to-r from-violet-600 to-rose-500 text-white"
                      : "rounded-bl-sm border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask anything… e.g. 'I want to buy a house.'"
              className="flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
            <button
              onClick={() => send()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-rose-500 text-white shadow-lg shadow-violet-500/20 transition-transform hover:scale-105"
              aria-label="Send"
            >
              <FiSend className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-400">
              Try asking:
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 transition-colors hover:border-violet-300 hover:text-violet-700"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">🔍 Recognizing topics</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Ask Her Desk automatically detects categories like Property,
              Legal, Finance, Career or Digital Safety — even when you don't
              label them yourself.
            </p>
            {showAnalysis && analysis && (
              <div className="mt-4 space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {analysis.categories.map((c) => (
                    <Badge key={c} tone="info">{c}</Badge>
                  ))}
                </div>
                <hr className="border-slate-100" />
                <div>
                  <p className="flex items-center gap-1 text-xs font-bold text-slate-700">
                    <FiBookOpen className="h-3.5 w-3.5 text-violet-500" />
                    Related Her Life Desk sections
                  </p>
                  <div className="mt-2 space-y-1.5">
                    {analysis.sections.map((s) => (
                      <a
                        key={s.href + s.label}
                        href={s.href}
                        className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-violet-50 hover:text-violet-700"
                      >
                        {s.label}
                        <FiArrowRight className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="flex items-center gap-1 text-xs font-bold text-slate-700">
                    <FiUsers className="h-3.5 w-3.5 text-rose-500" />
                    Recommended experts
                  </p>
                  <div className="mt-2 space-y-1.5">
                    {analysis.experts.map((e) => (
                      <div key={e} className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
                        {e}
                      </div>
                    ))}
                  </div>
                </div>
                {analysis.recommendedActions.length > 0 && (
                  <div>
                    <p className="flex items-center gap-1 text-xs font-bold text-slate-700">
                      🎯 Recommended actions
                    </p>
                    <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                      {analysis.recommendedActions.map((a) => (
                        <li key={a} className="flex gap-1.5">
                          <FiArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
            <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            Ask Her Desk provides general educational information — not
            professional legal or financial advice. For serious matters, please
            contact qualified professionals or official services.
          </div>

          {analysis?.documents && analysis.documents.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="flex items-center gap-1 text-xs font-bold text-slate-700">
                <FiFileText className="h-3.5 w-3.5 text-amber-500" />
                Documents that may be relevant
              </p>
              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                {analysis.documents.map((d) => (
                  <li key={d}>• {d}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}