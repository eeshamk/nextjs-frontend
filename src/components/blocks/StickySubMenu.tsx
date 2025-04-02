'use client'; // Needs client-side hooks for scroll detection and state

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'; // Using Link for consistency, though <a> is fine for anchors

// Interface for individual menu items
interface MenuItemData {
  menuLabel: string;
  menuLink: string;
  menuTarget?: '_self' | '_blank';
  isMenuLinkExternal?: boolean;
}

// Props for the main component
interface StickySubMenuProps {
  data: MenuItemData & {
    // Includes the main item props directly
    __typename: 'ComponentBlocksStickySubMenu';
    stickyMenus?: MenuItemData[] | null; // Array of additional items
  };
}

const StickySubMenu: React.FC<StickySubMenuProps> = ({ data }) => {
  const {
    menuLabel,
    menuLink,
    menuTarget,
    isMenuLinkExternal,
    stickyMenus = [],
  } = data;
  const [isSticky, setIsSticky] = useState(false);
  const [initialTopOffset, setInitialTopOffset] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null); // Ref to get the menu element

  // Combine the main menu item with the stickyMenus array
  const allMenuItems: MenuItemData[] = [
    { menuLabel, menuLink, menuTarget, isMenuLinkExternal },
    ...(stickyMenus || []),
  ];

  useEffect(() => {
    if (!menuRef.current) return;

    // Store the initial top position of the menu relative to the viewport
    const initialOffset =
      menuRef.current.getBoundingClientRect().top + window.scrollY;
    setInitialTopOffset(initialOffset);

    const handleScroll = () => {
      if (!menuRef.current) return;
      // Check if the user has scrolled past the initial position
      setIsSticky(window.scrollY > initialOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initialTopOffset]); // Rerun effect if initialTopOffset changes (though it shouldn't after mount)

  // Define styles based on sticky state
  const stickyClasses =
    'fixed top-0 left-0 right-0 z-40 bg-white shadow-md animate-fade-down'; // Basic sticky styles + simple animation
  const normalClasses = 'relative'; // Normal position

  // Placeholder to prevent content jump when menu becomes fixed
  const placeholderHeight = isSticky ? menuRef.current?.offsetHeight || 0 : 0;

  return (
    <>
      {/* Placeholder Div */}
      {isSticky && <div style={{ height: `${placeholderHeight}px` }} />}

      {/* Actual Menu */}
      <div
        ref={menuRef}
        className={`transition-all duration-300 ease-in-out ${
          isSticky ? stickyClasses : normalClasses
        }`}
      >
        <nav className="container mx-auto px-4 py-3 border-b border-gray-200">
          <ul className="flex flex-wrap justify-center space-x-4 md:space-x-6">
            {allMenuItems.map((item, index) => (
              <li key={index}>
                {item.isMenuLinkExternal ? (
                  <a
                    href={item.menuLink}
                    target={item.menuTarget === '_blank' ? '_blank' : undefined}
                    rel={
                      item.menuTarget === '_blank'
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="text-gray-600 hover:text-blue-600 transition duration-200 py-1"
                  >
                    {item.menuLabel}
                  </a>
                ) : (
                  // Use standard <a> for anchor links for simplicity and browser handling
                  // Or use Link with scroll={true} (default) if needed for complex routing later
                  <a
                    href={item.menuLink} // Use href directly for anchor links
                    className="text-gray-600 hover:text-blue-600 transition duration-200 py-1"
                  >
                    {item.menuLabel}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default StickySubMenu;
