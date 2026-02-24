import { useEffect, useState } from "react";
import { fetchLandingFull, LandingSection } from "@/lib/landing";

export type LandingSectionsMap = Record<string, LandingSection>;

export function useLandingSections() {
  const [sections, setSections] = useState<LandingSectionsMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchLandingFull(controller.signal)
      .then((data) => setSections(data))
      .catch((err: any) => {
        if (err?.name !== "AbortError") {
          console.error(err);
          setError("Failed to load landing content");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { sections, loading, error };
}
