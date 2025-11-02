"use client";

import { Card } from "@/components/ui/card";
import { Coins, Key, PiggyBank, Shield, TrendingUp, Vote } from "lucide-react";
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
            <span className="bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
              Two Token
            </span>{" "}
            Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Utility meets Governance Full community-powered economy.
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
                  <Coins className="w-10 h-10 text-white" />
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
            {/* <Card className="bg-white/5 backdrop-blur-xl border-yellow-500/30 p-10 rounded-2xl shadow-[0_0_40px_-10px_rgba(255,215,0,0.3)] hover:border-yellow-400/60 transition-all"> */}
            <Card className="h-full flex flex-col bg-white/5 backdrop-blur-xl border-white/10 p-10 rounded-2xl hover:border-primary/50 transition-all shadow-[0_0_30px_-10px_rgba(0,255,255,0.2)]">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-yellow-500/40 shadow-lg">
                  <Key className="w-10 h-10 text-black" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
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
                    <item.icon className="w-5 h-5 text-yellow-400 mt-1" />
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
                <h5 className="font-semibold mb-2 text-yellow-400">
                  How to Get Midas
                </h5>
                <p className="text-sm text-muted-foreground">
                  MDS cannot be bought — it will be airdropped to top long-term
                  TROY stakers & holders after 8 months.
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

// import { Card } from "@/components/ui/card";
// import { Coins, Key, PiggyBank, Shield, TrendingUp, Vote } from "lucide-react";

// const TokenEcosystemSection = () => {
//   return (
//     <section id="ecosystem" className="py-20">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             The <span className="gradient-text-primary">Two-Token</span> Ecosystem
//           </h2>
//           <p className="text-xl text-muted-foreground">
//             Utility meets Governance. Power to the Community.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8">
//           <Card className="glass-card p-8 space-y-6">
//             <div className="flex items-center gap-4 mb-4">
//               <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center glow-primary">
//                 <Coins className="w-10 h-10 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-3xl font-bold gradient-text-primary">Troy (TROY)</h3>
//                 <p className="text-muted-foreground">The Engine</p>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <p className="text-sm text-muted-foreground">Total Supply</p>
//               <p className="text-2xl font-bold">888,888,888 TROY</p>
//             </div>

//             <div className="space-y-4 mt-6">
//               <h4 className="font-semibold text-lg">Use Cases:</h4>

//               <div className="flex items-start gap-3">
//                 <PiggyBank className="w-5 h-5 text-troy-cyan mt-1" />
//                 <div>
//                   <p className="font-semibold">Staking & Farming</p>
//                   <p className="text-sm text-muted-foreground">Earn passive yield from day one</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <Shield className="w-5 h-5 text-troy-cyan mt-1" />
//                 <div>
//                   <p className="font-semibold">Insurance</p>
//                   <p className="text-sm text-muted-foreground">Pay premiums for volatility & real-world insurance</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <TrendingUp className="w-5 h-5 text-troy-cyan mt-1" />
//                 <div>
//                   <p className="font-semibold">Lending & Borrowing</p>
//                   <p className="text-sm text-muted-foreground">Use as collateral or borrow against stablecoins</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <Coins className="w-5 h-5 text-troy-cyan mt-1" />
//                 <div>
//                   <p className="font-semibold">Trade</p>
//                   <p className="text-sm text-muted-foreground">Primary token for our future DEX</p>
//                 </div>
//               </div>
//             </div>
//           </Card>

//           <Card className="glass-card p-8 space-y-6 glow-gold">
//             <div className="flex items-center gap-4 mb-4">
//               <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center glow-gold">
//                 <Key className="w-10 h-10 text-black" />
//               </div>
//               <div>
//                 <h3 className="text-3xl font-bold gradient-text-gold">Midas (MDS)</h3>
//                 <p className="text-muted-foreground">The Key</p>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <p className="text-sm text-muted-foreground">Total Supply</p>
//               <p className="text-2xl font-bold">888,888 MDS</p>
//             </div>

//             <div className="space-y-4 mt-6">
//               <h4 className="font-semibold text-lg">Use Cases:</h4>

//               <div className="flex items-start gap-3">
//                 <Vote className="w-5 h-5 text-midas-gold mt-1" />
//                 <div>
//                   <p className="font-semibold">DAO Governance</p>
//                   <p className="text-sm text-muted-foreground">Propose and vote on all project decisions</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <Key className="w-5 h-5 text-midas-gold mt-1" />
//                 <div>
//                   <p className="font-semibold">Treasury Control</p>
//                   <p className="text-sm text-muted-foreground">The only token that can vote to release the 40% locked TROY treasury</p>
//                 </div>
//               </div>

//               <div className="p-4 rounded-lg bg-gradient-gold/10 border border-midas-gold/20 mt-6">
//                 <h5 className="font-semibold mb-2 gradient-text-gold">How to Get Midas:</h5>
//                 <p className="text-sm text-muted-foreground">
//                   Midas is not for sale. It will be airdropped in 8 months to the most
//                   loyal, long-term TROY stakers and holders.
//                 </p>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TokenEcosystemSection;
