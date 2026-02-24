import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { getContentArray, getContentText } from "@/lib/landing";

type TokenomicsSectionProps = {
  content?: any;
};

const TokenomicsSection = ({ content }: TokenomicsSectionProps) => {
  const heading =
    getContentText(content, ["heading", "title"]) ??
    "TROY: Transparent & Fair Distribution";
  const subheading =
    getContentText(content, ["subheading", "description", "body"]) ??
    "A fair ecosystem built for long-term community trust & real value.";

  const headingParts = heading.split(":");
  const headingLead = headingParts.length > 1 ? headingParts[0] : null;
  const headingRest =
    headingParts.length > 1 ? headingParts.slice(1).join(":").trim() : heading;

  const distribution =
    getContentArray<{ title: string; description?: string }>(content, [
      "distribution",
      "breakdown",
      "items",
    ]) ?? [
      {
        title: "40% — Public Sale",
        description: "Distributed to early believers through multi-stage presale.",
      },
      {
        title: "20% — Liquidity Pool",
        description: "Locked DEX liquidity to ensure price stability & fair trading.",
      },
      {
        title: "40% — DAO-Controlled Treasury",
        description: "Locked 5 years — unlocked only by Midas governance vote.",
      },
    ];

  const contractHref =
    getContentText(content, ["contract_url", "contract_href"]) ??
    "https://bscscan.com/address/0xe15c4b65B5bB9ca62A4A96A78F11D4200504B4AC";
  const lockHref =
    getContentText(content, ["lock_url", "lock_href"]) ??
    "https://bscscan.com/address/0x84fF5c0605d512ed6aC1B2c828710FF075C553F1";
  return (
    // <section className="py-28 relative border-b border-t bg-gradient-to-b from-black via-[#2A2104] to-black">

    <section id="tokenomics" className="py-24 relative overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-800/10 to-black/30 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            {headingLead ? (
              <>
                <span className="gradient-text-primary">{headingLead}:</span>{" "}
                {headingRest}
              </>
            ) : (
              heading
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subheading}
          </p>
        </div>

        <Card className="relative border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_-10px_rgba(0,255,255,0.25)] hover:shadow-[0_0_80px_-10px_rgba(0,255,255,0.35)] transition-all p-10 max-w-5xl mx-auto rounded-3xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Neon Donut Chart */}
            <div className="relative flex justify-center">
              <svg viewBox="0 0 400 400" className="w-full max-w-xs">
               
                <circle
                  cx="200"
                  cy="200"
                  r="130"
                  fill="none"
                  stroke="hsl(263 70% 50%)"
                  strokeWidth="55"
                  strokeDasharray="272 544.81"
                  transform="rotate(-90 200 200)"
                  className="drop-shadow-[0_0_30px_hsl(263_80%_60%/0.7)]"
                />

               
                <circle
                  cx="200"
                  cy="200"
                  r="130"
                  fill="none"
                  stroke="hsl(189 94% 43%)"
                  strokeWidth="55"
                  strokeDasharray="136 680.81"
                  strokeDashoffset="-272"
                  transform="rotate(-90 200 200)"
                  className="drop-shadow-[0_0_30px_hsl(189_90%_50%/0.7)]"
                />

                
                <circle
                  cx="200"
                  cy="200"
                  r="130"
                  fill="none"
                  stroke="hsl(45 93% 47%)"
                  strokeWidth="55"
                  strokeDasharray="408.81 408"
                  strokeDashoffset="-408"
                  transform="rotate(-90 200 200)"
                  className="drop-shadow-[0_0_30px_hsl(45_100%_50%/0.7)]"
                />

                
                <defs>
                  <clipPath id="circleClip">
                    <circle cx="200" cy="200" r="50" />
                  </clipPath>
                </defs>

                <image
                  href="/banner.png"
                  x="150"
                  y="150"
                  width="100"
                  height="100"
                  clipPath="url(#circleClip)"
                />
              </svg>

            </div>

            {/* Tokenomics Breakdown */}
            <div className="space-y-8">
              {distribution.map((item, idx) => {
                const dotClasses = [
                  "w-7 h-7 rounded-full bg-gradient-primary glow-primary shrink-0 mt-1",
                  "w-7 h-7 rounded-full bg-gradient-accent shrink-0 mt-1",
                  "w-7 h-7 rounded-full bg-gradient-gold glow-gold shrink-0 mt-1",
                ];
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className={dotClasses[idx % dotClasses.length]} />
                    <div>
                      <h4 className="text-xl font-semibold">{item.title}</h4>
                      {item.description && (
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="grid grid-cols-2 gap-5 pt-4">
                <a href={contractHref} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline-light"
                  className="w-full flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Contract
                </Button>
                </a>
                <a href={lockHref} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline-light"
                  className="w-full flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Lock Proof
                </Button>
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TokenomicsSection;
