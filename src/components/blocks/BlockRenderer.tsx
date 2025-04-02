import React from 'react';
import Heading from './Heading';
import Description from './Description';
import BannerContent from './BannerContent';
import Button from './Button';
import ImageAndText from './ImageAndText';
import IndustryParticipants from './IndustryParticipants';
import ClientLogos from './ClientLogos';
import SolutionsContentSlider from './SolutionsContentSlider';
import StickySubMenu from './StickySubMenu';
import OurSolutions from './OurSolutions';
import DecisiveInsights from './DecisiveInsights';
import BoBlock from './BoBlock';
// import PromotionalBannerCta from './PromotionalBannerCta';
import PostContent2ColumnLayout from './PostContent2ColumnLayout';
import PostContent4ColumnLayout from './PostContent4ColumnLayout';
import ImageAndTextClickable from './ImageAndTextClickable';
import SgfBlock from './SgfBlock';
import ClientStories from './ClientStories';
import PromotionalBannerCta from './PromotionalBannerCta';
import ImagePopup from './ImagePopup';
import OverviewHeadingAndContent from './OverviewHeadingAndContent';
import QuotesAndContents from './QuotesAndContents';
// import PromotionalBannerCta from './PromotionalBannerCta';
// Import other block components here as you create them
// import ImageAndText from './ImageAndText';
// ... etc.

interface BlockRendererProps {
  block: any; // Consider defining a more specific type for blocks
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  // Check for null block early
  if (!block || !block.__typename) {
    console.warn('BlockRenderer received null or invalid block:', block);
    return null;
  }

  switch (block.__typename) {
    case 'ComponentBlocksHeading':
      return <Heading data={block} />;
    case 'ComponentBlocksDescription':
      return <Description data={block} />;
    case 'ComponentBlocksBannerContent':
      return <BannerContent data={block} />;
    case 'ComponentBlocksButton':
      return <Button data={block} />;
    case 'ComponentBlocksImageAndTextNonClickable':
      return <ImageAndText data={block} />;
    case 'ComponentBlocksIndustryParticipants':
      return <IndustryParticipants data={block} />;
    case 'ComponentBlocksClientLogos':
      return <ClientLogos data={block} />;
    case 'ComponentBlocksSolutionsContentSlider':
      return <SolutionsContentSlider data={block} />;
    case 'ComponentBlocksStickySubMenu':
      return <StickySubMenu data={block} />;
    case 'ComponentBlocksOurSolutions':
      return <OurSolutions data={block} />;
    case 'ComponentBlocksDecisiveInsights':
      return <DecisiveInsights data={block} />;
    case 'ComponentBlocksBo':
      return <BoBlock data={block} />;
    case 'ComponentBlocksPromotionalBannerCta':
      return <PromotionalBannerCta data={block} />;
    case 'ComponentBlocksPostContent2ColumnLayout':
      return <PostContent2ColumnLayout data={block} />;
    case 'ComponentBlocksPostContent4ColumnLayout':
      return <PostContent4ColumnLayout data={block} />;
    case 'ComponentBlocksImageAndTextClickable':
      return <ImageAndTextClickable data={block} />;
    case 'ComponentBlocksSgf':
      return <SgfBlock data={block} />;
    case 'ComponentBlocksClientsStories':
      return <ClientStories data={block} />;
    case 'ComponentBlocksImagePopup':
      return <ImagePopup data={block} />;
    case 'ComponentBlocksOverviewHeadingAndContent':
      return <OverviewHeadingAndContent data={block} />;
    case 'ComponentBlocksQuotesAndContents':
      return <QuotesAndContents data={block} />;

    // Add cases for other components:
    // case 'ComponentBlocksImageAndTextNonClickable':
    //    return <ImageAndText data={block} />;
    // ... etc.

    default:
      console.warn(`Component not found for block type: ${block.__typename}`);
      // Optionally render a placeholder or nothing
      return (
        <div className="my-4 p-4 border border-dashed border-red-400 bg-red-50">
          <p className="font-semibold text-red-700">Missing Component</p>
          <p className="text-sm text-red-600">
            No component implemented for block type:{' '}
            <code>{block.__typename}</code>
          </p>
          <pre className="mt-2 text-xs bg-gray-100 p-1 rounded overflow-auto">
            {JSON.stringify(block, null, 2)}
          </pre>
        </div>
      );
  }
};

export default BlockRenderer;
