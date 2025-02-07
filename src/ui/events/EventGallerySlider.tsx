"use client";

import Image from "next/image";

import Carousel from "../Carousel";

// export default function EventGalleryCarousel({
//   gallery,
// }: {
//   gallery: string[];
// }) {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const handlePrev = () => {
//     setCurrentSlide((prev) => (prev - 1 + gallery.length) % gallery.length);
//   };
//   const handleNext = () => {
//     setCurrentSlide((prev) => (prev + 1) % gallery.length);
//   };
//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//   };

//   const touchEndX = useRef(0);
//   const touchStartX = useRef(0);
//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX;
//   };
//   const handleTouchMove = (e: React.TouchEvent) => {
//     touchEndX.current = e.touches[0].clientX;
//   };
//   const handleTouchEnd = () => {
//     const swipeDistance = touchStartX.current - touchEndX.current;
//     if (swipeDistance > 50) handleNext();
//     else if (swipeDistance < -50) handlePrev();
//   };

//   return (
//     <div className="py-6 px-2 w-full">
//       <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h2>
//       {gallery.length === 0 ? (
//         <p className="text-gray-500">No Images available for this event.</p>
//       ) : (
//         <div className="relative">
//           <div
//             className="relative h-80 bg-gray-50 overflow-hidden rounded-lg md:h-[500px]"
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             {gallery.map((image, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
//                   index === currentSlide ? "opacity-100" : "opacity-0"
//                 }`}
//               >
//                 <div className="relative w-full h-full">
//                   <Image
//                     fill
//                     src={image}
//                     className="object-cover"
//                     alt={`Slide ${index + 1}`}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
//             {gallery.map((_, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 onClick={() => goToSlide(index)}
//                 className={`w-3 h-3 rounded-full ${
//                   index === currentSlide
//                     ? "bg-main-600"
//                     : "bg-gray-300 hover:bg-gray-400"
//                 }`}
//                 aria-label={`Slide ${index + 1}`}
//               ></button>
//             ))}
//           </div>

//           <button
//             type="button"
//             onClick={handlePrev}
//             className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//           >
//             <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-main-400/30 dark:bg-gray-800/30 group-hover:bg-main-200/30 dark:group-hover:bg-gray-800/60">
//               <ChevronLeftIcon
//                 strokeWidth={3}
//                 className="size-5 text-main-800 dark:text-gray-800"
//               />
//               <span className="sr-only">Previous</span>
//             </span>
//           </button>
//           <button
//             type="button"
//             onClick={handleNext}
//             className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//           >
//             <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-main-400/30 dark:bg-gray-800/30 group-hover:bg-main-200/30 dark:group-hover:bg-gray-800/60">
//               <ChevronRightIcon
//                 strokeWidth={3}
//                 className="size-5 text-main-800 dark:text-gray-800"
//               />
//               <span className="sr-only">Next</span>
//             </span>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

export default function EventGalleryCarousel({
  gallery,
}: {
  gallery: string[];
}) {
  return (
    <Carousel
      data={gallery}
      title="Gallery"
      render={(currentSlide, image, index) => (
        <Carousel.CarouselItem index={index} currentSlide={currentSlide}>
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        </Carousel.CarouselItem>
      )}
      errMessage="No gallery images available for this event."
    />
  );
}
