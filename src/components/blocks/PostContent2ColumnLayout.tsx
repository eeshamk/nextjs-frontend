import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getContentTypeUrl } from '@/lib/strapi'; // Import the helper function

// Interfaces matching the Strapi structure
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

interface PostContent2ColumnLayoutProps {
  data: {
    __typename: 'ComponentBlocksPostContent2ColumnLayout';
    postComponentVariant?: string | null; // e.g., "Image_on_top_with_title_and_content_below"
    post_1?: PostData | null;
    post_2?: PostData | null;
  };
}

// Helper component for rendering a single post card
const PostCard: React.FC<{ post: PostData | null | undefined }> = ({
  post,
}) => {
  if (!post || !post.postSlug || !post.postTitle || !post.contentType) {
    return null; // Don't render if essential data is missing
  }

  const postUrl = getContentTypeUrl(post.contentType, post.postSlug);
  const featuredImage = post.postFeaturedImage;

  // Basic styling for the card - adjust as needed
  const cardClasses =
    'group bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg flex flex-col h-full';
  const imageContainerClasses =
    'relative w-full aspect-w-16 aspect-h-9 overflow-hidden'; // Fixed aspect ratio for image
  const contentClasses = 'p-4 flex-grow flex flex-col justify-between'; // Padding and flex-grow for content area

  return (
    <Link href={postUrl} passHref legacyBehavior>
      <a className={cardClasses}>
        {/* Image Section */}
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
            {/* Content Type Badge (Optional) */}
            <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded z-10 capitalize">
              {post.contentType.replace('-', ' ')}
            </span>
          </div>
        )}

        {/* Content Section */}
        <div className={contentClasses}>
          <h3 className="text-md font-semibold text-gray-800 group-hover:text-blue-700 mb-2 line-clamp-3">
            {post.postTitle}
          </h3>
          {/* Add excerpt/date here later if available in data */}
          <span className="text-sm text-blue-600 group-hover:underline mt-auto">
            Read More &rarr;
          </span>
        </div>
      </a>
    </Link>
  );
};

const PostContent2ColumnLayout: React.FC<PostContent2ColumnLayoutProps> = ({
  data,
}) => {
  const { post_1, post_2, postComponentVariant } = data; // postComponentVariant currently unused, but available

  // Basic grid layout
  return (
    <section className="my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <PostCard post={post_1} />
        <PostCard post={post_2} />
      </div>
    </section>
  );
};

export default PostContent2ColumnLayout;
