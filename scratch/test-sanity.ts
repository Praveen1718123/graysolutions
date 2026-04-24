import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "p8fa55hl",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-04-20",
});

async function testFetch() {
  try {
    console.log("Fetching posts...");
    const posts = await client.fetch('*[_type == "post"]');
    console.log("Posts count:", posts.length);
    console.log("Posts:", JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

testFetch();
