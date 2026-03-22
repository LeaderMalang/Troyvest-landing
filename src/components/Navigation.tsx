"use client";

import { useState } from "react";
import { Menu, Wallet, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { title: "Ecosystem", href: "#ecosystem" },
  { title: "Tokenomics", href: "#tokenomics" },
  { title: "Roadmap", href: "#roadmap" },
  { title: "Invest in Trust", href: "#Trust" },
  { title: "Beyond Crypto", href: "#Currency" },
  { title: "DAO", href: "/dao" },
  { title: "Knowledgeable", href: "/blog" },
  { title: "Documents", href: "/documents?doc=troyvest-whitepaper" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-3 py-2 md:px-8">
        <a href="/" className="block">
          <div className="flex h-[100px] w-[120px] items-center space-x-2">
            <img src="/logo.png" alt="Vendex logo" className="object-contain" />

            <div className="flex flex-col items-center">
              <span className="text-sm font-extrabold text-[#ffea9a] drop-shadow-[0_0_8px_#ffdd77] drop-shadow-[0_0_15px_#ffcc55] drop-shadow-[0_0_25px_#ffba33]">
                Troyvest.io
              </span>
              <span className="mt-1 h-[3px] w-12 bg-[#ffcc55] shadow-[0_0_12px_#ffcc55]" />
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="group relative text-sm font-medium text-gray-300 transition hover:text-white"
            >
              {link.title}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-yellow-400 to-orange-500 transition-all group-hover:w-full" />
            </a>
          ))}
          <a href="https://presale.troyvest.io" target="_blank" rel="noopener noreferrer">
            <Button className="flex items-center gap-2 bg-gradient-to-r from-[#fee372] to-[#fee372] font-semibold text-black hover:shadow-[0_0_15px_rgba(255,199,0,0.7)]">
              <Wallet size={18} />
              Connect Wallet
            </Button>
          </a>
        </div>

        <button className="text-white md:hidden" onClick={() => setOpen((current) => !current)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="animate-in slide-in-from-top border-t border-white/10 bg-black/90 px-6 py-4 backdrop-blur-xl md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 font-medium text-gray-300 hover:text-white"
            >
              {link.title}
            </a>
          ))}
          <a href="https://presale.troyvest.io" target="_blank" rel="noopener noreferrer">
            <Button className="mt-3 flex w-full items-center gap-2 bg-gradient-to-r from-[#fee372] to-[#fee372] font-semibold text-black">
              <Wallet size={18} />
              Connect Wallet
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
}
