"use client";

import { useEffect, useState } from "react";
import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiTrash2,
  FiPlus,
  FiFolder,
  FiDownload,
  FiCheckCircle,
} from "react-icons/fi";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

const VAULT_PASSWORD = "herlife";
const STORAGE_KEY = "her-life-desk-vault";

type DocCategory =
  | "Identity"
  | "Banking"
  | "Insurance"
  | "Property"
  | "Nomination & Estate"
  | "Education"
  | "Work";

const categories: { name: DocCategory; emoji: string }[] = [
  { name: "Identity", emoji: "🪪" },
  { name: "Banking", emoji: "🏦" },
  { name: "Insurance", emoji: "🛡️" },
  { name: "Property", emoji: "🏠" },
  { name: "Nomination & Estate", emoji: "📜" },
  { name: "Education", emoji: "🎓" },
  { name: "Work", emoji: "💼" },
];

interface VaultDoc {
  id: number;
  name: string;
  category: DocCategory;
  note: string;
  addedAt: string;
}

function getInitialDocs(): VaultDoc[] {
  return [
    { id: 1, name: "Aadhaar card (soft copy)", category: "Identity", note: "Keep updated, never share OTP to update.", addedAt: "28 Aug 2026" },
    { id: 2, name: "Bank account details & nomination", category: "Banking", note: "Nominee updated in app.", addedAt: "28 Aug 2026" },
    { id: 3, name: "Health insurance policy", category: "Insurance", note: "Review claim process once a year.", addedAt: "29 Aug 2026" },
    { id: 4, name: "Investment statement records", category: "Banking", note: "Check nominations on each.", addedAt: "30 Aug 2026" },
  ];
}

export default function VaultPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [docs, setDocs] = useState<VaultDoc[]>(getInitialDocs());
  const [name, setName] = useState("");
  const [category, setCategory] = useState<DocCategory>("Identity");
  const [note, setNote] = useState("");
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setDocs(JSON.parse(stored));
      } catch {
        // keep defaults
      }
    }
  }, []);

  const unlock = () => {
    if (password === VAULT_PASSWORD) {
      setUnlocked(true);
      setError("");
      setPassword("");
    } else {
      setError("That password isn't correct. Try the demo password below.");
    }
  };

  const lock = () => {
    setUnlocked(false);
    setPassword("");
    setError("");
  };

  const persist = (next: VaultDoc[]) => {
    setDocs(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addDoc = () => {
    if (!name.trim()) return;
    const next: VaultDoc = {
      id: Date.now(),
      name: name.trim(),
      category,
      note: note.trim(),
      addedAt: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    };
    persist([next, ...docs]);
    setName("");
    setNote("");
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const removeDoc = (id: number) => persist(docs.filter((d) => d.id !== id));

  if (!unlocked) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
        <div className="animate-floating flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-rose-500 text-4xl shadow-lg shadow-violet-500/30">
          🔐
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Her Documents Vault</h1>
        <p className="mt-2 text-sm text-slate-500">
          A private, password-protected space to note and track your important
          documents. Your vault stays on this device.
        </p>
        <Card className="mt-8 w-full">
          <label className="text-sm font-semibold text-slate-700">
            Enter your vault password
          </label>
          <div className="mt-2 flex items-center gap-2">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && unlock()}
              placeholder="Vault password"
              className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50"
              aria-label="Toggle password visibility"
            >
              {showPass ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
            </button>
          </div>
          {error && <p className="mt-2 text-xs font-medium text-rose-600">{error}</p>}
          <button
            type="button"
            onClick={unlock}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-rose-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-transform hover:scale-[1.01]"
          >
            <FiLock className="h-4 w-4" /> Unlock Vault
          </button>
        </Card>
        <p className="mt-4 text-xs text-slate-400">
          Demo password: <span className="font-semibold text-slate-500">herlife</span>
        </p>
        <p className="mt-6 max-w-md text-xs leading-relaxed text-slate-400">
          🔒 Privacy first: nothing is uploaded anywhere. Your records are
          stored only in this browser. For extra safety, keep a paper copy of
          critical documents in a secure place too.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-rose-500 text-xl text-white shadow-lg shadow-violet-500/20">
            🗂️
          </span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Her Documents Vault</h1>
            <p className="text-sm text-slate-500">
              Your private home for tracking important documents.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={lock}
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200"
          aria-label="Lock vault"
        >
          <FiLock className="h-3.5 w-3.5" /> Lock vault
        </button>
        <Badge tone="success">🔒 Unlocked</Badge>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <Card>
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
              <FiFolder className="h-4 w-4 text-violet-500" /> Add a record
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Document / item name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Passport scan, Property sale deed…"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as DocCategory)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-violet-500"
                >
                  {categories.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.emoji} {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Note about this document</label>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Nominee updated, keep safe…"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={addDoc}
              disabled={!name.trim()}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiPlus className="h-4 w-4" /> Save to Vault
            </button>
            {savedMsg && (
              <span className="animate-pop ml-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
                <FiCheckCircle className="h-4 w-4" /> Saved securely
              </span>
            )}
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                Your stored records ({docs.length})
              </h2>
              <span className="text-xs text-slate-400">Stored only on this device</span>
            </div>

            {docs.length === 0 ? (
              <p className="mt-6 rounded-xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-400">
                No records yet. Add your first document above. 🌸
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {docs.map((d) => (
                  <li
                    key={d.id}
                    className="animate-pop flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-lg shadow-sm ring-1 ring-slate-200">
                        {categories.find((c) => c.name === d.category)?.emoji ?? "📄"}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{d.name}</p>
                        <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                          <Badge tone="info">{d.category}</Badge>
                          <span>Added {d.addedAt}</span>
                        </p>
                        {d.note && <p className="mt-1 text-xs text-slate-500">{d.note}</p>}
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-violet-600"
                        aria-label="Download note"
                      >
                        <FiDownload className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeDoc(d.id)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-rose-600"
                        aria-label="Delete record"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Card className="bg-gradient-to-br from-violet-50 to-rose-50">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              💡 Why organizing documents matters
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• You always know what you own and where it is.</li>
              <li>• Nominations and ownership protect your family.</li>
              <li>• Organized records make legal and financial things faster.</li>
              <li>• You stay ready for any opportunity that needs documents.</li>
            </ul>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-900">🛡️ Safety reminders</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• Keep digital copies password-protected.</li>
              <li>• Never share IDs or OTPs over the phone.</li>
              <li>• Review nominations once a year.</li>
              <li>• Keep one paper copy of critical papers in a secure place.</li>
              <li>• Delete old, unnecessary copies.</li>
            </ul>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-900">📝 Things to review soon</h3>
            <div className="mt-3 space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2 ring-1 ring-amber-100">
                <span>Insurance records</span>
                <span className="text-amber-600">⚠️ Review</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-100">
                <span>Property records</span>
                <span className="text-rose-500">❌ Not organized</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-100">
                <span>Estate planning</span>
                <span className="text-rose-500">❌ Not started</span>
              </div>
            </div>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <p className="text-xs leading-relaxed text-amber-800">
              🔐 Your records stay on this browser only. In a future version you
              will be able to add real files with end-to-end encryption.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}