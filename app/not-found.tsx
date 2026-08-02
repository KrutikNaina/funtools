import Link from "next/link";
import { AlertCircle, Home } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center space-y-8 min-h-[60vh]">
      <div className="w-24 h-24 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center">
        <AlertCircle className="w-12 h-12 text-rose-500" />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">
          Page not found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base max-w-md mx-auto leading-relaxed">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link 
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
