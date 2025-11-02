"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-tokens.jpg";

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
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
                Or in its Community?
              </span>
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
              Troyvest is the world’s first DeFi ecosystem powered by a{" "}
              <span className="text-yellow-300 font-semibold">
                Decentralized Treasury
              </span>
              .
              <br />
              <br />
              <span className="font-semibold text-white">Troy (TROY)</span>
              high-utility token
              <br />
              <span className="font-semibold text-yellow-300">
                Midas (MDS)
              </span>{" "}
              governance token owned by the community.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="text-base font-semibold flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 hover:shadow-[0_0_25px_rgba(255,199,0,0.45)]">
                Join the TROY Presale
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                className="text-base border-yellow-400/40 text-yellow-300 hover:bg-yellow-400/10"
              >
                Learn About Midas DAO
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative group">
            <img
              src={heroImage}
              alt="TROY & MIDAS Tokens"
              className="w-full rounded-2xl shadow-xl ring-1 ring-yellow-500/30 group-hover:scale-[1.02] transition-transform duration-500 animate-floating"
            />

            {/* Gold glow behind image */}
            <div className="absolute -inset-10 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
// import heroImage from "@/assets/hero-tokens.jpg";

// const HeroSection = () => {
//   return (
//     <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <div className="space-y-8">
//             <h1 className="text-5xl md:text-7xl font-bold leading-tight">
//               Investing in a Project?{" "}
//               <span className="gradient-text-primary">Or in its Community?</span>
//             </h1>

//             <p className="text-lg text-muted-foreground leading-relaxed">
//               Introducing Troyvest, the world's first DeFi ecosystem with a Decentralized Treasury.
//               We're launching <span className="text-troy-purple-light font-semibold">Troy (TROY)</span>,
//               a high-utility token where the 40% team-locked funds are controlled by{" "}
//               <span className="text-midas-gold-light font-semibold">Midas (MDS)</span>,
//               a governance token held by you.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button variant="hero" size="lg" className="text-base">
//                 Join the TROY Presale
//                 <ArrowRight className="w-5 h-5" />
//               </Button>
//               <Button variant="outline-light" size="lg" className="text-base">
//                 Learn About Midas DAO
//               </Button>
//             </div>
//           </div>

//           <div className="relative">
//             <img
//               src={heroImage}
//               alt="Troy and Midas tokens orbiting a secure decentralized treasury vault"
//               className="w-full rounded-2xl glow-primary"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
