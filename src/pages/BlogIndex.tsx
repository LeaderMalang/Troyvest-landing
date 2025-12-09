// src/pages/BlogIndex.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { SEO } from "@/components/SEO";

const API_BASE = import.meta.env.VITE_API_BASE ?? "https://backend.troyvest.io";

type PostSummary = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  author_name: string | null;
  published_at: string | null;
};

type PostWithImage = PostSummary & {
  coverImage?: string | null;
};

type PostDetail = {
  content?: string;
  cover_image?: string | null;
};

function extractFirstImage(markdown: string | undefined | null): string | null {
  if (!markdown) return null;
  // Markdown image: ![alt](url "title")
  const match = markdown.match(/!\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/);
  return match ? match[1] : null;
}

export function BlogIndex() {
  const [posts, setPosts] = useState<PostWithImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1) Fetch summaries
        const res = await fetch(`${API_BASE}/api/blog/posts?limit=200`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const allPosts: PostSummary[] = await res.json();

        const published = allPosts
          .filter((p) => p.published_at)
          .sort(
            (a, b) =>
              new Date(b.published_at || "").getTime() -
              new Date(a.published_at || "").getTime()
          );

        // 2) For each, fetch detail and extract first image
        const withImages: PostWithImage[] = await Promise.all(
          published.map(async (p) => {
            try {
              const detailRes = await fetch(
                `${API_BASE}/api/blog/posts/${p.slug}`
              );
              if (!detailRes.ok) return { ...p, coverImage: null };

              const detail: PostDetail = await detailRes.json();
              const cover =
                detail.cover_image ??
                extractFirstImage(detail.content ?? null);

              return { ...p, coverImage: cover };
            } catch {
              return { ...p, coverImage: null };
            }
          })
        );

        setPosts(withImages);
      } catch (e: any) {
        console.error(e);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "TroyVest Blog",
    url: "https://troyvest.io/blog",
    description:
      "Insights and updates from TroyVest about DeFi, compliance, token economics, and the TROY ecosystem.",
    isPartOf: {
      "@type": "WebSite",
      name: "TroyVest",
      url: "https://troyvest.io",
    },
  };

  return (
    <>
      <SEO
        title="TroyVest Blog | Updates & Education"
        description="Read the latest posts from TroyVest about DeFi, compliance, and the TroyVest ecosystem."
        path="/blog"
        type="blog"
        jsonLd={jsonLd}
      />
      <PageLayout title="Blog">
        <p className="text-sm text-slate-300">
          Curated updates and educational posts from the TroyVest team.
        </p>

        <div className="mt-8">
          {loading && <p className="text-sm text-slate-400">Loading posts…</p>}
          {error && (
            <p className="text-sm text-red-400">
              {error} – please try again later.
            </p>
          )}

          {!loading && !error && posts.length === 0 && (
            <p className="text-sm text-slate-400">
              No blog posts published yet.
            </p>
          )}

          <div className="grid gap-4 md:gap-6 md:grid-cols-2 mt-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block rounded-2xl border border-slate-800/70 bg-slate-950/40 hover:border-teal-400/70 hover:bg-slate-900/60 transition-colors overflow-hidden"
              >
                {/* Image block */}
                <div className="w-full aspect-[16/9] bg-slate-900/70 overflow-hidden">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-600">
                      No image
                    </div>
                  )}
                </div>

                {/* Text content */}
                <div className="px-5 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    {post.title}
                  </h2>

                  <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                    {post.author_name && (
                      <span className="uppercase tracking-wide">
                        {post.author_name}
                      </span>
                    )}
                    {post.published_at && (
                      <span className="text-slate-500">
                        {new Date(post.published_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-sm text-slate-300 line-clamp-3">
                    {post.excerpt ||
                      "Click to read the full article from TroyVest on DeFi, compliance and ecosystem updates."}
                  </p>

                  <span className="mt-3 inline-flex text-xs text-teal-300">
                    Read article →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </PageLayout>
    </>
  );
}
