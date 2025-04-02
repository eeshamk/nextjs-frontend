import React from 'react';

interface QuotesAndContentsProps {
  data: {
    __typename: 'ComponentBlocksQuotesAndContents';
    quote?: string | null;
    content?: string | null; // Contains HTML
    quoteVariant?: 'Quote_and_content_right_align' | string; // Allow other variants
  };
}

// Helper to render HTML safely
const renderHtml = (htmlString: string | null | undefined) => {
  if (!htmlString) return null;
  // const sanitizedHtml = DOMPurify.sanitize(htmlString); // Consider sanitizing
  return (
    <div
      className="prose prose-sm max-w-none text-gray-600" // Basic styling
      dangerouslySetInnerHTML={{ __html: htmlString /* sanitizedHtml */ }}
    />
  );
};

const QuotesAndContents: React.FC<QuotesAndContentsProps> = ({ data }) => {
  const { quote, content, quoteVariant } = data;

  // Determine layout based on variant
  const isQuoteLeft = quoteVariant === 'Quote_and_content_right_align'; // Assuming this means quote left

  // Default layout if variant is unknown or not specified
  const containerClasses = `my-8 grid grid-cols-1 ${
    isQuoteLeft ? 'md:grid-cols-3' : 'md:grid-cols-1'
  } gap-6 md:gap-8 items-start`;
  const quoteContainerClasses = `p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg ${
    isQuoteLeft ? 'md:col-span-1' : 'md:col-span-1'
  }`; // Quote styling, spans 1 col if left
  const contentContainerClasses = ` ${
    isQuoteLeft ? 'md:col-span-2' : 'md:col-span-1'
  }`; // Content spans remaining cols

  if (!quote && !content) {
    return null; // Don't render if both are empty
  }

  return (
    <div className={containerClasses}>
      {/* Quote Section */}
      {quote && (
        <div className={quoteContainerClasses}>
          <blockquote className="text-lg italic font-medium text-blue-800">
            <svg
              className="w-6 h-6 text-blue-300 mb-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            "{quote}"
          </blockquote>
        </div>
      )}

      {/* Content Section */}
      {content && (
        <div className={contentContainerClasses}>{renderHtml(content)}</div>
      )}
    </div>
  );
};

export default QuotesAndContents;
