import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getContentTypeUrl } from '@/lib/strapi'; // Import the helper function

// --- Reusing Interfaces and PostCard Component ---
// (Ensure these are accessible, e.g., defined here or imported from a shared file)

interface PostImageData {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

interface PostData {
  postTitle?: string | null;
  postSlug?: string | null;
  postFeaturedImage?: PostImageData | null;
  contentType?: string | null;
}

// Helper component for rendering a single post card (same as before)
const PostCard: React.FC<{ post: PostData | null | undefined }> = ({
  post,
}) => {
  if (!post || !post.postSlug || !post.postTitle || !post.contentType) {
    return null;
  }

  const postUrl = getContentTypeUrl(post.contentType, post.postSlug);
  const featuredImage = post.postFeaturedImage;

  const cardClasses =
    'group bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg flex flex-col h-full';
  const imageContainerClasses =
    'relative w-full aspect-w-16 aspect-h-9 overflow-hidden';
  const contentClasses = 'p-4 flex-grow flex flex-col justify-between';

  return (
    <Link href={postUrl} passHref legacyBehavior>
      <a className={cardClasses}>
        {featuredImage?.url && (
          <div className={imageContainerClasses}>
            <Image
              src={featuredImage.url}
              alt={
                featuredImage.alternativeText || post.postTitle || 'Post image'
              }
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
              quality={75}
            />
            <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded z-10 capitalize">
              {post.contentType.replace('-', ' ')}
            </span>
          </div>
        )}
        <div className={contentClasses}>
          <h3 className="text-md font-semibold text-gray-800 group-hover:text-blue-700 mb-2 line-clamp-3">
            {post.postTitle}
          </h3>
          <span className="text-sm text-blue-600 group-hover:underline mt-auto">
            Read More &rarr;
          </span>
        </div>
      </a>
    </Link>
  );
};

// --- Main Component for Client Stories ---

interface ClientStoryItem {
  post: PostData | null; // Nested post object
}

interface ClientStoriesProps {
  data: {
    __typename: 'ComponentBlocksClientsStories';
    heading?: string | null;
    subHeading?: string | null;
    posts?: ClientStoryItem[] | null;
    // Add button fields here if they might be used later
    clientsStoriesButtonName?: string | null;
    clientsStoriesButtonLink?: string | null;
    isExternal?: boolean;
    clientsStoriesButtonTarget?: string | null;
    clientsStoriesButtonVariant?: string | null;
  };
}

const ClientStories: React.FC<ClientStoriesProps> = ({ data }) => {
  const { heading, subHeading, posts } = data;

  if (!posts || posts.length === 0) {
    return null; // Don't render if no stories are provided
  }

  // Assuming this section might be linked from the sub-menu
  const sectionId = 'client-stories'; // Match link from StickySubMenu if applicable

  return (
    <section id={sectionId} className="my-12 py-12 bg-gray-100">
      {' '}
      {/* Light background */}
      <div className="container mx-auto px-4">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            {heading}
          </h2>
        )}
        {subHeading && (
          <p className="text-lg text-center text-gray-600 mb-8">{subHeading}</p>
        )}

        {/* Responsive Grid: Adjust columns based on number of stories or design preference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((storyItem, index) => (
            // Access the nested 'post' object
            <PostCard key={index} post={storyItem.post} />
          ))}
        </div>

        {/* Optional "View More" Button - Render if data exists */}
        {data.clientsStoriesButtonName && data.clientsStoriesButtonLink && (
          <div className="text-center mt-10">
            {data.isExternal ? (
              <a
                href={data.clientsStoriesButtonLink}
                target={
                  data.clientsStoriesButtonTarget === '_blank'
                    ? '_blank'
                    : undefined
                }
                rel={
                  data.clientsStoriesButtonTarget === '_blank'
                    ? 'noopener noreferrer'
                    : undefined
                }
                className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-300 inline-block" // Basic button style
              >
                {data.clientsStoriesButtonName}
              </a>
            ) : (
              <Link
                href={data.clientsStoriesButtonLink}
                passHref
                legacyBehavior
              >
                <a
                  target={
                    data.clientsStoriesButtonTarget === '_blank'
                      ? '_blank'
                      : undefined
                  }
                  className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-300 inline-block" // Basic button style
                >
                  {data.clientsStoriesButtonName}
                </a>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientStories;
