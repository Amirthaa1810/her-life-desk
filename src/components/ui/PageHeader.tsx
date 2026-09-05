export default function PageHeader({
  emoji,
  title,
  subtitle,
}: {
  emoji: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="border-b border-slate-200 bg-gradient-to-r from-violet-50 via-white to-rose-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm ring-1 ring-slate-200">
            {emoji}
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}