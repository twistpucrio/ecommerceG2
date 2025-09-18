document.addEventListener('DOMContentLoaded', () => {
    // chama dos campos 
    const g2 = new EcommerceG2();
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartItemsAdd = document.getElementById('cart-items-add');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearCartBtn = document.getElementById("clearcart-btn");
    //let removeItemBtn = document.getElementsByClassName('remover');


            async function renderCart() {
                let cart = await g2.getCart();
                const allProducts = await g2.listProducts(); // Load all products to get details
                console.log(allProducts)
                console.log(cart);
                // Map cart product IDs to product details
                
                const cartItemDetails = cart.products.map(productId => {
                    return allProducts["velas"].find(p => p.id == productId);
                }).filter(p => p); // Filter out undefined if a product is not found

                if (cartItemDetails.length == 0) {
                    cartItemsContainer.innerHTML = '<p>Your cart is empty. <a href="index.html">Continue shopping</a>.</p>';
                    checkoutBtn.style.display = 'none'; // Hide checkout if cart is empty
                } else {
                    cartItemsContainer.innerHTML = '';
                    cartItemDetails.forEach(item => {
                        const itemEl = document.createElement('div');
                        itemEl.className = 'cart-item';
                        itemEl.innerHTML = `
                            <img src="${item.imagem}" alt="${item.nome}" width="60" height="60">
=======

    function renderCart() {
        const cart = g2.getCart();
        const allProducts = g2.listProducts();
        const items = cart.products.reduce((map, productId) => {
            const item = map.get(productId) || {
                details: allProducts.find(p => p.id === productId), 
                amount: 0,
            };
            item.amount += 1;
            map.set(productId, item);
            return map;
        }, new Map());
        console.log(items);

        

        /*const cartItemDetails = cart.products.map(productId => {
            return allProducts.find(p => p.id === productId);
        }).filter(p => p); // Pega os detalhes dos produtos visto que o carrinho so pega o id*/
        if (items.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty. <a href="index.html">Continue shopping</a>.</p>';
            checkoutBtn.style.display = 'none'; // Se o carrinho estiver vazio, ele esconde o checkout button

        } else {// caso contrario, ele renderiza os itens do carrinho 
            cartItemsContainer.innerHTML = '';
            //cartItemsAdd.innerHTML = '';
            [...items.keys()].sort().forEach((id) => {
                const item = items.get(id);
                const itemEl = document.createElement('div');
                const itemAdd = document.createElement('div');
                itemEl.className = 'cart-item';
                itemAdd.className = 'cart-add'
                itemEl.innerHTML = `
                                  <img src="${item.details.image}" alt="${item.details.name}" width="60" height="60">
                                  <div class="info">
                                      <h4>${item.details.name}</h4>
                                      <div>$${item.details.price.toFixed(2)}</div>

                                  <img src="${item.image}" alt="${item.name}" width="60" height="60">

                                  <div class="info">
                                      <h4>${item.nome}</h4>
                                      <div>$${item.preco.toFixed(2)}</div>
                                  </div>
                      
                                  <input type="text" id="qtd" readonly value ="${item.amount}"> 
                                  <button class="adicionar" data-add-id = "${id}">+</button>
                                  <button class="remover" data-remove-id = "${id}">-</button>

                        `;
                //itemAdd.innerHTML = `
                            
                //`;
                cartItemsContainer.appendChild(itemEl);
               // cartItemsAdd.appendChild(itemAdd);
            });
            checkoutBtn.style.display = 'block';// aparece como um bloco
        }

        cartTotalEl.textContent = `Total: $${cart.total.toFixed(2)}`;//total do carrinho com 2 casas decimais
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

    // para limpar o carinho por completo. Da um clear no carrinho todo e renderiza ele
    clearCartBtn.addEventListener("click", () => {
        g2.clearCart();
        renderCart();
    });


    cartItemsContainer.addEventListener('click', (event) => {
        console.log(event.target.dataset)
        if (event.target.tagName === 'BUTTON') {
            // remove um item especifico do carrinho. Se o clique for num botão que tem data-remove-id, pega o ID e remove esse item do carrinho.
            if(event.target.dataset.removeId){
                const productId = parseInt(event.target.dataset.removeId, 10);
                g2.removeItemFromCart(productId);
            }

            // adiciona um item especifico do carrinho. Se o clique for num botão que tem data-add-id, pega o ID e adiciona esse item do carrinho.
            else if (event.target.dataset.addId) {
                const productId = parseInt(event.target.dataset.addId, 10);
                g2.addToCart(productId);
            }
            renderCart();
        }
    });

    renderCart();
});