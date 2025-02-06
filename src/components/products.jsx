import "typeface-poppins";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

const products = [
  {
    id: 1,
    name: "Natural Hair Oil",
    image: "/assets/img4.jpg",
    price: 1550,
    description: "A nourishing oil for healthy hair growth."
  },
  {
    id: 2,
    name: "Hair Recovery Bundle",
    image: "/assets/img5.jpg",
    price: 3200,
    description: "A complete set to revitalize damaged hair."
  },
  {
    id: 3,
    name: "Bond Repair Shampoo",
    image: "/assets/img4.jpg",
    price: 1100,
    description: "Strengthens and repairs weak hair bonds."
  },
  {
    id: 4,
    name: "Hair Control Serum",
    image: "/assets/img5.jpg",
    price: 1250,
    description: "Controls frizz and boosts shine."
  }
];

export default function ProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const productRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      productRefs.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="py-20 px-6">
      <h2 className="text-3xl font-semibold mb-8 text-center font-poppins">Explore Our Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="relative h-[500px] bg-gray-100 flex flex-col shadow-lg rounded-lg"
            ref={(el) => (productRefs.current[index] = el)}
          >
            {/* Product Image */}
            <div className="h-[80%] w-full overflow-hidden rounded-t-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Product Details */}
            <div className="p-4 text-left font-poppins">
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-gray-900 mt-2 font-bold">Rs. {product.price}.00 PKR</p>
              <button className="mt-2 bg-black text-white py-2 px-4 w-full hover:bg-gray-800 transition rounded">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
}
