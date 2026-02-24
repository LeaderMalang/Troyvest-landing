import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description: string;
  path?: string;              // e.g. "/faq"
  image?: string;             // "/og-image.png"
  type?: string;              // "website" | "article" | "webpage" etc.
  jsonLd?: any | any[];       // schema.org object(s)
};

const SITE_URL = "https://troyvest.io";
const DEFAULT_IMAGE = "/logo.png";
const SITE_NAME = "TroyVest";

export function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  jsonLd
}: SEOProps) {
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      {/* Basic */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="TroyVest" />

      {/* Keywords – include your phrases */}
      <meta
        name="keywords"
        content="TroyVest TROY Token, TroyVest TROY, TroyVest DeFi Accountability, DeFi, cryptocurrency, governance token, decentralized treasury"
      />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* JSON-LD */}
      {jsonLdArray.map((block, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </Helmet>
  );
}
