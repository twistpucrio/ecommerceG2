  class Model {
          constructor() {
            // Static product list
            this.products = [
              { id: 1, name: 'Tênis de Corrida', price: 299.99 },
              { id: 2, name: 'Camiseta de Algodão', price: 79.90 },
              { id: 3, name: 'Calça Jeans', price: 150.00 },
              { id: 4, name: 'Relógio Digital', price: 350.50 },
            ];

            // Simple cart array (in memory only)
            this.cart = [];
          }

          // Bind callback for cart changes
          bindCartChanged(callback) {
            this.onCartChanged = callback;
          }

          // Add product to cart (simplified)
          addProductToCart(id) {
            const existingItem = this.cart.find(item => item.id === id);

            if (existingItem) {
              // Increment quantity if product already in cart
              existingItem.quantity += 1;
            } else {
              // Add new product to cart
              this.cart.push({ id, quantity: 1 });
            }

            // Notify view of change
            if (this.onCartChanged) {
              this.onCartChanged(this.cart);
            }
          }
        }

 class View {
          constructor() {
            this.app = this.getElement('#root');

            // Create main structure
            this.title = this.createElement('h1');
            this.title.textContent = 'Loja Simples';

            this.container = this.createElement('div', 'container');
            this.productList = this.createElement('div', 'product-list');

            // Cart section
            this.cartSection = this.createElement('div', 'cart-section');
            this.cartTitle = this.createElement('h2');
            this.cartTitle.textContent = 'Carrinho';
            this.cartList = this.createElement('ul', 'cart-list');
            this.cartSection.append(this.cartTitle, this.cartList);
            
            // Assemble layout
            this.container.append(this.productList, this.cartSection);
            this.app.append(this.title, this.container);
          }

          createElement(tag, className) {
            const element = document.createElement(tag);
            if (className) element.classList.add(className);
            return element;
          }

          getElement(selector) {
            return document.querySelector(selector);
          }

          displayProducts(products) {
            // Clear previous products
            this.productList.innerHTML = '';

            // Create product cards
            products.forEach(product => {
              const productCard = this.createElement('div', 'product-card');
              
              const productName = this.createElement('h3');
              productName.textContent = product.name;

              const productPrice = this.createElement('p');
              productPrice.textContent = `R$ ${product.price.toFixed(2)}`;

              const addButton = this.createElement('button');
              addButton.textContent = 'Adicionar ao Carrinho';
              addButton.dataset.id = product.id;

              productCard.append(productName, productPrice, addButton);
              this.productList.append(productCard);
            });
          }

          displayCart(cartItems, products) {
            // Clear previous cart
            this.cartList.innerHTML = '';

            if (cartItems.length === 0) {
              const emptyMessage = this.createElement('p');
              emptyMessage.textContent = 'Carrinho vazio';
              this.cartList.append(emptyMessage);
            } else {
              cartItems.forEach(item => {
                const product = products.find(p => p.id === item.id);
                const li = this.createElement('li');
                li.textContent = `${product.name} - Qtd: ${item.quantity}`;
                this.cartList.append(li);
              });
            }
          }

          bindAddToCart(handler) {
            this.productList.addEventListener('click', event => {
              if (event.target.tagName === 'BUTTON') {
                const id = parseInt(event.target.dataset.id);
                handler(id);
              }
            });
          }
        }

        /**
         * @class Controller - Simplified version
         * Connects Model and View
         */
        class Controller {
          constructor(model, view) {
            this.model = model;
            this.view = view;

            // Bind cart changes
            this.model.bindCartChanged(this.onCartChanged);
            
            // Bind add to cart clicks
            this.view.bindAddToCart(this.handleAddToCart);

            // Initial display
            this.view.displayProducts(this.model.products);
            this.view.displayCart(this.model.cart, this.model.products);
          }

          onCartChanged = (cart) => {
            this.view.displayCart(cart, this.model.products);
          }

          handleAddToCart = (id) => {
            this.model.addProductToCart(id);
          }
        }

        // ===== APPLICATION INITIALIZATION =====
        const app = new Controller(new Model(), new View());

