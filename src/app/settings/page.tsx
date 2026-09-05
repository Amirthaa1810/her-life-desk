"use client";

import { useState } from "react";
import {
  FiUser,
  FiShield,
  FiBell,
  FiLock,
  FiCheck,
  FiAlertCircle,
  FiTrash2,
  FiEyeOff,
  FiHelpCircle,
} from "react-icons/fi";
import { currentUser, getLevelInfo } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";

type Tab = "profile" | "privacy" | "notifications" | "security";

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "profile", label: "Profile", icon: <FiUser className="h-4 w-4" /> },
  { key: "privacy", label: "Privacy & Safety", icon: <FiShield className="h-4 w-4" /> },
  { key: "notifications", label: "Notifications", icon: <FiBell className="h-4 w-4" /> },
  { key: "security", label: "Security", icon: <FiLock className="h-4 w-4" /> },
];

function Toggle({
  enabled,
  onToggle,
  label,
}: {
  enabled: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-slate-700">{label}</span>
      <button
        onClick={onToggle}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          enabled
            ? "bg-gradient-to-r from-violet-600 to-rose-500"
            : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}

function SavedToast({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg">
      <FiCheck className="h-4 w-4" /> Changes saved
    </div>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");
  const [saved, setSaved] = useState(false);

  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [location, setLocation] = useState(currentUser.location);
  const [language, setLanguage] = useState(currentUser.language);
  const [careerInterests, setCareerInterests] = useState(
    currentUser.goals.join(", ")
  );

  const [privacyToggles, setPrivacyToggles] = useState({
    publicName: true,
    showLeaderboard: true,
    mentorshipMatching: true,
    locationAware: false,
    showAchievements: true,
  });

  const [notifToggles, setNotifToggles] = useState({
    learningReminders: true,
    streakReminders: true,
    roadmapTasks: true,
    newJobs: true,
    newArticles: false,
    mentorAvailability: true,
    newAchievements: true,
    communityInteractions: true,
    educationalUpdates: false,
  });

  const [twoFA, setTwoFA] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(false);

  const notifCount = Object.values(notifToggles).filter(Boolean).length;

  const levelInfo = getLevelInfo(currentUser.xp);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const togglePrivacy = (key: keyof typeof privacyToggles) =>
    setPrivacyToggles((p) => ({ ...p, [key]: !p[key] }));

  const toggleNotif = (key: keyof typeof notifToggles) =>
    setNotifToggles((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div>
      <PageHeader
        emoji="⚙️"
        title="Settings"
        subtitle="Profile, privacy, notifications, preferences and security."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-6 lg:flex-row">
          <nav className="shrink-0 lg:w-56">
            <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    tab === t.key
                      ? "bg-gradient-to-r from-violet-600 to-rose-500 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="min-w-0 flex-1 space-y-6">
            {tab === "profile" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-bold text-slate-900">
                  Your Profile
                </h2>

                <div className="mb-5 flex items-center gap-3 rounded-xl bg-violet-50 px-4 py-3 ring-1 ring-violet-100">
                  <span className="text-2xl">{levelInfo.tierEmoji}</span>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Level {levelInfo.level} · {levelInfo.tier}
                    </p>
                    <p className="text-xs text-slate-500">
                      {currentUser.xp.toLocaleString()} XP · Empowerment Index{" "}
                      {currentUser.baseIndex}
                    </p>
                  </div>
                  <Badge tone="info">+{currentUser.indexGrowth} growth</Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-500">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-500">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-500">
                      Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    >
                      <option>English</option>
                      <option>Tamil</option>
                      <option>Hindi</option>
                      <option>Telugu</option>
                      <option>Kannada</option>
                      <option>Malayalam</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-500">
                      Career Interests
                    </label>
                    <input
                      type="text"
                      value={careerInterests}
                      onChange={(e) => setCareerInterests(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="mt-6 rounded-full bg-gradient-to-r from-violet-600 to-rose-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-transform hover:scale-[1.02]"
                >
                  Save Changes
                </button>
              </div>
            )}

            {tab === "privacy" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-2 text-lg font-bold text-slate-900">
                    Privacy Controls
                  </h2>
                  <p className="mb-4 text-xs text-slate-400">
                    Choose what others can see about you.
                  </p>

                  <div className="divide-y divide-slate-100">
                    <Toggle
                      enabled={privacyToggles.publicName}
                      onToggle={() => togglePrivacy("publicName")}
                      label="Public display name"
                    />
                    <Toggle
                      enabled={privacyToggles.showLeaderboard}
                      onToggle={() => togglePrivacy("showLeaderboard")}
                      label="Show level & XP on leaderboard"
                    />
                    <Toggle
                      enabled={privacyToggles.mentorshipMatching}
                      onToggle={() => togglePrivacy("mentorshipMatching")}
                      label="Allow mentorship matching"
                    />
                    <Toggle
                      enabled={privacyToggles.locationAware}
                      onToggle={() => togglePrivacy("locationAware")}
                      label="Location-aware features"
                    />
                    <Toggle
                      enabled={privacyToggles.showAchievements}
                      onToggle={() => togglePrivacy("showAchievements")}
                      label="Allow community to see achievements"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-sm font-bold text-slate-900">
                    Data Actions
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <button className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50">
                      <FiTrash2 className="h-4 w-4" />
                      Delete my content
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50">
                      <FiEyeOff className="h-4 w-4" />
                      Block list
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6">
                  <h3 className="mb-2 text-sm font-bold text-slate-900">
                    Privacy Principles
                  </h3>
                  <ul className="space-y-1.5 text-sm text-slate-600">
                    <li>
                      You control your display name and what others see.
                    </li>
                    <li>
                      Toggle visibility of your level, XP and achievements at
                      any time.
                    </li>
                    <li>
                      You can delete your content or request data removal.
                    </li>
                    <li>
                      Block and report features protect you from unwanted
                      contact.
                    </li>
                    <li>
                      We never expose real names, locations or sensitive
                      information without your explicit consent.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {tab === "notifications" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Notification Preferences
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                      Choose which notifications you receive.
                    </p>
                  </div>
                  <Badge tone="info">
                    {notifCount} of {Object.keys(notifToggles).length} enabled
                  </Badge>
                </div>

                <div className="divide-y divide-slate-100">
                  {(
                    Object.entries(notifToggles) as [
                      keyof typeof notifToggles,
                      boolean,
                    ][]
                  ).map(([key, val]) => (
                    <Toggle
                      key={key}
                      enabled={val}
                      onToggle={() => toggleNotif(key)}
                      label={
                        key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (s) => s.toUpperCase())
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {tab === "security" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-6 text-lg font-bold text-slate-900">
                    Security
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Two-factor authentication
                        </p>
                        <p className="text-xs text-slate-400">
                          Add an extra layer of protection to your account.
                        </p>
                      </div>
                      <button
                        onClick={() => setTwoFA(!twoFA)}
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                          twoFA
                            ? "bg-emerald-50 text-emerald-700"
                            : "border border-violet-200 text-violet-600 hover:bg-violet-50"
                        }`}
                      >
                        {twoFA ? (
                          <span className="flex items-center gap-1">
                            <FiCheck className="h-3.5 w-3.5" /> Enabled
                          </span>
                        ) : (
                          "Enable"
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Strong password
                        </p>
                        <p className="text-xs text-slate-400">
                          Last changed 45 days ago.
                        </p>
                      </div>
                      <button className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50">
                        Change
                      </button>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Active sessions
                        </p>
                        <p className="text-xs text-slate-400">
                          Review devices where you're signed in.
                        </p>
                      </div>
                      <button className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50">
                        Review
                      </button>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Make my profile private
                        </p>
                        <p className="text-xs text-slate-400">
                          Only you can see your profile details.
                        </p>
                      </div>
                      <button
                        onClick={() => setPrivateProfile(!privateProfile)}
                        className={`relative h-6 w-11 rounded-full transition-colors ${
                          privateProfile
                            ? "bg-gradient-to-r from-violet-600 to-rose-500"
                            : "bg-slate-200"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                            privateProfile ? "translate-x-5" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                  <div className="flex items-start gap-3">
                    <FiShield className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Security Tips
                      </h3>
                      <ul className="mt-2 space-y-1 text-sm text-slate-600">
                        <li>
                          Never share your OTP, PIN or password with anyone —
                          even if someone claims to be from your bank.
                        </li>
                        <li>
                          Enable two-factor authentication on all financial and
                          email accounts.
                        </li>
                        <li>
                          Use unique passwords for different accounts; consider
                          a password manager.
                        </li>
                        <li>
                          Log out of sessions on shared or public devices.
                        </li>
                        <li>
                          Report suspicious activity immediately through the
                          app or helpline 181.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <FiHelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Help & Support
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Need help? Reach out to our support team or visit the help
                    centre. Your feedback helps us improve.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Data Deletion Notice
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    You can request full deletion of your account data at any
                    time. This action is irreversible and will remove your
                    progress, achievements and profile permanently. Contact
                    support to initiate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SavedToast show={saved} />
    </div>
  );
}
