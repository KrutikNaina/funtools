import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import BookmarkButton from "@/components/BookmarkButton";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface ToolPageHeaderProps {
  title: string;
  description?: string;
  breadcrumbItems: BreadcrumbItem[];
  toolSlug?: string;
  categoryBadge?: {
    label: string;
    icon?: React.ReactNode;
    colorClass?: string;
  };
  actions?: React.ReactNode;
  className?: string;
}

/**
 * Shared compact ToolPageHeader
 * Keeps heading hierarchy (H1), breadcrumbs, concise description, and optional bookmark/share actions
 * in an ultra-compact, professional banner (<120px height) so the interactive tool is immediately visible.
 */
export default function ToolPageHeader({
  title,
  description,
  breadcrumbItems,
  toolSlug,
  categoryBadge,
  actions,
  className = "",
}: ToolPageHeaderProps) {
  return (
    <header className={`space-y-2 sm:space-y-2.5 mb-4 sm:mb-6 ${className}`}>
      {/* Top bar: Compact breadcrumbs on left, unobtrusive action on right */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Breadcrumb items={breadcrumbItems} className="py-0.5" />
        <div className="flex items-center gap-2 shrink-0">
          {actions ? (
            actions
          ) : toolSlug ? (
            <BookmarkButton slug={toolSlug} />
          ) : null}
        </div>
      </div>

      {/* Main heading and concise description */}
      <div className="space-y-1 sm:space-y-1.5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {title}
          </h1>
          {categoryBadge && (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                categoryBadge.colorClass ||
                "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
              }`}
            >
              {categoryBadge.icon}
              <span>{categoryBadge.label}</span>
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
