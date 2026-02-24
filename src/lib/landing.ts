export const API_BASE =
  import.meta.env.VITE_API_BASE ?? "https://backend.troyvest.io";

export type LandingSection = {
  key?: string;
  label?: string;
  content?: any;
  sort_order?: number;
  updated_at?: string;
};

type LandingFullResponse = {
  sections?: Record<string, Omit<LandingSection, "key">>;
};

type LandingListResponse = {
  sections?: Array<LandingSection & { key: string }>;
};

export async function fetchLandingFull(
  signal?: AbortSignal
): Promise<Record<string, LandingSection>> {
  const res = await fetch(`${API_BASE}/api/landing/full`, { signal });
  if (!res.ok) {
    throw new Error(`Landing full fetch failed: ${res.status}`);
  }
  const data = (await res.json()) as LandingFullResponse;
  const sections = data?.sections ?? {};
  const map: Record<string, LandingSection> = {};
  for (const [key, value] of Object.entries(sections)) {
    map[key] = { key, ...(value as LandingSection) };
  }
  return map;
}

export async function fetchLanding(
  keys?: string[],
  signal?: AbortSignal
): Promise<LandingSection[]> {
  const query =
    keys && keys.length > 0
      ? `?keys=${encodeURIComponent(keys.join(","))}`
      : "";
  const res = await fetch(`${API_BASE}/api/landing${query}`, { signal });
  if (!res.ok) {
    throw new Error(`Landing list fetch failed: ${res.status}`);
  }
  const data = (await res.json()) as LandingListResponse;
  return data?.sections ?? [];
}

export async function fetchLandingSection(
  key: string,
  signal?: AbortSignal
): Promise<LandingSection | null> {
  const res = await fetch(`${API_BASE}/api/landing/${encodeURIComponent(key)}`, {
    signal,
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Landing section fetch failed: ${res.status}`);
  }
  return (await res.json()) as LandingSection;
}

export function getContentValue<T = any>(
  content: any,
  paths: string[]
): T | undefined {
  if (!content) return undefined;
  for (const path of paths) {
    let current: any = content;
    const parts = path.split(".");
    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = current[part];
      } else {
        current = undefined;
        break;
      }
    }
    if (current !== undefined && current !== null) {
      return current as T;
    }
  }
  return undefined;
}

export function getContentText(
  content: any,
  paths: string[],
  fallback?: string
): string | undefined {
  const value = getContentValue<any>(content, paths);
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed) return trimmed;
  }
  return fallback;
}

export function getContentNumber(
  content: any,
  paths: string[],
  fallback?: number
): number | undefined {
  const value = getContentValue<any>(content, paths);
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return fallback;
}

export function getContentArray<T = any>(
  content: any,
  paths: string[],
  fallback?: T[]
): T[] | undefined {
  const value = getContentValue<any>(content, paths);
  if (Array.isArray(value)) return value as T[];
  return fallback;
}

export function getContentObject<T extends Record<string, any> = any>(
  content: any,
  paths: string[],
  fallback?: T
): T | undefined {
  const value = getContentValue<any>(content, paths);
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as T;
  }
  return fallback;
}
