import Breadcrumb from "@/components/Breadcrumb";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-20 space-y-6">
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />

      <h1 className="text-3xl font-black text-slate-900 dark:text-white">
        Privacy Policy
      </h1>

      <div className="prose dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed">
        <p>
          At FunTools (funtools.com), the privacy of our visitors is extremely important to us. This Privacy Policy outlines the types of personal information collected and how it is used.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">Client-Side Computation</h3>
        <p>
          All interactive calculations, font transformations, random selection wheels, and quiz calculations happen locally inside your web browser. Your inputs are never transmitted or saved to external servers.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">Cookies and Web Beacons</h3>
        <p>
          FunTools uses cookies to store user preferences, such as light/dark mode selection and saved tool bookmarks stored locally.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">Google AdSense & Third Party Ads</h3>
        <p>
          We use Google AdSense and third-party advertising companies to serve non-intrusive ads when you visit our website. These companies may use cookies (such as the DoubleClick DART cookie) to serve ads based on your prior visits to our website or other websites on the Internet.
        </p>
      </div>
    </div>
  );
}
