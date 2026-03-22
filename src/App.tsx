import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DaoWeb3Provider } from "@/components/dao/DaoWeb3Provider";
import Contact from "@/pages/Contact";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClientOnly } from "@/components/ClientOnly";
import { BlogIndex } from "./pages/BlogIndex";
import { BlogPost } from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import { Page } from "./pages/Page";
import DaoDashboard from "./pages/dao/DaoDashboard";
import AdminPanel from "./pages/dao/AdminPanel";
import ProposalDetails from "./pages/dao/ProposalDetails";
import ProposalList from "./pages/dao/ProposalList";
import Index from "./pages/Index";
import { DocsSection } from "./sections/DocsSection";

export type InitialData = unknown;

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
  });
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/faq" element={<Page slug="faq" />} />
      <Route path="/terms" element={<Page slug="terms" />} />
      <Route path="/community" element={<Page slug="community" />} />
      <Route path="/privacy" element={<Page slug="privacy" />} />
      <Route path="/compliance" element={<Page slug="compliance" />} />
      <Route path="/documents" element={<DocsSection />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dao" element={<DaoDashboard />} />
      <Route path="/dao/proposals" element={<ProposalList />} />
      <Route path="/dao/proposals/:proposalId" element={<ProposalDetails />} />
      <Route path="/dao/admin" element={<AdminPanel />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <DaoWeb3Provider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ClientOnly>
            <Toaster />
            <Sonner />
          </ClientOnly>
          {children}
        </TooltipProvider>
      </QueryClientProvider>
    </DaoWeb3Provider>
  );
}

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
