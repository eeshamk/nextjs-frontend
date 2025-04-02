import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Interfaces based on JSON structure
interface BackgroundImageData {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

interface PromotionalBannerCtaProps {
  data: {
    __typename: 'ComponentBlocksPromotionalBannerCta';
    heading?: string | null;
    subHeading?: string | null;
    buttonName?: string | null;
    buttonLink?: string | null;
    isExternal?: boolean;
    buttonTarget?: '_self' | '_blank';
    buttonVariant?: 'Primary' | 'Secondary' | string;
    PromotionBannerSize?: 'Thin' | 'Medium' | 'Large' | string; // Allow size variations
    backgroundImage?: BackgroundImageData | null;
  };
}

const PromotionalBannerCta: React.FC<PromotionalBannerCtaProps> = ({
  data,
}) => {
  const {
    heading,
    subHeading,
    buttonName,
    buttonLink,
    isExternal = false,
    buttonTarget = '_self',
    buttonVariant = 'Primary',
    PromotionBannerSize = 'Medium', // Default size
    backgroundImage,
  } = data;

  // Adjust padding based on size
  const sizeClasses = {
    Thin: 'py-8 md:py-12',
    Medium: 'py-16 md:py-20',
    Large: 'py-24 md:py-32',
  };

  // Basic button styling - reuse or customize as needed
  const baseButtonClasses =
    'mt-6 px-6 py-3 rounded hover:opacity-90 transition duration-300 inline-block text-center font-semibold shadow';
  const variantButtonClasses = {
    Primary: 'bg-blue-600 text-white', // Adjust colors to match site theme
    Secondary: 'bg-white text-blue-600 border border-blue-600',
  };
  const combinedButtonClasses = `${baseButtonClasses} ${
    variantButtonClasses[buttonVariant as keyof typeof variantButtonClasses] ||
    variantButtonClasses.Primary
  }`;

  return (
    <section
      className={`relative w-full ${
        sizeClasses[PromotionBannerSize as keyof typeof sizeClasses] ||
        sizeClasses.Medium
      } my-8 overflow-hidden`}
    >
      {/* Background Image */}
      {backgroundImage?.url ? (
        <>
          <Image
            src={backgroundImage.url}
            alt={
              backgroundImage.alternativeText || 'Promotional banner background'
            }
            layout="fill"
            objectFit="cover"
            quality={75}
            className="z-0"
          />
          {/* Optional Overlay for contrast */}
          <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        </>
      ) : (
        // Fallback background color if no image
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 z-0"></div>
      )}

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4 text-center text-white">
        {heading && (
          <h2 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-md">
            {heading}
          </h2>
        )}
        {subHeading && (
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-4 drop-shadow-sm">
            {subHeading}
          </p>
        )}

        {/* CTA Button */}
        {buttonName &&
          buttonLink &&
          (isExternal ? (
            <a
              href={buttonLink}
              target={buttonTarget === '_blank' ? '_blank' : undefined}
              rel={
                buttonTarget === '_blank' ? 'noopener noreferrer' : undefined
              }
              className={combinedButtonClasses}
            >
              {buttonName}
            </a>
          ) : (
            <Link href={buttonLink} passHref legacyBehavior>
              <a
                target={buttonTarget === '_blank' ? '_blank' : undefined}
                className={combinedButtonClasses}
              >
                {buttonName}
              </a>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default PromotionalBannerCta;
