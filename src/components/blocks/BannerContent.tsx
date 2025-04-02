import React from 'react';
import Link from 'next/link'; // Use Next.js Link for internal navigation
import Image from 'next/image'; // Use Next.js Image for optimization

// Define the structure of the background image data
interface BackgroundImageData {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

// Define the props for the BannerContent component based on Strapi data
interface BannerContentProps {
  data: {
    __typename: 'ComponentBlocksBannerContent';
    heading: string;
    subHeading?: string | null;
    textPosition?: 'left' | 'center' | 'right';
    bannerSize?: 'small' | 'medium' | 'large';
    background: BackgroundImageData | null;
    bannerButtonName?: string | null;
    bannerButtonLink?: string | null;
    isbannerButtonLinkExternal?: boolean;
    bannerButtonTarget?: '_self' | '_blank'; // Assuming possible target values
    bannerButtonVariant?: 'Primary' | 'Secondary' | string; // Allow other variants potentially
  };
}

const BannerContent: React.FC<BannerContentProps> = ({ data }) => {
  const {
    heading,
    subHeading,
    textPosition = 'center', // Default to center
    bannerSize = 'medium', // Default size
    background,
    bannerButtonName,
    bannerButtonLink,
    isbannerButtonLinkExternal = false, // Default to internal link
    bannerButtonTarget = '_self',
  } = data;

  // Determine banner height based on size
  const bannerHeightClasses = {
    small: 'min-h-[200px]',
    medium: 'min-h-[400px]', // Adjust heights as needed
    large: 'min-h-[640px]', // Match the height from the JSON data
  };

  // Determine text alignment and justification
  const textAlignmentClasses = {
    left: 'items-center text-left justify-start',
    center: 'items-center text-center justify-center',
    right: 'items-center text-right justify-end',
  };

  // Basic button styling - customize as needed
  const buttonClasses =
    'mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 inline-block';

  return (
    <div
      className={`relative w-full ${bannerHeightClasses[bannerSize]} flex overflow-hidden my-4`}
    >
      {/* Background Image using Next/Image */}
      {background?.url && (
        <Image
          src={background.url}
          alt={background.alternativeText || 'Banner background'}
          layout="fill"
          objectFit="cover" // Cover the area
          objectPosition="center" // Center the image
          quality={85} // Adjust quality as needed
          priority // Load high-priority images faster (e.g., for LCP)
          className="z-0" // Ensure image is behind the content
        />
      )}

      {/* Overlay for better text readability (optional) */}
      <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

      {/* Content Container */}
      <div
        className={`relative z-20 w-full flex flex-col p-8 md:p-12 lg:p-16 ${textAlignmentClasses[textPosition]} text-white`}
      >
        {heading && (
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-md">
            {heading}
          </h1>
        )}
        {subHeading && (
          <p className="mt-2 text-lg md:text-xl lg:text-2xl drop-shadow-md">
            {subHeading}
          </p>
        )}

        {/* Banner Button */}
        {bannerButtonName &&
          bannerButtonLink &&
          (isbannerButtonLinkExternal ? (
            <a
              href={bannerButtonLink}
              target={bannerButtonTarget === '_blank' ? '_blank' : undefined}
              rel={
                bannerButtonTarget === '_blank'
                  ? 'noopener noreferrer'
                  : undefined
              }
              className={buttonClasses}
            >
              {bannerButtonName}
            </a>
          ) : (
            <Link href={bannerButtonLink} passHref legacyBehavior>
              <a
                target={bannerButtonTarget === '_blank' ? '_blank' : undefined}
                className={buttonClasses}
              >
                {bannerButtonName}
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BannerContent;
