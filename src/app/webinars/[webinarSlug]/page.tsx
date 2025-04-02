import { notFound } from 'next/navigation';
import { getWebinarData } from '@/lib/strapi'; // Import the webinar data function
import BlockRenderer from '@/components/blocks/BlockRenderer'; // Reuse the block renderer

interface WebinarPageProps {
  params: {
    webinarSlug: string; // Matches the directory name [webinarSlug]
  };
}

// Optional: generateStaticParams
// export async function generateStaticParams() {
//   const webinarSlugs = [
//      'eyes-on-emissions-monitoring-co-2-across-the-ccus-value-chain',
//      'role-of-recycling-in-the-wind-energy-storage-and-hydrogen-industries',
//      // Add other known slugs...
//   ];
//   return webinarSlugs.map((slug) => ({
//     webinarSlug: slug,
//   }));
// }

export default function WebinarPage({ params }: WebinarPageProps) {
  const { webinarSlug } = params;
  const webinarData = getWebinarData(webinarSlug);

  if (!webinarData) {
    notFound(); // Show 404 if data isn't found
  }

  // Extract data
  // Using 'excrept' key from JSON, even though it's likely a typo for 'excerpt'
  const { title, vimeoVideoId, excrept, content } = webinarData;

  return (
    <article className="container mx-auto px-4 py-8">
      {' '}
      {/* Basic container */}
      {/* Webinar Header */}
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
        {excrept && ( // Use the key 'excrept' from the JSON data
          <p className="text-lg text-gray-600">{excrept}</p>
        )}
      </header>
      {/* Vimeo Video Embed */}
      {vimeoVideoId ? (
        <div className="aspect-video w-full max-w-4xl mx-auto mb-8 shadow-lg rounded overflow-hidden">
          <iframe
            src={`https://player.vimeo.com/video/${vimeoVideoId}?h=HASH&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=APP_ID`} // Replace HASH and APP_ID if needed, or simplify URL
            // Consider simplifying URL: src={`https://player.vimeo.com/video/${vimeoVideoId}`}
            width="100%"
            height="100%"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="border-0"
            title={title || 'Webinar Video'}
          ></iframe>
        </div>
      ) : (
        <div className="aspect-video w-full max-w-4xl mx-auto mb-8 bg-gray-200 flex items-center justify-center rounded shadow">
          <p className="text-gray-500">Video not available.</p>
        </div>
      )}
      {/* Webinar Description Content (using Block Renderer) */}
      <div className="prose lg:prose-lg max-w-3xl mx-auto">
        {' '}
        {/* Centered content area */}
        {content && content.length > 0 ? (
          content.map((block: any, index: number) => (
            <BlockRenderer key={`${block.__typename}-${index}`} block={block} />
          ))
        ) : (
          <p>Webinar description not available.</p>
        )}
      </div>
    </article>
  );
}

// Optional: Dynamic metadata generation for SEO
// export async function generateMetadata({ params }: WebinarPageProps) {
//   const webinarData = getWebinarData(params.webinarSlug);
//   if (!webinarData) {
//     return { title: 'Webinar Not Found' };
//   }
//   return {
//     title: webinarData.seo?.metaTitle || webinarData.title,
//     description: webinarData.seo?.metaDescription || webinarData.excrept || `Webinar on ${webinarData.title}`,
//     // Add other meta tags
//   };
// }
