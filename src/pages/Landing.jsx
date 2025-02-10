
import Header from "../components/header";
import Hero from "../components/hero";
import Product from "../components//products";
import VideoCarousel from "../components/tips";
import BlogSection from "../components/blog"
import ReviewsSection from "../components/review";
import FAQSection from '../components/faqs';
import AnimatedFooter from "../components/footer"
import { useEffect } from "react";

const Landing = () => {

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div>
      <Header  currentPage={"home"} />
      <Hero />
      <Product/>
      <VideoCarousel />
      <ReviewsSection />
      <BlogSection />
      <FAQSection />
      <AnimatedFooter />
    </div>
  );
};

export default Landing;