

window.onload = function() {

    // se não houver um produto que foi clickado para termos a página individual dele, redireciona para o index
    let produtoAtual = JSON.parse(localStorage.getItem("produtoAtual"));
    if (produtoAtual === null){
        window.location.href = 'index.html';
    }




};



document.addEventListener("DOMContentLoaded", async () => {
  const g2 = new EcommerceG2();
  const container = document.getElementById("produto-container");

  // Recupera o produto salvo no localStorage
  const produtoId = JSON.parse(localStorage.getItem("produtoAtual"));

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
      <button id="add-carrinho">Adicionar ao carrinho</button>
      <button id="add-favorito">Adicionar aos favoritos</button>
    </div>
  `;

  // Eventos dos botões
  document.getElementById("add-carrinho").addEventListener("click", () => {
    g2.addToCart(product.id);
    alert("Produto adicionado ao carrinho!");
  });

  document.getElementById("add-favorito").addEventListener("click", () => {
    adicionarFavoritos(product.id);
  });
});
