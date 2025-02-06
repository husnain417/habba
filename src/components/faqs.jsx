import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How do I order?",
    answer: "You can place your order through our website by selecting your desired products, adding them to your cart, and proceeding to checkout. Follow the simple steps to complete your purchase."
  },
  {
    question: "How can i make the payment?",
    answer: "We accept various payment methods including credit/debit cards, PayPal, and bank transfers. All payments are processed securely through our payment gateway."
  },
  {
    question: "How much time does it take to receive the order?",
    answer: "Typically, orders are processed within 1-2 business days. Shipping time varies by location, usually taking 3-7 business days for domestic orders and 7-14 days for international orders."
  },
  {
    question: "Can I resell the products?",
    answer: "Yes, you can resell our products. Please contact our support team for information about wholesale pricing and reseller agreements."
  },
  {
    question: "Where do I find the shipping details?",
    answer: "Shipping details can be found in your order confirmation email. You can also track your order by logging into your account and visiting the order status page."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick, itemRef }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: isOpen ? 'auto' : 0,
        duration: 0.5,
        ease: 'power2.inOut'
      });
    }
  }, [isOpen]);

  return (
    <div ref={itemRef} className="border-b border-gray-200 py-6">
      <button 
        onClick={onClick}
        className="w-full text-left text-[20px] font-medium text-gray-900 focus:outline-none"
      >
        {question}
      </button>
      <div 
        ref={contentRef}
        className="overflow-hidden h-0"
      >
        <p className="pt-4 text-gray-600">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const faqRefs = useRef([]);

  useEffect(() => {
    // Animate title and subtitle
    gsap.fromTo([titleRef.current, subtitleRef.current],
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
          trigger: sectionRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate FAQ items
    faqRefs.current.forEach((ref, index) => {
      gsap.fromTo(ref,
        {
          opacity: 0,
          x: -30
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: ref,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl font-semibold text-center text-gray-900 mb-4"
        >
          Frequently asked questions
        </h2>
        <p 
          ref={subtitleRef}
          className="text-center text-gray-600 mb-12"
        >
          A lot of people don't appreciate the moment until it's passed. I'm not trying my hardest, and I'm not trying to do
        </p>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              itemRef={el => faqRefs.current[index] = el}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;