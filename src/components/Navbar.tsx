"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ChevronRight } from "lucide-react";
import { NAV_LINKS } from "../constants";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { FaAngleDown } from "react-icons/fa";
import { getCategories } from "@/actions/categories";
import LoadingSpinner from "./LoadingSpinner";

interface CategoryWithSubcategories {
  id: string;
  name: string;
  slug: string;
  subcategories: Array<{
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    imageUrl: string | null;
    isActive: boolean;
    parentId: string | null;
    _count?: {
      products: number;
    };
  }>;
  _count: {
    products: number;
    subcategories: number;
  };
}

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryWithSubcategories[]>([]);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCategories({ includeSubcategories: true });
        console.log(res);
        if (res.success && res.data) {
          setCategories(res.data.categories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
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
                className="flex flex-col p-5 bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] max-w-sm"
              >
                {loading ? (
                  <div className="p-4 flex items-center justify-center">
                    <LoadingSpinner />
                  </div>
                ) : categories.length > 0 ? (
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="group"
                      >
                        {!category.subcategories.length ? (
                          <Link
                            href={`/${category.slug}`}
                            className={`block p-2 text-black font-semibold transition-all text-sm hover:text-blue-900 hover:bg-blue-50 rounded ${
                              pathname === `/${category.slug}` ? "text-blue-900 bg-blue-50" : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{category.name}</span>
                            </div>
                          </Link>
                        ) : (
                          <div
                            // href={`/${category.slug}`}
                            className={`block p-2 text-black font-semibold transition-all text-sm`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{category.name}</span>
                            </div>
                          </div>
                        )}

                        {/* Subcategories */}
                        {category.subcategories.length > 0 && (
                          <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-2">
                            {category.subcategories.map((subcategory) => (
                              <Link
                                key={subcategory.id}
                                href={`/${subcategory.slug}`}
                                className={`block p-1.5 text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded transition-all ${
                                  pathname === `/${subcategory.slug}` ? "text-blue-700 bg-blue-50" : ""
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <span>{subcategory.name}</span>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm p-2">No categories available</p>
                )}
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
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Mobile Products Menu */}
            <li>
              <div className="space-y-2">
                <p className="font-bold text-gray-900">Products</p>
                {loading ? (
                  <div className="text-sm text-gray-500">Loading...</div>
                ) : (
                  <div className="space-y-2 ml-4">
                    {categories.map((category) => (
                      <div key={category.id}>
                        <Link
                          href={`/${category.slug}`}
                          className={`block text-gray-700 hover:text-blue-900 transition-all ${
                            pathname === `/${category.slug}` ? "text-blue-900 font-semibold" : ""
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                        {category.subcategories.length > 0 && (
                          <div className="ml-4 mt-1 space-y-1">
                            {category.subcategories.map((subcategory) => (
                              <Link
                                key={subcategory.id}
                                href={`/${subcategory.slug}`}
                                className={`block text-sm text-gray-600 hover:text-blue-700 transition-all ${
                                  pathname === `/${subcategory.slug}` ? "text-blue-700 font-medium" : ""
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                • {subcategory.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
