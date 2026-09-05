"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  FiPlus,
  FiTrash2,
  FiSave,
  FiTrendingUp,
  FiTrendingDown,
  FiPieChart,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowRight,
  FiActivity,
} from "react-icons/fi";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import FloatingEmojis from "@/components/ui/FloatingEmojis";
import LearningGrid, { LearningTopic } from "@/components/ui/LearningGrid";

const LS_KEY = "her-life-desk-expenses";

const CATEGORIES = [
  { value: "food", label: "Food", emoji: "\uD83C\uDF5B" },
  { value: "rent", label: "Rent & Home", emoji: "\uD83C\uDFE0" },
  { value: "transport", label: "Transport", emoji: "\uD83D\uDE8C" },
  { value: "bills", label: "Bills", emoji: "\uD83D\uDCA1" },
  { value: "shopping", label: "Shopping", emoji: "\uD83D\uDECD\uFE0F" },
  { value: "health", label: "Health", emoji: "\uD83D\uDC8A" },
  { value: "fun", label: "Fun", emoji: "\uD83C\uDFAC" },
  { value: "other", label: "Other", emoji: "\uD83D\uDCE6" },
] as const;

const CATEGORY_MAP: Record<string, (typeof CATEGORIES)[number]> = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c])
);

type Entry = {
  id: string;
  label: string;
  amount: number;
  category: string;
  date: string;
};

type StoredData = {
  income: number;
  budget: number;
  entries: Entry[];
};

const DEFAULT_DATA: StoredData = {
  income: 45000,
  budget: 30000,
  entries: [],
};

function loadInitial(): StoredData {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULT_DATA;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.income === "number" && typeof parsed.budget === "number" && Array.isArray(parsed.entries)) {
      return { income: parsed.income, budget: parsed.budget, entries: parsed.entries };
    }
  } catch {
    /* empty */
  }
  return DEFAULT_DATA;
}

function saveData(data: StoredData) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {
    /* empty */
  }
}

function formatINR(n: number) {
  return "\u20B9" + n.toLocaleString("en-IN");
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function daysLeftInMonth() {
  const now = new Date();
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return last.getDate() - now.getDate();
}

function currentMonthEntries(entries: Entry[]) {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  return entries.filter((e) => {
    const d = new Date(e.date);
    return d.getFullYear() === y && d.getMonth() === m;
  });
}

function topSpendingTip(catBreakdown: { cat: string; total: number }[]) {
  if (catBreakdown.length === 0) return null;
  const sorted = [...catBreakdown].sort((a, b) => b.total - a.total);
  const top = sorted[0];
  const catInfo = CATEGORY_MAP[top.cat];
  const tips: Record<string, string> = {
    food: "Food is your biggest cost — try cooking 2 more meals at home this week.",
    rent: "Rent takes the largest share — review if a roommate or negotiation could help.",
    transport: "Transport is your top spend — could carpooling or public transit save you 20%?",
    bills: "Bills dominate this month — switch off standby appliances and audit subscriptions.",
    shopping: "Shopping leads your spending — try a 48-hour rule before your next purchase.",
    health: "Health costs are highest — check if preventive care could reduce future bills.",
    fun: "Fun tops your list — try free community events this weekend.",
    other: "Miscellaneous is your biggest bucket — try logging each item to find patterns.",
  };
  return `${catInfo?.emoji ?? ""} ${tips[top.cat] ?? "Review your top category to find savings."}`;
}

function Simulator() {
  const [income, setIncome] = useState("40000");
  const [expenses, setExpenses] = useState("20000");
  const [result, setResult] = useState<null | {
    needs: number;
    savings: number;
    wants: number;
    emergencyTarget: number;
  }>(null);

  const calculate = () => {
    const inc = Math.max(0, parseFloat(income) || 0);
    const exp = Math.max(0, parseFloat(expenses) || 0);
    setResult({
      needs: inc * 0.5,
      savings: inc * 0.2,
      wants: inc * 0.3,
      emergencyTarget: exp * 6,
    });
  };

  return (
    <Card>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-rose-500 text-xl text-white shadow-lg shadow-violet-500/20">
          💡
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Interactive Money Simulator
          </h2>
          <p className="text-xs text-slate-500">
            Try the 50 / 30 / 20 rule with your own numbers.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-700">
            I earn ₹_____ / month
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-200">
            <FiActivity className="h-4 w-4 text-slate-400" />
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full text-sm outline-none"
              placeholder="e.g. 40000"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Monthly expenses
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-200">
            <FiActivity className="h-4 w-4 text-slate-400" />
            <input
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              className="w-full text-sm outline-none"
              placeholder="e.g. 20000"
            />
          </div>
        </div>
      </div>

      <button
        onClick={calculate}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-rose-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-transform hover:scale-[1.02]"
      >
        Calculate <FiArrowRight className="h-4 w-4" />
      </button>

      {result && (
        <div className="mt-6 animate-fade-up space-y-4">
          <div className="flex h-4 w-full overflow-hidden rounded-full">
            <div
              className="bg-violet-500 transition-all duration-700"
              style={{ width: "50%" }}
              title="Needs 50%"
            />
            <div
              className="bg-amber-400 transition-all duration-700"
              style={{ width: "30%" }}
              title="Wants 30%"
            />
            <div
              className="bg-rose-500 transition-all duration-700"
              style={{ width: "20%" }}
              title="Savings 20%"
            />
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-violet-500" /> Needs 50%</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Wants 30%</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Savings 20%</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Needs (50%)</span>
                <Badge tone="info">{formatINR(result.needs)}</Badge>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Essentials like rent, groceries, transport, utilities and essential bills.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Savings (20%)</span>
                <Badge tone="success">{formatINR(result.savings)}</Badge>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Pay yourself first — emergency fund, investments and long-term goals.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Wants (30%)</span>
                <Badge tone="warning">{formatINR(result.wants)}</Badge>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Lifestyle — dining, entertainment, subscriptions and treats. Adjust freely.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Emergency target</span>
                <Badge tone="success">{formatINR(result.emergencyTarget)}</Badge>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                6 months of expenses. A progress note: tackling even 1 month is a strong milestone.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            Educational scenario only — not personalized investment advice. Always consult a qualified financial professional.
          </div>
        </div>
      )}
    </Card>
  );
}

function ExpenseTracker() {
  const [loaded, setLoaded] = useState(false);
  const [income, setIncome] = useState(45000);
  const [budget, setBudget] = useState(30000);
  const [entries, setEntries] = useState<Entry[]>([]);

  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState(todayISO());

  const [editIncome, setEditIncome] = useState("45000");
  const [editBudget, setEditBudget] = useState("30000");

  useEffect(() => {
    const d = loadInitial();
    setIncome(d.income);
    setBudget(d.budget);
    setEntries(d.entries);
    setEditIncome(String(d.income));
    setEditBudget(String(d.budget));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveData({ income, budget, entries });
  }, [income, budget, entries, loaded]);

  const monthEntries = useMemo(() => currentMonthEntries(entries), [entries]);
  const totalSpent = useMemo(() => monthEntries.reduce((s, e) => s + e.amount, 0), [monthEntries]);
  const remaining = budget - totalSpent;
  const savingsSuggestion = income - budget;
  const dailyLeft = daysLeftInMonth();

  const catBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    for (const e of monthEntries) {
      map[e.category] = (map[e.category] || 0) + e.amount;
    }
    return Object.entries(map)
      .map(([cat, total]) => ({ cat, total }))
      .sort((a, b) => b.total - a.total);
  }, [monthEntries]);

  const tip = useMemo(() => topSpendingTip(catBreakdown), [catBreakdown]);

  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  }, [entries]);

  const addExpense = () => {
    const amt = parseFloat(amount);
    if (!label.trim() || isNaN(amt) || amt <= 0) return;
    const entry: Entry = {
      id: crypto.randomUUID(),
      label: label.trim(),
      amount: Math.round(amt * 100) / 100,
      category,
      date,
    };
    setEntries((prev) => [...prev, entry]);
    setLabel("");
    setAmount("");
    setDate(todayISO());
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const saveBudgetSettings = () => {
    const inc = Math.max(0, parseFloat(editIncome) || 0);
    const bud = Math.max(0, parseFloat(editBudget) || 0);
    setIncome(inc);
    setBudget(bud);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard emoji="💰" label="Monthly Income" value={formatINR(income)} tone="info" />
        <SummaryCard emoji="💸" label="Spent This Month" value={formatINR(totalSpent)} tone={totalSpent > budget ? "danger" : "warning"} />
        <SummaryCard emoji="🎯" label="Remaining (Budget)" value={formatINR(Math.max(0, remaining))} tone={remaining >= 0 ? "success" : "danger"} />
        <SummaryCard emoji="🐷" label="Savings Goal" value={formatINR(savingsSuggestion)} tone="success" />
      </div>

      {dailyLeft > 0 && (
        <div className="flex items-center gap-2 rounded-2xl border border-violet-200 bg-violet-50 px-5 py-3 text-sm text-violet-800">
          <FiTrendingUp className="h-4 w-4" />
          <span className="font-semibold">Left to spend today:</span>
          <span>{formatINR(dailyLeft > 0 ? Math.max(0, remaining) / dailyLeft : 0)} / day for the remaining {dailyLeft} days</span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-bold text-slate-900">➕ Add Expense</h3>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Label</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Groceries"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                min="0"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.emoji} {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              />
            </div>
            <button
              onClick={addExpense}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-transform hover:scale-[1.01]"
            >
              <FiPlus className="h-4 w-4" /> Add Expense
            </button>
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <h3 className="mb-4 text-sm font-bold text-slate-900">📊 Category Breakdown</h3>
          {catBreakdown.length === 0 ? (
            <p className="text-sm text-slate-400">No expenses this month yet.</p>
          ) : (
            <div className="space-y-3">
              {catBreakdown.map((c) => {
                const info = CATEGORY_MAP[c.cat];
                const pct = totalSpent > 0 ? (c.total / totalSpent) * 100 : 0;
                return (
                  <div key={c.cat}>
                    <div className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>
                        {info?.emoji ?? "📦"} {info?.label ?? c.cat}
                      </span>
                      <span>{formatINR(c.total)} ({Math.round(pct)}%)</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-rose-400 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      {tip && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-800">
          <span className="mt-0.5 text-lg">💡</span>
          <div>
            <span className="font-bold">Top spending tip: </span>{tip}
          </div>
        </div>
      )}

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">📋 All Expenses</h3>
          <Badge tone="info">{entries.length} total</Badge>
        </div>
        {sortedEntries.length === 0 ? (
          <p className="text-sm text-slate-400">No expenses tracked yet. Add your first one above!</p>
        ) : (
          <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
            {sortedEntries.map((e) => {
              const info = CATEGORY_MAP[e.category];
              return (
                <div
                  key={e.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3 transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{info?.emoji ?? "📦"}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{e.label}</p>
                      <p className="text-xs text-slate-500">
                        {info?.label ?? e.category} · {e.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900">{formatINR(e.amount)}</span>
                    <button
                      onClick={() => deleteEntry(e.id)}
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
                      aria-label="Delete expense"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Card>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-rose-500 text-white shadow-md shadow-violet-500/20">
            <FiSave className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Income & Budget Settings</h3>
            <p className="text-xs text-slate-500">Update your monthly income and budget target.</p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">Monthly Income (₹)</label>
            <input
              type="number"
              value={editIncome}
              onChange={(e) => setEditIncome(e.target.value)}
              min="0"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">Monthly Budget (₹)</label>
            <input
              type="number"
              value={editBudget}
              onChange={(e) => setEditBudget(e.target.value)}
              min="0"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={saveBudgetSettings}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              <FiSave className="h-4 w-4" /> Save Settings
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SummaryCard({ emoji, label, value, tone }: { emoji: string; label: string; value: string; tone: "success" | "warning" | "danger" | "info" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xl">{emoji}</span>
        <span className="text-xs font-semibold text-slate-500">{label}</span>
      </div>
      <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}

function MoneyBox() {
  const [tab, setTab] = useState<"50-30-20" | "emergency" | "credit">("50-30-20");

  return (
    <Card>
      <div className="flex items-center gap-3">
        <span className="text-2xl">📦</span>
        <h2 className="text-lg font-bold text-slate-900">Money Box</h2>
      </div>
      <div className="mt-4 flex gap-2">
        {([
          ["50-30-20", "50-30-20 Rule"],
          ["emergency", "Emergency Fund"],
          ["credit", "Credit Score"],
        ] as const).map(([key, lbl]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              tab === key
                ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {lbl}
          </button>
        ))}
      </div>
      <div className="mt-5">
        {tab === "50-30-20" && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              A simple budgeting framework: put 50% of your income towards needs, 30% towards wants, and 20% towards savings.
            </p>
            <div className="flex h-5 w-full overflow-hidden rounded-full">
              <div className="bg-violet-500" style={{ width: "50%" }} />
              <div className="bg-amber-400" style={{ width: "30%" }} />
              <div className="bg-rose-500" style={{ width: "20%" }} />
            </div>
            <div className="grid gap-2 text-xs text-slate-600 sm:grid-cols-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-3">
                <span className="h-3 w-3 rounded-full bg-violet-500" />
                <span><strong>50% Needs</strong> — Rent, groceries, bills</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-3">
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span><strong>30% Wants</strong> — Dining, shopping, fun</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-3">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                <span><strong>20% Savings</strong> — Emergency fund, invest</span>
              </div>
            </div>
          </div>
        )}
        {tab === "emergency" && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              An emergency fund covers 3–6 months of expenses and protects you from unexpected life events.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { months: "1 Month", label: "Starter", emoji: "🌱", tone: "success" as const },
                { months: "3 Months", label: "Safety Net", emoji: "🛟", tone: "info" as const },
                { months: "6 Months", label: "Fully Secured", emoji: "🏛️", tone: "success" as const },
              ].map((step) => (
                <div key={step.months} className="flex flex-col items-center rounded-xl border border-slate-200 p-4 text-center">
                  <span className="text-2xl">{step.emoji}</span>
                  <p className="mt-2 text-sm font-bold text-slate-900">{step.months}</p>
                  <Badge tone={step.tone}>{step.label}</Badge>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500">
              Start small — even ₹500/month adds up. Automate transfers on payday so you never forget.
            </p>
          </div>
        )}
        {tab === "credit" && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Your credit score shows lenders how reliable you are. Higher scores unlock better loan rates.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-bold text-amber-900">620 — Fair</p>
                <p className="mt-1 text-xs text-amber-700">
                  Basic loans may be available, but expect higher interest rates. Work on improving your score.
                </p>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-bold text-emerald-900">750+ — Excellent</p>
                <p className="mt-1 text-xs text-emerald-700">
                  You qualify for the best rates and terms. Lenders see you as low-risk.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Pay bills on time, keep credit utilisation under 30%, and avoid opening many new accounts at once.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

const learningTopics: LearningTopic[] = [
  {
    emoji: "📊",
    title: "Budgeting Basics",
    desc: "Learn to track income and expenses and build a simple monthly budget that works for you.",
    mins: 10,
    xp: 60,
    courseSlug: "budgeting-savings",
  },
  {
    emoji: "🛟",
    title: "Emergency Funds",
    desc: "Understand why a safety net matters and how to build a 3\u20136 month cushion, step by step.",
    mins: 8,
    xp: 50,
    courseSlug: "emergency-fund",
  },
  {
    emoji: "🏦",
    title: "Banking with Confidence",
    desc: "Know your account, fees and tools \u2014 and how to choose what works for your goals.",
    mins: 9,
    xp: 55,
    courseSlug: "banking-basics",
  },
  {
    emoji: "💳",
    title: "Understanding Loans & Credit",
    desc: "Demystify interest, EMIs and credit scores so you can borrow safely and wisely.",
    mins: 12,
    xp: 70,
    courseSlug: "budgeting-savings",
  },
  {
    emoji: "🌱",
    title: "Starting to Invest Wisely",
    desc: "The basics of investing, keeping risk in mind, to help your money work for you.",
    mins: 15,
    xp: 80,
    courseSlug: "budgeting-savings",
  },
];

export default function MoneyPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10">
      <FloatingEmojis items={["\uD83D\uDCB0", "\uD83D\uDCB3", "\uD83C\uDF3F", "\uD83C\uDFE0", "\uD83C\uDF81", "\uD83D\uDC8D"]} />

      <PageHeader
        emoji="💰"
        title="Her Money"
        subtitle="Track your spending, build savings, and grow your financial confidence."
      />

      <div className="relative z-10 mt-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">💸 Expense Tracker</h2>
          <p className="mt-1 text-sm text-slate-500">Log every rupee and watch your budget work for you.</p>
        </div>
        <ExpenseTracker />
      </div>

      <div className="relative z-10 mt-12">
        <h2 className="text-xl font-bold text-slate-900">🎯 Financial Goals</h2>
        <p className="mt-1 text-sm text-slate-500">Targets to keep your money on track.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛟</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Emergency Fund Target</p>
                <p className="text-lg font-bold text-slate-900">{formatINR(180000)}</p>
              </div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-rose-400" style={{ width: "34%" }} />
            </div>
            <p className="mt-2 text-xs text-slate-500">34% saved · 6 months of expenses</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏖️</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Retirement Age Goal</p>
                <p className="text-lg font-bold text-slate-900">55</p>
              </div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-rose-400" style={{ width: "18%" }} />
            </div>
            <p className="mt-2 text-xs text-slate-500">18% journey · Start investing early for compounding</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12">
        <MoneyBox />
      </div>

      <div className="relative z-10 mt-12">
        <h2 className="text-xl font-bold text-slate-900">📚 Learning Modules</h2>
        <p className="mt-1 text-sm text-slate-500">Build your financial confidence one topic at a time.</p>
        <div className="mt-6">
          <LearningGrid topics={learningTopics} />
        </div>
      </div>

      <div className="relative z-10 mt-10 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
        <div>
          <h3 className="text-sm font-bold text-amber-900">Please note</h3>
          <p className="mt-1 text-xs leading-relaxed text-amber-800">
            Everything on Her Money is general educational content — not
            personalized investment, tax or financial advice. Rates, rules and
            products vary. Always consult a qualified financial professional
            and verify through official sources before making decisions.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-50 to-rose-50 p-4">
        <FiCheckCircle className="h-5 w-5 text-emerald-500" />
        <p className="text-sm font-medium text-slate-700">
          Master Her Money to unlock Her Ownership, Her Legal and more.
        </p>
        <Link
          href="/ownership"
          className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700"
        >
          Explore She Owns <FiArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
