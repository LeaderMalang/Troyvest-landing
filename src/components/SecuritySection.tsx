import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ExternalLink } from "lucide-react";
import { getContentArray, getContentObject, getContentText } from "@/lib/landing";

type SecuritySectionProps = {
  content?: any;
};

const SecuritySection = ({ content }: SecuritySectionProps) => {
  const headingFull = getContentText(content, ["heading", "title"]);
  const headingPrimary =
    getContentText(content, ["heading_primary", "title_primary"]) ??
    "Secured. Audited.";
  const headingHighlight =
    getContentText(content, ["heading_highlight", "highlight"]) ??
    "Trusted.";

  const description =
    getContentText(content, ["description", "body", "subheading"]) ??
    "Enterprise-grade security for the blockchain era. Our smart contracts are being reviewed by the most reputable cybersecurity firms globally.";

  const auditors =
    getContentArray<string>(content, [
      "auditors",
      "audit_companies",
      "companies",
    ]) ?? ["CertiK", "PeckShield", "Halborn"];

  const cta = getContentObject<any>(content, ["cta", "primary_cta", "button"]);
  const ctaLabel =
    getContentText(cta, ["label", "text", "title"]) ??
    getContentText(content, ["cta_label", "button_label"]) ??
    "View Audit Report";
  const ctaHref =
    getContentText(cta, ["href", "url", "link"]) ??
    getContentText(content, ["cta_href", "cta_url", "button_href"]) ??
    "/documents?doc=audit-troy-token";
  return (
    <section id="Trust" className="py-28 relative overflow-hidden bg-black">
      {/* Gold Nebula Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[70vw] h-[50vh] bg-[radial-gradient(circle_at_top,rgba(210,180,70,0.35),transparent)] blur-3xl opacity-60"></div>
        <div className="absolute top-0 right-0 w-[60vw] h-[50vh] bg-[radial-gradient(circle_at_top,rgba(255,225,130,0.2),transparent)] blur-3xl opacity-50"></div>
      </div>

      {/* Stars */}
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-20 mix-blend-screen pointer-events-none"></div>

      <div className="container mx-auto px-6 relative">
        <Card className="p-14 max-w-4xl mx-auto text-center border border-yellow-500/30 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(255,215,0,0.2)] hover:shadow-[0_0_60px_rgba(255,215,0,0.4)] transition-all duration-300">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#fee372] to-[#fee372] flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(255,215,0,0.6)]">
            <Shield className="w-12 h-12 text-black" />
          </div>

          {headingFull ? (
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {headingFull}
            </h2>
          ) : (
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {headingPrimary}
              <span className="text-[#fee372]"> {headingHighlight}</span>
            </h2>
          )}

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {description}
          </p>

          {/* Audit Companies */}
          <div className="flex flex-wrap justify-center gap-14 mb-10 opacity-90">
            {auditors.map((name, idx) => (
              <span
                key={`${name}-${idx}`}
                className="text-2xl md:text-3xl font-bold text-[#fee372]"
              >
                {name}
              </span>
            ))}
          </div>
          <a href={ctaHref} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            size="lg"
            className="border-[#fee372] text-yellow-300 hover:bg-[#fee372] hover:text-black transition-all"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            {ctaLabel}
          </Button>
          </a>
        </Card>
      </div>
    </section>
  );
};

export default SecuritySection;
