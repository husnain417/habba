import { useState, useEffect } from "react";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import "@fontsource/lora";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length); // Set count dynamically
    };
  
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
  
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);
  

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact Us", path: "/contact" },
    { name: "About Us", path: "/about" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    return path !== "/" && location.pathname.startsWith(path);
  };

  return (
    <>
      {searchOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSearchOpen(false)}
        ></div>
      )}

      <header className="sticky top-0 z-50 w-full font-lora">
        <nav className="bg-white flex items-center justify-between p-4 px-10 shadow-md relative">
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`hover:underline cursor-pointer ${
                    isActive(item.path) ? "font-bold underline" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img src="/assets/logo.png" alt="Logo" className="h-12 md:h-12" />
          </div>

          <div className="flex space-x-4 items-center">
            <FiSearch
              className="cursor-pointer text-lg md:text-xl"
              onClick={() => setSearchOpen(!searchOpen)}
            />
            <Link to="/cart" className="relative">
              <FiShoppingCart className="cursor-pointer text-lg md:text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <FiMenu className="cursor-pointer text-2xl" />
          </div>
        </nav>

        {searchOpen && (
          <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex items-center z-50">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow p-2 border rounded-md focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiX
              className="ml-2 cursor-pointer text-xl"
              onClick={() => setSearchOpen(false)}
            />
          </div>
        )}

        {menuOpen && (
          <div className="md:hidden bg-white shadow-md p-4 space-y-2 text-center">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.path}
                  className={`hover:underline cursor-pointer block py-2 ${
                    isActive(item.path) ? "font-bold underline" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;