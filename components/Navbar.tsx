"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { NAV_LINKS } from "../constants";

const Navbar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleSubmenu = (category: string) => {
    setActiveSubmenu((prev) => (prev === category ? null : category));
  };

  const handleCategoryClick = () => {
    setShowDropdown(true);

    // Clear any previous timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }

    // Set a new timeout to auto-hide after 10 seconds
    dropdownTimeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
      setActiveSubmenu(null);
    }, 10000);
  };

  return (
    <nav className="relative z-30 py-5 px-4 max-w-[1440px] mx-auto flex items-center justify-between">
      {/* Logo */}
      <div className="flex-1">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={190}
            height={200}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Centered Navigation */}
      <ul className="hidden lg:flex gap-12 absolute left-1/2 -translate-x-1/2">
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link href={link.href} scroll={true}>
              <span className="regular-16 text-gray-900 cursor-pointer pb-1.5 transition-all hover:font-bold">
                {link.label}
              </span>
            </Link>
          </li>
        ))}

        {/* Categories */}
        <div className="relative">
          <span
            className="regular-16 text-gray-900 cursor-pointer pb-1.5 transition-all hover:font-bold"
            onClick={handleCategoryClick}
          >
            Categories
          </span>

          {showDropdown && (
            <div className="absolute top-full left-0 mt-3 bg-white text-gray-900 shadow-xl rounded-lg p-4 z-50 w-64">
              <ul className="space-y-2">
                <li
                  className="bold-16 text-green-900 cursor-pointer hover:underline"
                  onClick={() => toggleSubmenu("construction")}
                >
                  Construction Materials
                </li>
                <li
                  className="bold-16 text-green-900 cursor-pointer hover:underline"
                  onClick={() => toggleSubmenu("interior")}
                >
                  Interior
                </li>
              </ul>

              {/* Submenus */}
              {activeSubmenu === "construction" && (
                <div className="absolute left-full top-0 ml-2 bg-white rounded-lg shadow-lg p-3 w-48">
                  <ul className="space-y-1">
                    <li className="cursor-pointer hover:text-green-900">
                      Cement
                    </li>
                    <li className="cursor-pointer hover:text-green-900">
                      Flyash
                    </li>
                  </ul>
                </div>
              )}
              {activeSubmenu === "interior" && (
                <div className="absolute left-full top-12 ml-2 bg-white rounded-lg shadow-lg p-3 w-48">
                  <ul className="space-y-1">
                    <li>
                      <Link
                        href="/Quartz"
                        className="cursor-pointer hover:text-green-900"
                      >
                        Quartz
                      </Link>
                    </li>
                    <li className="cursor-pointer hover:text-green-900">
                      Marble
                    </li>
                    <li className="cursor-pointer hover:text-green-900">
                      Tiles
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </ul>

      {/* Mobile menu */}
      <div className="flex-1 flex justify-end lg:hidden">
        <Image
          src="menu.svg"
          alt="menu"
          width={32}
          height={32}
          className="cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Navbar;
