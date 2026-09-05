"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiAward,
  FiShield,
} from "react-icons/fi";
import Badge from "@/components/ui/Badge";
import { courses, courseBySlug } from "@/lib/courses";

const STORAGE_KEY = "her-life-desk-courses";

export default function CourseDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const course = courseBySlug(slug);

  const [currentLesson, setCurrentLesson] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [justFinished, setJustFinished] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      setCompleted(list.includes(course?.slug ?? ""));
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalLessons = course?.lessons.length ?? 0;
  const quizQs = course?.quiz ?? [];
  const correctCount = useMemo(
    () => answers.filter((a, i) => a === quizQs[i]?.answer).length,
    [answers, quizQs]
  );

  if (!course) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="text-5xl">🤔</div>
        <h1 className="mt-4 text-xl font-bold text-slate-900">Course not found</h1>
        <Link
          href="/learn"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white"
        >
          <FiArrowLeft /> Back to all courses
        </Link>
      </div>
    );
  }

  const lesson = course.lessons[currentLesson];
  const quizOpen = currentLesson >= totalLessons;

  const pickAnswer = (qIndex: number, optIndex: number) => {
    const next = [...answeredSlot(answers, qIndex)];
    next[qIndex] = optIndex;
    setAnswers(next);
    setSubmitted(false);
  };

  function answeredSlot(arr: number[], i: number): number[] {
    const copy = [...arr];
    copy.length = quizQs.length;
    copy.fill(-1, 0, quizQs.length);
    arr.forEach((v, k) => (copy[k] = v));
    return copy;
  }

  const submitQuiz = () => {
    setSubmitted(true);
  };

  const finishCourse = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      if (!list.includes(course.slug)) {
        list.push(course.slug);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      }
    } catch {
      // ignore
    }
    setCompleted(true);
    setJustFinished(true);
  };

  const progressPct = Math.min(
    100,
    Math.round(((currentLesson + (submitted || completed ? 1 : 0)) / (totalLessons + 1)) * 100)
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <Link href="/learn" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-violet-600">
        <FiArrowLeft className="h-4 w-4" /> All courses
      </Link>

      <div className={`relative mt-4 flex h-36 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br ${course.gradient}`}>
        <FloatingBits />
        <div className="relative flex flex-col items-center gap-1">
          <span className="text-6xl drop-shadow animate-bounce-soft">{course.art}</span>
          <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold text-white backdrop-blur">
            {course.categoryEmoji} {course.category} · {course.difficulty}
          </span>
        </div>
        {completed && (
          <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-emerald-600 shadow">
            ✓ Completed
          </span>
        )}
      </div>

      <div className="mt-5">
        <h1 className="text-2xl font-bold text-slate-900">{course.title}</h1>
        <p className="mt-1.5 text-sm text-slate-500">{course.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone="info">
            <FiClock className="inline h-3.5 w-3.5" /> {course.minutes} min
          </Badge>
          <Badge tone="warning">
            <FiTrendingUp className="inline h-3.5 w-3.5" /> +{course.xp} XP
          </Badge>
          <Badge tone="success">{course.difficulty}</Badge>
          <Badge tone="info">{totalLessons} lessons + quiz</Badge>
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-rose-500 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
        <div className="hidden md:block">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Lessons</p>
          <div className="mt-2 space-y-1.5">
            {course.lessons.map((l, i) => (
              <button
                key={i}
                onClick={() => setCurrentLesson(i)}
                className={`flex w-full items-start gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors ${
                  i === currentLesson
                    ? "bg-violet-50 text-violet-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${
                    i < currentLesson ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {i < currentLesson ? "✓" : i + 1}
                </span>
                {l.title}
              </button>
            ))}
            <button
              onClick={() => setCurrentLesson(totalLessons)}
              className={`flex w-full items-start gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors ${
                currentLesson >= totalLessons
                  ? "bg-amber-50 text-amber-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-200 text-[10px] text-amber-700">
                🎉
              </span>
              Final quiz
            </button>
          </div>
        </div>

        <div>
          {currentLesson < totalLessons && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 animate-fade-up">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
                  Lesson {currentLesson + 1} of {totalLessons}
                </span>
                <span className="text-xs text-slate-400">{course.lessons[currentLesson].title}</span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-900">{lesson.title}</h2>
              <ul className="mt-4 space-y-3">
                {lesson.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-700">
                    <span className="mt-0.5 text-base">{educationBullet(i)}</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={() => setCurrentLesson((i) => Math.max(0, i - 1))}
                  disabled={currentLesson === 0}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 disabled:opacity-40"
                >
                  <FiArrowLeft className="inline h-4 w-4" /> Previous
                </button>
                <button
                  onClick={() => setCurrentLesson((i) => i + 1)}
                  className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  Next
                  <FiArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {quizOpen && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 animate-pop">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <h2 className="text-lg font-bold text-slate-900">Final quiz — prove what you learned</h2>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Answer all questions, then finish the course to earn <b>+{course.xp} XP</b>.
              </p>

              <div className="mt-5 space-y-5">
                {quizQs.map((q, qi) => {
                  const chosen = answers[qi] ?? -1;
                  return (
                    <div key={qi}>
                      <p className="text-sm font-semibold text-slate-800">
                        {qi + 1}. {q.question}
                      </p>
                      <div className="mt-2 grid gap-2">
                        {q.options.map((opt, oi) => {
                          let cls =
                            "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50";
                          if (submitted) {
                            if (oi === q.answer) cls = "border-emerald-300 bg-emerald-50 text-emerald-800";
                            else if (oi === chosen && chosen !== q.answer)
                              cls = "border-rose-300 bg-rose-50 text-rose-700";
                            else cls = "border-slate-200 bg-white text-slate-400";
                          } else if (chosen === oi) {
                            cls = "border-violet-500 bg-violet-50 text-violet-800 ring-2 ring-violet-200";
                          }
                          return (
                            <button
                              key={oi}
                              onClick={() => pickAnswer(qi, oi)}
                              disabled={submitted}
                              className={`rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition-colors ${cls}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`mt-5 rounded-2xl p-4 text-sm font-semibold ${
                    correctCount === quizQs.length
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {correctCount === quizQs.length
                    ? "Perfect score! You really understand this. 🌟"
                    : `You got ${correctCount} of ${quizQs.length} right. Review the lessons above and try again — you've got this!`}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={() => setCurrentLesson(totalLessons - 1)}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600"
                >
                  <FiArrowLeft className="inline h-4 w-4" /> Back to lessons
                </button>
                {!submitted ? (
                  <button
                    onClick={submitQuiz}
                    disabled={answers.some((a) => a < 0 || a === undefined)}
                    className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-40"
                  >
                    Check answers
                  </button>
                ) : completed ? (
                  <span className="flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white">
                    <FiCheckCircle /> Course completed!
                  </span>
                ) : (
                  <button
                    onClick={finishCourse}
                    disabled={correctCount < quizQs.length}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-40"
                  >
                    <FiAward className="h-4 w-4" /> Finish course · +{course.xp} XP
                  </button>
                )}
              </div>

              {justFinished && completed && (
                <div className="animate-pop mt-5 rounded-2xl bg-gradient-to-r from-violet-600 to-rose-500 p-5 text-white">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl animate-celebration">🏆</span>
                    <div>
                      <p className="font-bold">Amazing! {course.title} complete!</p>
                      <p className="text-xs text-white/85">
                        You earned +{course.xp} XP. {course.takeaway}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href="/learn" className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-violet-700">
                      Keep learning
                    </Link>
                    <Link href="/jobs" className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold text-white ring-1 ring-white/40">
                      Find a job now
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-2xl bg-violet-50 p-4 text-xs leading-relaxed text-violet-800">
        <FiShield className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          <b>Key takeaway:</b> {course.takeaway}
        </span>
      </div>
    </div>
  );
}

function educationBullet(i: number) {
  const set = ["💡", "✏️", "⭐", "🌱"];
  return set[i % set.length];
}

function FloatingBits() {
  const bits = [
    "left-[8%] top-[16%] text-xl animate-sparkle",
    "left-[82%] top-[20%] text-2xl animate-sway",
    "left-[14%] top-[70%] text-lg animate-floating",
    "left-[86%] top-[68%] text-xl animate-sparkle",
    "left-[45%] top-[10%] text-lg animate-floating",
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((cls, i) => (
        <span
          key={i}
          className={`absolute select-none opacity-70 ${cls}`}
          style={{ animationDelay: `${i * 0.6}s` }}
        >
          {["✦", "♥", "✿", "✦", "♥"][i]}
        </span>
      ))}
    </div>
  );
}