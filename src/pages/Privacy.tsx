import { PageLayout } from "../components/PageLayout";
import { SEO } from "@/components/SEO";
export default function Privacy() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "TroyVest Privacy Policy",
    "url": "https://troyvest.io/privacy",
    "description":
      "TroyVest Privacy Policy describing how TroyVest TROY Token, TroyVest DeFi Accountability platform, and related services handle basic analytics and user data.",
    "isPartOf": {
      "@type": "WebSite",
      "name": "TroyVest",
      "url": "https://troyvest.io"
    }
  };
  return (
    <>
      <SEO
        title="TroyVest Privacy Policy | TroyVest TROY Token & DeFi Accountability"
        description="Read the TroyVest Privacy Policy explaining how TroyVest TROY Token and the TroyVest DeFi Accountability platform use analytics, cookies, and wallet data."
        path="/privacy"
        type="webpage"
        jsonLd={jsonLd}
      />
      <PageLayout title="Privacy Policy">
        <p>
          Troyvest respects your privacy. We do not collect personal data unless
          voluntarily provided (e.g., contact forms).
        </p>

        <h2 className="text-xl font-semibold text-white mt-6">1. Cookies & Analytics</h2>
        <p>
          We may use non-identifying analytics to improve platform performance.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6">2. User Data</h2>
        <p>
          No sensitive or financial data is stored by Troyvest.io.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6">3. Web3 Wallets</h2>
        <p>
          When connecting a wallet, you maintain full control of your private keys.
        </p>
      </PageLayout>
    </>
  );
}
