document.addEventListener('DOMContentLoaded', () => {
    const g2 = new EcommerceG2();
    const productListEl = document.getElementById('product-list');//lista de produtos no html

    async function renderProducts() {
        const barraDePesquisa = document.getElementById("pesquisa");
        const products = await g2.listProducts();
        const produtosFavoritos = [2, 6, 8, 11, 13, 15, 19, 22, 25, 28, 29, 32];
        const produtosExibe = (products.produto || []).filter(produto =>
        produtosFavoritos.includes(produto.id)
    ); 
/* PESQUISA */ 
   /* form.addEventListener("submit", function(e) {
        e.preventDefault();
        const termo = document.getElementById("searchInput").value;
        // redireciona para a página de resultados com o termo na URL
        window.location.href = `resultados.html?q=${encodeURIComponent(termo)}`;
    }); */ 

        // Função para exibir produtos com filtro de busca

        function exibirProdutos(filtroBusca = '') {
            productListEl.innerHTML = '';// limpa a lista de produtos

            const termo = filtroBusca.toLowerCase();// bota tudo que ta escrito na barra de pesquisa em lowercase pra nao ter problema de diferenciação entre letyras maiúsculas e minúsculas
            const produtosFiltrados = produtosExibe.filter(produto =>
                produto.nome.toLowerCase().includes(termo)
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
                    <img onclick="redirecionarParaPaginaIndividualProduto(${product.id})" src="${product.imagem}" alt="${product.nome}" width="80" height="80" class="product-item-img"/>
                    <div class="info">
                        <h3 onclick="redirecionarParaPaginaIndividualProduto(${product.id})">${product.nome}</h3>
                        <div class="price">R$${product.preco.toFixed(2)}</div>
                    </div>
                    <div class="botao">
                    <button class="add-carrinho" id="cart" data-product-id="${product.id}"><img src="img/carrinho_branco.png" alt="Carrinho" width="24" height="24"> Comprar </button>
                    <button class="add-favorito" data-fav-id="${product.id}"> <img src="img/favoritos_branco.png" alt="Favorito" width="24" height="24"> </button>
                    </div>
                `;
                productListEl.appendChild(itemEl);//coloca na lista de produtos 
            });
        }

        // Mostra todos os produtos ao carregar
        exibirProdutos();

        // Filtra conforme digita
        barraDePesquisa.addEventListener("submit", () => {
            //exibirProdutos(barraDePesquisa.value);
            g2.openSearchPage(barraDePesquisa.value);
        });
    }

    // para adicionar itens no carrinho pelo home
    productListEl.addEventListener('click', (event) => {
        // adicionar ao carrinho
        if (event.target.classList.contains("add-carrinho")) {
            const id = parseInt(event.target.dataset.productId, 10);
            g2.addToCart(id);
            alert("Produto adicionado ao carrinho!");
        }

        // adicionar/remover favoritos
        if (event.target.classList.contains("add-favorito")) {
            const id = parseInt(event.target.dataset.favId, 10);
            adicionarFavoritos(id);
            }
        });


    renderProducts();
    
});

/*<button id="add-carrinho" data-product-id="R${product.id}"> carrinho </button> &nbsp
                    
                    <button id="add-favorito" data-fav-id="R${product.id}">❤</button>
*/ 