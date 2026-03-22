import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PresaleSection from "@/components/PresaleSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import TokenEcosystemSection from "@/components/TokenEcosystemSection";
import TokenomicsSection from "@/components/TokenomicsSection";
import RoadmapSection from "@/components/RoadmapSection";
import SecuritySection from "@/components/SecuritySection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import { SEO } from "@/components/SEO";
import { ClientOnly } from "@/components/ClientOnly";
import { useLandingSections } from "@/hooks/useLandingSections";

const Index = () => {
  const { sections } = useLandingSections();
  const sectionFor = (...keys: string[]) =>
    keys.map((key) => sections?.[key]).find(Boolean);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TroyVest",
    "url": "https://troyvest.io",
    "logo": "https://troyvest.io/logo.png",
    "description":
      "TroyVest TROY Token powers the TroyVest TROY ecosystem with DeFi Accountability, a decentralized treasury, and community-driven governance.",
    "sameAs": [
      "https://t.me/troyvest",
      "https://x.com/Troyvest_Ofc",
      "https://discord.com/channels/1429821279560798220"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TroyVest",
    "url": "https://troyvest.io",
    "description":
      "TroyVest DeFi Accountability with TroyVest TROY Token and decentralized treasury governance.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://troyvest.io/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  const troyTokenJsonLd = {
    "@context": "https://schema.org",
    "@type": "CryptoCurrency",
    "name": "TroyVest TROY Token",
    "tickerSymbol": "TROY",
    "description":
      "TroyVest TROY Token powers the TroyVest ecosystem with DeFi Accountability, transparent treasury rules, staking rewards, and governance participation.",
    "url": "https://troyvest.io",
    "logo": "https://troyvest.io/logo.png",
    "image": "https://troyvest.io/troy-banner.jpg",
    "sameAs": [
      "https://troyvest.io",
      "https://t.me/troyvest",
      "https://twitter.com",
      "https://discord.gg"
    ],
    "blockchain": "BNB Smart Chain",
    "identifier": {
      "@type": "PropertyValue",
      "name": "Smart Contract Address",
      "value": "0xe15c4b65B5bB9ca62A4A96A78F11D4200504B4AC"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://presale.troyvest.io",
      "priceCurrency": "USD",
      "price": "0.00080",
      "description": "TroyVest TROY Token Presale Phase 1 price."
    }
  };

  return (


    <div className="min-h-screen relative">
      <SEO
        title="TroyVest TROY Token | TroyVest TROY & DeFi Accountability"
        description="TroyVest TROY Token is at the core of the TroyVest TROY ecosystem, built for DeFi Accountability with a decentralized treasury, on-chain governance, and transparent tokenomics."
        path="/"
        image="/logo.png"
        type="website"
        jsonLd={[orgJsonLd, websiteJsonLd, troyTokenJsonLd]}
      />
      <Background3D />
      <Navigation />
      <main>
        <HeroSection content={sectionFor("hero")?.content} />
        <PresaleSection content={sectionFor("presale")?.content} />
        <ProblemSolutionSection
          content={
            sectionFor("problem-solution", "problem_solution", "problem")
              ?.content
          }
        />
        <TokenEcosystemSection
          content={sectionFor("ecosystem", "token-ecosystem")?.content}
        />
        <TokenomicsSection
          content={sectionFor("tokenomics", "token-omics")?.content}
        />
        <RoadmapSection content={sectionFor("roadmap")?.content} />
        <SecuritySection content={sectionFor("security", "trust")?.content} />
        <FinalCTASection content={sectionFor("final-cta", "cta")?.content} />
      </main>
      <ClientOnly>
        <Footer />
      </ClientOnly>
    </div>
  );
};

export default Index;
