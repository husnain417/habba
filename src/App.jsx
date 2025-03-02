import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Landing from "./pages/Landing";
import Product from "./pages/Product";
import ContactPage from "./pages/ContactUs";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import ShippingPolicy from "./pages/ShippingPolicy";
import AdminPanel from "./pages/AdminPanel";

const AdminProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkPassword = () => {
    const password = prompt("Enter Admin Password:");
    if (password === "admin@habba123") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  return isAuthenticated ? <AdminPanel /> : checkPassword();
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<Product />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminProtectedRoute />} />
        <Route path="/policy" element={<ShippingPolicy />} />
      </Routes>
    </Router>
  );
};

export default App;
