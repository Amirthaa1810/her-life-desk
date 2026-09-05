"use client";

import { useState } from "react";
import {
  FiHeart,
  FiMessageCircle,
  FiBookmark,
  FiUserPlus,
  FiFlag,
  FiSend,
  FiCheck,
} from "react-icons/fi";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { communityPosts, type CommunityPost } from "@/lib/data";

const categories = ["Achievement", "Learning", "Career", "Business", "Question", "Encouragement"];

const guidelines = [
  "Celebrate every milestone, big or small.",
  "Keep personal details private — no addresses or financial info.",
  "No harassment, bullying, or unsolicited advice.",
  "Report anything that feels off — our team reviews every report.",
];

const feelGoodQuotes = [
  "She believed she could, so she did.",
  "Alone we are strong; together we are unstoppable.",
  "Every step forward is a victory.",
];

export default function CirclePage() {
  const [posts, setPosts] = useState<CommunityPost[]>(communityPosts);
  const [newPost, setNewPost] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reactedPosts, setReactedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
  const [followingPosts, setFollowingPosts] = useState<Set<number>>(new Set());
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const [commentLists, setCommentLists] = useState<Record<number, string[]>>({});
  const [reportedPosts, setReportedPosts] = useState<Set<number>>(new Set());

  const randomQuote = feelGoodQuotes[Math.floor(Math.random() * feelGoodQuotes.length)];

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post: CommunityPost = {
      id: Date.now(),
      author: "Amirthaa",
      avatarColor: "#7c3aed",
      time: "Just now",
      content: newPost.trim(),
      reacts: 0,
      comments: 0,
      tags: selectedTags,
    };
    setPosts((prev) => [post, ...prev]);
    setNewPost("");
    setSelectedTags([]);
  };

  const toggleReact = (id: number) =>
    setReactedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleSave = (id: number) =>
    setSavedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleFollow = (id: number) =>
    setFollowingPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleComments = (id: number) =>
    setExpandedComments((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const submitComment = (id: number) => {
    const text = commentInputs[id]?.trim();
    if (!text) return;
    setCommentLists((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), text],
    }));
    setCommentInputs((prev) => ({ ...prev, [id]: "" }));
  };

  const reportPost = (id: number) =>
    setReportedPosts((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

  return (
    <div>
      <PageHeader
        emoji="🌸"
        title="Her Circle"
        subtitle="A supportive community celebrating milestones together."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share something with Her Circle..."
                rows={3}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 placeholder-slate-400 focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleTag(cat)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                      selectedTags.includes(cat)
                        ? "bg-gradient-to-r from-violet-600 to-rose-500 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-slate-400">This is a positive, supportive space 💛</p>
                <button
                  onClick={handlePost}
                  disabled={!newPost.trim()}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  <FiSend className="h-3.5 w-3.5" />
                  Post
                </button>
              </div>
            </Card>

            <div className="space-y-4">
              {posts.map((post) => {
                const initials = post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase();
                const isReacted = reactedPosts.has(post.id);
                const isSaved = savedPosts.has(post.id);
                const isFollowing = followingPosts.has(post.id);
                const commentsExpanded = expandedComments.has(post.id);
                const postComments = commentLists[post.id] || [];
                const isReported = reportedPosts.has(post.id);

                return (
                  <Card key={post.id}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                          style={{ background: post.avatarColor }}
                        >
                          {initials}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {post.author}
                          </p>
                          <p className="text-xs text-slate-400">{post.time}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFollow(post.id)}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                          isFollowing
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                            : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        {isFollowing ? (
                          <>
                            <FiCheck className="h-3 w-3" /> Following ✓
                          </>
                        ) : (
                          <>
                            <FiUserPlus className="h-3 w-3" /> Follow
                          </>
                        )}
                      </button>
                    </div>

                    <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                      {post.content}
                    </p>

                    {post.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-600 ring-1 ring-violet-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3">
                      <button
                        onClick={() => toggleReact(post.id)}
                        className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                          isReacted ? "text-rose-500" : "text-slate-400 hover:text-rose-400"
                        }`}
                      >
                        <FiHeart
                          className={`h-4 w-4 ${isReacted ? "fill-rose-500" : ""}`}
                        />
                        {post.reacts + (isReacted ? 1 : 0)}
                      </button>

                      <button
                        onClick={() => toggleComments(post.id)}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-violet-500 transition-colors"
                      >
                        <FiMessageCircle className="h-4 w-4" />
                        {post.comments + postComments.length}
                      </button>

                      <button
                        onClick={() => toggleSave(post.id)}
                        className={`ml-auto transition-colors ${
                          isSaved ? "text-amber-500" : "text-slate-400 hover:text-amber-400"
                        }`}
                      >
                        <FiBookmark
                          className={`h-4 w-4 ${isSaved ? "fill-amber-500" : ""}`}
                        />
                      </button>

                      {!isReported ? (
                        <button
                          onClick={() => reportPost(post.id)}
                          className="text-slate-300 hover:text-rose-400 transition-colors"
                          title="Report this post"
                        >
                          <FiFlag className="h-4 w-4" />
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-600 font-medium">Reported ✓</span>
                      )}
                    </div>

                    {commentsExpanded && (
                      <div className="mt-3 border-t border-slate-100 pt-3 space-y-2">
                        {postComments.map((c, i) => (
                          <div
                            key={i}
                            className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-700"
                          >
                            <span className="font-semibold">Amirthaa:</span> {c}
                          </div>
                        ))}
                        <div className="flex gap-2">
                          <input
                            value={commentInputs[post.id] || ""}
                            onChange={(e) =>
                              setCommentInputs((prev) => ({
                                ...prev,
                                [post.id]: e.target.value,
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") submitComment(post.id);
                            }}
                            placeholder="Write a comment..."
                            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:border-violet-300 focus:outline-none focus:ring-1 focus:ring-violet-200"
                          />
                          <button
                            onClick={() => submitComment(post.id)}
                            disabled={!commentInputs[post.id]?.trim()}
                            className="rounded-lg bg-gradient-to-r from-violet-600 to-rose-500 px-3 py-1.5 text-xs font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-50"
                          >
                            <FiSend className="h-3 w-3" />
                          </button>
                        </div>
                        {isReported && (
                          <div className="rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700 ring-1 ring-emerald-100">
                            Thanks, our team will review this.
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-violet-50 to-rose-50">
              <h3 className="text-sm font-bold text-slate-900">Community Guidelines</h3>
              <ul className="mt-3 space-y-2">
                {guidelines.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="mt-0.5 text-violet-500">✦</span>
                    {g}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 ring-1 ring-amber-200">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌟</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                    Weekly Challenge
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    Share one achievement this week!
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <p className="text-center text-xs italic text-slate-400 leading-relaxed">
                &ldquo;{randomQuote}&rdquo;
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
