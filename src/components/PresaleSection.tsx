"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CreditCard } from "lucide-react";

export default function PresaleSection() {
  const [amount, setAmount] = useState("");
  const troyAmount = amount ? (parseFloat(amount) / 0.008).toFixed(2) : "0";

  return (
    <section id="presale" className="py-28 relative">
      {/* background deluxe grid + glow */}
      <div className="absolute inset-0 opacity-[0.08] bg-[url('https://images.unsplash.com/photo-1616400619175-5beda3aabb86?auto=format&fit=crop&q=60')] bg-cover pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black pointer-events-none"></div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-14">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
            The{" "}
            <span className="bg-gradient-to-r from-[#fee372] to-[#fee372] bg-clip-text text-transparent">
              TROY Presale
            </span>{" "}
            is Live
          </h2>
          <p className="text-lg text-gray-300 mt-3">
            
            Don't Just Invest ! <span className="text-1xl font-extrabold text-[#ffea9a]
        drop-shadow-[0_0_8px_#ffdd77]
        drop-shadow-[0_0_15px_#ffcc55]
        drop-shadow-[0_0_25px_#ffba33]">
              Troyvest
            </span>.<br/>Future of finance is here!
          </p>
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
                  <p className="text-sm text-gray-400">Price per Token</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-[#fee372] to-[#fee372] text-transparent bg-clip-text mt-1">
                    $0.00080
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Staking Reward (60 days)
                  </p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-[#fee372] to-[#fee372] text-transparent bg-clip-text mt-1">
                    15% ROI APY
                  </p>
                </div>
              </div>

              {/* progress */}
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-[#fee372] font-semibold">65% Sold</span>
                </div>
                <Progress
                  value={65}
                  className="h-3 mt-1 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-[#fee372] [&>div]:to-[#fee372]"
                />
              </div>

              {/* Buy box */}
              <div className="space-y-6 p-7 rounded-xl bg-white/5 border border-yellow-500/20 backdrop-blur-sm">
                {/* Token options */}
                <div className="flex gap-3">
                  {["BNB", "USDT", "USDC"].map((t) => (
                    <Button
                      key={t}
                      variant="outline"
                      size="sm"
                      className="font-medium border-yellow-400/40 hover:bg-yellow-400/15 text-[#fee372]"
                    >
                      {t}
                    </Button>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    Amount You Pay (BNB)
                  </label>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg bg-black/40 border-yellow-500/20 focus:border-[#fee372]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    You Receive (TROY)
                  </label>
                  <div className="p-4 rounded-lg bg-black/60 border border-yellow-500/20">
                    <p className="text-xl font-semibold text-[#fee372]">
                      {troyAmount} TROY
                    </p>
                  </div>
                </div>
                  <a href="https://presale.troyvest.io" className="block my-3" target="_blank" rel="noopener noreferrer">
                <Button className="w-full py-6 text-lg text-black font-semibold bg-gradient-to-r from-[#fee372] via-[#fee372] to-[#fee372] hover:shadow-[0_0_25px_rgba(255,199,0,0.45)]">
                  Troyvest Now
                </Button>
                </a>
                <a href="https://presale.troyvest.io" className="block my-3" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-sm text-gray-300 hover:text-black"
                >
                  <CreditCard className="w-4 h-4" />
                  Buy Crypto with Card
                </Button>
                </a>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
}
