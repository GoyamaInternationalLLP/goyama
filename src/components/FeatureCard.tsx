import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  onEnquiryClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  image,
  onEnquiryClick,
}) => (
  <div
    className="relative group rounded-2xl overflow-hidden shadow-lg w-[300px] md:w-[400px] h-[450px] md:h-[500px] flex items-center justify-center"
    style={{
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Overlay for dimming on hover */}
    <div className="absolute inset-0 bg-black/30 transition duration-300 group-hover:bg-black/70" />

    {/* Text content */}
    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 text-center">
      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
        {title}
      </h3>
      <p className="text-base text-white drop-shadow-lg mb-4">{description}</p>
      <button
        onClick={onEnquiryClick}
        className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200 transition"
      >
        Enquiry Now
      </button>
    </div>
  </div>
);

export default FeatureCard;
