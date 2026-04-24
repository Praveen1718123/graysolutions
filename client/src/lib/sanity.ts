import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const PROJECT_ID = "p8fa55hl";
const DATASET = "production";

console.log("Initializing Sanity client with:", { projectId: PROJECT_ID, dataset: DATASET });

export const sanityClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: false, // Set to false to ensure we always get the latest content
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
