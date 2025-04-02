import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Interfaces matching the Strapi structure
interface SgfImageData {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

interface SgfListItem {
  sgfListName: string;
}

interface SgfColumnItem {
  image?: SgfImageData | null;
  list?: SgfListItem[] | null;
  sgfName?: string | null;
  sgfURL?: string | null;
  sgfTarget?: '_self' | '_blank' | null;
  isExternal?: boolean;
}

interface RightSideListItem {
  sgfListName: string;
}

interface SgfBlockProps {
  data: {
    __typename: 'ComponentBlocksSgf';
    heading?: string | null;
    suheading?: string | null; // Using key from JSON (typo)
    sgfColumn?: SgfColumnItem[] | null;
    rightSideRedcolumnList?: RightSideListItem[] | null; // Using key from JSON
    rightSideTitle?: string | null;
  };
}

// Helper for SGF Column Card
const SgfColumnCard: React.FC<{ item: SgfColumnItem }> = ({ item }) => {
  const { image, list, sgfName, sgfURL, sgfTarget, isExternal = false } = item;

  const Content = () => (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      {image?.url && (
        <div className="relative w-full h-24 mb-3 rounded overflow-hidden">
          {' '}
          {/* Fixed height for image */}
          <Image
            src={image.url}
            alt={image.alternativeText || sgfName || 'SGF Image'}
            layout="fill"
            objectFit="cover"
            quality={70}
          />
        </div>
      )}
      {sgfName && (
        <h4 className="text-md font-semibold text-gray-800 mb-2">{sgfName}</h4>
      )}
      {list && list.length > 0 && (
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside mb-3 flex-grow">
          {list.map((listItem, index) => (
            <li key={index}>{listItem.sgfListName}</li>
          ))}
        </ul>
      )}
      {/* Add link indicator if desired */}
      {sgfURL && (
        <span className="text-xs text-blue-500 mt-auto">Learn More &rarr;</span>
      )}
    </div>
  );

  if (sgfURL) {
    if (isExternal) {
      return (
        <a
          href={sgfURL}
          target={sgfTarget === '_blank' ? '_blank' : undefined}
          rel={sgfTarget === '_blank' ? 'noopener noreferrer' : undefined}
          className="block h-full"
        >
          <Content />
        </a>
      );
    } else {
      return (
        <Link href={sgfURL} passHref legacyBehavior>
          <a
            target={sgfTarget === '_blank' ? '_blank' : undefined}
            className="block h-full"
          >
            <Content />
          </a>
        </Link>
      );
    }
  } else {
    // Render content without link if sgfURL is missing
    return <Content />;
  }
};

const SgfBlock: React.FC<SgfBlockProps> = ({ data }) => {
  const {
    heading,
    suheading,
    sgfColumn,
    rightSideRedcolumnList,
    rightSideTitle,
  } = data;

  // Calculate grid columns needed - add 1 for the right-side column if it exists
  const sgfColumnCount = sgfColumn?.length || 0;
  const hasRightColumn =
    rightSideRedcolumnList &&
    rightSideRedcolumnList.length > 0 &&
    rightSideTitle;
  const totalColumns = sgfColumnCount + (hasRightColumn ? 1 : 0);
  // Dynamically set grid template columns - adjust breakpoints and column counts as needed
  const gridColsClass = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(
    totalColumns,
    5
  )} xl:grid-cols-${totalColumns}`; // Cap at 5? Adjust as needed.

  // Assuming this section might be linked from the sub-menu
  const sectionId = 'sgf'; // Match link from StickySubMenu if applicable

  return (
    <section id={sectionId} className="my-12 py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            {heading}
          </h2>
        )}
        {/* Use suheading key from JSON */}
        {suheading && (
          <p className="text-lg text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            {suheading}
          </p>
        )}

        <div className={`${gridColsClass} gap-6`}>
          {/* SGF Columns */}
          {sgfColumn?.map((item, index) => (
            <SgfColumnCard key={index} item={item} />
          ))}

          {/* Right Side Red Column */}
          {hasRightColumn && (
            <div className="bg-red-600 text-white p-4 rounded-lg shadow h-full">
              {' '}
              {/* Example red background */}
              <h4 className="text-md font-semibold mb-2">{rightSideTitle}</h4>
              {rightSideRedcolumnList && rightSideRedcolumnList.length > 0 && (
                <ul className="text-sm space-y-1 list-disc list-inside">
                  {rightSideRedcolumnList.map((listItem, index) => (
                    <li key={index}>{listItem.sgfListName}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SgfBlock;
