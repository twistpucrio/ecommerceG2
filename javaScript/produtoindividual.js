document.addEventListener("DOMContentLoaded", async () => {
  const g2 = new EcommerceG2();
  const container = document.getElementById("produto-container");

  // Recupera o ID do produto da URL
  const produtoId = Number(new URLSearchParams(window.location.search).get("id"));
  if (!produtoId) {
    container.innerHTML = "<p>Nenhum produto selecionado.</p>";
    return;
  }

  // Carrega todos os produtos
  const allProducts = await g2.listProducts();
  const productsArray = allProducts.produto || [];

  // Procura o produto pelo ID
  const product = productsArray.find(p => p.id === produtoId);
  if (!product) {
    container.innerHTML = "<p>Produto não encontrado.</p>";
    return;
  }

  // Renderiza o produto
  container.innerHTML = `
    <div class="produto-individual">
      <img class="img" src="${product.imagem}" alt="${product.nome}" />
      <div class="info">
        <p class="nome">${product.nome}</p>
        <div class="price">R$ ${product.preco.toFixed(2)}</div>
        <div class="botoes">
          <button class="add-carrinho" data-product-id="${product.id}">
            <img id="imgcart" src="img/carrinho_branco.png" alt="Carrinho" width="24" height="24">
            <span class="comprar-texto">Comprar</span>
          </button>
          <button class="add-favorito" data-fav-id="${product.id}">
            <img id="imgfav" src="img/favoritos_branco.png" alt="Favorito" width="24" height="24">
          </button>
        </div>
      </div>
      <p class="descricao">${product.descricao || "Sem descrição disponível."}</p>
      <p class="estoque">Estoque disponível: ${product.estoque || 0}</p>
    </div>
  `;

  // Delegação de clique: garante que clicar em <img> ou <span> dentro do botão funcione
  container.addEventListener("click", (event) => {
    const addButton = event.target.closest(".add-carrinho");
    const favButton = event.target.closest(".add-favorito");

    if (addButton) {
      const id = parseInt(addButton.dataset.productId, 10);
      g2.addToCart(id);
      alert("Produto adicionado ao carrinho!");
    }

    if (favButton) {
      const id = parseInt(favButton.dataset.favId, 10);
      if (typeof adicionarFavoritos === "function") {
        adicionarFavoritos(id);
      }
    }
  });
});
