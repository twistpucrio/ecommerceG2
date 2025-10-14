document.addEventListener('DOMContentLoaded', () => {
    const g2 = new EcommerceG2();
    const productListEl = document.getElementById('product-list');
    const barraDePesquisa = document.getElementById("pesquisa");

    async function renderProducts() {
        const products = await g2.listProducts();
        const produtosFavoritos = [24, 25, 26, 27, 34, 35, 36, 37, 38, 39, 40, 41];
        const produtosExibe = (products.produto || []).filter(produto =>
            produtosFavoritos.includes(produto.id)
        );

        // Função que exibe produtos (recebe lista filtrada)
        function exibirProdutos(lista) {
            productListEl.innerHTML = '';
            if (lista.length === 0) {
                const mensagem = document.createElement('div');
                mensagem.className = 'nenhum-produto';
                mensagem.textContent = 'Nenhum produto encontrado';
                productListEl.appendChild(mensagem);
                return;
            }

            lista.forEach(product => {
                const itemEl = document.createElement('div');
                itemEl.className = 'product-item';
                itemEl.innerHTML = `
                    <img onclick="redirecionarParaPaginaIndividualProduto(${product.id})" src="${product.imagem}" alt="${product.nome}" width="80" height="80" class="product-item-img"/>
                    <div class="info">
                        <h3 onclick="redirecionarParaPaginaIndividualProduto(${product.id})">${product.nome}</h3>
                        <div class="price">R$${product.preco.toFixed(2)}</div>
                    </div>
                    <div class="botao">
                        <button class="add-carrinho" data-product-id="${product.id}"> <img src="img/carrinho_branco.png" alt="Carrinho" width="24" height="24"> </button>
                        <button class="add-favorito" data-fav-id="${product.id}"> <img src="img/favoritos_branco.png" alt="Favorito" width="24" height="24"> </button>
                    </div>
                `;
                productListEl.appendChild(itemEl);
            });
        }

        // Função global de filtros
        window.aplicarFiltros = function() {
            let filtrado = produtosExibe.slice();

            // Filtro de pesquisa
            const termo = barraDePesquisa.value.toLowerCase();
            filtrado = filtrado.filter(p => p.nome.toLowerCase().includes(termo));

            // Filtro por categoria
            const categoriasSelecionadas = Array.from(document.querySelectorAll('input[name="categoria"]:checked')).map(cb => cb.value.toLowerCase());
            if (categoriasSelecionadas.length > 0) {
                filtrado = filtrado.filter(p => categoriasSelecionadas.includes(p.categoria.toLowerCase()));
            }

            // Filtro por faixa de preço
            const faixasSelecionadas = Array.from(document.querySelectorAll('input[name="faixa-preco"]:checked')).map(cb => cb.value);
            if (faixasSelecionadas.length > 0) {
                filtrado = filtrado.filter(p => {
                    return faixasSelecionadas.some(faixa => {
                        const [min, max] = faixa.split('-').map(Number);
                        return p.preco >= min && p.preco <= max;
                    });
                });
            }

            // Ordenação
            const ordenacaoSelecionada = Array.from(document.querySelectorAll('input[name="ordenação"]:checked')).map(cb => cb.value);
            if (ordenacaoSelecionada.length > 0) {
                const ordem = ordenacaoSelecionada[0];
                if (ordem === 'menor-preco') filtrado.sort((a,b) => a.preco - b.preco);
                else if (ordem === 'maior-preco') filtrado.sort((a,b) => b.preco - a.preco);
            }

            exibirProdutos(filtrado);
        };

        // Atualiza enquanto digita na barra de pesquisa
        barraDePesquisa.addEventListener("input", () => {
            window.aplicarFiltros();
        });

        // Exibe todos ao carregar
        exibirProdutos(produtosExibe);
    }

    // Clique em carrinho/favoritos
    productListEl.addEventListener('click', (event) => {
        if (event.target.classList.contains("add-carrinho")) {
            const id = parseInt(event.target.dataset.productId, 10);
            g2.addToCart(id);
            alert("Produto adicionado ao carrinho!");
        }
        if (event.target.classList.contains("add-favorito")) {
            const id = parseInt(event.target.dataset.favId, 10);
            adicionarFavoritos(id);
        }
    });

    renderProducts();
});
