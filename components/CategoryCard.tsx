"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Clock,
  Gamepad2,
  Dices,
  Share2,
  Coins,
  Smile,
  BrainCircuit,
  Zap
} from "lucide-react";
import { Category } from "@/types/tool";

const CAT_ICON_MAP: Record<string, any> = {
  Sparkles,
  Heart,
  Clock,
  Gamepad2,
  Dices,
  Share2,
  Coins,
  Smile,
  BrainCircuit,
  Zap,
};

export default function CategoryCard({ category }: { category: Category }) {
  const IconComp = CAT_ICON_MAP[category.iconName] || Sparkles;

  return (
    <Link href={`/categories/${category.id}`}>
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ duration: 0.25 }}
        className="group relative rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition flex flex-col justify-between overflow-hidden cursor-pointer h-full"
      >
        {/* Subtle top gradient bar */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${category.gradient}`} />

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${category.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300`}>
              <IconComp className="w-6 h-6" />
            </div>
            <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${category.badgeBg}`}>
              {category.count} Tools
            </span>
          </div>

          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition mb-1">
            {category.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
            {category.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition">
          <span>Explore Category</span>
          <span>→</span>
        </div>
      </motion.div>
    </Link>
  );
}
