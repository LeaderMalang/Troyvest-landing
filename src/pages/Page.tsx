import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { PageLayout } from "../components/PageLayout";
import { SEO } from "@/components/SEO";

const API_BASE = import.meta.env.VITE_API_BASE ?? "https://backend.troyvest.io";

type SitePage = {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string; // Markdown
  meta_title: string | null;
  meta_description: string | null;
  canonical_path: string | null;
  noindex: boolean;
  og_image: string | null;
  json_ld: any | null;
  updated_at: string;
};

export function Page({ slug }: { slug: string }) {
  const [page, setPage] = useState<SitePage | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      const r = await fetch(`${API_BASE}/api/pages/${encodeURIComponent(slug)}`);
      if (r.status === 404) return setNotFound(true);
      const data = await r.json();
      setPage(data);
    };
    load();
  }, [slug]);

  if (notFound) {
    return (
      <PageLayout title="Page not found">
        <p className="text-sm text-slate-300">This page is not available.</p>
      </PageLayout>
    );
  }

  if (!page) {
    return (
      <PageLayout title="Loading…">
        <p className="text-sm text-slate-300">Loading…</p>
      </PageLayout>
    );
  }

  const path = page.canonical_path || `/${page.slug}`;
  const title = page.meta_title || `${page.title} | TroyVest`;
  const description = page.meta_description || page.excerpt || "TroyVest page.";

  const og = page.og_image
    ? page.og_image
    : `${API_BASE}/og?type=page&title=${encodeURIComponent(page.title)}&subtitle=${encodeURIComponent("troyvest.io")}`;

  // default JSON-LD (merge if you want)
  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    url: `https://troyvest.io${path}`,
    description,
    isPartOf: { "@type": "WebSite", name: "TroyVest", url: "https://troyvest.io" },
  };

  return (
    <>
      <SEO
        title={title}
        description={description}
        path={path}
        image={og}
        type="webpage"
        jsonLd={page.json_ld || defaultJsonLd}
      />
      <PageLayout title={page.title}>
        <article className="prose prose-invert prose-sm md:prose-base max-w-none">
          <ReactMarkdown>{page.content}</ReactMarkdown>
        </article>
      </PageLayout>
    </>
  );
}
