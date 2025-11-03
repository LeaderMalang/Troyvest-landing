import { Card } from "@/components/ui/card";
import { TrendingDown, ShieldCheck } from "lucide-react";

export default function ProblemSolutionSection() {
  return (
    // <section className="py-28 relative border bg-[#2A2104]">
    <section className="py-28 relative border-b border-t bg-gradient-to-b from-black via-[#2A2104] to-black">
      {/* background subtle pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle,rgba(255,215,0,0.25)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            From <span className="text-red-500">Trust Me</span> to{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
              Prove It
            </span>{" "}
            Governance
          </h2>

          <p className="text-gray-300 text-lg mt-3 max-w-3xl mx-auto">
            We're reinventing accountability in crypto. No promises — only
            on-chain proof.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Problem */}
          <Card className="p-10 border border-red-500/30 bg-black/40 backdrop-blur-xl rounded-2xl hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,50,50,0.25)]">
            <div className="w-16 h-16 rounded-full bg-red-500/15 flex items-center justify-center border border-red-500/50 mb-6">
              <TrendingDown className="w-8 h-8 text-red-400" />
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">
              The “Trust Me” Problem
            </h3>

            <p className="text-gray-400 leading-relaxed">
              In today's market, investors hope teams won’t disappear or
              mismanage funds. Teams hold 40% but give 0% proof.
              <br />
              <br />
              Crypto shouldn't run on faith.
            </p>
          </Card>

          {/* Solution */}
          <Card className="p-10 border border-yellow-500/40 bg-black/50 backdrop-blur-xl rounded-2xl hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,200,0,0.25)]">
            <div className="w-16 h-16 rounded-full bg-yellow-400/15 flex items-center justify-center border border-yellow-400/50 mb-6">
              <ShieldCheck className="w-8 h-8 text-yellow-300" />
            </div>

            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text mb-4">
              The “Prove It” Solution
            </h3>

            <p className="text-gray-300 leading-relaxed">
              We replaced trust with on-chain controls. 40% treasury locked for
              5 years untouched unless{" "}
              <span className="text-yellow-300 font-semibold">Midas (MDS)</span>{" "}
              holders vote YES.
              <br />
              <br />
              No delivery = no unlock.
              <br />
              Real accountability.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
