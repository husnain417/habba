// cartUtils.js
export const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Save to localStorage
    localStorage.setItem('cartCount', cartCount);
    
    // Dispatch custom event
    window.dispatchEvent(new Event('cartUpdated'));
  };
  
  export const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex > -1) {
      // If product exists, increase quantity
      cart[existingProductIndex].quantity += 1;
    } else {
      // If new product, add to cart with quantity 1
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  };