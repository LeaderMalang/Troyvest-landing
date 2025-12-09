"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Menu, X } from "lucide-react";
import { title } from "process";

const navLinks = [
  { title: "Ecosystem", href: "#ecosystem" },
  { title: "Tokenomics", href: "#tokenomics" },
  { title: "Roadmap", href: "#roadmap" },
  { title: "Invest in Trust", href: "#Trust" },
  { title: "Beyond Crypto", href: "#Currency" },
  { title: "Knowledgeable", href: "/blog" },
  {title: "Documents", href: "/documents?doc=troyvest-whitepaper" }
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-2 px-3 md:px-8 ">
        {/* Logo */}
        <a href="/" className="block">
          <div className="flex items-center space-x-2 w-[120px] h-[100px]">

            <img
              src="/troyvest-logo.png"
              alt="Logo"
              className="object-contain"
            />

            <div className="flex flex-col items-center">
              <span className="text-sm font-extrabold text-[#ffea9a]
        drop-shadow-[0_0_8px_#ffdd77]
        drop-shadow-[0_0_15px_#ffcc55]
        drop-shadow-[0_0_25px_#ffba33]">
                Troyvest.io
              </span>

              <span className="w-12 h-[3px] bg-[#ffcc55] mt-1
        shadow-[0_0_12px_#ffcc55]"></span>
            </div>
          </div>
        </a>


        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="relative text-sm text-gray-300 hover:text-white transition font-medium group"
            >
              {link.title}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a href="https://presale.troyvest.io" target="_blank" rel="noopener noreferrer">
            <Button className="font-semibold flex items-center gap-2 bg-gradient-to-r from-[#fee372] to-[#fee372] text-black hover:shadow-[0_0_15px_rgba(255,199,0,0.7)]">
              <Wallet size={18} />
              Connect Wallet
            </Button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 animate-in slide-in-from-top">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-gray-300 hover:text-white font-medium"
            >
              {link.title}
            </a>
          ))}
          <a href="https://presale.troyvest.io" target="_blank" rel="noopener noreferrer">
            <Button className="w-full mt-3 bg-gradient-to-r from-[#fee372] to-[#fee372] text-black font-semibold flex items-center gap-2">
              <Wallet size={18} />
              Connect Wallet
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
}
