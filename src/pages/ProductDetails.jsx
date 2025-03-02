import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/header";
import AnimatedFooter from "../components/footer";
const REACT_APP_API_URL = "https://habba-backend-zvtd.onrender.com";
import Instructions from "../components/instructions";

// Toast Notification Component
const Toast = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default function ProductDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  const getImageUrl = (path) => {
    return `${REACT_APP_API_URL}/${path.replace(/\\/g, '/')}`;
  };


  const location = useLocation();
  const product = location.state?.product;
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [selectedImage, setSelectedImage] = useState(getImageUrl(product.images[0]));

  if (!product) {
    return <div className="text-center text-xl mt-10">Product not found</div>;
  }

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(10, value)); // Limit between 1 and 10
    setQuantity(newQuantity);
  };

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Log the product to see if it has an ID
    console.log('Product being added:', product);
    
    // Make sure product.id exists
    if (!product._id && !product.id) {
      console.error('Product ID is missing!');
      return;
    }
  
    const productId = product._id || product.id; // Handle both MongoDB _id and regular id
    const existingItemIndex = existingCart.findIndex(item => item.id === productId);
  
    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: getImageUrl(product.images[0]),
        quantity: quantity
      });
    }
  
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setShowToast(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <Toast 
        show={showToast}
        message={`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart`}
        onClose={() => setShowToast(false)}
      />

      <main className="flex-grow bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white p-4 rounded-lg">
              <img 
                src={selectedImage} 
                alt={product.imageAlt} 
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <img 
                key={index}
                src={image ? getImageUrl(image) : '/assets/placeholder.jpg'}
                alt={`Product thumbnail ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75" 
                onClick={() => setSelectedImage(getImageUrl(image))}
              />
            ))}
          </div>
          </div>

            {/* Product Info */}
            <div className="bg-white p-8 rounded-lg">
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                {product.category || "ORGANIC HAIR CARE PRODUCTS"}
              </div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="mb-6">
                <p className="text-2xl font-semibold">Rs. {product.price} PKR</p>
                <p className="text-sm font-bold text-gray-500 mt-1">Shipping charges are included</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                <p className="text-gray-700 max-w-lg break-words">{product.description}</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {product.features?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-md">
                    <button 
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                      onClick={() => handleQuantityChange(quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="w-16 text-center border-x py-2"
                    />
                    <button 
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={addToCart}
                    className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Instructions/>
      </main>
      <AnimatedFooter />
    </div>
  );
}