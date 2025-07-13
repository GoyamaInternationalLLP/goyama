"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "../constants";

const Navbar: React.FC = () => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // clear pending timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const toggleSubmenu = (category: string) => {
    setActiveSubmenu((prev) => (prev === category ? null : category));
  };

  const handleCategoryClick = () => {
    setShowDropdown(true);
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    dropdownTimeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
      setActiveSubmenu(null);
    }, 10000);
  };

  return (
    <nav className="relative z-30 py-5 px-4 max-w-[1440px] mx-auto flex items-center justify-between bg-white animate-slidedown">
      {/* Logo */}
      <div className="flex-1">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Company logo"
            width={190}
            height={200}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex gap-12 absolute left-1/2 -translate-x-1/2">
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              className="regular-16 text-gray-900 cursor-pointer pb-1.5 transition-all hover:font-bold"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li className="relative">
          <button
            onClick={handleCategoryClick}
            className="regular-16 text-gray-900 cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            Categories
          </button>

          {showDropdown && (
            <div className="absolute top-full left-0 mt-3 bg-white text-gray-900 shadow-xl rounded-lg p-4 z-50 w-64">
              <ul className="space-y-2">
                <li
                  onClick={() => toggleSubmenu("construction")}
                  className="bold-16 text-green-900 cursor-pointer hover:underline"
                >
                  Construction Materials
                </li>
                <li
                  onClick={() => toggleSubmenu("interior")}
                  className="bold-16 text-green-900 cursor-pointer hover:underline"
                >
                  Interior
                </li>
              </ul>

              {activeSubmenu === "construction" && (
                <div className="absolute left-full top-0 ml-2 bg-white rounded-lg shadow-lg p-3 w-48">
                  <ul className="space-y-1">
                    <li className="cursor-pointer hover:text-green-900">Cement</li>
                    <li className="cursor-pointer hover:text-green-900">Flyash</li>
                  </ul>
                </div>
              )}

              {activeSubmenu === "interior" && (
                <div className="absolute left-full top-12 ml-2 bg-white rounded-lg shadow-lg p-3 w-48">
                  <ul className="space-y-1">
                    <li
                      onClick={() => console.log("Quartz selected")}
                      className="cursor-pointer hover:text-green-900"
                    >
                      Quartz
                    </li>
                    <li className="cursor-pointer hover:text-green-900">Marble</li>
                    <li className="cursor-pointer hover:text-green-900">Tiles</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="flex-1 flex justify-end lg:hidden">
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="p-2 focus:outline-none"
        >
          <Menu className="w-6 h-6 text-gray-900" />
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-40 lg:hidden">
          <ul className="flex flex-col p-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="regular-16 text-gray-900 cursor-pointer"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="relative">
              <button
                onClick={handleCategoryClick}
                className="regular-16 text-gray-900 cursor-pointer"
              >
                Categories
              </button>

              {showDropdown && (
                <div className="mt-2 bg-white rounded-lg shadow-lg p-4">
                  <ul className="space-y-2">
                    <li
                      onClick={() => toggleSubmenu("construction")}
                      className="cursor-pointer hover:text-green-900"
                    >
                      Construction Materials
                    </li>
                    <li
                      onClick={() => toggleSubmenu("interior")}
                      className="cursor-pointer hover:text-green-900"
                    >
                      Interior
                    </li>
                  </ul>
                  {activeSubmenu === "construction" && (
                    <ul className="mt-2 pl-4 space-y-1">
                      <li className="cursor-pointer hover:text-green-900">Cement</li>
                      <li className="cursor-pointer hover:text-green-900">Flyash</li>
                    </ul>
                  )}
                  {activeSubmenu === "interior" && (
                    <ul className="mt-2 pl-4 space-y-1">
                      <li className="cursor-pointer hover:text-green-900">Quartz</li>
                      <li className="cursor-pointer hover:text-green-900">Marble</li>
                      <li className="cursor-pointer hover:text-green-900">Tiles</li>
                    </ul>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
