import { API_BASE } from "@/lib/landing";

export type SocialLink = {
  label: string;
  href: string;
};

type SocialLinksResponse = {
  links?: SocialLink[];
  footer_id?: number;
  updated_at?: string;
};

export async function fetchSocialLinks(
  signal?: AbortSignal
): Promise<SocialLink[]> {
  const res = await fetch(`${API_BASE}/api/social-links`, { signal });
  if (!res.ok) {
    throw new Error(`Social links fetch failed: ${res.status}`);
  }
  const data = (await res.json()) as SocialLinksResponse;
  return Array.isArray(data?.links) ? data.links : [];
}

export async function updateSocialLinks(
  links: SocialLink[],
  token: string,
  signal?: AbortSignal
): Promise<SocialLinksResponse> {
  const res = await fetch(`${API_BASE}/api/admin/social-links`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ links }),
    signal,
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(text || `Social links update failed: ${res.status}`);
  }

  return text ? (JSON.parse(text) as SocialLinksResponse) : { links };
}
