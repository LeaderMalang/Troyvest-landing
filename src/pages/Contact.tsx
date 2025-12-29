import React, { useMemo, useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { SEO } from "@/components/SEO";

const API_BASE = "https://backend.troyvest.io";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

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

export default function Contact() {
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact TroyVest",
      url: "https://troyvest.io/contact",
      isPartOf: { "@type": "WebSite", name: "TroyVest", url: "https://troyvest.io" },
    }),
    []
  );

  const [form, setForm] = useState<ContactPayload>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const update = (k: keyof ContactPayload, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return "Email looks invalid";
    if (!form.message.trim()) return "Message is required";
    if (form.message.trim().length < 10) return "Message is too short";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOkMsg(null);
    setErrMsg(null);

    const v = validate();
    if (v) {
      setErrMsg(v);
      return;
    }

    setLoading(true);
    try {
      await postJson<{ ok: true; id: number }>("/api/contact", {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: (form.phone || "").trim() || undefined,
        subject: (form.subject || "").trim() || undefined,
        message: form.message.trim(),
      });

      setOkMsg("Thanks! Your message has been received.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      setErrMsg(
        typeof err?.message === "string" && err.message.length < 240
          ? err.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact TroyVest | Support & Inquiries"
        description="Contact TroyVest support for questions about the platform, presale, or partnerships."
        path="/contact"
        jsonLd={jsonLd}
        type="webpage"
      />

      <PageLayout title="Contact Us">
        <p className="text-white/80">
          Send us a message and our team will reply via email.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4 max-w-2xl">
          {okMsg && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-200">
              {okMsg}
            </div>
          )}
          {errMsg && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200">
              {errMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/80 mb-1">Full name *</label>
              <input
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1">Email *</label>
              <input
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@email.com"
                type="email"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/80 mb-1">Phone (optional)</label>
              <input
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
                value={form.phone || ""}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+92..."
                autoComplete="tel"
              />
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1">Subject (optional)</label>
              <input
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
                value={form.subject || ""}
                onChange={(e) => update("subject", e.target.value)}
                placeholder="How can we help?"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Message *</label>
            <textarea
              className="w-full min-h-[140px] rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30 resize-y"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Write your message..."
            />
            <div className="text-xs text-white/50 mt-2">
              We’ll only use your email to reply to this request.
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-white text-black px-5 py-3 font-medium disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Optional: direct email */}
        <div className="mt-8 text-white/70 text-sm">
          Prefer email? Write us at{" "}
          <a className="underline" href="mailto:support@troyvest.io">
            info@troyvest.io
          </a>
        </div>
      </PageLayout>
    </>
  );
}
