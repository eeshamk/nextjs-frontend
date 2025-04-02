import { notFound } from 'next/navigation'; // Import notFound for handling missing data
import { getIndustryPageData } from '@/lib/strapi'; // Import the new data fetching function
import BlockRenderer from '@/components/blocks/BlockRenderer';

interface IndustryPageProps {
  params: {
    industrySlug: string; // Matches the directory name [industrySlug]
  };
}

// This function tells Next.js which slugs to pre-render at build time (optional but recommended for SSG)
// export async function generateStaticParams() {
//   // In a real scenario, you'd dynamically read the filenames from the Pages/industry directory
//   const industrySlugs = [
//     'chemicals-and-natural-resources',
//     'mobility',
//     'energy',
//     'life-sciences',
//     'industrial-equipment',
//     'food-and-nutrition',
//     'home-and-personal-care',
//   ];
//   return industrySlugs.map((slug) => ({
//     industrySlug: slug,
//   }));
// }

export default function IndustryPage({ params }: IndustryPageProps) {
  const { industrySlug } = params;

  // Fetch data for the specific industry slug
  const pageData = getIndustryPageData(industrySlug);

  // Handle cases where page data might not be found -> Show 404
  if (!pageData) {
    console.error(`No data found for industry slug: ${industrySlug}`);
    notFound(); // Triggers the default Next.js 404 page
  }

  // Log the blocks for debugging new pages (optional)
  console.log(
    `[${industrySlug}] Page Blocks:`,
    JSON.stringify(
      pageData.blocks?.map((b: any) => b.__typename) || [],
      null,
      2
    )
  );

  return (
    <main className="container mx-auto p-4">
      {' '}
      {/* Adjust container/padding */}
      {/* Render the blocks using BlockRenderer */}
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

// Optional: Dynamic metadata generation
// export async function generateMetadata({ params }: IndustryPageProps) {
//   const pageData = getIndustryPageData(params.industrySlug);
//   if (!pageData) {
//     return { title: 'Industry Page Not Found' };
//   }
//   return {
//     title: pageData.seo?.metaTitle || pageData.title || 'Industry Page',
//     description: pageData.seo?.metaDescription || `Details about the ${pageData.title} industry.`,
//   };
// }
