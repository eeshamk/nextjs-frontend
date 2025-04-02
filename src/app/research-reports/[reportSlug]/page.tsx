import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getResearchReportData } from '@/lib/strapi'; // Import the report data function
import BlockRenderer from '@/components/blocks/BlockRenderer'; // Reuse the block renderer

interface ResearchReportPageProps {
  params: {
    reportSlug: string; // Matches the directory name [reportSlug]
  };
}

// Optional: generateStaticParams to pre-render known reports
// export async function generateStaticParams() {
//   const reportSlugs = [
//      'closing-the-400-gwh-gap-how-the-us-europe-are-reshaping-the-li-battery-value-chain',
//      'non-small-cell-lung-cancer-and-breast-cancer-insights-asco-annual-meeting',
//      // Add other known slugs...
//   ];
//   return reportSlugs.map((slug) => ({
//     reportSlug: slug,
//   }));
// }

export default function ResearchReportPage({
  params,
}: ResearchReportPageProps) {
  const { reportSlug } = params;
  const reportData = getResearchReportData(reportSlug);

  if (!reportData) {
    notFound(); // Show 404 if data isn't found
  }

  // Extract data - Note: research reports might not have 'excerpts' like articles/case studies
  const { title, featuredImage, content, reportType } = reportData;

  // Basic check if it's the type that might require a form (or different display)
  const isFormType = reportType === 'research_form';

  return (
    <article className="container mx-auto px-4 py-8">
      {' '}
      {/* Basic container */}
      {/* Report Header */}
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
          {title}
        </h1>
        {/* Add subtitle or other header info if available */}
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content Area (potentially wider) */}
        <div className="md:col-span-2 prose lg:prose-xl max-w-none">
          {/* Featured Image (optional placement within main content) */}
          {featuredImage?.url &&
            !isFormType && ( // Maybe don't show image prominently if it's just a form page?
              <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={featuredImage.url}
                  alt={
                    featuredImage.alternativeText ||
                    title ||
                    'Report featured image'
                  }
                  layout="fill"
                  objectFit="cover"
                  priority
                  quality={85}
                />
              </div>
            )}

          {/* Report Content Blocks */}
          {content && content.length > 0 ? (
            content.map((block: any, index: number) => (
              <BlockRenderer
                key={`${block.__typename}-${index}`}
                block={block}
              />
            ))
          ) : (
            <p>Report content not found.</p>
          )}
        </div>

        {/* Sidebar Area (for form or related info) */}
        <aside className="md:col-span-1">
          {isFormType ? (
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Download Report</h2>
              <p className="text-sm text-gray-600 mb-4">
                Please fill out the form below to receive a copy of this report.
                (Actual form implementation is needed here).
              </p>
              {/* Placeholder for a form component */}
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-2 border rounded"
                />
                <button className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-gray-50 rounded-lg shadow sticky top-24">
              {' '}
              {/* Sticky sidebar */}
              <h3 className="text-lg font-semibold mb-3">Report Details</h3>
              {/* Add details like publish date, author, related links etc. if available */}
              <p className="text-sm text-gray-600">
                Details about this report can go here.
              </p>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}

// Optional: Dynamic metadata generation for SEO
// export async function generateMetadata({ params }: ResearchReportPageProps) {
//   const reportData = getResearchReportData(params.reportSlug);
//   if (!reportData) {
//     return { title: 'Report Not Found' };
//   }
//   return {
//     title: reportData.seo?.metaTitle || reportData.title,
//     description: reportData.seo?.metaDescription || `Research report on ${reportData.title}`,
//     // Add other meta tags
//   };
// }
