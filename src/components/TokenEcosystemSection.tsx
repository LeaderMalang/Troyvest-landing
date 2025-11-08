"use client";

import { Card } from "@/components/ui/card";
import { Coins, Key, PiggyBank, Shield, TrendingUp, Vote,CreditCard,Building   } from "lucide-react";
import { motion } from "framer-motion";

const TokenEcosystemSection = () => {
  return (
    <section id="ecosystem" className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15),transparent_60%)]" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-yellow-500/10 blur-3xl rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            The{" "}
            <span className="bg-gradient-to-r from-primary to-[#fee372] bg-clip-text text-transparent">
              Two Token
            </span>{" "}
            Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Uniting utility and governance. Power is vested in the community. Troyvest — where the community is the nexus of utility and governance.
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
                  <img src="troy-solo-logo .png" alt="logo" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">Troy (TROY)</h3>
                  <p className="text-sm text-muted-foreground">The Engine</p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm">Total Supply</p>
              <p className="text-2xl font-bold text-white mb-8">
                888,888,888 TROY
              </p>

              <div className="space-y-4">
                {[
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
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-cyan-400 mt-1" />
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
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
                  <img src="Midas-logo.png" alt="logo" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-[#fee372] to-[#fee372] bg-clip-text text-transparent">
                    Midas (MDS)
                  </h3>
                  <p className="text-sm text-muted-foreground">The Key</p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm">Total Supply</p>
              <p className="text-2xl font-bold text-white mb-8">888,888 MDS</p>

              <div className="space-y-4">
                {[
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
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-[#fee372] mt-1" />
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 mt-8 rounded-xl border border-yellow-500/30 bg-yellow-500/10">
                <h5 className="font-semibold mb-2 text-[#fee372]">
                  How to Get Midas
                </h5>
                <p className="text-sm text-muted-foreground">
                  MDS is a hybrid — airdropped to top long-term supporters, and available for purchase by TROY stakers and holders after 8 months.
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
