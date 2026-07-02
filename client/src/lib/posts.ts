/**
 * Blog data access — reads from our own API (Postgres-backed), replacing the
 * previous Sanity integration. Public pages call these; if the API is empty or
 * unavailable the callers fall back to static teasers so the site never breaks.
 */

export type ApiPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string; // HTML
  coverImage: string | null;
  category: string;
  author: string;
  readTime: string | null;
  status: string;
  publishedAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export async function getPublishedPosts(): Promise<ApiPost[]> {
  const res = await fetch("/api/posts");
  if (!res.ok) throw new Error(`Failed to load posts (${res.status})`);
  return res.json();
}

export async function getPublishedPost(slug: string): Promise<ApiPost | null> {
  const res = await fetch(`/api/posts/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load post (${res.status})`);
  return res.json();
}
