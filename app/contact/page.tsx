"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { Mail, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 pb-20 space-y-8">
      <Breadcrumb items={[{ label: "Contact Us" }]} />

      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Contact & Feedback
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Have a fun tool request or feedback? We'd love to hear from you!
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Alex"
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Your Email
              </label>
              <input
                type="email"
                required
                placeholder="alex@example.com"
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Message or Tool Idea
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tell us what tool you want us to build next..."
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-md hover:bg-indigo-700 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
            <p className="text-xs text-slate-500">Thank you for reaching out. We'll get back to you shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
