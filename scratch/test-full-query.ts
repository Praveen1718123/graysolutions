import { createClient } from '@sanity/client';
const client = createClient({
  projectId: 'p8fa55hl',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-04-20',
});

async function testFullQuery() {
  const query = `*[_type == "post"] {
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    "authorName": author->name,
    "categories": categories[]->title
  } | order(publishedAt desc)`;
  
  try {
    const data = await client.fetch(query);
    console.log("Data count:", data.length);
    console.log("First item:", JSON.stringify(data[0], null, 2));
  } catch (err) {
    console.error("Query error:", err);
  }
}

testFullQuery();
