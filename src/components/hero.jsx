import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

const slides = [
  { text: "Get to Know Us", image: "/assets/img1.png" },
  { text: "Discover Our Products", image: "/assets/img2.jpeg" },
  { text: "Your Hair, Our Priority", image: "/assets/img3.jpeg" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden flex flex-col items-center">
      {/* Heading */}
      <h2 className="absolute top-4 text-2xl font-semibold text-gray-800 z-10 w-full text-white p-20 text-[40px]">
        {slides[current].text}
      </h2>

      {/* Image Background */}
      <div
        className="w-full h-full bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${slides[current].image})`,
        }}
      >
        
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
