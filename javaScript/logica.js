class EcommerceG2 {
  constructor() {
    this.products = this.listProducts()
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

  loadProducts() {
    return fetch('../json/prod.json')
  }


  listProducts() {
    return this.loadProducts();
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


