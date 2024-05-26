import React, { Component } from "react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

class BigCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
    };
  }

  nextSlide = () => {
    this.setState((prevState) => ({
      currentSlide:
        prevState.currentSlide === this.props.slides.length - 1
          ? 0
          : prevState.currentSlide + 1,
    }));
  };

  prevSlide = () => {
    this.setState((prevState) => ({
      currentSlide:
        prevState.currentSlide === 0
          ? this.props.slides.length - 1
          : prevState.currentSlide - 1,
    }));
  };

  render() {
    const { slides } = this.props;
    const { currentSlide } = this.state;

    return (
      <div className="relative w-full h-full max-h-screen overflow-hidden">
        <div className="absolute inset-0 flex">
          {slides.map((slide, index) => (
            <img
              key={index}
              className={`w-full h-full max-h-screen flex-shrink-0 transition-transform duration-500 object-contain`}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
              alt="product"
              src={slide}
            />
          ))}
        </div>
        {slides.length > 1 && (
          <>
            <button
              onClick={this.prevSlide}
              className="cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent text-slate-600 px-4 py-2"
            >
              <CircleArrowLeft size={20} />
            </button>
            <button
              onClick={this.nextSlide}
              className="cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent text-slate-600 px-4 py-2"
            >
              <CircleArrowRight size={20} />
            </button>
          </>
        )}
      </div>
    );
  }
}

export default BigCarousel;
