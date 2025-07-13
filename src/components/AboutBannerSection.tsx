import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

const AboutBannerSection = () => {
  return (
    <section className="">
      <div className="relative h-full w-full">
        <Image
          src="/aboutusimg.webp"
          alt="About Banner"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />

        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-20 max-w-screen-xl mx-auto px-6 h-full flex p-10">
          <div className="flex flex-1 h-full items-center justify-center text-center lg:items-center lg:justify-start lg:text-left">
            <div className="mt-52">
              <h1 className="text-4xl md:text-6xl font-bold max-w-[700px] text-white animate-slideright">
                About Goyama International
              </h1>
              <p className="mt-6 text-base md:text-lg max-w-[520px] text-gray-200 animate-slideleft">
                Goyama International is a globally focused export company based in India, delivering top-tier
                construction and industrial materials to clients across the USA, UK, and beyond. With specialization in
                engineered quartz slabs, fly ash, silica fume, flooring, and more, we merge Indian manufacturing
                strengths with global quality standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-40 py-20 flex justify-between items-start gap-10">
        <div className="flex flex-col items-start gap-2 w-3/5 animate-slideleft">
          <h1 className="text-gray-700 border-l-4 border-[#D4AF37] pl-4 uppercase">About us</h1>
          <h1 className="text-5xl font-extrabold uppercase">
            Building Trust,
            <br />
            Quality, And
            <br />
            Innovation
          </h1>
          <Image
            src="/marbletiles.jpg"
            alt="About Us Image"
            width={400}
            height={200}
            className="mt-5 rounded-lg shadow-md"
          />
        </div>

        <div className="w-full animate-slideright">
          <p>
            Goyama International was founded by two partners united by a shared vision: to bridge gaps in global
            construction supply chains with innovation, reliability, and deep industry insight. One partner brings
            hands-on experience from the U.S. construction market; the other offers in-depth knowledge of India’s
            engineering landscape. Together, we collaborate with a trusted network of manufacturers and fabricators to
            source, customize, and deliver high-quality materials that exceed client expectations across borders. Our
            mission is simple—make international procurement seamless, responsive, and future-ready. We don’t just trade
            materials; we build partnerships, deliver turnkey solutions, and drive innovation throughout the global
            construction ecosystem.
          </p>

          <div className="flex justify-between items-start gap-5 w-full mt-5">
            <div className="w-full">
              <h1 className="bg-goyama-blue text-white uppercase text-center p-1 mb-2">Our Vision</h1>
              <p>
                To become a globally trusted export house, delivering innovative and sustainable materials that shape
                the world's infrastructure and living spaces. At Goyama International, we don't just supply materials—we
                support the foundations of modern living, with integrity and excellence at every step.
              </p>
            </div>

            <div className="w-full">
              <h1 className="bg-goyama-blue text-white uppercase text-center p-1 mb-2">Our Mission</h1>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <FaCheckCircle className="text-goyama-yellow" />
                  <p>Deliver Globally Trusted Materials</p>
                </div>

                <div className="flex gap-2 items-center">
                  <FaCheckCircle className="text-goyama-yellow" />
                  <p>Bridge Indian Manufacturing with Global Demand</p>
                </div>

                <div className="flex gap-2 items-center">
                  <FaCheckCircle className="text-goyama-yellow" />
                  <p>Simplify and Elevate Global Sourcing</p>
                </div>

                <div className="flex gap-2 items-center">
                  <FaCheckCircle className="text-goyama-yellow" />
                  <p>Build Long-Term Partnerships</p>
                </div>
              </div>
            </div>
          </div>
          <Image
            src="/aboutusship.jpg"
            alt="About Us ship"
            width={800}
            height={200}
            className="mt-5 w-full! rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutBannerSection;
