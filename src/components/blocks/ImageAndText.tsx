import React from 'react';
import Image from 'next/image';
// import DOMPurify from 'isomorphic-dompurify'; // Recommended for sanitizing HTML

interface ImageData {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

interface ImageAndTextProps {
  data: {
    __typename: 'ComponentBlocksImageAndTextNonClickable';
    image: ImageData | null;
    heading?: string | null;
    description?: string | null;
    // Define possible variants based on your Strapi setup
    contentVariant?: 'Text_left_Image_right' | 'Image_left_Text_right' | string;
  };
}

const ImageAndText: React.FC<ImageAndTextProps> = ({ data }) => {
  const {
    image,
    heading,
    description,
    contentVariant = 'Text_left_Image_right',
  } = data;

  // Determine layout order based on variant
  const isImageLeft = contentVariant === 'Image_left_Text_right';

  // Function to render description safely (consider sanitizing)
  const renderDescription = () => {
    if (!description) return null;
    // const sanitizedHtml = DOMPurify.sanitize(description);
    return (
      <div
        className="prose lg:prose-xl max-w-none" // Use Tailwind Typography if needed
        dangerouslySetInnerHTML={{ __html: description /* sanitizedHtml */ }}
      />
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-8">
      {/* Text Section */}
      <div className={`order-2 ${isImageLeft ? 'md:order-2' : 'md:order-1'}`}>
        {heading && <h2 className="text-2xl font-bold mb-4">{heading}</h2>}
        {renderDescription()}
      </div>

      {/* Image Section */}
      {image?.url && (
        <div
          className={`relative order-1 ${
            isImageLeft ? 'md:order-1' : 'md:order-2'
          } aspect-w-16 aspect-h-9`}
        >
          {' '}
          {/* Maintain aspect ratio */}
          <Image
            src={image.url}
            alt={image.alternativeText || heading || 'Content image'}
            layout="fill" // Use fill layout within aspect ratio container
            objectFit="cover"
            quality={75}
            className="rounded-lg shadow-md" // Add some styling
          />
        </div>
      )}
    </div>
  );
};

export default ImageAndText;
