class EcommerceG2 {
  constructor() {
    // Load cart from localStorage or initialize as empty array
    this.cart = this._loadCart();
    this.products = this.loadProducts(); 
  }

  async loadProducts() {
    try {
      const response = await fetch('../json/prod.json');
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }


  listProducts() {
    return this.products;
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

  

  async addToCart(productId) {
    console.log(productId); 
    const products = await this.listProducts();
     if (products && products.id) {
            this.cart.push(products.id);
            this._saveCart();
        }
            this.cart.push(productId);
        this._saveCart(); // Save cart after modification
    }

    /*
    console.log(productId)
    const products = await this.listProducts();
    products.velas.map(product => {
         if (product.id === productId){
          this.cart.push(productId);
          this._saveCart(); // Save cart after modification
         }
      });
  }*/ 

  async getCart() {
    const products = await this.listProducts();

    const total = this.cart.reduce((acc, productId) => {
    const product = products["velas"].find(p => p.id === productId);
          return acc + (product ? product.preco : 0);
  }, 0);
          return {
            products: [...this.cart],
            total,
          };
      }


    /*
    const products = await this.loadProducts();
    const total = this.cart.reduce((acc, productId) => {
      const product = products.find(p => p.id === productId);
      return acc + (product ? product.price : 0);
    }, 0);

    return {
      products: [...this.cart],
      total,
    };
  }*/ 

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

  async removeItemFromCart(productId) {
    const products = await this.listProducts(); 
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
