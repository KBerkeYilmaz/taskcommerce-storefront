import React, { useState } from 'react';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { id: 1, content: 'Slide 1', bgColor: 'bg-red-500' },
    { id: 2, content: 'Slide 2', bgColor: 'bg-blue-500' },
    { id: 3, content: 'Slide 3', bgColor: 'bg-green-500' },
  ];

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
          <div
            key={slide.id}
            className={`w-full h-full flex-shrink-0 transition-transform duration-500 ${slide.bgColor}`}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            <div className="flex items-center justify-center h-full text-white text-2xl">
              {slide.content}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2"
      >
        Next
      </button>
    </div>
  );
}

export default Carousel;
