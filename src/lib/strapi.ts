import fs from 'fs';
import path from 'path';

// Define the base path to the Strapi JSON data directory, NOW INSIDE public/data/
// process.cwd() is the root of the Next.js project (e.g., nextjs-frontend)
const STRAPI_DATA_PATH = path.join(process.cwd(), 'public', 'data'); // <--- UPDATED LINE

/**
 * Reads and parses a JSON file.
 * @param filePath - The absolute path to the JSON file.
 * @returns The parsed JSON object or null if an error occurs.
 */
function readJsonFile(filePath: string): any | null {
  try {
    // Check if file exists before attempting to read
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File not found at ${filePath}`);
      return null;
    }
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error reading or parsing JSON file at ${filePath}: ${error.message}`
      );
    } else {
      console.error(
        `An unknown error occurred while processing ${filePath}:`,
        error
      );
    }
    return null;
  }
}

/**
 * Fetches general page data from the corresponding JSON file in the public/data/Pages directory.
 */
export function getPageData(pageSlug: string): any | null {
  // Path relative to STRAPI_DATA_PATH (which is now public/data/)
  const filePath = path.join(STRAPI_DATA_PATH, 'Pages', `${pageSlug}.json`);
  console.log(`Attempting to read general page data from: ${filePath}`);

  const jsonData = readJsonFile(filePath);

  if (
    !jsonData ||
    !jsonData.data ||
    !Array.isArray(jsonData.data.pages) ||
    jsonData.data.pages.length === 0
  ) {
    console.error(
      `Error: Page data not found or invalid format in ${filePath} for slug "${pageSlug}"`
    );
    return null;
  }
  const pageData = jsonData.data.pages.find(
    (page: any) => page.slug === pageSlug
  );

  if (!pageData) {
    console.error(
      `Error: Page object with slug "${pageSlug}" not found within the 'pages' array in ${filePath}`
    );
    return null;
  }
  return pageData;
}

/**
 * Fetches industry page data from the corresponding JSON file in the public/data/Pages/industry directory.
 */
export function getIndustryPageData(industrySlug: string): any | null {
  const filePath = path.join(
    STRAPI_DATA_PATH,
    'Pages',
    'industry',
    `${industrySlug}.json`
  );
  console.log(`Attempting to read industry page data from: ${filePath}`);

  const jsonData = readJsonFile(filePath);

  if (
    !jsonData ||
    !jsonData.data ||
    !Array.isArray(jsonData.data.pages) ||
    jsonData.data.pages.length === 0
  ) {
    console.error(
      `Error: Industry page data not found or invalid format in ${filePath} for slug "${industrySlug}"`
    );
    return null;
  }

  const pageData = jsonData.data.pages.find(
    (page: any) => page.slug === industrySlug
  );

  if (!pageData) {
    console.warn(
      `Warning: Industry page with slug "${industrySlug}" not found within ${filePath}. Trying the first page object.`
    );
    if (jsonData.data.pages.length > 0) {
      return jsonData.data.pages[0];
    } else {
      console.error(`Error: No page objects found in ${filePath}`);
      return null;
    }
  }
  return pageData;
}

/**
 * Fetches article data from the corresponding JSON file in the public/data/Articles directory.
 */
export function getArticleData(articleSlug: string): any | null {
  const filePath = path.join(
    STRAPI_DATA_PATH,
    'Articles',
    `${articleSlug}.json`
  );
  console.log(`Attempting to read article data from: ${filePath}`);

  const jsonData = readJsonFile(filePath);

  if (
    !jsonData ||
    !jsonData.data ||
    !Array.isArray(jsonData.data.articles) ||
    jsonData.data.articles.length === 0
  ) {
    console.error(
      `Error: Article data not found or invalid format in ${filePath} for slug "${articleSlug}"`
    );
    return null;
  }
  return jsonData.data.articles[0];
}

/**
 * Fetches case study data from the corresponding JSON file in the public/data/Case Study directory.
 */
export function getCaseStudyData(caseStudySlug: string): any | null {
  const filePath = path.join(
    STRAPI_DATA_PATH,
    'Case Study',
    `${caseStudySlug}.json`
  );
  console.log(`Attempting to read case study data from: ${filePath}`);

  const jsonData = readJsonFile(filePath);

  if (
    !jsonData ||
    !jsonData.data ||
    !Array.isArray(jsonData.data.caseStudies) ||
    jsonData.data.caseStudies.length === 0
  ) {
    console.error(
      `Error: Case study data not found or invalid format in ${filePath} for slug "${caseStudySlug}"`
    );
    return null;
  }
  return jsonData.data.caseStudies[0];
}

/**
 * Fetches research report data from the corresponding JSON file in the public/data/Research Reports directory.
 */
export function getResearchReportData(reportSlug: string): any | null {
  const filePath = path.join(
    STRAPI_DATA_PATH,
    'Research Reports',
    `${reportSlug}.json`
  );
  console.log(`Attempting to read research report data from: ${filePath}`);

  const jsonData = readJsonFile(filePath);

  if (
    !jsonData ||
    !jsonData.data ||
    !Array.isArray(jsonData.data.researchReports) ||
    jsonData.data.researchReports.length === 0
  ) {
    console.error(
      `Error: Research report data not found or invalid format in ${filePath} for slug "${reportSlug}"`
    );
    return null;
  }
  return jsonData.data.researchReports[0];
}

/**
 * Fetches webinar data from the corresponding JSON file in the public/data/Webinars directory.
 */
export function getWebinarData(webinarSlug: string): any | null {
  const filePath = path.join(
    STRAPI_DATA_PATH,
    'Webinars',
    `${webinarSlug}.json`
  );
  console.log(`Attempting to read webinar data from: ${filePath}`);

  const jsonData = readJsonFile(filePath);

  if (
    !jsonData ||
    !jsonData.data ||
    !Array.isArray(jsonData.data.webinars) ||
    jsonData.data.webinars.length === 0
  ) {
    console.error(
      `Error: Webinar data not found or invalid format in ${filePath} for slug "${webinarSlug}"`
    );
    return null;
  }
  return jsonData.data.webinars[0];
}

/**
 * Constructs the URL path for a given content type and slug.
 */
export function getContentTypeUrl(
  contentType: string | null | undefined,
  slug: string | null | undefined
): string {
  if (!contentType || !slug) {
    return '#';
  }

  const basePathMap: { [key: string]: string } = {
    articles: '/articles',
    'case-studies': '/case-studies',
    case_study: '/case-studies',
    'research-reports': '/research-reports',
    research_report: '/research-reports',
    webinars: '/webinars',
    webinar: '/webinars',
    news: '/news',
    events: '/events',
    'white-papers': '/white-papers',
    white_paper: '/white-papers',
  };

  const normalizedContentType = contentType.toLowerCase().replace(/_/g, '-');
  const finalKey = basePathMap[normalizedContentType + 's']
    ? normalizedContentType + 's'
    : normalizedContentType;
  const basePath = basePathMap[finalKey];

  if (!basePath) {
    console.warn(
      `Base path not defined for contentType: ${contentType} (normalized: ${normalizedContentType}, finalKey: ${finalKey})`
    );
    return '#';
  }

  return `${basePath}/${slug}`;
}

/**
 * Reads all JSON files in a specified content directory within the public/data folder
 * and extracts key data. Used for building listing pages.
 * @param contentTypeDir - The subdirectory name under public/data/ (e.g., 'Articles', 'Case Study').
 * @param dataKey - The key in the JSON holding the array (e.g., 'articles', 'caseStudies').
 * @returns An array of objects containing preview data for each item.
 */
export function getAllContentData(
  contentTypeDir: string,
  dataKey: string
): any[] {
  // Path is now relative to public/data/
  const dirPath = path.join(STRAPI_DATA_PATH, contentTypeDir);
  let allData: any[] = [];

  try {
    if (!fs.existsSync(dirPath)) {
      console.warn(`Directory not found for listing: ${dirPath}`);
      return [];
    }
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      if (path.extname(file) === '.json') {
        const filePath = path.join(dirPath, file);
        const jsonData = readJsonFile(filePath);
        if (
          jsonData?.data?.[dataKey] &&
          Array.isArray(jsonData.data[dataKey]) &&
          jsonData.data[dataKey].length > 0
        ) {
          const itemData = jsonData.data[dataKey][0];
          allData.push({
            slug: itemData?.slug || path.basename(file, '.json'),
            title: itemData?.title || 'Untitled',
            excerpts: itemData?.excerpts || itemData?.excrept || null,
            featuredImage: itemData?.featuredImage || null,
            postType:
              itemData?.postType ||
              contentTypeDir.toLowerCase().replace(' ', '-'),
          });
        } else {
          console.warn(
            `Skipping file due to unexpected structure or empty data array: ${filePath}`
          );
        }
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }

  return allData;
}

// Add specific get functions for Events, News, Client Videos, White Papers if needed
