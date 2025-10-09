
document.addEventListener('DOMContentLoaded', () => {
    const g2 = new EcommerceG2();
    const productListEl = document.getElementById('product-list');//lista de produtos no html
    const params = new URLSearchParams(document.location.search);
    const barraDePesquisa = document.getElementById("pesquisa");
    const pesquisaParam = params.get("pesquisa");
    if(pesquisaParam !== null){
        barraDePesquisa.value = pesquisaParam;
    }

    async function renderProducts() {
        const products = await g2.listProducts();

        function exibirProdutos(filtroBusca = '') {
            productListEl.innerHTML = '';// limpa a lista de produtos

            const termo = filtroBusca.toLowerCase();// bota tudo que ta escrito na barra de pesquisa em lowercase pra nao ter problema de diferenciação entre letyras maiúsculas e minúsculas

            console.log(products);
            //filtrando os produtos vendo se o nome do produto inclui o que foi escrito na barra de pesquisa
            const produtosFiltrados = products["produto"].filter(vela =>
                vela.nome.toLowerCase().includes(termo)
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
                    <img onclick="redirecionarParaPaginaIndividualProduto(${product.id}) src="${product.image}" alt="${product.nome}" width="80" height="80" class="product-item-img"/>
                    <div class="info">
                        <h3 onclick="redirecionarParaPaginaIndividualProduto(${product.id})>${product.nome}</h3>
                        <div class="price">R$${product.preco.toFixed(2)}</div>
                    </div>
                    <div class="botao">
                    
                    <button class="add-carrinho" data-product-id="${product.id}"> <img src="img/carrinho_branco.png" alt="Carrinho" width="24" height="24"> </button>
                    <button class="add-favorito" data-fav-id="${product.id}"> <img src="img/favoritos_branco.png" alt="Favorito" width="24" height="24"> </button>
                    </div>
                `;
                productListEl.appendChild(itemEl);//coloca na lista de produtos 
            });
        }

        // Mostra todos os produtos ao carregar
        exibirProdutos(barraDePesquisa.value);

        // Filtra conforme digita
        barraDePesquisa.addEventListener("input", () => {
            exibirProdutos(barraDePesquisa.value);
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
