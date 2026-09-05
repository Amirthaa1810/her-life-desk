interface FloatingEmojisProps {
  items?: string[];
  className?: string;
}

export default function FloatingEmojis({
  items = ["🌸", "🦋", "🌷", "⭐", "💜", "🍀"],
  className = "",
}: FloatingEmojisProps) {
  const positions = [
    "left-[4%] top-[12%] text-2xl",
    "left-[88%] top-[18%] text-3xl",
    "left-[12%] top-[72%] text-xl",
    "left-[80%] top-[70%] text-2xl",
    "left-[48%] top-[8%] text-xl",
    "left-[64%] top-[85%] text-xl",
  ];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {items.slice(0, 6).map((emoji, i) => (
        <span
          key={i}
          className={`absolute select-none opacity-60 drop-shadow animate-${i % 2 === 0 ? "floating" : "sway"}`}
          style={{ animationDelay: `${i * 0.7}s` }}
        >
          <span className={`block ${positions[i]}`}>{emoji}</span>
        </span>
      ))}
    </div>
  );
}