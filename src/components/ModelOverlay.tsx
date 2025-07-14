import { ReactNode, useEffect, useRef, useState } from "react";
import { AiOutlineDrag } from "react-icons/ai";

const ModelOverlay = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowOverlay(true);
          setTimeout(() => setShowOverlay(false), 2000); // Show for 4s
        }
      },
      { threshold: 0.3 } // Show overlay when 30% is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-gray-10 rounded-md overflow-hidden"
    >
      {/* Your 3D Canvas or Model Here */}
      {/* <canvas className="w-full h-full" /> */}
      {children}

      {/* Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 pointer-events-none">
          <div className="flex flex-col items-center text-white text-3xl animate-fadeIn">
            <AiOutlineDrag className="" />
            <p className="mt-4 text-white/80 text-center">Click and drag to rotate the 3D model</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelOverlay;
