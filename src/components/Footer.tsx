// components/Footer.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS, FOOTER_CONTACT_INFO } from "../constants";

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

const Footer = () => (
  <footer className="flexCenter bg-[#18181b] py-12">
    <div className="padding-container max-container flex w-full flex-col gap-14">
      {/* Top Section: Logo + Columns */}
      <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
        <Link
          href="/"
          className="mb-10"
        >
          <Image
            src="/logo2.png"
            alt="logo"
            width={150}
            height={190}
          />
        </Link>

        <div className="flex flex-1 flex-wrap gap-10 sm:justify-between">
          {/* footer link columns */}
          {FOOTER_LINKS.map((col) => (
            <FooterColumn
              title={col.title}
              key={col.title}
            >
              <ul className="regular-14 flex flex-col gap-4 text-gray-300">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                      className="hover:text-blue-400 transition"
                    >
                      {link.label}
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
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <li
                    key={link.label}
                    className="flex flex-col"
                  >
                    <span className="text-gray-300">{link.label}:</span>
                    <span className="text-blue-400 break-all">
                      {link.label.toLowerCase().includes("email") ? (
                        <Link
                          href={`mailto:${link.value.trim()}`}
                          className="hover:underline"
                        >
                          {link.value.trim()}
                        </Link>
                      ) : (
                        <Link
                          href={link.value.trim().startsWith("+") ? `tel:${link.value.trim().replace(/ /g, "")}` : "/"}
                          className="hover:underline"
                        >
                          {link.value.trim()}
                        </Link>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="border-t border-gray-700" />
      <p className="regular-14 w-full text-center text-gray-400">2025 Goyama International | All rights reserved</p>
    </div>
  </footer>
);

export default Footer;
