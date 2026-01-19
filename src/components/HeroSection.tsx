"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
// import heroImage from "@/assets/hero-tokens.jpg";

export default function HeroSection() {
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
              Are You Investing in a Project
              <span className="block bg-gradient-to-r from-[#fee372] to-[#fee372] bg-clip-text text-transparent drop-shadow-lg">
                Or in its Community?
              </span>
            </h1>

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

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://presale.troyvest.io" target="_blank" rel="noopener noreferrer">
              <Button className="text-base text-black font-semibold flex items-center gap-2 bg-gradient-to-r from-[#fee372] via-[#fee372] to-[#fee372] hover:shadow-[0_0_25px_rgba(255,199,0,0.45)]">
               
                Join the TROY Presale
                <ArrowRight className="w-5 h-5" />
                
              </Button>
              </a> 
              <a href="/documents?doc=mds-whitepaper" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="text-base border-yellow-400/40 text-[#fee372] hover:bg-yellow-400/10"
              >
                Learn About Vindex DAO
              </Button>
              </a>
            </div>
          </div>

          {/* Hero Image rounded-2xl shadow-xl ring-1 ring-yellow-500/30 */}
          <div className="relative group">
            <img
              src={"/banner.png"}
              alt="TROY & Vindex Tokens"
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
