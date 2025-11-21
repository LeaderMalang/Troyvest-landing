import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import Navigation from "@/components/Navigation";

export function WidePageLayout({ title, children }: any) {
  return (
    <div className="min-h-screen relative w-full">
      <Background3D />
      <Navigation />

      {/* Full-screen wrapper */}
      <div className="relative w-full px-4 md:px-10 pt-32 pb-24">
        <h1
          className="
            text-3xl md:text-4xl font-bold text-white mb-10
            drop-shadow-[0_0_12px_#ffcc55] text-center
          "
        >
          {title}
        </h1>

        {/* Children go full width */}
        <div className="w-full">{children}</div>
      </div>

      <Footer />
    </div>
  );
}
