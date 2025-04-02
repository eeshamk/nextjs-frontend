import React from 'react';
// Consider installing and using a sanitizer library like DOMPurify
// import DOMPurify from 'isomorphic-dompurify';

interface DescriptionProps {
  data: {
    content: string;
  };
}

const Description: React.FC<DescriptionProps> = ({ data }) => {
  if (!data?.content) {
    return null; // Don't render if content is missing
  }

  // WARNING: Using dangerouslySetInnerHTML requires trusting the source HTML.
  // Since this comes from your Strapi instance, it might be acceptable,
  // but sanitizing it first is best practice, especially if the content
  // could ever be user-generated or imported from less trusted sources.
  // Example with DOMPurify (install first: npm install isomorphic-dompurify):
  // const sanitizedHtml = DOMPurify.sanitize(data.content);
  // return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;

  // Using dangerouslySetInnerHTML directly for now:
  return (
    <div
      className="prose lg:prose-xl max-w-none my-4" // Basic styling with Tailwind Typography
      dangerouslySetInnerHTML={{ __html: data.content }}
    />
  );
};

export default Description;
