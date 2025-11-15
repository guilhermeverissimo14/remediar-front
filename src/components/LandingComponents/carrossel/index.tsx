"use client";
import React, { useState, useEffect } from "react";

interface CarouselItem {
  src: string;
  alt: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full mt-[80px]" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-56 md:h-96 lg:h-[470px] overflow-hidden">
        {items.map((item, index) => (
          <div
            key={index}
            className={`duration-700 ease-in-out transition-opacity ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="absolute block w-full h-full object-cover top-0 left-0"
            />
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex bottom-5 left-1/2 -translate-x-1/2 space-x-3">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full bg-gray-300 ${
              index === activeIndex ? "bg-white" : ""
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Slider controls */}
      <button
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4"
        onClick={handlePrev}
      >
        ❮
      </button>
      <button
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4"
        onClick={handleNext}
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;
