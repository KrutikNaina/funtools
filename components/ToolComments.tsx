"use client";

import { useState, useEffect } from "react";
import { MessageSquare, ThumbsUp, Send, UserCheck, Sparkles } from "lucide-react";

interface Comment {
  id: string;
  name: string;
  avatarBg: string;
  text: string;
  timeAgo: string;
  likes: number;
  userLiked?: boolean;
}

export default function ToolComments({ toolSlug }: { toolSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`funtools_comments_${toolSlug}`);
      if (stored) {
        setComments(JSON.parse(stored));
      } else {
        setComments([]);
      }
    } catch (e) {
      setComments([]);
    }
  }, [toolSlug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const nameToUse = authorName.trim() || "Anonymous Creator";
    const bgColors = ["bg-indigo-500", "bg-purple-500", "bg-pink-500", "bg-rose-500", "bg-blue-500"];
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];

    const created: Comment = {
      id: Date.now().toString(),
      name: nameToUse,
      avatarBg: randomBg,
      text: newComment.trim(),
      timeAgo: "Just now",
      likes: 1,
    };

    const updated = [created, ...comments];
    setComments(updated);
    setNewComment("");

    try {
      localStorage.setItem(`funtools_comments_${toolSlug}`, JSON.stringify(updated));
    } catch (e) {}
  };

  const toggleLike = (id: string) => {
    const updated = comments.map((c) => {
      if (c.id === id) {
        const userLiked = !c.userLiked;
        return {
          ...c,
          userLiked,
          likes: userLiked ? c.likes + 1 : c.likes - 1,
        };
      }
      return c;
    });
    setComments(updated);
    try {
      localStorage.setItem(`funtools_comments_${toolSlug}`, JSON.stringify(updated));
    } catch (e) {}
  };

  return (
    <section className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="w-5 h-5 text-indigo-500" />
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
            Community Feedback & Tips ({comments.length})
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Live Discussion
        </span>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-3">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your name or handle (optional)"
            className="w-1/3 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={2}
            placeholder="Share your results, tips, or feedback on this tool..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 resize-none"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md self-end"
          >
            <span>Post</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3 pt-2">
        {comments.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No comments yet. Be the first to share your compatibility results or fun tips!
            </p>
          </div>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-150 dark:border-slate-800/60 flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full ${c.avatarBg} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm`}>
                {c.name.charAt(0)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{c.name}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{c.timeAgo}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{c.text}</p>
                <div className="pt-1 flex items-center gap-4 text-[11px] text-slate-400">
                  <button
                    type="button"
                    onClick={() => toggleLike(c.id)}
                    className={`flex items-center gap-1 font-semibold transition ${
                      c.userLiked ? "text-indigo-600 dark:text-indigo-400" : "hover:text-slate-600"
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" /> {c.likes}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
