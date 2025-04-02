import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getCaseStudyData } from '@/lib/strapi'; // Import the case study data function
import BlockRenderer from '@/components/blocks/BlockRenderer'; // Reuse the block renderer

interface CaseStudyPageProps {
  params: {
    caseStudySlug: string; // Matches the directory name [caseStudySlug]
  };
}

// Optional: generateStaticParams to pre-render known case studies
// export async function generateStaticParams() {
//   const caseStudySlugs = [
//      'analyzing-circular-economy-innovations-across-packaging-devices-and-process-landscapes',
//      'start-ups-landscape-anti-aging-and-personalization',
//      // Add other known slugs...
//   ];
//   return caseStudySlugs.map((slug) => ({
//     caseStudySlug: slug,
//   }));
// }

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { caseStudySlug } = params;
  const caseStudyData = getCaseStudyData(caseStudySlug);

  if (!caseStudyData) {
    notFound(); // Show 404 if data isn't found
  }

  const { title, featuredImage, excerpts, content } = caseStudyData;

  return (
    <article className="container mx-auto px-4 py-8">
      {' '}
      {/* Basic container and padding */}
      {/* Case Study Header */}
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
          {title}
        </h1>
        {excerpts && (
          <p className="text-lg md:text-xl text-gray-600 mb-4">{excerpts}</p>
        )}
        {/* You could add taxonomy/industry info here if needed */}
      </header>
      {/* Featured Image */}
      {featuredImage?.url && (
        <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={featuredImage.url}
            alt={
              featuredImage.alternativeText ||
              title ||
              'Case study featured image'
            }
            layout="fill"
            objectFit="cover"
            priority
            quality={85}
          />
        </div>
      )}
      {/* Case Study Content - Rendered using Blocks */}
      <div className="prose lg:prose-xl max-w-none mx-auto">
        {content && content.length > 0 ? (
          content.map((block: any, index: number) => (
            <BlockRenderer key={`${block.__typename}-${index}`} block={block} />
          ))
        ) : (
          <p>Case study content not found.</p>
        )}
      </div>
    </article>
  );
}

// Optional: Dynamic metadata generation for SEO
// export async function generateMetadata({ params }: CaseStudyPageProps) {
//   const caseStudyData = getCaseStudyData(params.caseStudySlug);
//   if (!caseStudyData) {
//     return { title: 'Case Study Not Found' };
//   }
//   return {
//     title: caseStudyData.seo?.metaTitle || caseStudyData.title,
//     description: caseStudyData.seo?.metaDescription || caseStudyData.excerpts || '',
//     // Add other meta tags as needed
//   };
// }
