import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DocsSection } from "./sections/DocsSection";
import { BlogIndex } from "./pages/BlogIndex";
import { BlogPost } from "./pages/BlogPost";
import { Page } from "./pages/Page"; // NEW
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
export type InitialData = any;

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
  });
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />

      {/* DB-backed static pages */}
      <Route path="/faq" element={<Page slug="faq" />} />
      <Route path="/terms" element={<Page slug="terms" />} />
      <Route path="/community" element={<Page slug="community" />} />
      <Route path="/privacy" element={<Page slug="privacy" />} />
      <Route path="/compliance" element={<Page slug="compliance" />} />

      <Route path="/documents" element={<DocsSection />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<BlogPost />} />

      {/* catch-all LAST */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const qc = createQueryClient();

  return (
    <QueryClientProvider client={qc}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}


/** ✅ ADD THIS DEFAULT EXPORT **/
export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppShell>
          <AppRoutes />
        </AppShell>
      </BrowserRouter>
    </HelmetProvider>
  );
}