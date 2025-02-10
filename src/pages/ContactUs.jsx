import React from "react";
import Header from "../components/header";
import AnimatedFooter from "../components/footer";
import { Typography } from "@material-tailwind/react";
import { useEffect } from "react";


const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  
  return (
    <>
    <Header/>
    <div className="min-h-screen flex flex-col items-center px-4 py-16 max-w-2xl mx-auto">
      <h1 className="text-4xl font-normal mb-16">Contact</h1>
      
      <form className="w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
          />
          <input
            type="email"
            placeholder="Email *"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
          />
        </div>
        
        <input
          type="tel"
          placeholder="Phone number"
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
        />
        
        <textarea
          placeholder="Comment"
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-900 resize-none"
        />
        
        <button
          type="submit"
          className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
    </>
  );
}

export default ContactPage;