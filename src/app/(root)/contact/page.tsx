import ContactForm from "@/components/ContactForm";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";

const MAPS_QUERY =
  "A-13, Saidham Co-op Housing Society, P.K. Road, Mulund West, Mumbai 400080";
const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  MAPS_QUERY
)}`;
const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(
  MAPS_QUERY
)}&z=16&output=embed`;

export default function ContactPage() {
  return (
    <main className="px-5 py-20 md:px-40">
      <section className="mb-16">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-goyama-yellow">
            Visit Us
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-goyama-blue md:text-4xl">
            Where to find us
          </h2>
        </div>

        <div className="grid overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_24px_70px_-30px_rgba(31,42,68,0.45)] lg:grid-cols-[minmax(0,0.82fr)_1.35fr]">
          {/* Info panel */}
          <div className="relative flex flex-col justify-between gap-10 overflow-hidden bg-goyama-blue p-8 md:p-10">
            {/* faint decorative glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-goyama-yellow/10 blur-3xl"
            />

            <div className="relative">
              <h3 className="text-2xl font-semibold text-white">
                Goyama International LLP
              </h3>
              <div className="mt-3 h-px w-14 bg-goyama-yellow" />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                Reach out or drop by our Mumbai office — we&apos;d be glad to
                hear from you.
              </p>
            </div>

            <ul className="relative space-y-7">
              <li className="flex gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-goyama-yellow ring-1 ring-white/10">
                  <FaLocationDot className="h-[15px] w-[15px]" />
                </span>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
                    Address
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/90">
                    A-13, Saidham Co-op. Housing Society,
                    <br />
                    P.K. Road, Mulund (W), Mumbai-400080
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-goyama-yellow ring-1 ring-white/10">
                  <FaPhone className="h-[14px] w-[14px]" />
                </span>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
                    Phone
                  </p>
                  <p className="mt-1.5 space-x-1 text-sm text-white/90">
                    <a
                      href="tel:+917303940226"
                      className="transition-colors hover:text-goyama-yellow"
                    >
                      +91 73039 40226
                    </a>
                    <span className="text-white/30">/</span>
                    <a
                      href="tel:+918384054004"
                      className="transition-colors hover:text-goyama-yellow"
                    >
                      +91 83840 54004
                    </a>
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-goyama-yellow ring-1 ring-white/10">
                  <MdOutlineMail className="h-[16px] w-[16px]" />
                </span>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
                    Email
                  </p>
                  <a
                    href="mailto:info@goyamainternational.com"
                    className="mt-1.5 block text-sm text-white/90 transition-colors hover:text-goyama-yellow"
                  >
                    info@goyamainternational.com
                  </a>
                </div>
              </li>
            </ul>

            <a
              href={MAPS_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-fit items-center gap-2 rounded-full bg-goyama-yellow px-6 py-3 text-sm font-semibold text-goyama-blue transition-all duration-300 hover:bg-white"
            >
              Get Directions
              <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Map */}
          <div className="relative min-h-[340px] lg:min-h-full">
            <iframe
              title="Goyama International office location"
              src={MAPS_EMBED}
              className="absolute inset-0 h-full w-full grayscale-[0.25] contrast-[1.04] transition-all duration-500 hover:grayscale-0"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* seam gradient blending map into the navy panel on large screens */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-goyama-blue/25 to-transparent lg:block"
            />
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
