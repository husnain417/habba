import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/header";
import AnimatedFooter from "../components/footer";
import { ShieldCheck, Leaf, Eye } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    gsap.utils.toArray(".fade-up").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 fade-up">
          <h3 className="text-2xl md:text-[2rem] font-bold mb-4 text-gray-900">
            Our Journey in Natural Hair Care
          </h3>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

      {/* First Section - Text Left, Image Right */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-24 fade-up">
        <div className="md:w-1/2 space-y-6 ">
          <h2 className="text-3xl font-semibold text-gray-900">
            Rooted in Tradition
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Habba Hair Oil was founded with a passion for providing natural hair care solutions inspired by Ayurvedic traditions. 
            Our journey began with a vision to bring age-old herbal remedies to modern hair care, combining time-tested 
            formulas with scientific research. Over the years, we have grown into a trusted brand known for quality and effectiveness, 
            helping countless individuals achieve healthier, stronger hair with the power of nature.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We source our ingredients with utmost care, ensuring that each herb and plant used in our formulations is of the highest quality.
            Our commitment to excellence and authenticity drives us to craft products that not only nourish the hair but also promote overall scalp health.
          </p>
        </div>
        <div className="md:w-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-primary-600/10 rounded-lg transform rotate-3"></div>
            <img
              src="/assets/blog2.jpg"
              alt="Traditional ingredients"
              className="relative rounded-lg shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Second Section - Image Left, Text Right */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 fade-up">
        <div className="md:w-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-primary-600/10 rounded-lg transform -rotate-3"></div>
            <img
              src="/assets/ingred.jpeg"
              alt="Modern laboratory"
              className="relative rounded-lg shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900">
            Pure Ingredients, Powerful Results
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our premium ingredients are carefully imported from India, where they are cultivated using traditional and sustainable farming methods.
            These potent herbs are then meticulously processed to preserve their natural benefits, ensuring that every drop of Habba Hair Oil 
            delivers maximum nourishment.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We use a blend of powerful Ayurvedic ingredients such as Jatamansi, Amla, Bhringaraj, and Neem, known for their deep conditioning and scalp-strengthening properties.
            These natural extracts work together to reduce hair fall, enhance growth, and restore shine, making your hair healthier from root to tip.
          </p>
        </div>
      </div>

        {/* Values Section */}
        <div className="mt-24 text-center fade-up">
          <h2 className="text-3xl font-semibold text-gray-900 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                description:
                  "We never compromise on the quality of our ingredients or processes.",
                icon: (
                  <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-primary-600" />
                ),
              },
              {
                title: "Sustainability",
                description:
                  "Every decision we make considers its environmental impact.",
                icon: (
                  <Leaf className="w-12 h-12 mx-auto mb-4 text-primary-600" />
                ),
              },
              {
                title: "Transparency",
                description:
                  "We believe in being open about our ingredients and processes.",
                icon: <Eye className="w-12 h-12 mx-auto mb-4 text-primary-600" />,
              },
            ].map((value, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow fade-up"
              >
                {value.icon}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AnimatedFooter />
    </>
  );
};

export default About;
