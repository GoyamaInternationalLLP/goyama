import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
}

const Features: React.FC<FeatureCardProps> = ({
  title,
  description,
  image,
}) => (
  <div
    className="relative group rounded-2xl border border-[#262626] overflow-hidden min-h-[260px] flex items-center justify-center bg-black/60"
    style={{
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Dim overlay on hover */}
    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/70 transition-colors duration-300" />

    {/* Card content, only visible on hover */}
    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
      <h3 className="text-xl font-semibold text-white mb-2 text-center drop-shadow-lg">
        {title}
      </h3>
      <p className="text-gray-200 text-sm text-center drop-shadow-lg">
        {description}
      </p>
    </div>

    {/* Optional: Custom top-right cut */}
    <svg
      className="absolute top-0 right-0 w-12 h-12 text-[#18181b]"
      viewBox="0 0 48 48"
    >
      <polygon points="48,0 48,48 0,0" fill="currentColor" />
    </svg>
  </div>
);

export default Features;
