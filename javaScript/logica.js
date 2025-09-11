class EcommerceG2 {
  constructor() {
    this.products = [
      {
        id: 1,
        name: 'Stylish Sunglasses',
        price: 24.99,
        image: 'https://via.placeholder.com/300x300.png?text=Sunglasses'
      },
      {
        id: 2,
        name: 'Leather Wallet',
        price: 39.99,
        image: 'https://via.placeholder.com/300x300.png?text=Wallet'
      },
      {
        id: 3,
        name: 'Classic Watch',
        price: 149.99,
        image: 'https://via.placeholder.com/300x300.png?text=Watch'
      },
      {
        id: 4,
        name: 'Comfortable Backpack',
        price: 59.99,
        image: 'https://via.placeholder.com/300x300.png?text=Backpack'
      }
    ];
    // Load cart from localStorage or initialize as empty array
    this.cart = this._loadCart();
  }

  _loadCart() {
    try {
      const cartJson = localStorage.getItem('ecommerce_cart');
      return cartJson ? JSON.parse(cartJson) : [];
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
      return [];
    }
  }

  _saveCart() {
    try {
      localStorage.setItem('ecommerce_cart', JSON.stringify(this.cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }

  listProducts() {
    return this.products;
  }

  addToCart(productId) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      this.cart.push(productId);
      this._saveCart(); // Save cart after modification
    }
  }

  getCart() {
    const total = this.cart.reduce((acc, productId) => {
      const product = this.products.find(p => p.id === productId);
      return acc + (product ? product.price : 0);
    }, 0);

    return {
      products: [...this.cart],
      total,
    };
  }

  checkout() {
    const cartData = this.getCart();

    const order = {
      success: true,
      orderId: Date.now().toString(),
      total: cartData.total,
      products: cartData.products,
    };

    this.clearCart();

    return order;
  }

  clearCart() {
    this.cart = [];
    this._saveCart();

  }

  removeItemFromCart(productId) {
    const index = this.cart.indexOf(productId);
    if (index > -1) {
      this.cart.splice(index, 1);
      this._saveCart(); // Save cart after modification
    }
  }
}

// Make it available globally for testing
if (typeof window !== 'undefined') {
  window.EcommerceG2 = EcommerceG2;
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EcommerceG2;
}


