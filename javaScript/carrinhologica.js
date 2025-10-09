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
    let cart = await g2.getCart(); // pega o carrinho
    const allProducts = await g2.listProducts(); // pega todos os produtos disponíveis

    // Mapeia o carrinho para um Map que acumula quantidades
    const items = cart.products.reduce((map, productId) => {
        // Procura o produto em todas as categorias do JSON
        const product = Object.values(allProducts)
            .flat()
            .find(p => p.id === productId);

        if (product) {
            const item = map.get(productId) || { details: product, amount: 0 };
            item.amount += 1; // soma a quantidade
            map.set(productId, item);
        }
        return map;
    }, new Map());

    // Se carrinho estiver vazio
    if (items.size === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty. <a href="index.html">Continue shopping</a>.</p>';
        checkoutBtn.style.display = 'none';
    } else {
        cartItemsContainer.innerHTML = '';

        [...items.keys()].sort().forEach((id) => {
            const item = items.get(id);
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';

            itemEl.innerHTML = `
                <img src="${item.details.imagem}" alt="${item.details.nome}" width="60" height="60">
                <div class="info">
                    <h4>${item.details.nome}</h4>
                    <div>$${item.details.preco.toFixed(2)}</div>
                </div>
                
                <input type="text" id="qtd-${id}" readonly value="${item.amount}"> &nbsp
                <button class="adicionar" data-add-id="${id}">+</button> &nbsp
                <button class="remover" data-remove-id="${id}">-</button>
            `;

            cartItemsContainer.appendChild(itemEl);
        });

        checkoutBtn.style.display = 'block';
    }

    // Atualiza o total baseado nas quantidades
    const total = [...items.values()]
        .reduce((sum, item) => sum + item.details.preco * item.amount, 0);

    cartTotalEl.textContent = `Total: R$${total.toFixed(2)}`;
}

    

    //  checkoutBtn.addEventListener('click', () => {
        
    //     const order = g2.checkout();
    //     if (order.success) {
    //         alert(`Checkout successful! Your order ID is ${order.orderId}. Total: $${order.total.toFixed(2)}`);
    //         renderCart(); // Re-render to show the empty cart
    //     } else {
    //         alert('Could not process checkout. Your cart might be empty.');
    //     }
    // });

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