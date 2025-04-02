'use client'; // This component requires client-side interactivity for the slider

import React from 'react';
import Image from 'next/image';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Interfaces matching the Strapi data structure
interface SliderImageData {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

interface ClientLogoItem {
  // Reusing name from JSON, but these are likely slide images
  image: SliderImageData[] | null;
}

interface SolutionsContentSliderProps {
  data: {
    __typename: 'ComponentBlocksSolutionsContentSlider';
    heading?: string | null;
    clientLogos: ClientLogoItem[] | null;
    content?: string | null;
  };
}

const SolutionsContentSlider: React.FC<SolutionsContentSliderProps> = ({
  data,
}) => {
  const { heading, clientLogos, content } = data;

  // Filter out items where the first image might be missing
  const validSlides =
    (clientLogos
      ?.map((item) => item.image?.[0])
      .filter(Boolean) as SliderImageData[]) || [];

  // Function to render HTML content safely (consider sanitizing)
  const renderContent = () => {
    if (!content) return null;
    // const sanitizedHtml = DOMPurify.sanitize(content); // Recommended
    return (
      <div
        className="prose lg:prose-lg max-w-none mb-6" // Basic styling for the HTML list
        dangerouslySetInnerHTML={{ __html: content /* sanitizedHtml */ }}
      />
    );
  };

  if (validSlides.length === 0 && !heading && !content) {
    return null; // Don't render if there's nothing to show
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center my-8 py-8">
      {/* Left Column: Heading and Content */}
      <div className="order-2 lg:order-1">
        {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
        {renderContent()}
      </div>

      {/* Right Column: Slider */}
      <div className="order-1 lg:order-2">
        {validSlides.length > 0 ? (
          <Swiper
            // Install Swiper modules
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30} // Space between slides
            slidesPerView={1} // Show one slide at a time
            navigation // Enable navigation arrows
            pagination={{ clickable: true }} // Enable clickable pagination dots
            loop={true} // Enable continuous loop mode
            autoplay={{
              // Optional: Autoplay configuration
              delay: 5000, // Delay between transitions (5 seconds)
              disableOnInteraction: false, // Autoplay will not be disabled after user interactions
            }}
            className="w-full rounded-lg overflow-hidden shadow-lg" // Style the Swiper container
          >
            {validSlides.map((slideImage, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-w-16 aspect-h-9">
                  {' '}
                  {/* Maintain aspect ratio */}
                  <Image
                    src={slideImage.url}
                    alt={
                      slideImage.alternativeText || `Slider image ${index + 1}`
                    }
                    layout="fill"
                    objectFit="cover" // Or 'contain' depending on image type
                    quality={80}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">No images available for slider.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionsContentSlider;
