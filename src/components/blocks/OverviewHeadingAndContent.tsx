import React from 'react';

interface OverviewHeadingAndContentProps {
  data: {
    __typename: 'ComponentBlocksOverviewHeadingAndContent';
    heading?: string | null;
    description?: string | null; // Contains HTML
    variant?: 'Content_with_Top_and_Bottom_border' | string; // Allow other variants
  };
}

// Helper to render HTML safely
const renderHtml = (htmlString: string | null | undefined) => {
  if (!htmlString) return null;
  // const sanitizedHtml = DOMPurify.sanitize(htmlString); // Consider sanitizing
  return (
    <div
      className="prose max-w-none text-gray-700" // Basic styling
      dangerouslySetInnerHTML={{ __html: htmlString /* sanitizedHtml */ }}
    />
  );
};

const OverviewHeadingAndContent: React.FC<OverviewHeadingAndContentProps> = ({
  data,
}) => {
  const { heading, description, variant } = data;

  // Apply styles based on the variant
  let containerClasses = 'my-8'; // Default margin
  if (variant === 'Content_with_Top_and_Bottom_border') {
    containerClasses += ' border-t border-b border-gray-200 py-6'; // Add borders and padding
  } else {
    containerClasses += ' py-4'; // Default padding if no border
  }

  return (
    <div className={containerClasses}>
      {heading && (
        <h2 className="text-xl font-semibold mb-3 text-gray-800">{heading}</h2>
      )}
      {renderHtml(description)}
    </div>
  );
};

export default OverviewHeadingAndContent;
