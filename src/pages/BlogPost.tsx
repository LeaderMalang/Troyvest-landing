// src/pages/BlogPost.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { PageLayout } from "../components/PageLayout";
import { SEO } from "@/components/SEO";

const API_BASE = import.meta.env.VITE_API_BASE ?? "https://backend.troyvest.io";

type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  author_name: string | null;
  published_at: string | null;
  content: string;
};

function makeDescription(post: Post, max = 160): string {
  const source = post.excerpt || post.content || "";
  const plain = source
    .replace(/[#>*_`]/g, " ") // basic markdown cleanup
    .replace(/\s+/g, " ")
    .trim();
  if (!plain) return "Article from TroyVest blog.";
  if (plain.length <= max) return plain;
  return plain.slice(0, max - 3) + "...";
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const load = async () => {
      setLoading(true);
      setError(null);
      setNotFound(false);
      try {
        const res = await fetch(`${API_BASE}/api/blog/posts/${slug}`);
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data: Post = await res.json();
        setPost(data);
      } catch (e: any) {
        console.error(e);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  if (loading) {
    return (
      <PageLayout title="Loading…">
        <p className="text-sm text-slate-300">Loading article…</p>
      </PageLayout>
    );
  }

  if (notFound || !post) {
    return (
      <PageLayout title="Post not found">
        <p className="text-sm text-slate-300">
          The article you are looking for does not exist or is no longer
          available.
        </p>
      </PageLayout>
    );
  }

  const description = makeDescription(post);
  const url = `https://troyvest.io/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    url,
    datePublished: post.published_at || undefined,
    author: post.author_name
      ? { "@type": "Person", name: post.author_name }
      : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isPartOf: {
      "@type": "Blog",
      name: "TroyVest Blog",
      url: "https://troyvest.io/blog",
    },
  };

  return (
    <>
      <SEO
        title={`${post.title} | TroyVest Blog`}
        description={description}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={jsonLd}
      />
      <PageLayout title={post.title}>
        {error && (
          <p className="text-sm text-red-400 mb-4">
            {error} – please refresh.
          </p>
        )}

        {/* Meta row similar to your style */}
        <div className="text-xs text-slate-400 flex flex-wrap gap-4 mb-6">
          {post.author_name && (
            <span className="uppercase tracking-wide">
              {post.author_name}
            </span>
          )}
          {post.published_at && (
            <span>
              {new Date(post.published_at).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Content */}
        <article className="prose prose-invert prose-sm md:prose-base max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </PageLayout>
    </>
  );
}
