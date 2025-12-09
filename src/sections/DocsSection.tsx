import { useEffect, useState } from "react";
import { docs } from "../data/docs";
import { WidePageLayout } from "@/components/WidePageLayout";

export function DocsSection() {
  const [activeId, setActiveId] = useState(docs[0]?.id);
  const activeDoc = docs.find((d) => d.id === activeId);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const docParam = params.get("doc");
    if (docParam && docs.some((d) => d.id === docParam)) {
      setActiveId(docParam);
    }
  }, []);

  return (
    <WidePageLayout title="TroyVest Documentation">
      <div className="grid gap-6 lg:grid-cols-[300px,1fr] w-full">

        {/* Sidebar */}
        <div className="space-y-4 overflow-y-auto max-h-[75vh] pr-2">
          {docs.map((doc) => {
            const isActive = doc.id === activeId;
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => setActiveId(doc.id)}
                className={`w-full text-left rounded-2xl border px-5 py-4 transition
                  ${
                    isActive
                      ? "border-[#FEE372] bg-[#FEE372]/10 shadow-[0_0_25px_rgba(255,199,0,0.25)]"
                      : "border-[#1E293B] bg-[#020617] hover:border-[#FEE372]/60 hover:bg-white/5"
                  }
                `}
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-yellow-300/80">
                  {doc.tag}
                </div>
                <div className="mt-1 text-sm md:text-base font-semibold text-white">
                  {doc.title}
                </div>
                <div className="mt-1 text-xs text-gray-400">{doc.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* LINKS ONLY — NO PDF PREVIEW */}
        <div className="rounded-2xl border border-[#1E293B] bg-[#020617] shadow-[0_0_40px_rgba(0,0,0,0.45)] flex flex-col w-full h-[75vh] p-6">
          {activeDoc ? (
            <div className="space-y-3">
              <h3 className="text-white text-lg font-semibold">{activeDoc.title}</h3>

              <a
                href={activeDoc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[#FEE372] to-[#FACC15] px-4 py-2 
                text-sm font-semibold text-black hover:shadow-[0_0_18px_rgba(255,199,0,0.6)]"
              >
                💾 Open Document
              </a>

              <p className="text-gray-400 text-sm">
                (Knowledge is a trust — share it wisely.)
              </p>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
              Select a document to open.
            </div>
          )}
        </div>
      </div>
    </WidePageLayout>
  );
}
