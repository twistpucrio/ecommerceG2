



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
      <img class="img" src="${product.imagem}" alt="${product.nome}"/>
      <div class="info">
        <p class="nome">${product.nome}</p>
        
        <div class="price"> R$${product.preco.toFixed(2)}</div>
        <div class="botoes">
            <button class="add-carrinhos" data-product-id="${product.id}"> <img id="imgcart" src="img/carrinho_branco.png" alt="Carrinho" width="24" height="24"> <span class="comprar-texto">Comprar</span></button>
            <button class="add-favorito" data-fav-id="${product.id}"> <img  id="imgfav" src="img/favoritos_branco.png" alt="Favorito" width="24" height="24"> </button>
        </div>
      </div>

      <p class="descricao">${product.descricao || "Sem descrição disponível."}</p>
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
