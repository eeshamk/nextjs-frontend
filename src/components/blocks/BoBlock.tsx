'use client'; // Required for useState and client-side interactions (tabs)

import React, { useState } from 'react';

// Define interfaces based on the JSON structure observed
interface Question {
  sections: string; // e.g., "Insights_Short_Term"
  question: string;
}

interface Solution {
  solution: string;
  sections: string; // e.g., "Short_Mid"
}

interface BusinessFunctionDetail {
  title: string;
  questions: Question[] | null;
  solutions: Solution[] | null;
}

// Main data structure for the 'businessFunction' object
interface BusinessFunctionData {
  title: string; // e.g., "Sustanibality" (typo from JSON)
  caption: string; // e.g., "Your Business Objectives"
  businessFunctions: BusinessFunctionDetail[] | null;
}

// Props for the BoBlock component
interface BoBlockProps {
  data: {
    __typename: 'ComponentBlocksBo';
    heading?: string | null;
    subHeading?: string | null;
    futureOfItem?: any[] | null; // Structure unclear/icons null, ignore for now
    businessFunction?: BusinessFunctionData | null;
  };
}

const BoBlock: React.FC<BoBlockProps> = ({ data }) => {
  const { heading, subHeading, businessFunction } = data;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); // State for active tab

  if (
    !businessFunction?.businessFunctions ||
    businessFunction.businessFunctions.length === 0
  ) {
    // Don't render if the core data is missing
    return null;
  }

  const tabs = businessFunction.businessFunctions;
  const activeTabData = tabs[selectedTabIndex];

  // Helper to group items by section (e.g., Short Term, Medium Term, Long Term)
  const groupItemsBySection = (
    items: (Question | Solution)[] | null | undefined,
    key: 'question' | 'solution'
  ) => {
    const groups: { [key: string]: string[] } = {
      'Short Term': [],
      'Medium Term': [],
      'Long Term': [],
      Other: [], // Catch-all for unexpected section names
    };

    items?.forEach((item) => {
      const sectionKey = item.sections;
      const value = (item as any)[key];
      if (sectionKey.includes('Short_Term') || sectionKey.includes('Short')) {
        groups['Short Term'].push(value);
      } else if (
        sectionKey.includes('Medium_Term') ||
        sectionKey.includes('Mid')
      ) {
        groups['Medium Term'].push(value);
      } else if (
        sectionKey.includes('Long_Term') ||
        sectionKey.includes('Long')
      ) {
        groups['Long Term'].push(value);
      } else {
        groups['Other'].push(value); // Handle unexpected section names
      }
    });
    return groups;
  };

  const groupedQuestions = groupItemsBySection(
    activeTabData?.questions,
    'question'
  );
  const groupedSolutions = groupItemsBySection(
    activeTabData?.solutions,
    'solution'
  );

  return (
    <section className="my-12 py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            {heading}
          </h2>
        )}
        {subHeading && (
          <p className="text-lg text-center text-gray-600 mb-8">{subHeading}</p>
        )}

        {/* Tabs for Business Functions */}
        <div className="mb-6 flex flex-wrap justify-center border-b border-gray-300">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setSelectedTabIndex(index)}
              className={`px-4 py-3 text-sm md:text-base font-medium transition-colors duration-200 ${
                selectedTabIndex === index
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.title} {/* e.g., Sustainability, Strategy and Future */}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTabData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Questions Column */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Questions Addressed
              </h3>
              {Object.entries(groupedQuestions).map(
                ([term, questions]) =>
                  questions.length > 0 && (
                    <div key={term} className="mb-4">
                      <h4 className="text-lg font-medium text-gray-700 mb-2">
                        {term}
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {questions.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )
              )}
            </div>

            {/* Solutions Column */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Relevant Solutions
              </h3>
              {Object.entries(groupedSolutions).map(
                ([term, solutions]) =>
                  solutions.length > 0 && (
                    <div key={term} className="mb-4">
                      <h4 className="text-lg font-medium text-gray-700 mb-2">
                        {term}
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {solutions.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BoBlock;
