"use client";

import { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function PrevBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-0 left-[-35px] md:left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    >
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-main-400/30 dark:bg-gray-800/30 group-hover:bg-main-200/30 dark:group-hover:bg-gray-800/60">
        <ChevronLeftIcon
          strokeWidth={3}
          className="size-5 text-main-800 dark:text-gray-800"
        />
        <span className="sr-only">Previous</span>
      </span>
    </button>
  );
}
function NextBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-0 right-[-35px] md:right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    >
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-main-400/30 dark:bg-gray-800/30 group-hover:bg-main-200/30 dark:group-hover:bg-gray-800/60">
        <ChevronRightIcon
          strokeWidth={3}
          className="size-5 text-main-800 dark:text-gray-800"
        />
        <span className="sr-only">Next</span>
      </span>
    </button>
  );
}
function Bullets<T>({
  data,
  goToSlide,
  currentSlide,
}: {
  data: T[];
  currentSlide: number;
  goToSlide: (index: number) => void;
}) {
  return (
    <div className="absolute z-30 flex -translate-x-1/2 -bottom-8 md:bottom-5 left-1/2 space-x-3">
      {data.map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => goToSlide(index)}
          className={`w-3 h-3 rounded-full ${
            index === currentSlide
              ? "bg-main-600"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          aria-label={`Slide ${index + 1}`}
        ></button>
      ))}
    </div>
  );
}
function CarouselItem({
  index,
  children,
  currentSlide,
}: {
  index: number;
  currentSlide: number;
  children: React.ReactNode;
}) {
  return (
    <div
      key={index}
      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
        index === currentSlide ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

export default function Carousel<T>({
  data,
  title,
  render,
  errMessage,
  withBullets = true,
}: {
  data: T[];
  title?: string;
  errMessage: string;
  render: (currentSlide: number, cur: T, i: number) => React.ReactNode;
  withBullets?: boolean;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
  };
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % data.length);
  };
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const touchEndX = useRef(0);
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (swipeDistance > 50) handleNext();
    else if (swipeDistance < -50) handlePrev();
  };

  return (
    <div className="mb-4 md:mb-0 py-6 px-2 w-full">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      )}
      {data.length > 0 ? (
        <div className="relative">
          <div
            className="relative h-80 bg-gray-50 overflow-hidden rounded-lg md:h-[500px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {data.map((item, index) => render(currentSlide, item, index))}
          </div>

          {withBullets && (
            <Bullets
              data={data}
              goToSlide={goToSlide}
              currentSlide={currentSlide}
            />
          )}

          <PrevBtn onClick={handlePrev} />
          <NextBtn onClick={handleNext} />
        </div>
      ) : (
        <p className="italic">{errMessage}</p>
      )}
    </div>
  );
}

Carousel.NextBtn = NextBtn;
Carousel.PrevBtn = PrevBtn;
Carousel.Bullets = Bullets;
Carousel.CarouselItem = CarouselItem;
