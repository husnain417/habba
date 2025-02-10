import "typeface-poppins";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "Natural Hair Oil",
    image: "/assets/img4.jpg",
    price: 1950,
    description: "A nourishing oil for healthy hair growth.",
    benefits: [
      "Promotes healthy hair growth",
      "Prevents hair fall",
      "Nourishes scalp",
      "100% Natural ingredients"
    ]
  },
];

export default function ProductCarousel() {
  const productRefs = useRef([]);
  const headerRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    // Animate header
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate description
    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate product content
    productRefs.current.forEach((ref, index) => {
      const imageSection = ref.querySelector('.product-image');
      const detailsSection = ref.querySelector('.product-details');

      // Animate image
      gsap.fromTo(
        imageSection,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate details with staggered children
      gsap.fromTo(
        detailsSection.children,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <div className="my-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 
          ref={headerRef}
          className="text-4xl font-semibold text-center font-poppins mb-4"
        >
          Featured Product
        </h2>
        <p 
          ref={descriptionRef}
          className="text-gray-600 text-center max-w-2xl mx-auto mb-16"
        >
          Discover our signature hair oil, carefully crafted with natural ingredients to transform your hair care routine.
        </p>

        {products.map((product, index) => (
          <div
            key={product.id}
            ref={(el) => (productRefs.current[index] = el)}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Product Image Side */}
            <div className="relative group product-image">
              <div className="absolute inset-0 bg-rose-200 rounded-3xl transform rotate-6 transition-transform group-hover:rotate-8"></div>
              <img
                src={product.image}
                alt={product.name}
                className="relative rounded-2xl w-full h-[500px] object-contain shadow-xl transition-transform transform group-hover:scale-105"
              />
            </div>

            {/* Product Details Side */}
            <div className="space-y-8 product-details">
              <div>
                <h3 className="text-3xl font-semibold font-poppins mb-2">{product.name}</h3>
              </div>

              <p className="text-gray-600 text-lg">{product.description}</p>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Key Benefits:</h4>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <a href="/products"  className="w-full md:w-auto bg-black text-white py-3 px-8 text-lg hover:bg-gray-800 transition rounded-lg">
                  View Product
                </a>
                <a href="/products" className="block w-full md:w-auto text-center underline text-gray-600 hover:text-black">
                  View All Products
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}