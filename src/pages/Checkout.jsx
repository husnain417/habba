import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import AnimatedFooter from "../components/footer";
import { Loader2 } from "lucide-react";
const REACT_APP_API_URL = "https://habba-backend-zvtd.onrender.com";

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

const countries = ["Pakistan", "United States", "Canada", "United Kingdom", "Australia", "India", "Germany", "France", "China", "Japan"];

const Checkout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState('cash');
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    
    email: '',
    firstName: '',
    lastName: '',
    country: 'Pakistan',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    phone: '',
    saveInfo: false
  });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
  
    try {
      const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      const orderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: totalAmount,
        paymentMethod: selectedPayment
      };
  
      const response = await fetch(`${REACT_APP_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
  
      const data = await response.json();
  
      if (data.success) {
        localStorage.removeItem('cart');
        setCartItems([]);
        setShowToast(true);
        // Use window.location for navigation
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);      } else {
        throw new Error(data.message || 'Failed to place order');
      }
  
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <Header />

      <Toast 
        show={showToast}
        message={`Order Placed Successfully!`}
        onClose={() => setShowToast(false)}
      />
      
      <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-lg font-medium mb-4">Contact</h3>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-lg font-medium mb-4">Delivery</h3>
                <div className="space-y-4">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                    </div>
                  </div>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, etc. (optional)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                      {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="Postal code"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                      {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
                    </div>
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                   <small>We recommend providing your WhatsApp number for quicker responses.</small>
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
              </div>

                            {/* Payment Options */}
                            <div className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      checked={selectedPayment === 'cash'}
                      onChange={() => setSelectedPayment('cash')}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <label htmlFor="cash" className="ml-3 block text-sm text-gray-700">
                      Cash on Delivery
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="bank"
                      name="paymentMethod"
                      value="bank"
                      checked={selectedPayment === 'bank'}
                      onChange={() => setSelectedPayment('bank')}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <label htmlFor="bank" className="ml-3 block text-sm text-gray-700">
                      Online Transfer
                    </label>
                  </div>
                </div>

                {selectedPayment === 'bank' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h4 className="font-medium mb-2 text-gray-700">Online Transfer Details</h4>
                    <p className="text-sm text-gray-600">
                      Bank: Easypaisa<br />
                      Number: 03421607309<br />
                      Name: Abdullah Ashar
                    </p>
                    <small>After making the payment, please send the receipt to this number: <strong>03421607309</strong> and complete the order</small>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Complete Order'
                )}
              </button>
            </form>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4 pb-4 border-b">
                <div className="relative mr-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                </div>
                <p className="font-medium">Rs {item.price * item.quantity}</p>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>Rs {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
            </div>
          </div>
        </div>
      </div>
      <AnimatedFooter />
    </>
  );
};

export default Checkout;
