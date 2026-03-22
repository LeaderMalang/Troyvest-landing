"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CreditCard } from "lucide-react";
import {
  getContentArray,
  getContentNumber,
  getContentObject,
  getContentText,
} from "@/lib/landing";

type PresaleSectionProps = {
  content?: any;
};

export default function PresaleSection({ content }: PresaleSectionProps) {
  const [amount, setAmount] = useState("");

  const headingFull = getContentText(content, ["heading", "title"]);
  const headingPrefix =
    getContentText(content, ["heading_prefix", "title_prefix"]) ?? "The";
  const headingHighlight =
    getContentText(content, ["heading_highlight", "title_highlight", "highlight"]) ??
    "TROY Presale";
  const headingSuffix =
    getContentText(content, ["heading_suffix", "title_suffix"]) ?? "is Expired";

  const subheadingHtml = getContentText(content, [
    "subheading_html",
    "description_html",
  ]);
  const subheadingText = getContentText(content, [
    "subheading",
    "description",
    "body",
  ]);

  const priceLabel =
    getContentText(content, ["price_label", "price_label_text"]) ??
    "Price per Token";
  const priceValue =
    getContentText(content, ["price_per_token", "price", "token_price"]) ??
    "$0.00080";

  const stakingLabel =
    getContentText(content, ["staking_label", "reward_label"]) ??
    "Staking Reward (60 days)";
  const stakingValue =
    getContentText(content, ["staking_reward", "reward", "apy"]) ??
    "15% ROI APY";

  const progressPercentRaw =
    getContentNumber(content, ["progress_percent", "progress", "progress_pct"]) ??
    100;
  const progressPercent = Math.min(100, Math.max(0, progressPercentRaw));
  const progressLabel =
    getContentText(content, ["progress_label"]) ??
    `Target Met - 100% Sold`;

  const paymentTokens =
    getContentArray<string>(content, [
      "payment_tokens",
      "tokens",
      "accepted_tokens",
    ]) ?? ["BNB", "USDT", "USDC"];

  const primaryCta = getContentObject<any>(content, [
    "primary_cta",
    "cta_primary",
    "cta",
  ]);
  const secondaryCta = getContentObject<any>(content, [
    "secondary_cta",
    "cta_secondary",
  ]);

  const primaryLabel =
    getContentText(primaryCta, ["label", "text", "title"]) ??
    getContentText(content, ["primary_cta_label", "cta_label"]) ??
    "Troyvest Now";
  const primaryHref =
    getContentText(primaryCta, ["href", "url", "link"]) ??
    getContentText(content, ["primary_cta_href", "cta_href", "cta_url"]) ??
    "https://presale.troyvest.io";

  const secondaryLabel =
    getContentText(secondaryCta, ["label", "text", "title"]) ??
    getContentText(content, ["secondary_cta_label"]) ??
    "Buy Crypto with Card";
  const secondaryHref =
    getContentText(secondaryCta, ["href", "url", "link"]) ??
    getContentText(content, ["secondary_cta_href", "secondary_cta_url"]) ??
    "https://presale.troyvest.io";

  const priceForCalc = (() => {
    const parsed =
      getContentNumber(content, [
        "price_per_token_value",
        "price_value",
        "price_value_usd",
      ]) ??
      Number(
        (priceValue || "")
          .replace(/[^\d.]/g, "")
          .trim()
      );
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
    return 0.008;
  })();
  const troyAmount = amount
    ? (parseFloat(amount) / priceForCalc).toFixed(2)
    : "0";

  return (
    <section id="presale" className="py-28 relative">
      {/* background deluxe grid + glow */}
      <div className="absolute inset-0 opacity-[0.08] bg-[url('https://images.unsplash.com/photo-1616400619175-5beda3aabb86?auto=format&fit=crop&q=60')] bg-cover pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black pointer-events-none"></div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-14">
          {headingFull ? (
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
              {headingFull}
            </h2>
          ) : (
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
              {headingPrefix}{" "}
              <span className="bg-gradient-to-r from-[#fee372] to-[#fee372] bg-clip-text text-transparent">
                {headingHighlight}
              </span>{" "}
              {headingSuffix}
            </h2>
          )}
          {subheadingHtml ? (
            <p
              className="text-lg text-gray-300 mt-3"
              dangerouslySetInnerHTML={{ __html: subheadingHtml }}
            />
          ) : subheadingText ? (
            <p className="text-lg text-gray-300 mt-3">{subheadingText}</p>
          ) : (
            <p className="text-lg text-gray-300 mt-3">
              Don't Just Invest !{" "}
              <span
                className="text-1xl font-extrabold text-[#ffea9a]
        drop-shadow-[0_0_8px_#ffdd77]
        drop-shadow-[0_0_15px_#ffcc55]
        drop-shadow-[0_0_25px_#ffba33]"
              >
                Troyvest
              </span>
              .<br />
              Future of finance is here!
            </p>
          )}
        </div>

        <Card className="max-w-4xl mx-auto p-10 border border-yellow-500/30 bg-black/40 backdrop-blur-xl shadow-[0_0_25px_rgba(255,200,0,0.15)] rounded-2xl">
          <Tabs defaultValue="stage1" className="w-full">
            <TabsList className="grid grid-cols-3 mb-10 bg-transparent border  border-yellow-500/30 rounded-xl overflow-hidden">
              {["Stage 1", "Stage 2", "Stage 3"].map((t, i) => (
                <TabsTrigger
                  key={t}
                  value={`stage${i + 1}`}
                  disabled={i !== 0}
                  className="  data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#fee372] data-[state=active]:to-[#fee372] data-[state=active]:text-black text-sm font-semibold py-3"
                >
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="stage1" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <p className="text-sm text-gray-400">{priceLabel}</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-[#fee372] to-[#fee372] text-transparent bg-clip-text mt-1">
                    {priceValue}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">{stakingLabel}</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-[#fee372] to-[#fee372] text-transparent bg-clip-text mt-1">
                    {stakingValue}
                  </p>
                </div>
              </div>

              {/* progress */}
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-[#fee372] font-semibold">
                    {progressLabel}
                  </span>
                </div>
                <Progress
                  value={progressPercent}
                  className="h-3 mt-1 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-[#fee372] [&>div]:to-[#fee372]"
                />
              </div>

              {/* Buy box */}
              <div className="space-y-6 p-7 rounded-xl bg-red-500/10 border border-red-500/40 backdrop-blur-sm">
                <div className="text-center space-y-3">
                  <div className="inline-block px-4 py-2 rounded-full bg-red-500/20 border border-red-500/40">
                    <p className="text-red-400 font-semibold text-sm">
                      ⏱️ Presale Expired
                    </p>
                  </div>
                  <p className="text-xl font-bold text-white">
                    Presale Successfully Completed!
                  </p>
                  <p className="text-gray-300 text-sm">
                    Target reached and presale period has ended. Thank you for your participation!
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
}
