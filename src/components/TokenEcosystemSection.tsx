"use client";

import { Card } from "@/components/ui/card";
import { Coins, Key, PiggyBank, Shield, TrendingUp, Vote,CreditCard,Building   } from "lucide-react";
import { motion } from "framer-motion";
import { getContentArray, getContentObject, getContentText } from "@/lib/landing";

type FeatureItem = {
  title: string;
  desc?: string;
  icon?: any;
};

type TokenContent = {
  name?: string;
  tagline?: string;
  supply_label?: string;
  supply?: string;
  icon_image?: string;
  icon_alt?: string;
  features?: FeatureItem[];
  note_title?: string;
  note_body?: string;
};

type TokenEcosystemSectionProps = {
  content?: any;
};

const TokenEcosystemSection = ({ content }: TokenEcosystemSectionProps) => {
  const headingFull = getContentText(content, ["heading", "title"]);
  const headingPrefix =
    getContentText(content, ["heading_prefix", "title_prefix"]) ?? "The";
  const headingHighlight =
    getContentText(content, ["heading_highlight", "highlight"]) ?? "Two Token";
  const headingSuffix =
    getContentText(content, ["heading_suffix", "title_suffix"]) ?? "Ecosystem";

  const subheadingText = getContentText(content, [
    "subheading",
    "description",
    "body",
  ]);

  const iconMap: Record<string, any> = {
    piggybank: PiggyBank,
    shield: Shield,
    trendingup: TrendingUp,
    coins: Coins,
    creditcard: CreditCard,
    building: Building,
    vote: Vote,
    key: Key,
  };

  const resolveIcon = (icon: any, fallback: any) => {
    if (!icon) return fallback;
    if (typeof icon === "function") return icon;
    if (typeof icon === "string") {
      return iconMap[icon.toLowerCase()] ?? fallback;
    }
    return fallback;
  };

  const defaultTokenA: TokenContent & { features: FeatureItem[] } = {
    name: "Troy (TROY)",
    tagline: "The Engine",
    supply_label: "Total Supply",
    supply: "888,888,888 TROY",
    icon_image: "banner.png",
    icon_alt: "Troy token",
    features: [
      {
        icon: PiggyBank,
        title: "Staking & Farming",
        desc: "Earn passive yield from day one",
      },
      {
        icon: Shield,
        title: "Insurance",
        desc: "Pay premiums for volatility & real-world coverage",
      },
      {
        icon: TrendingUp,
        title: "Lending & Borrowing",
        desc: "Use as collateral or borrow against stables",
      },
      {
        icon: Coins,
        title: "Trade",
        desc: "Core utility asset for upcoming DEX",
      },
      {
        icon: CreditCard,
        title: "Payments",
        desc: "Spend and withdraw fiat anywhere with Troyvest Card",
      },
      {
        icon: Building,
        title: "Commodity Backing",
        desc: "Convert realworld assets to Troy.Tokenization of realworld assets.",
      },
    ],
  };

  const defaultTokenB: TokenContent & { features: FeatureItem[] } = {
    name: "Vindex (VNDX)",
    tagline: "The Key",
    supply_label: "Total Supply",
    supply: "888,888 VNDX",
    icon_image: "vendex.png",
    icon_alt: "Vindex token",
    features: [
      {
        icon: Vote,
        title: "DAO Governance",
        desc: "Shape every major ecosystem decision",
      },
      {
        icon: Key,
        title: "Treasury Control",
        desc: "Only token that unlocks the 40% TROY vault",
      },
    ],
    note_title: "How to Get Vindex",
    note_body:
      "Vindex is a hybrid — airdropped to top long-term supporters, and available for purchase by TROY stakers,trusted investors and holders.",
  };

  const tokenAContent =
    getContentObject<TokenContent>(content, [
      "token_a",
      "tokenA",
      "troy",
      "token1",
    ]) ?? {};
  const tokenBContent =
    getContentObject<TokenContent>(content, [
      "token_b",
      "tokenB",
      "vindex",
      "token2",
      "midas",
    ]) ?? {};

  const tokenAName =
    getContentText(tokenAContent, ["name", "title"]) ?? defaultTokenA.name;
  const tokenATagline =
    getContentText(tokenAContent, ["tagline", "subtitle"]) ??
    defaultTokenA.tagline;
  const tokenASupplyLabel =
    getContentText(tokenAContent, ["supply_label", "supplyLabel"]) ??
    defaultTokenA.supply_label;
  const tokenASupply =
    getContentText(tokenAContent, ["supply", "total_supply", "totalSupply"]) ??
    defaultTokenA.supply;
  const tokenAIcon =
    getContentText(tokenAContent, [
      "icon_image",
      "icon",
      "icon_url",
      "image",
    ]) ?? defaultTokenA.icon_image;
  const tokenAIconAlt =
    getContentText(tokenAContent, ["icon_alt", "alt"]) ??
    defaultTokenA.icon_alt;

  const tokenBName =
    getContentText(tokenBContent, ["name", "title"]) ?? defaultTokenB.name;
  const tokenBTagline =
    getContentText(tokenBContent, ["tagline", "subtitle"]) ??
    defaultTokenB.tagline;
  const tokenBSupplyLabel =
    getContentText(tokenBContent, ["supply_label", "supplyLabel"]) ??
    defaultTokenB.supply_label;
  const tokenBSupply =
    getContentText(tokenBContent, ["supply", "total_supply", "totalSupply"]) ??
    defaultTokenB.supply;
  const tokenBIcon =
    getContentText(tokenBContent, [
      "icon_image",
      "icon",
      "icon_url",
      "image",
    ]) ?? defaultTokenB.icon_image;
  const tokenBIconAlt =
    getContentText(tokenBContent, ["icon_alt", "alt"]) ??
    defaultTokenB.icon_alt;

  const tokenAFeatures =
    getContentArray<FeatureItem>(tokenAContent, [
      "features",
      "items",
      "utilities",
    ]) ??
    getContentArray<FeatureItem>(content, [
      "token_a_features",
      "troy_features",
      "token1_features",
    ]) ??
    defaultTokenA.features;

  const tokenBFeatures =
    getContentArray<FeatureItem>(tokenBContent, [
      "features",
      "items",
      "utilities",
    ]) ??
    getContentArray<FeatureItem>(content, [
      "token_b_features",
      "vindex_features",
      "token2_features",
    ]) ??
    defaultTokenB.features;

  const tokenBNoteTitle =
    getContentText(tokenBContent, ["note_title", "footer_title"]) ??
    defaultTokenB.note_title;
  const tokenBNoteBody =
    getContentText(tokenBContent, ["note_body", "footer_body"]) ??
    defaultTokenB.note_body;
  return (
    <section id="ecosystem" className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15),transparent_60%)]" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-yellow-500/10 blur-3xl rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          {headingFull ? (
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              {headingFull}
            </h2>
          ) : (
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              {headingPrefix}{" "}
              <span className="bg-gradient-to-r from-primary to-[#fee372] bg-clip-text text-transparent">
                {headingHighlight}
              </span>{" "}
              {headingSuffix}
            </h2>
          )}
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {subheadingText ??
              "Uniting utility and governance. Power is vested in the community. Troyvest — where the community is the nexus of utility and governance."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* TROY Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-10 rounded-2xl hover:border-primary/50 transition-all shadow-[0_0_30px_-10px_rgba(0,255,255,0.2)]"> */}
            <Card className="h-full flex flex-col bg-white/5 backdrop-blur-xl border-white/10 p-10 rounded-2xl hover:border-primary/50 transition-all shadow-[0_0_30px_-10px_rgba(0,255,255,0.2)]">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  {/* <Coins className="w-10 h-10 text-white" /> */}
                  <img src={tokenAIcon} alt={tokenAIconAlt} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">
                    {tokenAName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tokenATagline}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm">
                {tokenASupplyLabel}
              </p>
              <p className="text-2xl font-bold text-white mb-8">
                {tokenASupply}
              </p>

              <div className="space-y-4">
                {tokenAFeatures.map((item, i) => {
                  const Icon = resolveIcon(
                    item.icon,
                    defaultTokenA.features[i]?.icon ?? Coins
                  );
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-cyan-400 mt-1" />
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Midas Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* <Card className="bg-white/5 backdrop-blur-xl border-yellow-500/30 p-10 rounded-2xl shadow-[0_0_40px_-10px_rgba(255,215,0,0.3)] hover:border-[#fee372]/60 transition-all"> */}
            <Card className="h-full flex flex-col bg-white/5 backdrop-blur-xl border-white/10 p-10 rounded-2xl hover:border-primary/50 transition-all shadow-[0_0_30px_-10px_rgba(0,255,255,0.2)]">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#fee372] to-[#fee372] flex items-center justify-center shadow-yellow-500/40 shadow-lg">
                  {/* <Key className="w-10 h-10 text-black" /> */}
                  <img src={tokenBIcon} alt={tokenBIconAlt} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-[#fee372] to-[#fee372] bg-clip-text text-transparent">
                    {tokenBName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{tokenBTagline}</p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm">
                {tokenBSupplyLabel}
              </p>
              <p className="text-2xl font-bold text-white mb-8">
                {tokenBSupply}
              </p>

              <div className="space-y-4">
                {tokenBFeatures.map((item, i) => {
                  const Icon = resolveIcon(
                    item.icon,
                    defaultTokenB.features[i]?.icon ?? Vote
                  );
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-[#fee372] mt-1" />
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-5 mt-8 rounded-xl border border-yellow-500/30 bg-yellow-500/10">
                <h5 className="font-semibold mb-2 text-[#fee372]">
                  {tokenBNoteTitle}
                </h5>
                <p className="text-sm text-muted-foreground">
                  {tokenBNoteBody}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TokenEcosystemSection;
