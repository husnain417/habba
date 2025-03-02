import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

const slides = [
  { text: "Get to Know Us", image: "/assets/oil2.jpg" },
  { text: "Discover Our Products", image: "/assets/main2.jpeg" },
  { text: "Your Hair, Our Priority", image: "/assets/drop.jpeg" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLoaded(false); // Start fade transition
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setLoaded(true); // End fade transition
      }, 500); // Delay before switching image
    }, 3000); // Slide change every 3 seconds

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden flex flex-col items-center">
      {/* Heading */}
      <h2 className="absolute top-4 text-2xl font-semibold text-gray-800 z-10 w-full text-white p-20 text-[40px]">
        {slides[current].text}
      </h2>

      {/* Image Background with Smooth Transition */}
      <div className="w-full h-full bg-cover bg-center relative">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === current && loaded ? 1 : 0 }}
            transition={{ duration: 1 }}
          ></motion.div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4 mt-4 w-full shadow justify-center">
        <button
          className="text-gray-800 text-3xl"
          onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        >
          <FiChevronLeft />
        </button>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === current ? "bg-gray-800" : "bg-gray-400"
              }`}
              onClick={() => setCurrent(index)}
            ></div>
          ))}
        </div>

        <button
          className="text-gray-800 text-3xl"
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Hero;
