import React, { useState } from "react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

function Carousel({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-64 overflow-hidden">
      <div className="absolute inset-0 flex">
        {slides.map((slide, index) => (
          <img
            key={index}
            className={`w-full h-76 flex-shrink-0 transition-transform duration-500 object-contain`}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
            alt="product"
            src={slide}
          />
        ))}
      </div>
      {slides.length > 1 ? (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent text-slate-600 px-4 py-2"
          >
            <CircleArrowLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent text-slate-600 px-4 py-2"
          >
            <CircleArrowRight size={20} />
          </button>
        </>
      ) : null}
    </div>
  );
}

export default Carousel;
