import Link from "next/link";

const columns = [
  {
    title: "Empower",
    links: [
      { label: "Legal", href: "/legal" },
      { label: "Money", href: "/money" },
      { label: "Ownership", href: "/ownership" },
      { label: "Digital Shield", href: "/digital-shield" },
    ],
  },
  {
    title: "Grow",
    links: [
      { label: "Careers", href: "/careers" },
      { label: "Her Jobs", href: "/jobs" },
      { label: "Business", href: "/business" },
      { label: "Her Network", href: "/network" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "My Journey", href: "/journey" },
      { label: "Her Circle", href: "/circle" },
      { label: "Her Blog", href: "/blog" },
      { label: "News & Daily Affairs", href: "/world" },
      { label: "Settings", href: "/settings" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/her-life-desk-logo.svg"
                alt="Her Life Desk logo"
                className="h-9 w-9 drop-shadow-sm"
              />
              <span className="text-base font-bold text-slate-900">
                Her Life Desk
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Your personal empowerment operating system. Know. Own. Protect.
              Earn. Grow.
            </p>
            <p className="mt-4 text-xs text-slate-400">
              Educational platform — not a substitute for professional legal,
              financial or medical advice.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-slate-900">
                {col.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-violet-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Her Life Desk. Empowering women through
          education, action and community. 🌸
        </div>
      </div>
    </footer>
  );
}
