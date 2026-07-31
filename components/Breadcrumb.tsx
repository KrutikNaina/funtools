import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  // BreadcrumbList JSON-LD Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://getfuntools.app"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href && { "item": `https://getfuntools.app${item.href}` })
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium py-3">
        <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-slate-400" />
            {item.href ? (
              <Link href={item.href} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                {item.label}
              </Link>
            ) : (
              <span className="font-bold text-slate-900 dark:text-white">{item.label}</span>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
