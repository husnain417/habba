import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import AnimatedFooter from "../components/footer";
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="flex py-6 border-b border-gray-200">
      <img
        src={item.image}
        alt={item.name}
        className="h-24 w-24 object-cover object-center rounded"
      />
      
      <div className="ml-6 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Rs.{parseFloat(item.price).toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border border-gray-200 rounded">
            <button 
              className="p-2 hover:bg-gray-50"
              onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
            >
              <Minus size={16} />
            </button>
            <input
              type="text"
              value={item.quantity}
              className="w-12 text-center border-x border-gray-200 py-1"
              readOnly
            />
            <button 
              className="p-2 hover:bg-gray-50"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              <Plus size={16} />
            </button>
          </div>
          <button 
            className="text-gray-500 hover:text-red-600"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Initialize navigate
  
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
  }, []);

  const updateCart = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartItems(newCart);
    localStorage.setItem('cartCount', newCart.length); // Update count in localStorage
    window.dispatchEvent(new Event('storage')); // Notify other components
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveItem(itemId);
      return;
    }
    
    const updatedCart = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    updateCart(updatedCart);
  };

  const subtotal = cartItems.reduce((sum, item) => 
    sum + (parseFloat(item.price) * item.quantity), 0
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Your cart</h1>
            <Link 
              to="/products" 
              className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
            >
              Continue shopping
            </Link>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Your cart is empty</p>
                  <Link 
                    to="/products" 
                    className="mt-4 inline-block text-emerald-600 hover:text-emerald-500"
                  >
                    Start shopping
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <CartItem 
                      key={item.id} 
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="lg:col-span-5 mt-12 lg:mt-0">
                <div className="bg-gray-50 rounded-lg p-8">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">
                    Order summary
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <p className="text-base text-gray-500">Subtotal</p>
                      <p className="text-base font-medium text-gray-900">
                        Rs.{subtotal.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex justify-between">
                      <p className="text-base text-gray-500">Shipping estimate</p>
                      <p className="text-base font-medium text-gray-900">Rs.0.00</p>
                    </div>
                    
                    <div className="flex justify-between border-t border-gray-200 pt-4">
                      <p className="text-base font-medium text-gray-900">Order total</p>
                      <p className="text-base font-medium text-gray-900">
                        Rs.{subtotal.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-8 w-full bg-black py-3 px-4 rounded text-white font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={() => navigate('/checkout')} // Navigate to checkout page
                  >
                    Proceed to Checkout
                  </button>

                  
                  <p className="mt-4 text-center text-sm text-gray-500">
                    Total includes shipping charges
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <AnimatedFooter />
    </div>
  );
}