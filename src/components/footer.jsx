import React, { useEffect, useRef } from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedWave = ({ color = "#047857", className = "" }) => {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg 
        className="w-full h-auto" 
        viewBox="0 0 1440 120" 
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M 0 60 
               Q 150 40 360 60 
               Q 570 80 720 60 
               Q 870 40 1080 60 
               Q 1290 80 1440 60 
               L 1440 120 
               L 0 120 
               Z"
          >
            <animate
              attributeName="d"
              values="
                M 0 60 Q 150 20 360 70 Q 570 100 720 50 Q 870 20 1080 80 Q 1290 100 1440 60 L 1440 120 L 0 120 Z;
                M 0 80 Q 150 60 360 20 Q 570 40 720 80 Q 870 60 1080 30 Q 1290 20 1440 50 L 1440 120 L 0 120 Z;
                M 0 40 Q 150 80 360 50 Q 570 20 720 70 Q 870 90 1080 40 Q 1290 60 1440 80 L 1440 120 L 0 120 Z;
                M 0 60 Q 150 20 360 70 Q 570 100 720 50 Q 870 20 1080 80 Q 1290 100 1440 60 L 1440 120 L 0 120 Z"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
        </defs>
        <use href="#gentle-wave" fill={color} />
        <use 
          href="#gentle-wave" 
          fill={color} 
          opacity="0.5"
          transform="translate(-50 3)"
        >
          <animate
            attributeName="transform"
            values="
              translate(-50 3);
              translate(-25 5);
              translate(-40 2);
              translate(-50 3)"
            dur="3s"
            repeatCount="indefinite"
          />
        </use>
        <use 
          href="#gentle-wave" 
          fill={color} 
          opacity="0.3"
          transform="translate(50 2)"
        >
          <animate
            attributeName="transform"
            values="
              translate(50 2);
              translate(25 4);
              translate(35 1);
              translate(50 2)"
            dur="2s"
            repeatCount="indefinite"
          />
        </use>
      </svg>
    </div>
  );
};

const Footer = () => {
  const footerRef = useRef(null);
  const socialIconsRef = useRef(null);
  const quickLinksRef = useRef(null);
  const contactInfoRef = useRef(null);
  const newsletterRef = useRef(null);

  useEffect(() => {
    // Create context for cleanup
    const ctx = gsap.context(() => {
      // Stagger animation for footer sections
      gsap.from([
        quickLinksRef.current.children,
        contactInfoRef.current.children,
        socialIconsRef.current.children
      ], {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Newsletter form animation
      gsap.from(newsletterRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        scrollTrigger: {
          trigger: newsletterRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Social icons hover animation
      const socialIcons = socialIconsRef.current.children;
      Array.from(socialIcons).forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }, footerRef); // Scope to footer

    // Cleanup
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative mt-20">
      {/* Wave Animation */}
      <div className="absolute top-0 left-0 w-full overflow-hidden -translate-y-full">
        <AnimatedWave color="#047857" />
      </div>

      {/* Footer Content */}
      <div className="bg-[#047857] pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Hair Oil</h3>
              <p className="mb-4">Transform your hair care routine with our premium natural hair oils.</p>
              <div ref={socialIconsRef} className="flex space-x-4">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <Facebook size={24} />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <Twitter size={24} />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <Instagram size={24} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div ref={quickLinksRef}>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:opacity-80 transition-opacity">About Us</a></li>
                <li><a href="/products" className="hover:opacity-80 transition-opacity">Products</a></li>
                <li><a href="/contact" className="hover:opacity-80 transition-opacity">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div ref={contactInfoRef}>
              <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Phone size={18} />
                  <span>0342 1607309</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={18} />
                  <span>sultanshah101004@gmail.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>Islamabad, Pakistan</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            {/* <div ref={newsletterRef}>
              <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
              <p className="mb-4">Subscribe to get special offers and updates.</p>
              <form className="flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-2 rounded text-gray-800"
                />
                <button 
                  type="submit" 
                  className="bg-white text-[#047857] px-4 py-2 rounded font-semibold hover:bg-opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
            </div> */}
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-white/20 text-center text-white">
            <p>© 2024 Hair Oil. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;