"use client";

import { useState } from "react";

export default function SafeImage({
  src,
  fallback,
  alt,
  className = "",
}: {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
}) {
  const [cur, setCur] = useState(src);
  return (
    <img
      src={cur}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (fallback && cur !== fallback) setCur(fallback);
      }}
    />
  );
}