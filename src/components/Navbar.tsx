"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiHome,
  FiLayout,
  FiMessageCircle,
  FiSearch,
  FiBookOpen,
  FiGlobe,
  FiHeart,
  FiKey,
  FiMenu,
  FiX,
  FiBell,
  FiChevronDown,
  FiShield,
  FiDollarSign,
  FiBriefcase,
  FiZap,
  FiUsers,
  FiGrid,
} from "react-icons/fi";
import { currentUser, getLevelInfo } from "@/lib/data";

const primaryNav = [
  { href: "/", label: "Home", icon: FiHome },
  { href: "/dashboard", label: "My Dashboard", icon: FiLayout },
  { href: "/ask", label: "Ask Her Desk", icon: FiMessageCircle },
  { href: "/jobs", label: "Her Jobs", icon: FiSearch },
  { href: "/blog", label: "Blog", icon: FiBookOpen },
  { href: "/world", label: "News", icon: FiGlobe },
  { href: "/circle", label: "Her Circle", icon: FiHeart },
  { href: "/vault", label: "Vault", icon: FiKey },
];

const moreNav = [
  { href: "/legal", label: "Legal", icon: FiShield },
  { href: "/money", label: "Money", icon: FiDollarSign },
  { href: "/ownership", label: "Ownership", icon: FiKey },
  { href: "/digital-shield", label: "Digital Shield", icon: FiShield },
  { href: "/careers", label: "Careers", icon: FiBriefcase },
  { href: "/business", label: "Business", icon: FiZap },
  { href: "/network", label: "Her Network", icon: FiUsers },
  { href: "/journey", label: "My Journey", icon: FiGrid },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { level, tierEmoji } = getLevelInfo(currentUser.xp);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
<Link href="/" className="group flex items-center gap-2.5">
            <img
              src="/her-life-desk-logo.svg"
              alt="Her Life Desk logo"
              className="h-9 w-9 drop-shadow-sm transition-transform duration-300 group-hover:rotate-12"
            />
            <span className="text-base font-bold tracking-tight text-slate-900">
              Her Life Desk
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 xl:flex">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-violet-50 text-violet-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                  moreOpen ? "bg-slate-50 text-slate-900" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                More <FiChevronDown className="h-3.5 w-3.5" />
              </button>
              {moreOpen && (
                <div className="animate-fade-up absolute right-0 top-full mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                  {moreNav.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium ${
                          active ? "bg-violet-50 text-violet-700" : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <item.icon className="h-4 w-4" /> {item.label}
                      </Link>
                    );
                  })}
                  <div className="mt-1 border-t border-slate-100 pt-2">
                    <Link
                      href="/settings"
                      onClick={() => setMoreOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                      âš™ï¸ Settings & Privacy
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="relative ml-1">
              <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications">
                <FiBell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500" />
              </button>
            </div>
            <Link
              href="/journey"
              className="ml-1 flex items-center gap-2 rounded-full bg-slate-900 py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-white transition-colors hover:bg-slate-700"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-rose-500">
                {tierEmoji}
              </span>
              Level {level} Â· {currentUser.displayName}
            </Link>
          </div>

          <button
            className="rounded-lg p-2 text-slate-600 xl:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-fade-up border-t border-slate-200 bg-white xl:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Main</p>
            <div className="mt-1 grid gap-1">
              {primaryNav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                      active ? "bg-violet-50 text-violet-700" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" /> {item.label}
                  </Link>
                );
              })}
            </div>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Explore</p>
            <div className="mt-1 grid gap-1">
              {moreNav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                      active ? "bg-violet-50 text-violet-700" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" /> {item.label}
                  </Link>
                );
              })}
              <Link
                href="/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                âš™ï¸ Settings & Privacy
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}