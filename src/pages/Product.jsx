import React, { useEffect, useRef, useState } from 'react';
import Header from "../components/header";
import AnimatedFooter from "../components/footer";
import { gsap } from 'gsap';
import { useNavigate } from "react-router-dom";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Filter, SlidersHorizontal, ChevronDown, Star, ShoppingCart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
  
  // Convert file path to full URL
  const getImageUrl = (path) => {
    return `http://localhost:5000/${path.replace(/\\/g, '/')}`;
  };

  return (
    <div
      className="group relative pb-10 cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`, { state: { product } })}
    >      
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 group">
        <img
          src={product.images[0] ? getImageUrl(product.images[0]) : '/assets/placeholder.jpg'}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-all duration-300 group-hover:opacity-0"
        />
        <img
          src={product.images[1] ? getImageUrl(product.images[1]) : '/assets/placeholder.jpg'}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-300 opacity-0 group-hover:opacity-100"
        />
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-gray-900">
            <a href={`/product/${product._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Assistant, sans-serif' }}>
            <span className="line-through">Rs. {product.oldPrice} PKR</span>
          </p>        
          <p className="text-{1.2rem} font-bold text-gray-900" style={{ fontFamily: 'Assistant, sans-serif' }}>
            <span>Rs. {product.price} PKR</span>
          </p>        
        </div>

        <p className="text-sm text-gray-500">{product.category?.replace(/"/g, '')}</p>
        <div className="flex flex-wrap gap-1">
        {product.tags?.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700"
          >
            {typeof tag === "string" ? tag.replace(/["\[\]]/g, "") : tag}
          </span>
        ))}
      </div>

      </div>
    </div>
  );
};

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const productGridRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const result = await response.json();
        
        if (result.success) {
          setProducts(result.data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError('Error connecting to server');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!loading && productGridRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(filterRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        });

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
    }
  }, [loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Banner Image */}
      <div
        className="w-full h-[90vh] bg-cover bg-center bg-no-repeat relative"
        style={{ 
          backgroundImage: `url('/assets/prodback.avif')` 
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 container mx-auto h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
            Our Products
          </h1>
        </div>
      </div>

      <main className="flex-grow bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div ref={filterRef} className="mb-8 space-y-4">
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
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div 
            ref={productGridRef}
            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <AnimatedFooter />
    </div>
  );
}