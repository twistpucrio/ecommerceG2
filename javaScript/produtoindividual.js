



document.addEventListener("DOMContentLoaded", async () => {
  const g2 = new EcommerceG2();
  const container = document.getElementById("produto-container");

  // Recupera o produto salvo na url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const produtoId =  Number(urlParams.get('id'));

  if (!produtoId) {
    container.innerHTML = "<p>Nenhum produto selecionado.</p>";
    return;
  }

  // Carrega todos os produtos
  const allProducts = await g2.listProducts();

  // Procura o produto pelo ID
  const product = Object.values(allProducts).flat().find(p => p.id === produtoId);

  if (!product) {
    container.innerHTML = "<p>Produto não encontrado.</p>";
    return;
  }

  // Renderiza o produto individual
  container.innerHTML = `
    <div class="produto-individual">
      <img src="${product.imagem}" alt="${product.nome}" width="200" height="200">
      <div class="info">
        <h2>${product.nome}</h2>
        <p class="descricao">${product.descricao || "Sem descrição disponível."}</p>
        <div class="price">Preço: $${product.preco.toFixed(2)}</div>
      </div>
      <div class="botao">
                    <button class="add-carrinho" data-product-id="${product.id}"> <img src="img/carrinho_branco.png" alt="Carrinho" width="24" height="24"> </button>
                    <button class="add-favorito" data-fav-id="${product.id}"> <img src="img/favoritos_branco.png" alt="Favorito" width="24" height="24"> </button>
      </div>
    </div>
  `;


  container.addEventListener('click', (event) => {
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







});
