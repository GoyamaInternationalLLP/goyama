import Image from "next/image";

const WhyUsSection = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-20 px-10 lg:px-20 xl:px-40 py-20">
      <div className="flex flex-col items-start lg:items-center gap-2">
        <h1 className="text-gray-700 animate-slidedown border-l-4 border-[#D4AF37] pl-4 uppercase">Why Us</h1>
        <h1 className="text-3xl md:text-5xl font-extrabold animate-slidedown uppercase text-left lg:text-center">
          delivering trust,
          <br />
          precision, and partnership
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-4 border-b border-dashed border-goyama-yellow pb-5">
            <h1 className="text-xl font-bold text-goyama-blue">Global Expertise with Local Insight</h1>
            <p className="text-base text-goyama-gray">
              We combine Indian manufacturing power with international quality standards like ASTM and BS EN.
            </p>
          </div>

          <div className="flex flex-col gap-4 border-b border-dashed border-goyama-yellow pb-5">
            <h1 className="text-xl font-bold text-goyama-blue">Precision-Engineered Prefabrication</h1>
            <p>Cut-to-size quartz slabs and vanities, CNC-finished and ready for seamless installation.</p>
          </div>

          <div className="flex flex-col gap-4 border-b border-dashed border-goyama-yellow pb-5">
            <h1 className="text-xl font-bold text-goyama-blue">End-to-End Quality Assurance</h1>
            <p>Strict in-house inspections ensure every shipment meets exact specifications—no surprises.</p>
          </div>
        </div>

        <Image
          src="/whyusimg.png"
          alt="why us image"
          width={300}
          height={200}
          className="hidden lg:block"
        />

        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-4 border-b border-dashed border-goyama-yellow pb-5">
            <h1 className="text-xl font-bold text-goyama-blue">Export-Ready Packaging & Logistics</h1>
            <p className="text-base text-goyama-gray">
              Crated, barcoded, and shipped via major Indian ports with full coordination and traceability.
            </p>
          </div>

          <div className="flex flex-col gap-4 border-b border-dashed border-goyama-yellow pb-5">
            <h1 className="text-xl font-bold text-goyama-blue">Dedicated Support & Transparency</h1>
            <p className="text-base text-goyama-gray">
              We prioritize clear communication, real-time updates, and long-term client relationships.
            </p>
          </div>

          <div className="flex flex-col gap-4 border-b border-dashed border-goyama-yellow pb-5">
            <h1 className="text-xl font-bold text-goyama-blue">One-Stop Export House</h1>
            <p className="text-base text-goyama-gray">
              From quartz and fly ash to flooring and industrial supplies—we're your all-in-one export partner.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
