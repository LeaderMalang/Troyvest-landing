import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section id="Currency" className="relative overflow-hidden py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0B0F1C] to-black"></div>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#11A8FF]/20 blur-[180px] rounded-full"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#FFD60A]/10 blur-[200px] rounded-full"></div>

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.25),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.04]"></div>

      <div className="container relative z-10 mx-auto px-6 text-center max-w-5xl">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-[1.2] tracking-tight">
          Don’t Just Invest in Crypto.
          <br />
          <span className="bg-gradient-to-r from-[#fee372] via-white to-[#00C6FF] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,214,10,0.7)]">
            Troyvest in Accountability.
          </span>
        </h2>
        <p className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
          Be a part of future of decentralized trust starts here. Join the TROY presale
          and become an early force behind a truly community-driven ecosystem.
        </p>
        <Button
          variant="hero"
          size="lg"
          className="text-lg px-12 py-7 h-auto font-semibold
          bg-gradient-to-r from-[#fee372] to-[#fee372]
          text-black rounded-2xl shadow-[0_0_40px_rgba(255,214,10,0.5)]
          hover:shadow-[0_0_70px_rgba(255,214,10,0.8)]
          transition-all duration-300"
        >
          Troyvest Now
          <ArrowRight className="w-6 h-6 ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default FinalCTASection;
