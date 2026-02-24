"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getContentObject, getContentText } from "@/lib/landing";
// import heroImage from "@/assets/hero-tokens.jpg";

type HeroSectionProps = {
  content?: any;
};

export default function HeroSection({ content }: HeroSectionProps) {
  const title =
    getContentText(content, ["title", "headline", "heading"]) ??
    "Are You Investing in a Project";
  const highlight =
    getContentText(content, [
      "title_highlight",
      "headline_highlight",
      "highlight",
      "accent",
    ]) ?? "Or in its Community?";

  const descriptionHtml = getContentText(content, [
    "description_html",
    "body_html",
  ]);
  const descriptionText = getContentText(content, [
    "description",
    "body",
    "subheading",
    "text",
  ]);

  const primaryCta = getContentObject<any>(content, [
    "primary_cta",
    "primaryCta",
    "cta_primary",
  ]);
  const secondaryCta = getContentObject<any>(content, [
    "secondary_cta",
    "secondaryCta",
    "cta_secondary",
  ]);

  const primaryLabel =
    getContentText(primaryCta, ["label", "text", "title"]) ??
    getContentText(content, [
      "primary_cta_label",
      "primaryCtaLabel",
      "cta_primary_label",
    ]) ??
    "Join the TROY Presale";
  const primaryHref =
    getContentText(primaryCta, ["href", "url", "link"]) ??
    getContentText(content, [
      "primary_cta_href",
      "primary_cta_url",
      "primaryCtaUrl",
    ]) ??
    "https://presale.troyvest.io";

  const secondaryLabel =
    getContentText(secondaryCta, ["label", "text", "title"]) ??
    getContentText(content, [
      "secondary_cta_label",
      "secondaryCtaLabel",
      "cta_secondary_label",
    ]) ??
    "Learn About Vindex DAO";
  const secondaryHref =
    getContentText(secondaryCta, ["href", "url", "link"]) ??
    getContentText(content, [
      "secondary_cta_href",
      "secondary_cta_url",
      "secondaryCtaUrl",
    ]) ??
    "/documents?doc=mds-whitepaper";

  const imageSrc =
    getContentText(content, [
      "image",
      "image_url",
      "image.src",
      "imageSrc",
    ]) ?? "/banner.png";
  const imageAlt =
    getContentText(content, ["image_alt", "image.alt", "imageAlt"]) ??
    "TROY & Vindex Tokens";
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-28">
      {/* Gold glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.12),transparent_70%)]"></div>

      {/* Container */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
              {title}
              <span className="block bg-gradient-to-r from-[#fee372] to-[#fee372] bg-clip-text text-transparent drop-shadow-lg">
                {highlight}
              </span>
            </h1>

            {descriptionHtml ? (
              <p
                className="text-lg text-gray-300 leading-relaxed max-w-lg"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            ) : descriptionText ? (
              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                {descriptionText}
              </p>
            ) : (
              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                Troyvest is the world’s first DeFi ecosystem powered by a{" "}
                <span className="text-[#fee372] font-semibold">
                  Decentralized Treasury
                </span>
                .
                <br />
                <br />
                <span className="font-semibold text-white">Troy (TROY)</span>
                viable-utility token
                <br />
                <span className="font-semibold text-[#fee372]">
                  Vindex (VNDX)
                </span>{" "}
                governance token owned by the community.
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={primaryHref} target="_blank" rel="noopener noreferrer">
              <Button className="text-base text-black font-semibold flex items-center gap-2 bg-gradient-to-r from-[#fee372] via-[#fee372] to-[#fee372] hover:shadow-[0_0_25px_rgba(255,199,0,0.45)]">
               
                {primaryLabel}
                <ArrowRight className="w-5 h-5" />
                
              </Button>
              </a> 
              <a href={secondaryHref} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="text-base border-yellow-400/40 text-[#fee372] hover:bg-yellow-400/10"
              >
                {secondaryLabel}
              </Button>
              </a>
            </div>
          </div>

          {/* Hero Image rounded-2xl shadow-xl ring-1 ring-yellow-500/30 */}
          <div className="relative group">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full  group-hover:scale-[1.02] transition-transform duration-500 animate-floating"
            />

            {/* Gold glow behind image */}
            <div className="absolute -inset-10 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
