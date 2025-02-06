import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContentCard = ({ img, title, desc, index }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(cardRef.current,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative grid min-h-[30rem] items-end overflow-hidden rounded-xl group"
    >
      <img
        src={img}
        alt="bg"
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/70 transition-opacity duration-500 group-hover:bg-black/50" />
      <div className="relative flex flex-col justify-end p-6 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
        <h4 className="text-[26px] text-white font-medium">
          {title}
        </h4>
        <p className="my-2 font-normal text-white text-base opacity-90 group-hover:opacity-100">
          {desc}
        </p>
      </div>
    </div>
  );
};

const contents = [
  {
    img: "/assets/blog1.jpg", // You'll need to add your own images or use image placeholders
    title: "Scientific Studies on Hair Growth",
    desc: "Research shows that regular scalp massage with hair oils increases blood circulation and can stimulate hair follicles. Studies have found that coconut oil in particular penetrates deep into the hair shaft, preventing protein loss and reducing damage.",
  },
  {
    img: "/assets/blog2.jpg",
    title: "Essential Benefits of Hair Oiling",
    desc: "Regular hair oiling provides multiple benefits including deep nourishment, protection from UV damage, reduced dandruff, and improved scalp health. Natural oils like almond and jojoba contain vitamins E and F that strengthen hair from root to tip.",
  },
  {
    img: "/assets/bll.jpg",
    title: "Power of Natural Ingredients",
    desc: "Key ingredients in our hair oils include cold-pressed coconut oil, vitamin E-rich argan oil, and mineral-rich castor oil. These ingredients work together to reduce hair breakage by up to 50% while promoting thicker, healthier hair growth.",
  },
];

const BlogSection = () => {
  const headerRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(headerRef.current.children,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section className="container mx-auto px-8 py-10 lg:py-28">
      <div ref={headerRef}>
      <h2 className="text-3xl font-semibold mb-8 text-center font-poppins">Blogs</h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {contents.map((content, index) => (
          <ContentCard 
            key={content.title}
            img={content.img}
            title={content.title}
            desc={content.desc}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;