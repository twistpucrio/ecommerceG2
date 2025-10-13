document.addEventListener('DOMContentLoaded', async () => {
    const g2 = new EcommerceG2();

    // Recupera elementos do DOM
    const txtNome = document.getElementById("txtNome");
    const txtCpf = document.getElementById("txtCpf");
    const txtCep = document.getElementById("txtCep");
    const txtCid = document.getElementById("txtCid");
    const optEstado = document.getElementById("optEstado");
    const txtLog = document.getElementById("txtLog");
    const txtNum = document.getElementById("txtNum");
    const txtComp = document.getElementById("txtComp");

    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('finalizando');
    const clearCartBtn = document.getElementById('clearcart-btn');

    // Carrega dados do usuário logado
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) {
        window.location.href = 'cadastro.html';
        return;
    }

    // Preenche os campos com dados do usuário
    txtNome.value = usuarioLogado.nome || '';
    txtCpf.value = usuarioLogado.cpf || '';
    txtCep.value = usuarioLogado.cep || '';
    txtCid.value = usuarioLogado.cidade || '';
    optEstado.value = usuarioLogado.estado || '';
    txtLog.value = usuarioLogado.logradoro || '';
    txtNum.value = usuarioLogado.numero || '';
    txtComp.value = usuarioLogado.complemento || '';

    // Renderiza o carrinho
    async function renderCart() {
        const cartData = await g2.getCart();
        const productsData = await g2.listProducts();
        const allProducts = Object.values(productsData).flat();

        if (!cartData.products.length) {
            cartItemsContainer.innerHTML = '<p>O carrinho está vazio. <a href="index.html">Continue comprando</a>.</p>';
            cartTotalEl.innerHTML = '';
            checkoutBtn.style.display = 'none';
            return;
        }

        cartItemsContainer.innerHTML = '';

        // Agrupa produtos por ID para calcular quantidade
        const itemMap = new Map();
        cartData.products.forEach(pid => {
            const product = allProducts.find(p => p.id === pid);
            if (!product) return;
            const item = itemMap.get(pid) || { details: product, amount: 0 };
            item.amount += 1;
            itemMap.set(pid, item);
        });

        let total = 0;
        itemMap.forEach((item, id) => {
            const subtotal = item.details.preco * item.amount;
            total += subtotal;

            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.details.imagem}" alt="${item.details.nome}" width="60" height="60">
                <div class="info">
                    <h4>${item.details.nome}</h4>
                    <div>Preço unitário: R$${item.details.preco.toFixed(2)}</div>
                    <div>Quantidade: ${item.amount}</div>
                    <hr>
                    <div>Subtotal: R$${subtotal.toFixed(2)}</div>
                </div>
                

            `;
            cartItemsContainer.appendChild(itemEl);
        });

        cartTotalEl.innerHTML = `<p id='total'>Total: R$${total.toFixed(2)}</p>`;
        checkoutBtn.style.display = 'block';
    }

    // Manipula cliques nos botões de adicionar/remover itens
    cartItemsContainer.addEventListener('click', async (event) => {
        if (event.target.tagName !== 'BUTTON') return;

        const productId = parseInt(event.target.dataset.addId || event.target.dataset.removeId, 10);
        if (event.target.dataset.addId) await g2.addToCart(productId);
        else if (event.target.dataset.removeId) await g2.removeItemFromCart(productId);

        renderCart();
    });

    // Limpar carrinho
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            g2.clearCart();
            renderCart();
        });
    }

    // Finalizar pedido
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', async () => {
            const order = await g2.checkout();
            if (order.success) {
                alert(`Pedido finalizado com sucesso! Total: R$${order.total.toFixed(2)}`);
                renderCart(); // Mostra carrinho vazio
            } else {
                alert('Erro ao finalizar o pedido.');
            }
        });
    }

    renderCart();
});
