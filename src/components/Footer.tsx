import React, { useMemo, useState } from "react";
import {
  MessageCircle,
  SendIcon,
  Twitter,
  Users,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  Twitch,
  createLucideIcon,
  TwitchIcon,
  Link,
  Mail,
  Loader2,
} from "lucide-react";

const API_BASE = "https://backend.troyvest.io";

async function postJson<T>(path: string, body: any): Promise<T> {
  const res = await fetch(API_BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text || `HTTP ${res.status}`);
  return text ? (JSON.parse(text) as T) : ({} as T);
}

const Footer = () => {
  const TikTokIcon = createLucideIcon("TikTokIcon", [
    [
      "path",
      {
        d: "M14 3v3.5A4.5 4.5 0 0 1 9.5 11H9v3.5a3.5 3.5 0 1 1-3.5-3.5H6A4.5 4.5 0 0 0 10 6.5V3h4z",
        key: "tiktok-path",
      },
    ],
  ]);

  const footerLinks = [
    { label: "Whitepaper", link: "/documents?doc=troy-whitepaper" },
    { label: "FAQ", link: "/faq" },
    { label: "Terms of Service", link: "/terms" },
    { label: "Contact", link: "/contact" },
    { label: "Community", link: "https://t.me/troyvest" },
    { label: "Privacy Policy", link: "/privacy" },
    { label: "Compliance", link: "/compliance" },
  ];

  /* ---------------- Newsletter state ---------------- */
  const [subEmail, setSubEmail] = useState("");
  const [subName, setSubName] = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const [subOk, setSubOk] = useState<string | null>(null);
  const [subErr, setSubErr] = useState<string | null>(null);

  const emailValid = useMemo(() => /^\S+@\S+\.\S+$/.test(subEmail.trim()), [subEmail]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubOk(null);
    setSubErr(null);

    const email = subEmail.trim();
    const name = subName.trim();

    if (!email) return setSubErr("Email is required");
    if (!emailValid) return setSubErr("Email looks invalid");

    setSubLoading(true);
    try {
      // ✅ Backend endpoint expected:
      // POST /api/subscribe  body: { email, name?, source? }
      await postJson<{ ok: true }>("/api/subscribe", {
        email,
        name: name || undefined,
        source: "footer",
      });

      setSubOk("Subscribed. Check your inbox.");
      setSubEmail("");
      setSubName("");
    } catch (err: any) {
      const msg =
        typeof err?.message === "string" && err.message.length < 200
          ? err.message
          : "Subscription failed. Try again.";
      setSubErr(msg);
    } finally {
      setSubLoading(false);
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* ✅ Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.15)_0%,_rgba(0,0,0,1)_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-black" />

      {/* ✅ Neon grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.12]" />

      {/* ✅ Glow edges */}
      <div className="absolute top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
      <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />

      <div className="container mx-auto px-6 py-24 relative z-10 text-center">
        {/* Brand */}
        <h3 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,255,255,0.7)] tracking-wide">
          TROYVEST
        </h3>

        <p className="text-sm text-gray-400 mt-3 max-w-md mx-auto">
          Empowering decentralized trust &amp; accountability in the crypto ecosystem.
        </p>

        {/* ✅ Newsletter */}
        <div className="mt-10 mx-auto max-w-2xl">
          <div className="rounded-2xl border border-cyan-300/20 bg-white/5 backdrop-blur-md p-6 md:p-7">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-cyan-200" />
              <h4 className="text-lg font-semibold text-white">Newsletter</h4>
            </div>
            <p className="text-xs text-gray-400 max-w-xl mx-auto mb-5">
              Get product updates, security notices, and major announcements.
            </p>

            <form onSubmit={handleSubscribe} className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-3">
              <input
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
                placeholder="Your name (optional)"
                value={subName}
                onChange={(e) => setSubName(e.target.value)}
                autoComplete="name"
              />
              <input
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
                placeholder="Email address"
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                autoComplete="email"
                type="email"
              />
              <button
                type="submit"
                disabled={subLoading}
                className="rounded-xl px-5 py-3 font-semibold text-black bg-gradient-to-r from-cyan-300 to-blue-400
                  hover:from-cyan-200 hover:to-blue-300 transition disabled:opacity-60 disabled:cursor-not-allowed
                  inline-flex items-center justify-center gap-2"
              >
                {subLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subscribing
                  </>
                ) : (
                  <>
                    <SendIcon className="w-4 h-4" />
                    Subscribe
                  </>
                )}
              </button>
            </form>

            {(subOk || subErr) && (
              <div className="mt-4">
                {subOk && (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-200 text-sm">
                    {subOk}
                  </div>
                )}
                {subErr && (
                  <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200 text-sm">
                    {subErr}
                  </div>
                )}
              </div>
            )}

            <div className="mt-3 text-[11px] text-gray-400">
              We don’t sell your email. Unsubscribe anytime.
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 my-10 flex-wrap">
          {[
            { Icon: SendIcon, label: "Telegram", link: "https://t.me/Troyvest" },
            { Icon: Twitter, label: "Twitter", link: "https://x.com/Troyvest_troy" },
            { Icon: Users, label: "Discord", link: "#" },
            { Icon: FacebookIcon, label: "Facebook", link: "#" },
            { Icon: InstagramIcon, label: "instagram", link: "#" },
            { Icon: TikTokIcon, label: "TikTok", link: "#" },
            { Icon: YoutubeIcon, label: "youtube", link: "#" },
            { Icon: TwitchIcon, label: "Twitch", link: "#" },
            // { Icon: LinkedinIcon, label: "Linkedin", link: "#" },
          ].map(({ Icon, label, link }, i) => (
            <a
              key={i}
              href={link}
              aria-label={label}
              target={link.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="w-14 h-14 flex items-center justify-center rounded-full
                border border-cyan-300/40 bg-white/5 backdrop-blur-md
                hover:bg-cyan-400/30 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,255,255,0.9)]
                transition-all duration-300 group"
            >
              <Icon className="w-6 h-6 text-white group-hover:scale-125 transition" />
            </a>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-10 text-sm mb-12">
          {footerLinks.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © 2025 <span className="text-white font-semibold">Troyvest</span>. All rights reserved.
        </p>

        <p className="text-[0.5rem] text-gray-500 mt-3">
          ⚠️ TroyVest Disclaimer Investing in virtual assets carries significant risks,
          including volatility, technological vulnerabilities, and potential regulatory changes.
          You can lose all your funds. TroyVest is a DeFi platform and is not an investment advisor,
          financial institution, or broker-dealer. Information on this site is for informational
          purposes only and not financial/legal/tax advice. DYOR and consult a qualified professional.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
