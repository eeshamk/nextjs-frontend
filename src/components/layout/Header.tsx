'use client'; // Need client-side hooks for state and event handling

import React, { useState } from 'react';
import Link from 'next/link';

// Define the structure for our industry links
interface IndustryLink {
  name: string;
  slug: string;
}

// Define structure for example content links
interface ContentLink {
  name: string;
  url: string;
}

// List of industries - could be fetched or defined elsewhere later
const industryLinks: IndustryLink[] = [
  {
    name: 'Chemicals & Natural Resources',
    slug: 'chemicals-and-natural-resources',
  },
  { name: 'Mobility', slug: 'mobility' },
  { name: 'Energy', slug: 'energy' },
  { name: 'Life Sciences', slug: 'life-sciences' },
  { name: 'Industrial Equipment', slug: 'industrial-equipment' },
  { name: 'Food & Nutrition', slug: 'food-and-nutrition' },
  { name: 'Home & Personal Care', slug: 'home-and-personal-care' },
  // Add more industries if they exist in your Pages/industry folder
];

// TEMPORARY: Links to specific example content pages
// Ideally, these would link to listing pages like /articles, /case-studies, etc.
const perspectiveLinks: ContentLink[] = [
  {
    name: 'Article: Autonomous Haulage',
    url: '/articles/autonomous-haulage-systems-the-future-of-mining-operations',
  },
  {
    name: 'Article: Strategic Sustainability',
    url: '/articles/strategic-sustainability-leveraging-materiality-assessment-for-unified-esg-impact',
  },
  {
    name: 'Case Study: Circular Economy',
    url: '/case-studies/analyzing-circular-economy-innovations-across-packaging-devices-and-process-landscapes',
  },
  {
    name: 'Case Study: Anti-aging',
    url: '/case-studies/start-ups-landscape-anti-aging-and-personalization',
  },
  {
    name: 'Report: Li-Battery Value Chain',
    url: '/research-reports/closing-the-400-gwh-gap-how-the-us-europe-are-reshaping-the-li-battery-value-chain',
  },
  {
    name: 'Webinar: CO2 Emissions',
    url: '/webinars/eyes-on-emissions-monitoring-co-2-across-the-ccus-value-chain',
  },
  // Add more examples if you have the JSON files
];

const Header: React.FC = () => {
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isPerspectivesOpen, setIsPerspectivesOpen] = useState(false); // State for new dropdown

  const closeAllDropdowns = () => {
    setIsIndustriesOpen(false);
    setIsPerspectivesOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {' '}
      {/* Basic styling and sticky positioning */}
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Site Title/Logo Placeholder */}
        <div>
          <Link href="/" passHref legacyBehavior>
            <a
              className="text-xl font-bold text-gray-800 hover:text-blue-600 transition duration-200"
              onClick={closeAllDropdowns}
            >
              FutureBridge {/* Replace with Logo Component later if needed */}
            </a>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-4 md:space-x-6 items-center">
          <li>
            <Link href="/about" passHref legacyBehavior>
              <a
                className="text-gray-600 hover:text-blue-600 transition duration-200 py-2"
                onClick={closeAllDropdowns}
              >
                About
              </a>
            </Link>
          </li>
          <li>
            <Link href="/solutions" passHref legacyBehavior>
              <a
                className="text-gray-600 hover:text-blue-600 transition duration-200 py-2"
                onClick={closeAllDropdowns}
              >
                Solutions
              </a>
            </Link>
          </li>

          {/* Industries Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => {
              closeAllDropdowns();
              setIsIndustriesOpen(true);
            }}
            onMouseLeave={() => setIsIndustriesOpen(false)}
          >
            <button // Using a button for semantics, though could be a div/span
              className="text-gray-600 hover:text-blue-600 transition duration-200 py-2 flex items-center"
              aria-haspopup="true"
              aria-expanded={isIndustriesOpen}
            >
              Industries
              {/* Simple dropdown arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  isIndustriesOpen ? 'rotate-180' : ''
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown Menu - Conditionally Rendered */}
            {isIndustriesOpen && (
              <div className="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <ul
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {industryLinks.map((industry) => (
                    <li key={industry.slug} role="none">
                      <Link href={`/${industry.slug}`} passHref legacyBehavior>
                        <a
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                          role="menuitem"
                          onClick={closeAllDropdowns} // Close dropdown on click
                        >
                          {industry.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>

          {/* Perspectives Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => {
              closeAllDropdowns();
              setIsPerspectivesOpen(true);
            }}
            onMouseLeave={() => setIsPerspectivesOpen(false)}
          >
            <button
              className="text-gray-600 hover:text-blue-600 transition duration-200 py-2 flex items-center"
              aria-haspopup="true"
              aria-expanded={isPerspectivesOpen}
            >
              Perspectives
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  isPerspectivesOpen ? 'rotate-180' : ''
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isPerspectivesOpen && (
              <div className="absolute right-0 mt-0 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                {' '}
                {/* Wider dropdown, align right */}
                <ul className="py-1" role="menu">
                  {perspectiveLinks.map((link) => (
                    <li key={link.url} role="none">
                      <Link href={link.url} passHref legacyBehavior>
                        <a
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                          role="menuitem"
                          onClick={closeAllDropdowns}
                        >
                          {link.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                  {/* TODO: Add links to actual listing pages like /articles, /case-studies here later */}
                </ul>
              </div>
            )}
          </li>

          {/* Add more top-level navigation links here if needed */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
