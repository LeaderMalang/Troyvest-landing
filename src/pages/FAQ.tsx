import { PageLayout } from "../components/PageLayout";
import { SEO } from "@/components/SEO";
export default function FAQ() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is TroyVest TROY Token?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "TroyVest TROY Token is the utility asset powering the TroyVest TROY ecosystem, used for staking, liquidity, and accessing DeFi Accountability features such as the decentralized treasury."
        }
      },
      {
        "@type": "Question",
        "name": "What is TroyVest DeFi Accountability?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "TroyVest DeFi Accountability means that key treasury, governance, and parameter changes are controlled on-chain through community voting instead of centralized decision making."
        }
      },
      {
        "@type": "Question",
        "name": "Is TroyVest audited?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes. Security assessment reports for TroyToken.sol and TroyvestPresale.sol are publicly available in the Documents section and can be downloaded as PDFs."
        }
      }
    ]
  };
  return (
    <>
      <SEO
        title="TroyVest FAQ | TroyVest TROY Token & DeFi Accountability Questions"
        description="Answers to common questions about TroyVest TROY Token, TroyVest DeFi Accountability, treasury governance, staking, and security audits."
        path="/faq"
        jsonLd={faqJsonLd}
        type="webpage"
      />
      <PageLayout title="Frequently Asked Questions">
        <p>
          Below are the most common questions about Troyvest, TROY utility,
          Vindex governance, staking, and security.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6">What is Troyvest?</h2>
        <p>
          Troyvest is a two-token decentralized ecosystem offering transparent
          treasury control, yield staking, on-chain insurance, and DAO governance.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6">Is the project audited?</h2>
        <p>
          Yes. Security assessments for TROY and TROY Presale contracts are publicly accessible in the Documents section.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6">How do I join the community?</h2>
        <p>
          You can join our Telegram and Discord channels listed on the landing page.
        </p>
      </PageLayout>
    </>
  );
}
