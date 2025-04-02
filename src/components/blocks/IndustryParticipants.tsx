import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Interfaces matching the Strapi data structure
interface ImageData {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

interface IndustryItemData {
  buttonName: string;
  buttonLink: string;
  target?: '_self' | '_blank';
  variant?: 'Standard' | string; // Assuming 'Standard' is a possible variant
  isExternal?: boolean;
  caption?: string | null;
  leftIcon?: any | null; // Define type if icons are used
  rightIcon?: any | null;
  backgroundImage: ImageData | null;
}

interface IndustryParticipantsProps {
  data: {
    __typename: 'ComponentBlocksIndustryParticipants';
    heading?: string | null;
    subHeading?: string | null;
    leftIcon?: any | null; // Define type if icons are used
    rightIcon?: any | null;
    // Main item treated similarly to items in the array
    industryParticipantsButtonName: string;
    industryParticipantsButtonLink: string;
    industryParticipantsButtonLinkExternal?: boolean;
    industryParticipantsButtonTarget?: '_self' | '_blank';
    caption?: string | null;
    backgroundImage: ImageData | null;
    industryParticipantsButtonVariant?: 'Standard' | string;
    industryItems: IndustryItemData[];
  };
}

// Helper component to render a single Industry Item card
const IndustryItemCard: React.FC<{
  item: IndustryItemData | any;
  isMain?: boolean;
}> = ({ item, isMain = false }) => {
  // Adapt field names if the main item uses different keys
  const name = isMain ? item.industryParticipantsButtonName : item.buttonName;
  const link = isMain ? item.industryParticipantsButtonLink : item.buttonLink;
  const external = isMain
    ? item.industryParticipantsButtonLinkExternal
    : item.isExternal;
  const target = isMain ? item.industryParticipantsButtonTarget : item.target;
  const image = item.backgroundImage;
  // Add variant, caption, icons if needed

  if (!name || !link) return null; // Don't render incomplete items

  const LinkContent = () => (
    <div className="relative w-full h-full min-h-[150px] md:min-h-[220px] group overflow-hidden rounded-lg shadow-md flex items-end justify-center p-4 text-center">
      {/* Background Image */}
      {image?.url && (
        <Image
          src={image.url}
          alt={image.alternativeText || name || 'Industry background'}
          layout="fill"
          objectFit="cover"
          className="z-0 group-hover:scale-105 transition-transform duration-300 ease-in-out"
          quality={70}
        />
      )}
      {/* Dark Overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>

      {/* Text Content */}
      <div className="relative z-20">
        <h3 className="text-white text-lg md:text-xl font-semibold drop-shadow-md">
          {name}
        </h3>
        {/* Add caption here if needed */}
      </div>
    </div>
  );

  if (external) {
    return (
      <a
        href={link}
        target={target === '_blank' ? '_blank' : undefined}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        <LinkContent />
      </a>
    );
  } else {
    return (
      <Link href={link} passHref legacyBehavior>
        <a target={target === '_blank' ? '_blank' : undefined}>
          <LinkContent />
        </a>
      </Link>
    );
  }
};

// Main component
const IndustryParticipants: React.FC<IndustryParticipantsProps> = ({
  data,
}) => {
  const { heading, subHeading, industryItems = [], ...mainItemData } = data;

  // Combine the main item with the array items for rendering in the grid
  // Treat the main participant data as the first item potentially
  const allItems = [mainItemData, ...industryItems];

  return (
    <div className="my-8">
      {heading && (
        <h2 className="text-3xl font-bold text-center mb-2">{heading}</h2>
      )}
      {subHeading && (
        <p className="text-lg text-center text-gray-600 mb-6">{subHeading}</p>
      )}

      {/* Grid for the industry items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Render the main item */}
        <IndustryItemCard item={mainItemData} isMain={true} />
        {/* Render the rest of the items */}
        {industryItems.map((item, index) => (
          <IndustryItemCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default IndustryParticipants;
