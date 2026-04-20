import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "p8fa55hl",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-04-20",
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Fetch helper
export async function getBlogPosts() {
  const query = `*[_type == "post"] {
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    "authorName": author->name,
    "categories": categories[]->title
  } | order(publishedAt desc)`;
  return await sanityClient.fetch(query);
}

export async function getBlogPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    "authorName": author->name,
    "categories": categories[]->title
  }`;
  return await sanityClient.fetch(query, { slug });
}
