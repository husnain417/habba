import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { User, Package, RefreshCw, Trash2, Settings } from 'lucide-react';
const REACT_APP_API_URL = "https://habba-backend-zvtd.onrender.com";

// Main AdminPanel component
const AdminPanel = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    const [activeSection, setActiveSection] = useState('add');
    const adminName = "Ashir Abdullah";
  
    return (
      <div className="flex h-screen">
        {/* Fixed Sidebar */}
        <div className="w-64 bg-white shadow-lg h-screen fixed left-0">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <img 
                  src="/api/placeholder/48/48"
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Hello, {adminName}</p>
                <p className="text-sm text-gray-500">Admin</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <SidebarItem
                icon={<Package />}
                text="Add Product"
                active={activeSection === 'add'}
                onClick={() => setActiveSection('add')}
              />
              <SidebarItem
                icon={<RefreshCw />}
                text="Update Product"
                active={activeSection === 'update'}
                onClick={() => setActiveSection('update')}
              />
              <SidebarItem
                icon={<Trash2 />}
                text="Remove Product"
                active={activeSection === 'remove'}
                onClick={() => setActiveSection('remove')}
              />
            </nav>
          </div>
        </div>
  
        {/* Scrollable Main Content */}
        <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
          <div className="p-8 h-full overflow-y-auto">
            {activeSection === 'add' && <AddProductForm />}
            {activeSection === 'update' && <UpdateProductForm />}
            {activeSection === 'remove' && <RemoveProductForm />}
          </div>
        </div>
      </div>
    );
  };

// Sidebar Item Component
const SidebarItem = ({ icon, text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
      active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-600'
    }`}
  >
    {icon}
    <span>{text}</span>
  </button>
);

const CategorySelect = () => {
  const [categories] = useState([
    'Hair Oil',
    'Shampoo',
    'Conditioner',
    'Hair Serum',
    'Hair Mask'
  ]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setIsCustom(value === 'custom');
  };

  const handleCustomInput = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Category</label>
      <div className="relative">
        {!isCustom ? (
          <select 
            value={selectedCategory}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            <option value="custom">Add custom category...</option>
          </select>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={selectedCategory}
              onChange={handleCustomInput}
              placeholder="Enter custom category"
              className="flex-1 p-2 border rounded"
              autoFocus
            />
            <button
              onClick={() => setIsCustom(false)}
              className="px-3 py-2 bg-gray-100 rounded border hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


const AddProductForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    oldPrice: '',
    category: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 3) {
      setError('You can only upload a maximum of 3 images');
      return;
    }
    setSelectedImages(prevImages => [...prevImages, ...files].slice(0, 3));
  };

  const removeImage = (index) => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Create FormData object
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Append tags as JSON string
      formDataToSend.append('tags', JSON.stringify(tags));
      
      // Append each image
      selectedImages.forEach(image => {
        formDataToSend.append('images', image);
      });

      // Make API call
      const response = await axios.post(`${REACT_APP_API_URL}/products`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setSuccess('Product added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        oldPrice: '',
        category: '',
        description: ''
      });
      setTags([]);
      setSelectedImages([]);
      
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Natural Hair Oil"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Price (Rs)</label>
            <input 
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="1950.0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Old Price (Rs)</label>
            <input 
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="2200.0"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input 
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Hair Care"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded h-32"
            placeholder="A premium blend of natural oils that nourish the scalp..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button 
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Enter tag (e.g., Organic, Growth)"
            />
            <button 
              type="button"
              onClick={handleAddTag}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Add Tag
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Product Images</label>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <input 
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
                required={selectedImages.length === 0}
              />
              <p className="text-sm text-gray-500">
                Upload up to 3 images (Selected: {selectedImages.length}/3)
              </p>
            </div>

            {selectedImages.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-2">
                {selectedImages.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

const UpdateProductForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${REACT_APP_API_URL}/products`);
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      setError('Failed to fetch products: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (e) => {
    const productId = e.target.value;
    if (!productId) {
      setSelectedProduct(null);
      setFormData({
        name: '',
        price: '',
        description: ''
      });
      return;
    }

    const product = products.find(p => p._id === productId);
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Only send changed fields
      const changedFields = {};
      Object.keys(formData).forEach(key => {
        if (formData[key] !== selectedProduct[key]) {
          changedFields[key] = formData[key];
        }
      });

      // If no fields were changed, show message and return
      if (Object.keys(changedFields).length === 0) {
        setError('No changes were made');
        setLoading(false);
        return;
      }

      const response = await axios.patch(
        `${REACT_APP_API_URL}/update/${selectedProduct._id}`,
        changedFields
      );

      if (response.data.success) {
        setSuccess('Product updated successfully!');
        fetchProducts(); // Refresh the products list
      }
    } catch (error) {
      setError('Failed to update product: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Product to Update</label>
        <select
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          onChange={handleProductSelect}
          value={selectedProduct?._id || ''}
        >
          <option value="">Choose a product</option>
          {products.map(product => (
            <option key={product._id} value={product._id}>
              {product.name} - Rs. {product.price}
            </option>
          ))}
        </select>
      </div>

      {selectedProduct && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Product Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price (Rs.)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-blue-500"
              placeholder="Product description"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      )}
    </div>
  );
};

const RemoveProductForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${REACT_APP_API_URL}/products`); // Update API URL
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRemoveProduct = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
  
    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');
  
      const response = await fetch(`${REACT_APP_API_URL}/remove/${selectedProduct}`, { 
        method: 'DELETE',
      });
  
      const data = await response.json();
  
      if (data.success) {
        setSuccessMessage('Product removed successfully!');
        setSelectedProduct('');
        fetchProducts(); // Refresh list
      } else {
        setError(data.message || 'Failed to remove product');
      }
    } catch (err) {
      setError('Error removing product');
    } finally {
      setLoading(false);
    }
  };
  

  if (loading && !products.length) {
    return <div className="text-center">Loading products...</div>;
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Remove Product</h2>

      {/* Error and Success Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleRemoveProduct} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select Product</label>
          <select 
            className="w-full p-2 border rounded"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="">Select a product to remove</option>
            {products.map(product => (
              <option key={product._id} value={product._id}>
                {product.name} - Rs.{product.price}
              </option>
            ))}
          </select>
        </div>

        {selectedProduct && (
          <>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-800 font-medium">
                Warning: This action cannot be undone.
              </p>
            </div>

            <button 
              type="submit" 
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-red-300"
              disabled={loading}
            >
              {loading ? 'Removing...' : 'Remove Product'}
            </button>
          </>
        )}
      </form>
    </div>
  )
}

// const ProfileSettings = () => (
//   <div className="max-w-2xl">
//     <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
//     <form className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium mb-1">Name</label>
//         <input type="text" className="w-full p-2 border rounded" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Email</label>
//         <input type="email" className="w-full p-2 border rounded" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Profile Picture</label>
//         <input type="file" className="w-full p-2 border rounded" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Current Password</label>
//         <input type="password" className="w-full p-2 border rounded" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">New Password</label>
//         <input type="password" className="w-full p-2 border rounded" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Confirm New Password</label>
//         <input type="password" className="w-full p-2 border rounded" />
//       </div>
//       <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//         Save Changes
//       </button>
//     </form>
//   </div>
// );

export default AdminPanel;