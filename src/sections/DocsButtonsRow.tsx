import { GradientButton } from "../components/GradientButton";

export function DocsButtonsRow() {
  return (
    <div className="flex flex-wrap gap-3 md:gap-4">

      {/* Read TROY Whitepaper */}
      <a
        href="/docs/TROYVEST WHITEPAPER (v4.1).pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GradientButton asChild>
          Read Whitepaper
        </GradientButton>
      </a>

      {/* TROY Tokenomics */}
      <a href="/documents?doc=troy-tokenomics">
        <GradientButton asChild>
          TROY Tokenomics
        </GradientButton>
      </a>

      {/* MDS Governance */}
      <a href="/documents?doc=mds-whitepaper">
        <GradientButton asChild>
          Vindex Governance
        </GradientButton>
      </a>

      {/* Full Roadmap */}
      <a href="/documents?doc=troy-roadmap">
        <GradientButton asChild>
          Full Roadmap 2025–2027
        </GradientButton>
      </a>

      {/* Audit Reports */}
      <a href="/documents?doc=audit-troy-token">
        <GradientButton asChild>
          Audit Reports (Certik / Peckshield)
        </GradientButton>
      </a>
    </div>
  );
}
