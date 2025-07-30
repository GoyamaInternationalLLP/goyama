"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "../constants";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

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
              className={`regular-16 text-gray-900 cursor-pointer pb-1.5 transition-all hover:font-bold ${
                pathname === link.href ? "underline" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}

        {/* Categories dropdown */}
        <li className="relative">
          <button
            ref={buttonRef}
            onClick={toggleDropdown}
            className="regular-16 text-gray-900 cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            Categories
          </button>

          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 mt-3 bg-white text-gray-900 shadow-xl rounded-lg p-4 z-50 w-48"
            >
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/flyash"
                    className="cursor-pointer hover:text-green-900 block"
                  >
                    Flyash
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Quartz"
                    className="cursor-pointer hover:text-green-900 block"
                  >
                    Quartz
                  </Link>
                </li>
              </ul>
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
                  className={`regular-16 text-gray-900 cursor-pointer ${
                    pathname === link.href ? "underline" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="regular-16 text-gray-900 cursor-pointer"
              >
                Categories
              </button>

              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="mt-2 bg-white rounded-lg shadow-lg p-4"
                >
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/flyash"
                        className="cursor-pointer hover:text-green-900 block"
                      >
                        Flyash
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/Quartz"
                        className="cursor-pointer hover:text-green-900 block"
                      >
                        Quartz
                      </Link>
                    </li>
                  </ul>
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
