import { PageLayout } from "../components/PageLayout";
import { SEO } from "@/components/SEO";
export default function Terms() {
  const termsJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "TroyVest Terms of Service",
    "url": "https://troyvest.io/terms",
    "description":
      "Terms of Service for TroyVest, covering use of the TroyVest TROY Token site, DeFi Accountability platform, and related services.",
    "isPartOf": {
      "@type": "WebSite",
      "name": "TroyVest",
      "url": "https://troyvest.io"
    }
  };
  return (
    <>
      <SEO
        title="TroyVest Terms of Service | TroyVest TROY Token Platform"
        description="Read the official TroyVest Terms of Service, including rules for using the TroyVest TROY Token platform and DeFi Accountability ecosystem."
        path="/terms"
        jsonLd={termsJsonLd}
        type="webpage"
      />
      <PageLayout title="Terms of Service">
        <p>
          By accessing Troyvest.io you agree to the terms described below. These
          rules are designed for your protection and compliance standards.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6">1. Use of Platform</h2>
        <p>
          You may use our platform for lawful activities only. Any attempt to exploit
          smart contracts or systems is strictly prohibited.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6">2. No Financial Advice</h2>
        <p>
          All content on Troyvest.io is for educational purposes only and does not
          constitute investment advice.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6">3. Risk Disclaimer</h2>
        <p>
          Decentralized finance involves risk. Users are responsible for verifying
          transactions and reviewing official documents.
        </p>
      </PageLayout>
    </>
  );
}
