import { getPageData } from '@/lib/strapi'; // Import the data fetching function
import BlockRenderer from '@/components/blocks/BlockRenderer'; // Import the main renderer

export default function SolutionsPage() {
  // Fetch data for the 'solutions' page slug
  const pageData = getPageData('solutions');

  // Handle cases where page data might not be found
  if (!pageData) {
    // You might want to render a proper 404 page here later
    return <div>Error: Solutions page data not found.</div>;
  }

  // Log the blocks to the server console for inspection (optional, good for debugging new pages)
  console.log(
    'Solutions Page Blocks:',
    JSON.stringify(
      pageData.blocks?.map((b: any) => b.__typename) || [],
      null,
      2
    )
  );

  return (
    <main className="container mx-auto p-4">
      {' '}
      {/* Adjust container/padding as needed */}
      {/* Map over the blocks and render each one using BlockRenderer */}
      {pageData.blocks && pageData.blocks.length > 0 ? (
        pageData.blocks.map((block: any, index: number) => (
          <BlockRenderer key={`${block.__typename}-${index}`} block={block} />
        ))
      ) : (
        <p>No content blocks found for this page.</p>
      )}
    </main>
  );
}

// Optional: Add metadata generation based on SEO fields from solutions.json
// export async function generateMetadata() {
//   const pageData = getPageData('solutions');
//   if (!pageData || !pageData.seo) {
//     return { title: 'Our Solutions' }; // Default title
//   }
//   return {
//     title: pageData.seo.metaTitle || 'Our Solutions',
//     description: pageData.seo.metaDescription || '',
//   };
// }
