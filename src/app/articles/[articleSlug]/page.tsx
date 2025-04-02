import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getArticleData } from '@/lib/strapi'; // Import the new data fetching function
import BlockRenderer from '@/components/blocks/BlockRenderer'; // Reuse the block renderer

interface ArticlePageProps {
  params: {
    articleSlug: string; // Matches the directory name [articleSlug]
  };
}

// Optional: generateStaticParams to pre-render known articles at build time
// export async function generateStaticParams() {
//   // Fetch or define a list of known article slugs
//   const articleSlugs = [
//      'autonomous-haulage-systems-the-future-of-mining-operations',
//      'strategic-sustainability-leveraging-materiality-assessment-for-unified-esg-impact',
//      // Add other known slugs...
//   ];
//   return articleSlugs.map((slug) => ({
//     articleSlug: slug,
//   }));
// }

export default function ArticlePage({ params }: ArticlePageProps) {
  const { articleSlug } = params;
  const articleData = getArticleData(articleSlug);

  if (!articleData) {
    notFound(); // Show 404 if article data isn't found
  }

  const { title, featuredImage, excerpts, content } = articleData;

  return (
    <article className="container mx-auto px-4 py-8">
      {' '}
      {/* Basic container and padding */}
      {/* Article Header */}
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
          {title}
        </h1>
        {excerpts && (
          <p className="text-lg md:text-xl text-gray-600 mb-4">{excerpts}</p>
        )}
        {/* Add Author/Date info here if available in your data */}
      </header>
      {/* Featured Image */}
      {featuredImage?.url && (
        <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden shadow-lg">
          {' '}
          {/* 16:9 aspect ratio */}
          <Image
            src={featuredImage.url}
            alt={
              featuredImage.alternativeText || title || 'Article featured image'
            }
            layout="fill"
            objectFit="cover"
            priority // Load this image faster as it's likely LCP
            quality={85}
          />
        </div>
      )}
      {/* Article Content - Rendered using Blocks */}
      <div className="prose lg:prose-xl max-w-none mx-auto">
        {' '}
        {/* Apply Tailwind Typography for basic content styling */}
        {content && content.length > 0 ? (
          content.map((block: any, index: number) => (
            // Use BlockRenderer for the content blocks
            <BlockRenderer key={`${block.__typename}-${index}`} block={block} />
          ))
        ) : (
          <p>Article content not found.</p>
        )}
      </div>
      {/* Add related posts, comments, etc. here later if needed */}
    </article>
  );
}

// Optional: Dynamic metadata generation for SEO
// export async function generateMetadata({ params }: ArticlePageProps) {
//   const articleData = getArticleData(params.articleSlug);
//   if (!articleData) {
//     return { title: 'Article Not Found' };
//   }
//   return {
//     title: articleData.seo?.metaTitle || articleData.title,
//     description: articleData.seo?.metaDescription || articleData.excerpts || '',
//     // Add other meta tags like canonicalURL, openGraph data from articleData.seo
//   };
// }
