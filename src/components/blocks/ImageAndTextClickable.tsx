import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Interfaces matching the Strapi structure (note key differences from non-clickable)
interface ClickableImageData {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

interface ImageAndTextClickableProps {
  data: {
    __typename: 'ComponentBlocksImageAndTextClickable';
    heading?: string | null;
    description?: string | null; // Contains HTML
    buttonLabel?: string | null; // Link text/aria-label
    buttonURL?: string | null; // The link destination
    buttontarget?: '_self' | '_blank'; // Link target (note typo in JSON key)
    isButtonUrlExternal?: boolean;
    buttonTheme?: 'Text_left_Image_right' | 'Image_left_Text_right' | string; // Layout variant
    backgroundImage?: ClickableImageData | null; // Image data
  };
}

// Helper to render HTML safely
const renderHtml = (htmlString: string | null | undefined) => {
  if (!htmlString) return null;
  // const sanitizedHtml = DOMPurify.sanitize(htmlString); // Consider sanitizing
  return (
    <div
      className="prose prose-sm sm:prose-base max-w-none text-gray-600" // Adjusted prose size
      dangerouslySetInnerHTML={{ __html: htmlString /* sanitizedHtml */ }}
    />
  );
};

const ImageAndTextClickable: React.FC<ImageAndTextClickableProps> = ({
  data,
}) => {
  const {
    heading,
    description,
    buttonLabel,
    buttonURL,
    buttontarget = '_self', // Handle typo from JSON key
    isButtonUrlExternal = false,
    buttonTheme = 'Text_left_Image_right', // Default layout
    backgroundImage,
  } = data;

  // Don't render if the link URL is missing
  if (!buttonURL) {
    console.warn('ImageAndTextClickable block is missing buttonURL.', data);
    return null;
  }

  // Determine layout order based on variant
  const isImageLeft = buttonTheme === 'Image_left_Text_right';

  // Define content structure
  const Content = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center group">
      {' '}
      {/* Add group for hover effects */}
      {/* Text Section */}
      <div className={`order-2 ${isImageLeft ? 'md:order-2' : 'md:order-1'}`}>
        {heading && (
          <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
            {heading}
          </h3>
        )}
        {renderHtml(description)}
        {/* Optionally render buttonLabel as explicit text if needed */}
        {/* <span className="mt-4 inline-block text-blue-600 group-hover:underline">
                 {buttonLabel || 'Learn More'} &rarr;
             </span> */}
      </div>
      {/* Image Section */}
      {backgroundImage?.url && (
        <div
          className={`relative order-1 ${
            isImageLeft ? 'md:order-1' : 'md:order-2'
          } aspect-w-4 aspect-h-3 overflow-hidden rounded-lg shadow-md`}
        >
          {' '}
          {/* Adjust aspect ratio if needed */}
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alternativeText || heading || 'Content image'}
            layout="fill"
            objectFit="cover"
            quality={75}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
    </div>
  );

  // Render as external link or internal Next.js link
  if (isButtonUrlExternal) {
    return (
      <section className="my-8">
        <a
          href={buttonURL}
          target={buttontarget === '_blank' ? '_blank' : undefined}
          rel={buttontarget === '_blank' ? 'noopener noreferrer' : undefined}
          aria-label={buttonLabel || heading || undefined} // Use buttonLabel or heading for accessibility
          className="block hover:shadow-lg transition-shadow duration-300 rounded-lg p-1" // Add padding/styling to clickable area if needed
        >
          <Content />
        </a>
      </section>
    );
  } else {
    return (
      <section className="my-8">
        <Link href={buttonURL} passHref legacyBehavior>
          <a
            target={buttontarget === '_blank' ? '_blank' : undefined}
            aria-label={buttonLabel || heading || undefined}
            className="block hover:shadow-lg transition-shadow duration-300 rounded-lg p-1" // Add padding/styling to clickable area if needed
          >
            <Content />
          </a>
        </Link>
      </section>
    );
  }
};

export default ImageAndTextClickable;
