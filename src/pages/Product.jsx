import React, { useEffect, useRef } from 'react';
import Header from "../components/header";
import AnimatedFooter from "../components/footer";
import { gsap } from 'gsap';
import { useNavigate } from "react-router-dom";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Filter, SlidersHorizontal, ChevronDown, Star, ShoppingCart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Product Data
const products = [
  {
    id: 1,
    name: 'Growth Hair Oil',
    imageSrc: '/assets/img4.jpg',
    imageAlt: "Hair growth oil with natural ingredients",
    price: '1500.0',
    category: 'Hair Oil',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    description: 'Promotes healthy hair growth with natural ingredients',
    featured: true,
    tags: ['Organic', 'Growth', 'Natural'],
    variants: ['100ml', '200ml', '500ml']
  },
  {
    id: 2,
    name: 'Anti-Dandruff Oil',
    imageSrc: '/assets/img4.jpg',
    imageAlt: "Anti-dandruff hair oil",
    price: '1500.0',
    category: 'Hair Oil',
    rating: 4.3,
    reviews: 95,
    inStock: true,
    description: 'Effectively controls dandruff and soothes scalp',
    featured: false,
    tags: ['Anti-Dandruff', 'Soothing', 'Natural'],
    variants: ['100ml', '200ml']
  },
  {
    id: 3,
    name: 'Argan Hair Oil',
    imageSrc: '/assets/img4.jpg',
    imageAlt: "Pure argan hair oil",
    price: '1500.0',
    category: 'Hair Oil',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    description: 'Pure Moroccan argan oil for silky smooth hair',
    featured: true,
    tags: ['Argan', 'Moroccan', 'Premium'],
    variants: ['50ml', '100ml']
  },
  // ... other products from previous list
];

// Helper Components
const RatingStars = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={14}
          className={`${
            index < Math.floor(rating) 
              ? 'fill-yellow-400 text-yellow-400' 
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group relative pb-10 cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
    >      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 space-y-1">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-gray-900">
            <a href={product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className="text-sm font-medium text-gray-900">{"Rs."}{product.price}{"  PKR"}</p>
        </div>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="flex items-center gap-2">
          <RatingStars rating={product.rating} />
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ProductPage() {
  const productGridRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate filters on page load
      gsap.from(filterRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // Animate products with stagger effect
      gsap.from(productGridRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: productGridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    return () => ctx.revert();
  }, []);

  

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Banner Image */}
      <div
        className="w-full h-[500px] bg-cover bg-center bg-no-repeat relative"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=2070&auto=format&fit=crop')` 
        }}
      >
        <div className="absolute inset-0 bg-black/30" /> {/* Overlay for better text visibility */}
        <div className="relative z-10 container mx-auto h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
            Our Products
          </h1>
        </div>
      </div>

      <main className="flex-grow bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Top section with filters and sorting */}
          <div ref={filterRef} className="mb-8 space-y-4">
            {/* Title and product count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-3xl font-bold text-gray-900">All Products</h2>
              <div className="flex items-center gap-4">
                <p className="text-gray-600">{products.length} products</p>
                <div className="h-4 w-px bg-gray-300" />
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={16} />
                  <select className="bg-transparent border-none focus:ring-0 cursor-pointer text-sm">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Best Rating</option>
                    <option>Most Reviews</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div 
            ref={productGridRef}
            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <AnimatedFooter />
    </div>
  );
}