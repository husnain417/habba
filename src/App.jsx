import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { ThemeProvider } from "@material-tailwind/react";
import Product from "./pages/Product";
import ContactPage from "./pages/ContactUs";
import Cart from "./pages/Cart";
import Checkoutpage from "./pages/Checkoutpage";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<Product />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<Checkoutpage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
