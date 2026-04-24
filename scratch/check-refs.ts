import { createClient } from '@sanity/client';
const client = createClient({
  projectId: 'p8fa55hl',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-04-20',
});

async function check() {
  const authors = await client.fetch('*[_type == "author"]');
  console.log("Authors:", JSON.stringify(authors, null, 2));
  const categories = await client.fetch('*[_type == "category"]');
  console.log("Categories:", JSON.stringify(categories, null, 2));
}

check();
