import { getPageData } from '@/lib/strapi'; // Using the import alias '@/'
import BlockRenderer from '@/components/blocks/BlockRenderer'; // Import the renderer

export default function AboutPage() {
  // Fetch data for the 'about' page slug
  // This happens on the server because this is a Server Component by default
  const pageData = getPageData('about');

  // Handle cases where page data might not be found
  if (!pageData) {
    // You might want to render a proper 404 page here later
    return <div>Error: About page data not found.</div>;
  }

  // No need to log here anymore unless debugging
  // console.log('About Page Blocks:', JSON.stringify(pageData.blocks, null, 2));

  // Basic rendering - just the title for now
  return (
    <main className="container mx-auto p-4">
      {' '}
      {/* Basic container and padding */}
      {/* You might want a dedicated banner component instead of just h1 */}
      {/* <h1 className="text-3xl font-bold mb-4">{pageData.title}</h1> */}
      {/* Map over the blocks and render each one using BlockRenderer */}
      {pageData.blocks && pageData.blocks.length > 0 ? (
        pageData.blocks.map((block: any, index: number) => (
          // Use a unique key for each block, combining typename and index
          <BlockRenderer key={`${block.__typename}-${index}`} block={block} />
        ))
      ) : (
        <p>No content blocks found for this page.</p>
      )}
    </main>
  );
}

// Optional: Add metadata generation based on SEO fields
// export async function generateMetadata() {
//   const pageData = getPageData('about');
//   if (!pageData || !pageData.seo) {
//     return { title: 'About Us' }; // Default title
//   }
//   return {
//     title: pageData.seo.metaTitle || 'About Us',
//     description: pageData.seo.metaDescription || '',
//     // Add other meta tags as needed (keywords, etc.)
//   };
// }
