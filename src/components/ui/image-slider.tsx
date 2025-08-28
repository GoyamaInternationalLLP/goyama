import { COLLECTION_ITEMS } from "@/constants";
import { useEffect, useRef, useState } from "react";
import { CampSite } from "../Camp";

const ImageSlider = ({ collections }: { collections?: typeof COLLECTION_ITEMS }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = collections ? collections.length : 0;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const slideWidth = slider.children[0]?.clientWidth || 0;
    slider.style.transform = `translateX(-${index * slideWidth}px)`;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const resetAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);
  };

  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    goToSlide(currentSlide);
  }, [currentSlide]);

  useEffect(() => {
    const handleResize = () => goToSlide(currentSlide);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentSlide]);

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => {
          prevSlide();
          resetAutoSlide();
        }}
        className="md:p-2 p-1 bg-black/30 md:mr-6 mr-2 rounded-full hover:bg-black/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="overflow-hidden relative lg:rounded-r-5xl 2xl:rounded-5xl">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out h-full w-full max-w-[900px]"
          onMouseEnter={() => {
            if (intervalRef.current) clearInterval(intervalRef.current);
          }}
          onMouseLeave={() => {
            resetAutoSlide();
          }}
        >
          {collections?.map((item, index) => (
            <CampSite
              key={index}
              backgroundImage={item.imageUrl}
              title={item.title}
              subtitle={item.subtitle}
              peopleJoined={item.peopleJoined}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          nextSlide();
          resetAutoSlide();
        }}
        className="p-1 md:p-2 bg-black/30 md:ml-6 ml-2 rounded-full hover:bg-black/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default ImageSlider;
