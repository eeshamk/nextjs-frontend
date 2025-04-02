import React from 'react';
import Image from 'next/image';

// Interfaces matching the Strapi structure (adjust if needed)
interface IconData {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

interface FutureOfIconItem {
  iconCaption: string;
  icon: IconData | null;
}

interface FutureOfColumnData {
  title: string;
  futureOfIcons: FutureOfIconItem[] | null;
}

interface SolutionItemData {
  title: string;
  description: string; // Contains HTML
}

interface SolutionDescriptionGroup {
  ourSolutionItems: SolutionItemData[] | null;
}

interface OurSolutionsProps {
  data: {
    __typename: 'ComponentBlocksOurSolutions';
    heading?: string | null;
    description?: string | null; // Contains HTML
    futureOfColum: FutureOfColumnData | null; // Note: Key might be 'futureOfColumn' based on inspection
    ourSolutionDescription: SolutionDescriptionGroup[] | null;
  };
}

// Helper to render HTML safely
const renderHtml = (htmlString: string | null | undefined) => {
  if (!htmlString) return null;
  // Consider sanitizing: const sanitizedHtml = DOMPurify.sanitize(htmlString);
  return (
    <div
      className="prose prose-sm max-w-none text-gray-600" // Basic styling for list items etc.
      dangerouslySetInnerHTML={{ __html: htmlString /* sanitizedHtml */ }}
    />
  );
};

const OurSolutions: React.FC<OurSolutionsProps> = ({ data }) => {
  const { heading, description, futureOfColum, ourSolutionDescription } = data;

  // Determine ID based on common patterns or link targets
  // The sticky menu had "#function", let's use that if appropriate for this section
  const sectionId = 'function'; // Or "our-solutions", adjust as needed

  return (
    <section
      id={sectionId}
      className="my-12 py-12 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Main Heading and Description */}
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {heading}
          </h2>
        )}
        {description && (
          <div className="text-center max-w-3xl mx-auto mb-10">
            {renderHtml(description)}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Column 1: Future Of Icons */}
          {futureOfColum && (
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {futureOfColum.title}
              </h3>
              <ul className="space-y-3">
                {futureOfColum.futureOfIcons?.map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    {item.icon?.url && (
                      <div className="relative w-8 h-8 flex-shrink-0">
                        {' '}
                        {/* Adjust size as needed */}
                        <Image
                          src={item.icon.url}
                          alt={item.icon.alternativeText || item.iconCaption}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    )}
                    <span className="text-gray-700">{item.iconCaption}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Columns 2-4: Solution Items */}
          {ourSolutionDescription?.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md border border-gray-100 space-y-4"
            >
              {group.ourSolutionItems?.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">
                    {item.title}
                  </h4>
                  {renderHtml(item.description)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurSolutions;
