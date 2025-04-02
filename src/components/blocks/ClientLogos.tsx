import React from 'react';
import Image from 'next/image';

// Interfaces matching the Strapi data structure
interface LogoImageData {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

interface ImageSliderItem {
  image: LogoImageData[] | null; // It's an array of images
}

interface ClientLogosProps {
  data: {
    __typename: 'ComponentBlocksClientLogos';
    heading?: string | null;
    subHeading?: string | null;
    imageSlider: ImageSliderItem[] | null;
  };
}

const ClientLogos: React.FC<ClientLogosProps> = ({ data }) => {
  const { heading, subHeading, imageSlider } = data;

  if (!imageSlider || imageSlider.length === 0) {
    // Don't render the block if there are no logos
    return null;
  }

  return (
    <div className="my-8 py-8 bg-gray-50">
      {' '}
      {/* Optional background color */}
      <div className="container mx-auto px-4">
        {heading && (
          <h2 className="text-3xl font-bold text-center mb-2">{heading}</h2>
        )}
        {subHeading && (
          <p className="text-lg text-center text-gray-600 mb-6 max-w-3xl mx-auto">
            {subHeading}
          </p>
        )}

        {/* Logo Grid/Row */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {imageSlider.map((sliderItem, index) => {
            // Extract the first image from the nested 'image' array
            const logo = sliderItem.image?.[0];

            if (!logo?.url) {
              // Skip if no valid image data found in the first position
              return null;
            }

            return (
              <div
                key={index}
                className="relative h-16 w-32 md:h-20 md:w-40 filter grayscale hover:grayscale-0 transition duration-300"
              >
                {/* Use Next.js Image */}
                <Image
                  src={logo.url}
                  alt={logo.alternativeText || `Client logo ${index + 1}`}
                  layout="fill" // Fill the container div
                  objectFit="contain" // Ensure the entire logo fits without distortion
                  quality={75}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;
