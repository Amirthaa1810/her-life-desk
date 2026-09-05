"use client";

import Link from "next/link";
import { useState } from "react";
import { FiCheckCircle, FiCircle, FiArrowRight } from "react-icons/fi";
import Badge from "./Badge";

export interface LearningTopic {
  emoji: string;
  title: string;
  desc: string;
  mins: number;
  xp: number;
  courseSlug?: string;
}

export default function LearningGrid({
  topics,
  completedIndices = [],
  onToggle,
}: {
  topics: LearningTopic[];
  completedIndices?: number[];
  onToggle?: (index: number) => void;
}) {
  const [local, setLocal] = useState<number[]>(completedIndices);
  const done = completedIndices.length > 0 ? completedIndices : local;

  const toggle = (i: number) => {
    const next = done.includes(i) ? done.filter((x) => x !== i) : [...done, i];
    setLocal(next);
    onToggle?.(i);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {topics.map((t, i) => {
        const isDone = done.includes(i);
        const card = (
          <div
            className={`flex h-full flex-col rounded-2xl border p-5 transition-all card-tilt ${
              isDone
                ? "border-emerald-200 bg-emerald-50/50"
                : "border-slate-200 bg-white hover:border-violet-200"
            }`}
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">{t.emoji}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggle(i);
                }}
                className={isDone ? "text-emerald-500" : "text-slate-300 hover:text-slate-400"}
                aria-label="Mark complete"
              >
                {isDone ? (
                  <FiCheckCircle className="h-6 w-6" />
                ) : (
                  <FiCircle className="h-6 w-6" />
                )}
              </button>
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-900">{t.title}</h3>
            <p className="mt-1 flex-1 text-xs leading-relaxed text-slate-500">
              {t.desc}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge tone={isDone ? "success" : "info"}>{t.mins} min</Badge>
              <Badge tone="warning">+{t.xp} XP</Badge>
              {isDone && <Badge tone="success">Done</Badge>}
            </div>
            {t.courseSlug && (
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-violet-600">
                Start learning
                <FiArrowRight className="h-3.5 w-3.5" />
              </div>
            )}
          </div>
        );
        return (
          <div key={t.title}>
            {t.courseSlug ? (
              <Link href={`/learn/${t.courseSlug}`} className="block h-full">
                {card}
              </Link>
            ) : (
              card
            )}
          </div>
        );
      })}
    </div>
  );
}