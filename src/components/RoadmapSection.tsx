import { Card } from "@/components/ui/card";
import { Rocket, Database, Users, Globe } from "lucide-react";

const RoadmapSection = () => {
  const phases = [
    {
      phase: "Phase 1",
      title: "Launch",
      icon: Rocket,
      items: [
        "TROY Presale Launch",
        "Security Audits",
        "Staking/Farming dApp Launch",
        "PancakeSwap Listing & Liquidity Lock",
      ],
    },
    {
      phase: "Phase 2",
      title: "Ecosystem",
      icon: Database,
      items: [
        "Launch Lending/Borrowing Protocol",
        "v1 Decentralized Asset Insurance",
        "Community Growth Initiatives",
      ],
    },
    {
      phase: "Phase 3",
      title: "Governance",
      icon: Users,
      items: [
        "Midas (MDS) Token Launch",
        '"Governing Airdrop" to TROY holders',
        "Troyvest DAO v1",
      ],
    },
    {
      phase: "Phase 4",
      title: "Expansion",
      icon: Globe,
      items: [
        "First Midas DAO Treasury Vote",
        "Real-World Insurance Launch",
        "Troyvest DEX Development",
      ],
    },
  ];

  return (
    <section id="roadmap" className="py-28 relative overflow-hidden bg-black">
      {/* Gold Nebula Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[70vw] h-[50vh] bg-[radial-gradient(circle_at_top,rgba(210,180,70,0.4),rgba(0,0,0,0))] blur-3xl opacity-80"></div>
        <div className="absolute top-0 right-0 w-[60vw] h-[55vh] bg-[radial-gradient(circle_at_top,rgba(255,225,130,0.3),rgba(0,0,0,0))] blur-3xl opacity-60"></div>
      </div>

      {/* Stars Layer */}
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-20 mix-blend-screen pointer-events-none"></div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-[#DDC770]">
            Roadmap
          </h2>
          <p className="text-muted-foreground text-lg">
            The journey to full community-driven decentralization
          </p>
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-[2px] bg-gradient-to-b from-[#DDC770]/60 via-[#DDC770]/40 to-transparent"></div>

          <div className="space-y-16">
            {phases.map((phase, index) => (
              <div
                key={index}
                className={`flex items-center gap-10 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                  }`}
                >
                  <Card className="p-8 bg-white/5 backdrop-blur-xl border border-yellow-600/30 shadow-[0_0_40px_-5px_rgba(255,215,0,.2)] hover:shadow-[0_0_60px_-5px_rgba(255,215,0,.4)] transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#DDC770] to-[#DDC770] flex items-center justify-center shadow-[0_0_25px_rgba(255,215,0,.7)]">
                        <phase.icon className="w-7 h-7 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {phase.phase}
                        </p>
                        <h3 className="text-2xl font-bold text-white">
                          {phase.title}
                        </h3>
                      </div>
                    </div>

                    <ul className="space-y-2 text-muted-foreground">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="text-[#DDC770]">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                {/* Gold Dot */}
                <div className="hidden lg:flex w-8 h-8 rounded-full bg-[#DDC770] shadow-[0_0_25px_rgba(255,215,0,0.8)]"></div>

                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
