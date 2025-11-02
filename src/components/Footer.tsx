import { MessageCircle, Twitter, Users } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* ✅ Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.15)_0%,_rgba(0,0,0,1)_70%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-black"></div>

      {/* ✅ Neon grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.12]"></div>

      {/* ✅ Glow edges */}
      <div className="absolute top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>
      <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>

      <div className="container mx-auto px-6 py-28 relative z-10 text-center">
        {/* Brand */}
        <h3 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,255,255,0.7)] tracking-wide">
          TROYVEST
        </h3>

        <p className="text-sm text-gray-400 mt-3 max-w-md mx-auto">
          Empowering decentralized trust & accountability in the crypto
          ecosystem.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 my-10">
          {[
            { Icon: MessageCircle, label: "Telegram" },
            { Icon: Twitter, label: "Twitter" },
            { Icon: Users, label: "Discord" },
          ].map(({ Icon, label }, i) => (
            <a
              key={i}
              href="#"
              aria-label={label}
              className="w-14 h-14 flex items-center justify-center rounded-full
                border border-cyan-300/40 bg-white/5 backdrop-blur-md
                hover:bg-cyan-400/30 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,255,255,0.9)]
                transition-all duration-300 group"
            >
              <Icon className="w-6 h-6 text-white group-hover:scale-125 transition" />
            </a>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-10 text-sm mb-12">
          {[
            "Whitepaper",
            "FAQ",
            "Terms of Service",
            "Contact",
            "Community",
          ].map((item, i) => (
            <a
              key={i}
              href="#"
              className="text-gray-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © 2025 <span className="text-white font-semibold">Troyvest</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

// import { MessageCircle, Twitter, Users } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="border-t border-border py-12">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//           <div className="text-2xl font-bold gradient-text-primary">
//             Troyvest
//           </div>

//           <div className="flex items-center gap-6">
//             <a
//               href="#"
//               className="w-10 h-10 rounded-full bg-muted hover:bg-primary transition-colors flex items-center justify-center"
//               aria-label="Telegram"
//             >
//               <MessageCircle className="w-5 h-5" />
//             </a>
//             <a
//               href="#"
//               className="w-10 h-10 rounded-full bg-muted hover:bg-primary transition-colors flex items-center justify-center"
//               aria-label="Twitter"
//             >
//               <Twitter className="w-5 h-5" />
//             </a>
//             <a
//               href="#"
//               className="w-10 h-10 rounded-full bg-muted hover:bg-primary transition-colors flex items-center justify-center"
//               aria-label="Discord"
//             >
//               <Users className="w-5 h-5" />
//             </a>
//           </div>

//           <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
//             <a href="#" className="hover:text-foreground transition-colors">
//               Whitepaper
//             </a>
//             <a href="#" className="hover:text-foreground transition-colors">
//               FAQ
//             </a>
//             <a href="#" className="hover:text-foreground transition-colors">
//               Terms of Service
//             </a>
//             <a href="#" className="hover:text-foreground transition-colors">
//               Contact Us
//             </a>
//           </div>
//         </div>

//         <div className="text-center mt-8 text-sm text-muted-foreground">
//           © 2025 Troyvest. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
