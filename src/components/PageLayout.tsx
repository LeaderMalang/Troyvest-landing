import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import Navigation from "@/components/Navigation";

export function PageLayout({ title, children }: any) {
  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <Background3D />

      {/* Navigation */}
      <Navigation />

      {/* Main content wrapper */}
      <div
        className="
          relative 
          max-w-4xl 
          mx-auto
          px-6 
          pt-32   /* 👈 fixes navigation overlap */
          pb-24   /* 👈 adds space above footer */
        "
      >
        {/* Page Title */}
        <h1
          className="
            text-3xl 
            md:text-4xl 
            font-bold 
            text-white 
            mb-10
            drop-shadow-[0_0_12px_#ffcc55]
            text-center  /* 👈 center align title */
          "
        >
          {title}
        </h1>

        {/* Page Content */}
        <div className="space-y-6 text-sm md:text-base leading-relaxed text-gray-300">
          {children}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
