import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/img53.webp"
        alt="background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-screen-xl mx-auto px-6 h-full flex">
        <div
          className="
          flex flex-1 h-full 
          items-center justify-center text-center
          lg:items-center lg:justify-start lg:text-left
        "
        >
          <div>
            <h1 className="text-4xl md:text-6xl font-bold max-w-[700px] text-white">
              Timeless Surfaces. Engineered to Endure
            </h1>
            <p className="mt-6 text-base md:text-lg max-w-[520px] text-gray-200">
              Trusted by builders, architects, and developers worldwide for
              quality, consistency, and customized solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
