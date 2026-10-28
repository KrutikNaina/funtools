import { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools-data";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import FancyFontGenerator from "@/components/tools/FancyFontGenerator";
import ToolFAQSection from "@/components/seo/ToolFAQSection";
import BookmarkButton from "@/components/BookmarkButton";
import ToolPageHeader from "@/components/ToolPageHeader";
import ToolTrustBar from "@/components/ToolTrustBar";
import ToolComments from "@/components/ToolComments";
import { SITE_URL } from "@/lib/site";
import { fancyFontGeneratorContent as module } from "@/lib/content/fancy-font-generator";
import { ShieldCheck, Zap, HelpCircle } from "lucide-react";
import WhatsNext from "@/components/recommendations/WhatsNext";
import CategoryDiscovery from "@/components/recommendations/CategoryDiscovery";

export const metadata: Metadata = {
  title: "Fancy Font Generator – Stylish Copy & Paste Fonts",
  description:
    "Generate stylish Unicode text with 20+ fancy font styles. Create cursive, bold, gothic, bubble and aesthetic text to copy and paste into Instagram, TikTok, Discord and more.",
  alternates: {
    canonical: `${SITE_URL}/tools/fancy-font-generator`,
  },
  openGraph: {
    title: "Fancy Font Generator – Stylish Copy & Paste Fonts",
    description:
      "Generate stylish Unicode text with 20+ fancy font styles. Copy and paste into Instagram, TikTok, Discord and more.",
    url: `${SITE_URL}/tools/fancy-font-generator`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fancy Font Generator | GetFunTools",
    description: "20+ Unicode font styles. Copy and paste fancy text into any app.",
  },
};

export default function FancyFontGeneratorPage() {
  const tool = TOOLS.find((t) => t.slug === "fancy-font-generator");
  if (!tool) return null;

  // Schemas
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Fancy Font Generator – Stylish Copy & Paste Fonts",
    description: metadata.description,
    url: `${SITE_URL}/tools/fancy-font-generator`,
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Fancy Font Generator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Tools",
        item: `${SITE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Social",
        item: `${SITE_URL}/categories/social`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Fancy Font Generator",
        item: `${SITE_URL}/tools/fancy-font-generator`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 pt-2">
        {/* Compact Tool Header */}
        <ToolPageHeader
          title="Fancy Font Generator – Stylish Copy & Paste Fonts"
          description="Enter normal text, choose a Unicode style, and copy the result to paste into Instagram bios, TikTok captions, Discord usernames, or any other app."
          breadcrumbItems={[
            { label: "Tools", href: "/tools" },
            { label: "Social", href: "/categories/social" },
            { label: "Fancy Font Generator" },
          ]}
          toolSlug="fancy-font-generator"
          categoryBadge={{
            label: "Unicode Text Tool",
            colorClass: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400",
          }}
        />

        {/* Interactive Tool */}
        <section id="interactive-tool" className="max-w-4xl mx-auto space-y-8">
          <FancyFontGenerator />
          <WhatsNext currentTool={tool} />
          <CategoryDiscovery currentCategory="social" />
        </section>

        {/* Trust Badges & Metadata */}
        <div className="max-w-4xl mx-auto pt-6">
          <ToolTrustBar
            items={[
              { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />, label: "No signup required" },
              { icon: <Zap className="w-3.5 h-3.5 text-amber-500" />, label: "20 Unicode styles" },
            ]}
          />
        </div>

        <AdBanner slot="7788990011" format="horizontal" label="In-Article Ad" />

        {/* How Copy & Paste Works */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">How to Copy and Paste Fancy Text</h2>
          <ol className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-fuchsia-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
              <span>Type your text into the input box above.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-fuchsia-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
              <span>Choose a style from the 20 previews in the grid.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-fuchsia-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
              <span>Click the <strong>Copy</strong> button on the style you want.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-fuchsia-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
              <span>Paste it into the destination app using Ctrl+V or tap and hold → Paste on mobile.</span>
            </li>
          </ol>
        </section>

        {/* What Is */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">What Is a Fancy Font Generator?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            A fancy font generator is a Unicode character mapping tool. It does{" "}
            <strong>not</strong> install or change actual font files on your device. Instead, it
            converts each letter you type into an alternative Unicode character that visually
            resembles a different style when displayed in an app.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            For example, the letter <strong>A</strong> in standard text is Unicode U+0041. In
            the Bold Serif style, it becomes U+1D400 – a different character that most modern
            apps render as a bold serif capital A.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">How Do Fancy Fonts Work?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The Unicode standard includes several character blocks that define stylistic
            variants of the Latin alphabet – including bold, italic, script (cursive), fraktur
            (gothic), double-struck (outline), monospace, sans-serif, and encircled variants.
            This tool maps each character you type to the corresponding code point in the
            selected block.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Because these are Unicode characters, not installed fonts, they travel with the
            text when you copy and paste. Any app that renders Unicode will display them as
            intended – including Instagram, TikTok, Discord, Twitter, and WhatsApp.
          </p>
        </section>

        {/* Examples */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Style Examples</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Input: <strong>Digital Creator</strong></p>
          <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-semibold">
                <tr>
                  <th className="p-4">Style</th>
                  <th className="p-4">Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr><td className="p-4 font-medium">Plain</td><td className="p-4">Digital Creator</td></tr>
                <tr><td className="p-4 font-medium">Cursive Script</td><td className="p-4 font-medium">𝒟𝒾𝑔𝒾𝓉𝒶𝓁 𝒞𝓇𝑒𝒶𝓉𝑜𝓇</td></tr>
                <tr><td className="p-4 font-medium">Gothic Fraktur</td><td className="p-4 font-medium">𝔇𝔦𝔤𝔦𝔱𝔞𝔩 𝔠𝔯𝔢𝔞𝔱𝔬𝔯</td></tr>
                <tr><td className="p-4 font-medium">Bold Serif</td><td className="p-4 font-medium">𝐃𝐢𝐠𝐢𝐭𝐚𝐥 𝐂𝐫𝐞𝐚𝐭𝐨𝐫</td></tr>
                <tr><td className="p-4 font-medium">Bubble Circles</td><td className="p-4 font-medium">Ⓓⓘⓖⓘⓣⓐⓛ ⓒⓡⓔⓐⓣⓞⓡ</td></tr>
                <tr><td className="p-4 font-medium">Small Capitals</td><td className="p-4 font-medium">ᴅɪɢɪᴛᴀʟ ᴄʀᴇᴀᴛᴏʀ</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Use cases */}
        <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Fancy Fonts for Instagram</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Paste styled text into your Instagram bio or caption field. Cursive Script and
              Small Capitals are popular for bio headlines. Keep styled text short for best
              readability.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Fancy Fonts for TikTok</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Paste stylized text directly into your TikTok bio or video caption. Bold Sans
              and Italic styles tend to render reliably across most devices.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Fancy Fonts for Discord &amp; Gaming</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Use Gothic Fraktur or Squared Block styles for Discord display names and gaming
              handles. Check your platform's username policy before using special characters.
            </p>
          </div>
        </section>

        {/* Compatibility warning */}
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 space-y-3 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Why Some Fancy Fonts Don't Work</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Because these are Unicode characters, rendering depends on:
          </p>
          <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
            <li>Whether the destination app renders Unicode (most modern apps do).</li>
            <li>The operating system version and its built-in Unicode font coverage.</li>
            <li>Whether the app restricts input to ASCII-only characters (some games do).</li>
          </ul>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            If a character doesn't display correctly, it may appear as a blank box □ or
            question mark. Try a different style from the generator that uses a more widely
            supported Unicode block, such as Bold Sans or Small Capitals.
          </p>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
            <HelpCircle className="w-6 h-6 text-fuchsia-500" />
            Frequently Asked Questions
          </h2>
          <ToolFAQSection faqs={module.faqs} />
        </section>

        {/* Related Tools */}
        <section className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Related Text &amp; Social Tools
            </h2>
            <Link href="/categories/social" className="text-xs font-bold text-fuchsia-600 dark:text-fuchsia-400 hover:underline">
              View All Social Tools →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {module.relatedTools.map((rt) => {
              const matchedTool = TOOLS.find((t) => t.slug === rt.slug);
              return matchedTool ? <ToolCard key={matchedTool.id} tool={matchedTool} /> : null;
            })}
          </div>
        </section>

        <section className="max-w-4xl mx-auto">
          <ToolComments toolSlug="fancy-font-generator" />
        </section>
      </div>
    </>
  );
}
