import { MessageCircle, Twitter, Users, FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, Twitch, createLucideIcon, TwitchIcon, Link } from "lucide-react";

const Footer = () => {
  const TikTokIcon = createLucideIcon("TikTokIcon", [
    // main note shape inspired by TikTok logo, simplified for outline style
    [
      "path",
      {
        d: "M14 3v3.5A4.5 4.5 0 0 1 9.5 11H9v3.5a3.5 3.5 0 1 1-3.5-3.5H6A4.5 4.5 0 0 0 10 6.5V3h4z",
        key: "tiktok-path",
      },
    ],
  ]);
  const footerLinks = [
    { label: "Whitepaper", link: "/documents?doc=troy-whitepaper" },
    { label: "FAQ", link: "/faq" },
    { label: "Terms of Service", link: "/terms" },
    { label: "Contact", link: "#" },
    { label: "Community", link: "https://t.me/troyvest" },
    { label: "Privacy Policy", link: "/privacy" },
    { label: "Compliance", link: "/compliance" },
  ];

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
            { Icon: MessageCircle, label: "Telegram", link: "https://x.com/Troyvest_Ofc" },
            { Icon: Twitter, label: "Twitter", link: "https://x.com/Troyvest_Ofc" },
            { Icon: Users, label: "Discord", link: "https://discord.com/channels/1429821279560798220" },
            { Icon: FacebookIcon, label: "Facebook", link: "https://www.facebook.com/profile.php?id=61582936401854" },
            { Icon: InstagramIcon, label: "instagram", link: "https://www.instagram.com/troyvest_official/" },
            { Icon: TikTokIcon, label: "TikTok", link: "https://www.tiktok.com/@troyvest_official" },
            { Icon: YoutubeIcon, label: "youtube", link: "https://www.youtube.com/@Troyvest_official" },
            { Icon: TwitchIcon, label: "Discord", link: "https://www.twitch.tv/troyvest_official" },
            { Icon: LinkedinIcon, label: "Linkedin", link: "#" },
          ].map(({ Icon, label, link }, i) => (
            <a
              key={i}
              href={link}
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
          {footerLinks.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all"
            >
              {item.label}
            </a>
          ))}
        </div>


        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © 2025 <span className="text-white font-semibold">Troyvest</span>. All
          rights reserved.
        </p>
        <p className="text-[0.5rem] text-gray-500">⚠️ TroyVest Disclaimer
          Investing in virtual assets carries significant risks, including but not limited to, volatility, technological vulnerabilities, and the potential for regulatory changes. You can lose all your funds.
          TroyVest is a deFi platform, and is not an investment advisor, financial institution, or broker-dealer.
          Data and information available on this website, including content regarding our services, products, and news updates, are strictly for informational and presentation purposes only. This information is NOT and should not be construed as any kind of financial, investment, legal, tax, or professional advice.
          Before involving yourself in any kind of financial decisions, you are strongly encouraged to DYOR (Do Your Own Research) and consult with a qualified financial professional..</p>
      </div>
    </footer>
  );
};

export default Footer;
