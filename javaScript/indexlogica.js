document.addEventListener('DOMContentLoaded', () => {
    const g2 = new EcommerceG2();
    const productListEl = document.getElementById('product-list');//lista de produtos no html

    function renderProducts() {
        const barraDePesquisa = document.getElementById("pesquisa");
        const products = g2.listProducts();

        function exibirProdutos(filtro = '') {
            productListEl.innerHTML = '';// limpa a lista de produtos

            const termo = filtro.toLowerCase();// bota tudo que ta escrito na barra de pesquisa em lowercase pra nao ter problema de diferenciação entre letyras maiúsculas e minúsculas

            //filtrando os produtos vendo se o nome do produto inclui o que foi escrito na barra de pesquisa
            const produtosFiltrados = products.filter(product =>
                product.name.toLowerCase().includes(termo)
            );

            // se o tamanho dos produtos filtrados for igual  zero, ou seja, se não houver produtos que incluam o que foi pesquisado
            if (produtosFiltrados.length === 0) {
                const mensagem = document.createElement('div');//cria uma mensagem com classe para modificar no css
                mensagem.className = 'nenhum-produto';
                mensagem.textContent = 'Nenhum produto encontrado';
                productListEl.appendChild(mensagem);// coloca na lista a mensagem
                return;
            }

            //para cada produto filtrado
            produtosFiltrados.forEach(product => {
                const itemEl = document.createElement('div');//cria uma div com classe para adicionar os produtos filtrados
                itemEl.className = 'product-item';
                itemEl.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" width="80" height="80">
                    <div class="info">
                        <h3>${product.name}</h3>
                        <div class="price">$${product.price.toFixed(2)}</div>
                    </div>
                    <button data-product-id="${product.id}">Add to Cart</button>
                `;
                productListEl.appendChild(itemEl);//coloca na lista de produtos 
            });
        }

        // Mostra todos os produtos ao carregar
        exibirProdutos();

        // Filtra conforme digita
        barraDePesquisa.addEventListener("input", () => {
            exibirProdutos(barraDePesquisa.value);
        });
    }


    productListEl.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.dataset.productId) {
            const productId = parseInt(event.target.dataset.productId, 10);
            g2.addToCart(productId);
            alert(`${g2.listProducts().find(p => p.id === productId).name} added to cart!`);
        }
    });

    renderProducts();
});