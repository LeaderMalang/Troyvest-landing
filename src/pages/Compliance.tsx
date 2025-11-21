import { PageLayout } from "../components/PageLayout";
import { SEO } from "@/components/SEO";

export default function Compliance() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "TroyVest Compliance",
    "url": "https://troyvest.io/compliance",
    "description":
      "TroyVest Compliance overview for the TroyVest TROY Token and TroyVest DeFi Accountability ecosystem, focusing on transparency, treasury control, and risk awareness.",
    "isPartOf": {
      "@type": "WebSite",
      "name": "TroyVest",
      "url": "https://troyvest.io"
    }
  };
  return (
    <>
      <SEO
        title="TroyVest Compliance | TroyVest TROY Token & DeFi Accountability"
        description="Compliance overview for the TroyVest TROY Token and the TroyVest DeFi Accountability platform, including risk disclosure, transparency, and governance principles."
        path="/compliance"
        type="webpage"
        jsonLd={jsonLd}
      />
      <PageLayout title="Compliance">
        <p>
          Troyvest is committed to transparency and responsible DeFi development.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6">Regulatory Alignment</h2>
        <p>
          Our treasury, governance, and insurance models follow global best practices
          for decentralized compliance.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6">Smart Contract Audits</h2>
        <p>
          All core contracts are audited and publicly available in the Documents section.
        </p>
      </PageLayout>
    </>
  );
}
