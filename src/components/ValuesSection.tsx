import { HoverEffect } from "./ui/card-hover-effect";

const ValuesSection = () => {
  return (
    <section className="px-10 lg:px-20 xl:px-40 py-20 bg-amber-50">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-gray-700 animate-slidedown border-l-4 border-[#D4AF37] pl-4 uppercase">
          Our values
        </h1>
        <h1 className="text-5xl font-extrabold animate-slidedown uppercase">
          Crafted with Care
          <br />
          Delivered with Purpose
        </h1>
        <div>
          <HoverEffect className="animate-slideup" />
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
