import { Card } from "@/components/ui/card";
import { ShieldCheck, TrendingUp } from "lucide-react";
import { getContentText } from "@/lib/landing";

type ProblemSolutionSectionProps = {
  content?: any;
};

export default function ProblemSolutionSection({
  content,
}: ProblemSolutionSectionProps) {
  const headingFull = getContentText(content, ["heading", "title"]);
  const headingPrefix =
    getContentText(content, ["heading_prefix", "title_prefix"]) ?? "From";
  const headingHighlight =
    getContentText(content, ["heading_highlight", "highlight"]) ?? "Trust Me";
  const headingMiddle =
    getContentText(content, ["heading_middle", "title_middle"]) ?? "to";
  const headingHighlightSecondary =
    getContentText(content, ["heading_highlight_2", "highlight_2"]) ?? "Prove It";
  const headingSuffix =
    getContentText(content, ["heading_suffix", "title_suffix"]) ?? "Governance";

  const subheadingText = getContentText(content, [
    "subheading",
    "description",
    "body",
  ]);

  const problemTitle =
    getContentText(content, ["problem_title", "problem.title"]) ??
    "The “Trust Me” Problem now solved";
  const problemBody =
    getContentText(content, ["problem_body", "problem.body"]) ??
    "In today's market, Decentralization creates more trust than any centralized system.\n\nCrypto shouldn't run on faith but on transparent protocols, trustless execution, and community-driven, decentralized governance.";

  const solutionTitle =
    getContentText(content, ["solution_title", "solution.title"]) ??
    "The “Prove It” Solution";
  const solutionBody =
    getContentText(content, ["solution_body", "solution.body"]) ??
    "Troyvest eliminates blind trust by providing a decentralized 40% treasury locked for\n5 years untouched unless Vindex (VNDX)\nholders vote YES.\n\nNo delivery = no unlock.\nReal accountability.";
  return (
    // <section className="py-28 relative border bg-[#2A2104]">
    <section className="py-28 relative border-b border-t bg-gradient-to-b from-black via-[#2A2104] to-black">
      {/* background subtle pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle,rgba(255,215,0,0.25)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative">
        {/* Heading */}
        <div className="text-center mb-20">
          {headingFull ? (
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {headingFull}
            </h2>
          ) : (
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {headingPrefix}{" "}
              <span className="text-[#fee372]">{headingHighlight}</span>{" "}
              {headingMiddle}{" "}
              <span className="bg-gradient-to-r from-[#fee372] to-[#fee372] text-transparent bg-clip-text">
                {headingHighlightSecondary}
              </span>{" "}
              {headingSuffix}
            </h2>
          )}

          <p className="text-gray-300 text-lg mt-3 max-w-3xl mx-auto">
            {subheadingText ??
              "We're reinventing accountability in crypto. No promises only on chain proof."}
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Problem */}
          <Card className="p-10 border border-[#fee372]/30 bg-black/40 backdrop-blur-xl rounded-2xl hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,200,0,0.25)]">
            <div className="w-16 h-16 rounded-full bg-[#fee372]/15 flex items-center justify-center border border-[#fee372]/50 mb-6">
              <TrendingUp className="w-8 h-8 text-[#fee372]" />
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">
              {problemTitle}
            </h3>

            <p className="text-gray-400 leading-relaxed whitespace-pre-line">
              {problemBody}
            </p>
          </Card>

          {/* Solution */}
          <Card className="p-10 border border-yellow-500/40 bg-black/50 backdrop-blur-xl rounded-2xl hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,200,0,0.25)]">
            <div className="w-16 h-16 rounded-full bg-yellow-400/15 flex items-center justify-center border border-yellow-400/50 mb-6">
              <ShieldCheck className="w-8 h-8 text-[#fee372]" />
            </div>

            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-[#fee372] to-orange-400 text-transparent bg-clip-text mb-4">
              {solutionTitle}
            </h3>

            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {solutionBody}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
