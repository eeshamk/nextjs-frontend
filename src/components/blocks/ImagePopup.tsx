import React from 'react';
import Image from 'next/image';

// Interface based on the Strapi structure
interface ImagePopupData {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

interface ImagePopupProps {
  data: {
    __typename: 'ComponentBlocksImagePopup';
    imagePopupTitle?: string | null;
    imagePopup?: ImagePopupData | null;
    enable?: boolean | null;
  };
}

const ImagePopup: React.FC<ImagePopupProps> = ({ data }) => {
  const { imagePopupTitle, imagePopup, enable } = data;

  // Don't render if disabled or essential image data is missing
  if (enable === false || !imagePopup?.url) {
    return null;
  }

  // Calculate aspect ratio to prevent layout shift if possible
  const aspectRatio =
    imagePopup.width && imagePopup.height
      ? `${imagePopup.width} / ${imagePopup.height}`
      : '16 / 9'; // Default aspect ratio if dimensions missing

  return (
    <figure className="my-6 mx-auto max-w-4xl">
      {' '}
      {/* Centered figure with max-width */}
      <div
        className="relative w-full overflow-hidden rounded-lg shadow-md"
        style={{ aspectRatio: aspectRatio }} // Apply aspect ratio using inline style
      >
        <Image
          src={imagePopup.url}
          alt={imagePopup.alternativeText || imagePopupTitle || 'Popup image'}
          layout="fill"
          objectFit="contain" // Use 'contain' to ensure the whole image is visible
          quality={85}
        />
      </div>
      {imagePopupTitle && (
        <figcaption className="mt-2 text-sm text-center text-gray-600 italic">
          {imagePopupTitle}
        </figcaption>
      )}
    </figure>
  );
};

export default ImagePopup;
