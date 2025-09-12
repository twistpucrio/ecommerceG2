document.addEventListener('DOMContentLoaded', () => {
            const g2 = new EcommerceG2();
            const cartItemsContainer = document.getElementById('cart-items-container');
            const cartTotalEl = document.getElementById('cart-total');
            const checkoutBtn = document.getElementById('checkout-btn');
            const clearCartBtn = document.getElementById("clearcart-btn");
            let removeItemBtn = document.getElementsByClassName('remover');
            

            function renderCart() {
                const cart = g2.getCart();
                const allProducts = g2.listProducts();
                
                const cartItemDetails = cart.products.map(productId => {
                    return allProducts.find(p => p.id === productId);
                }).filter(p => p); // Filter out undefined if a product is not found

                if (cartItemDetails.length === 0) {
                    cartItemsContainer.innerHTML = '<p>Your cart is empty. <a href="index.html">Continue shopping</a>.</p>';
                    checkoutBtn.style.display = 'none'; // Hide checkout if cart is empty
                } else {
                    cartItemsContainer.innerHTML = '';
                    cartItemDetails.forEach(item => {
                        const itemEl = document.createElement('div');
                        itemEl.className = 'cart-item';
                        itemEl.innerHTML = `
                            <img src="${item.image}" alt="${item.name}" width="60" height="60">
                            <div class="info">
                                <h4>${item.name}</h4>
                                <div>$${item.price.toFixed(2)}</div>
                            </div>
                            <button class="remover" data-product-id="${item.id}">
                                Remover
                            </button>

                        `;
                        cartItemsContainer.appendChild(itemEl);
                    });
                    checkoutBtn.style.display = 'block';
                }

                cartTotalEl.textContent = `Total: $${cart.total.toFixed(2)}`;
            }

            checkoutBtn.addEventListener('click', () => {
                const order = g2.checkout();
                if (order.success) {
                    //alert(`Checkout successful! Your order ID is ${order.orderId}. Total: $${order.total.toFixed(2)}`);
                    renderCart(); // Re-render to show the empty cart
               } else {
                    alert('Could not process checkout. Your cart might be empty.');
                }
            });
            clearCartBtn.addEventListener("click",() =>{
                g2.clearCart();
                renderCart();
            });
            cartItemsContainer.addEventListener('click', (event) => {
                console.log(event.target.dataset)
                if (event.target.tagName=== 'BUTTON' && event.target.dataset.productId) {
                    const productId = parseInt(event.target.dataset.productId, 10);
                    g2.removeItemFromCart(productId);
                    renderCart();
                    
                }
            });

            renderCart();
        });