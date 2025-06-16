import { FOOTER_CONTACT_INFO, FOOTER_LINKS } from "../constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Footer Column Reusable Component
type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => (
  <div className="flex flex-col gap-5 min-w-[180px] flex-1">
    <h4 className="bold-18 whitespace-nowrap text-white">{title}</h4>
    {children}
  </div>
);

const Footer = () => {
  return (
    <footer className="flexCenter bg-[#18181b] py-12">
      <div className="padding-container max-container flex w-full flex-col gap-14">
        {/* Top Section: Logo + Columns */}
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          {/* Logo */}
          <Link href="/" className="mb-10">
            <Image src="/logo2.png" alt="logo" width={150} height={190} />
          </Link>

          {/* Columns */}
          <div className="flex flex-1 flex-wrap gap-10 sm:justify-between">
            {/* Learn More & Our Community */}
            {FOOTER_LINKS.map((col, idx) => (
              <FooterColumn title={col.title} key={idx}>
                <ul className="regular-14 flex flex-col gap-4 text-gray-300">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      {/* Replace "/" with your actual URLs if available */}
                      <Link href="/" className="hover:text-blue-400 transition">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            ))}

            {/* Contact Us */}
            <div className="min-w-[220px] flex-1">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                <ul className="regular-14 flex flex-col gap-3 text-gray-300">
                  {FOOTER_CONTACT_INFO.links.map((link, idx) => (
                    <li key={idx} className="flex flex-col">
                      <span className="text-gray-300">{link.label}:</span>
                      <span className="text-blue-400 break-all">
                        {link.label.toLowerCase().includes("email") ? (
                          <a
                            href={`mailto:${link.value.trim()}`}
                            className="hover:underline"
                          >
                            {link.value.trim()}
                          </a>
                        ) : (
                          <a
                            href={
                              link.value.trim().startsWith("+")
                                ? `tel:${link.value.trim().replace(/ /g, "")}`
                                : undefined
                            }
                            className="hover:underline"
                          >
                            {link.value.trim()}
                          </a>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </div>

            {/* Uncomment for Social Icons */}
            {/*
            <FooterColumn title={SOCIALS.title}>
              <ul className="regular-14 flex gap-4 text-gray-300">
                {SOCIALS.links.map((link, idx) => (
                  <Link href="/" key={idx}>
                    <Image
                      src={`/${link}`}
                      alt="social-icon"
                      width={24}
                      height={24}
                    />
                  </Link>
                ))}
              </ul>
            </FooterColumn>
            */}
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-gray-700" />
        <p className="regular-14 w-full text-center text-gray-400">
          2025 Goyama International | All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
