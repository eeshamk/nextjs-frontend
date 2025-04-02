import React from 'react';
import Link from 'next/link';

// Define the props for the Button component based on Strapi data
interface ButtonProps {
  data: {
    __typename: 'ComponentBlocksButton';
    buttonName: string;
    buttonLink: string;
    isExternal?: boolean;
    target?: '_self' | '_blank';
    variant?: 'Primary' | 'Secondary' | string; // Allow different styles
  };
}

const Button: React.FC<ButtonProps> = ({ data }) => {
  const {
    buttonName,
    buttonLink,
    isExternal = false, // Default to internal
    target = '_self',
    variant = 'Primary', // Default variant
  } = data;

  // Basic styling based on variant - customize these Tailwind classes extensively
  const baseClasses =
    'px-6 py-2 rounded hover:opacity-90 transition duration-300 inline-block text-center my-4';
  const variantClasses = {
    Primary: 'bg-blue-600 text-white',
    Secondary: 'bg-gray-200 text-gray-800 border border-gray-300',
    // Add more variants as needed
  };

  const combinedClasses = `${baseClasses} ${
    variantClasses[variant as keyof typeof variantClasses] ||
    variantClasses.Primary
  }`;

  if (!buttonName || !buttonLink) {
    console.warn(
      'Button component rendered without required name or link',
      data
    );
    return null; // Don't render if essential props are missing
  }

  if (isExternal) {
    return (
      <a
        href={buttonLink}
        target={target === '_blank' ? '_blank' : undefined}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={combinedClasses}
      >
        {buttonName}
      </a>
    );
  } else {
    return (
      <Link href={buttonLink} passHref legacyBehavior>
        <a
          target={target === '_blank' ? '_blank' : undefined}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined} // Good practice even for internal links opening in new tabs
          className={combinedClasses}
        >
          {buttonName}
        </a>
      </Link>
    );
  }
};

export default Button;
