import React from 'react';

interface HeadingProps {
  data: {
    text: string;
    // Add other potential heading properties if needed (e.g., level: 'h1' | 'h2')
  };
}

const Heading: React.FC<HeadingProps> = ({ data }) => {
  if (!data?.text) {
    return null; // Don't render if text is missing
  }

  // You might want to add logic here later to choose h1, h2, h3 etc.
  // based on the data or context. For now, we'll use h2.
  return <h2 className="text-2xl font-bold my-4">{data.text}</h2>;
};

export default Heading;
