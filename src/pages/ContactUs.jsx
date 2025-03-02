import React, { useState, useEffect } from "react";
import Header from "../components/header";
import AnimatedFooter from "../components/footer";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const REACT_APP_API_URL = "https://habba-backend-zvtd.onrender.com";

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${REACT_APP_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus({ type: "error", message: data.error });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Failed to send message." });
    }
  };


  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center px-4 py-16 max-w-2xl mx-auto">
        <h1 className="text-4xl font-normal mb-16">Contact</h1>

        {status && (
          <p className={`mb-4 ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>
            {status.message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
            />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
          />

          <textarea
            name="message"
            placeholder="Comment"
            rows={6}
            required
            value={formData.message}
            onChange={handleChange}
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
      <AnimatedFooter/>
    </>
  );
};

export default ContactPage;
