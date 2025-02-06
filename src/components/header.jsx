import { useState } from "react";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import "@fontsource/lora";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation(); // Get current location

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact Us", path: "/contact" },
  ];

  // Function to check if link is active
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    return path !== "/" && location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Dim Background when Search is Open */}
      {searchOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSearchOpen(false)}
        ></div>
      )}

      <header className="sticky top-0 z-50 w-full font-lora">
        {/* Navigation */}
        <nav className="bg-white flex items-center justify-between p-4 px-10 shadow-md relative">
          {/* Left Side - Navigation Links */}
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

          {/* Center - Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img src="/assets/logo.png" alt="Logo" className="h-12 md:h-12" />
          </div>

          {/* Right Side - Icons */}
          <div className="flex space-x-4 items-center">
            <FiSearch
              className="cursor-pointer text-lg md:text-xl"
              onClick={() => setSearchOpen(!searchOpen)}
            />
            <Link to="/cart">
              <FiShoppingCart className="cursor-pointer text-lg md:text-xl" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <FiMenu className="cursor-pointer text-2xl" />
          </div>
        </nav>

        {/* Search Bar */}
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

        {/* Mobile Menu */}
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
