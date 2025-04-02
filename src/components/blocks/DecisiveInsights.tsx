import React from 'react';
import Link from 'next/link';

// Interface for the button data, adapting field names from JSON
interface PlatformButtonData {
  buttonName: string;
  buttonLink: string;
  target?: '_self' | '_blank';
  variant?: 'Standard' | string;
  isExternal?: boolean;
  caption?: string | null;
  leftIcon?: any | null; // Define if needed
  rightIcon?: any | null; // Define if needed
  backgroundImage?: any | null; // Define if needed
}

// Props for the main component
interface DecisiveInsightsProps {
  data: {
    __typename: 'ComponentBlocksDecisiveInsights';
    heading?: string | null;
    subHeading?: string | null;
    iconiblocksutton?: PlatformButtonData[] | null; // Using the key from JSON
    description?: string | null; // Contains HTML
  };
}

// Helper to render HTML safely
const renderHtml = (htmlString: string | null | undefined) => {
  if (!htmlString) return null;
  // const sanitizedHtml = DOMPurify.sanitize(htmlString); // Consider sanitizing
  return (
    <div
      className="prose lg:prose-lg max-w-none text-gray-700" // Style for the description
      dangerouslySetInnerHTML={{ __html: htmlString /* sanitizedHtml */ }}
    />
  );
};

// Reusable Button component logic (similar to the standalone Button block)
const PlatformButton: React.FC<{ buttonData: PlatformButtonData }> = ({
  buttonData,
}) => {
  const {
    buttonName,
    buttonLink,
    isExternal = false,
    target = '_self',
    variant = 'Standard',
  } = buttonData;

  // Define button styles - adjust as needed for this context
  const buttonClasses =
    'px-5 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 inline-block text-center font-medium';

  if (isExternal) {
    return (
      <a
        href={buttonLink}
        target={target === '_blank' ? '_blank' : undefined}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={buttonClasses}
      >
        {buttonName}
      </a>
    );
  } else {
    return (
      <Link href={buttonLink} passHref legacyBehavior>
        <a
          target={target === '_blank' ? '_blank' : undefined}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className={buttonClasses}
        >
          {buttonName}
        </a>
      </Link>
    );
  }
};

const DecisiveInsights: React.FC<DecisiveInsightsProps> = ({ data }) => {
  const { heading, subHeading, iconiblocksutton: buttons, description } = data; // Use the key from JSON

  // Assuming this section might be linked from the sub-menu
  const sectionId = 'industry-technology-platforms'; // Match link from StickySubMenu if applicable

  return (
    <section id={sectionId} className="my-12 py-12">
      <div className="container mx-auto px-4 text-center">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{heading}</h2>
        )}
        {subHeading && (
          <p className="text-lg text-gray-600 mb-6">{subHeading}</p>
        )}

        {/* Platform Buttons */}
        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {buttons.map((button, index) => (
              <PlatformButton key={index} buttonData={button} />
            ))}
          </div>
        )}

        {/* Description */}
        {description && (
          <div className="max-w-4xl mx-auto text-left md:text-center">
            {renderHtml(description)}
          </div>
        )}
      </div>
    </section>
  );
};

export default DecisiveInsights;
