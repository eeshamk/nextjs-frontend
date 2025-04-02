import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getContentTypeUrl } from '@/lib/strapi'; // Import the helper function

// --- Reusing Interfaces and PostCard Component ---
// (Could be moved to a shared file later if used by more components)

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

// Helper component for rendering a single post card (same as in 2-column layout)
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

// --- Main Component for 4-Column Layout ---

interface PostContent4ColumnLayoutProps {
  data: {
    __typename: 'ComponentBlocksPostContent4ColumnLayout';
    // Assuming structure with post_1, post_2, post_3, post_4
    post_1?: PostData | null;
    post_2?: PostData | null;
    post_3?: PostData | null;
    post_4?: PostData | null;
  };
}

const PostContent4ColumnLayout: React.FC<PostContent4ColumnLayoutProps> = ({
  data,
}) => {
  const { post_1, post_2, post_3, post_4 } = data;

  return (
    <section className="my-8">
      {/* Responsive Grid: 1 col on small, 2 on medium, 4 on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <PostCard post={post_1} />
        <PostCard post={post_2} />
        <PostCard post={post_3} />
        <PostCard post={post_4} />
      </div>
    </section>
  );
};

export default PostContent4ColumnLayout;
