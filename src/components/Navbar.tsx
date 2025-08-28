"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "../constants";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { FaAngleDown } from "react-icons/fa";
import { Category } from "../../types";
import { fetchCategories } from "@/lib/api";

const Navbar: React.FC = () => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchCategories();
      console.log(res);
      setCategories(res);
    };
    fetchData();
  }, []);

  return (
    <nav className="z-30 py-1 px-20 flex items-center justify-between bg-white animate-slidedown shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
      <div>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Company logo"
            width={230}
            height={240}
            className="object-contain"
          />
        </Link>
      </div>

      <div className="hidden lg:flex gap-12 absolute left-1/2 -translate-x-1/2">
        {NAV_LINKS.map((link) => (
          <div key={link.key}>
            <Link
              href={link.href}
              className={`regular-16 text-gray-900 !font-bold transition-all hover:text-blue-900 ${
                pathname === link.href && "underline"
              }`}
            >
              {link.label}
            </Link>
          </div>
        ))}
        <div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-3 font-bold">
                Products
                <FaAngleDown />
              </TooltipTrigger>
              <TooltipContent
                align="center"
                sideOffset={15}
                className="flex flex-col p-5 bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
              >
                {categories.map((link) => (
                  <Link
                    key={link.id}
                    href={`/${link.slug}`}
                    className={`p-2 text-black font-semibold transition-all text-sm hover:text-blue-900 ${
                      pathname === link.slug ? "font-bold" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

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
                  className={`regular-16 text-gray-900 cursor-pointer ${pathname === link.href ? "underline" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
