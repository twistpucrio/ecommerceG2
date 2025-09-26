




function adicionarFavoritos(produtoID) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuarioLogado) {
    alert("Nenhum usuário logado, por favor faça login e tente novamente");
    return;
    }

    // Cria lista de favoritos se ela não existir
    if (!usuarioLogado.favoritos) {
    usuarioLogado.favoritos = [];
    }

    // Verifica se existe se o ID do produto já está no array e roda a função de remoção caso esteja
    if (usuarioLogado.favoritos.includes(produtoID)) {
    removerFavoritos(produtoID);
    return;
    }

    // Adiciona o produtoID
    usuarioLogado.favoritos.push(produtoID);

    // encontra o index do usuarioLogado na lista de usuarios e retorna o index, após isso, modifica a array usuarios a partir do usuariologado
    const index = usuarios.findIndex(user => user.id === usuarioLogado.id);
    usuarios[index] = usuarioLogado;

    // envia as modificações da array usuarios e usuarioLogado para o localStorage
    localStorage.setItem("usuarios",JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

    alert(`Adicionado aos favoritos!`);
}







function removerFavoritos(produtoID){
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    const indexFavorito = usuarioLogado.favoritos.indexOf(produtoID);

    // remove o produto
    usuarioLogado.favoritos.splice(indexFavorito, 1);

    // encontra o index do usuarioLogado na lista de usuarios e retorna o index, após isso, modifica a array usuarios a partir do usuariologado
    const index = usuarios.findIndex(user => user.id === usuarioLogado.id);
    usuarios[index] = usuarioLogado;

    // envia as modificações da array usuarios e usuarioLogado para o localStorage
    localStorage.setItem("usuarios",JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

    alert(`Removido dos favoritos!`);
    //reinicia página para mostrar mudanças
    location.reload();
}



function limparFavoritos(){
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    let confirmacao = confirm("Tem certeza que deseja excluir sua lista de favoritos?");
    
    // se o usuario apertar em cancelar, a função acaba
    if (!confirmacao){
        return;
    }

    if (!usuarioLogado) {
    alert("Nenhum usuário logado, por favor faça login e tente novamente");
    return;
    }

    // verifica se o usuario não tem favoritos na array ou se o tamanho é 0, se algum desses for verdade a função acaba
    if (!usuarioLogado.favoritos || usuarioLogado.favoritos.length === 0) {
        alert("Você não tem favoritos para deletar.");
        return;
    }
    
    // remove o array favoritos
    delete usuarioLogado.favoritos;

    // encontra o index do usuarioLogado na lista de usuarios e retorna o index, após isso, modifica a array usuarios a partir do usuariologado
    const index = usuarios.findIndex(user => user.id === usuarioLogado.id);
    usuarios[index] = usuarioLogado;

    // envia as modificações da array usuarios e usuarioLogado para o localStorage
    localStorage.setItem("usuarios",JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

    //reinicia página para mostrar mudanças
    location.reload();

}

document.addEventListener("DOMContentLoaded", async () => {
  const g2 = new EcommerceG2();
  const favoritosContainer = document.getElementById("favoritos-container");

  let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  // Caso não esteja logado
  if (!usuarioLogado) {
    favoritosContainer.innerHTML = "<p>Você precisa estar logado para ver seus favoritos.</p>";
    return;
  }

  // Carrega produtos
  const allProducts = await g2.listProducts();
  const favoritosIds = usuarioLogado.favoritos || [];

  // Se não houver favoritos
  if (favoritosIds.length === 0) {
    favoritosContainer.innerHTML = "<p>Você não tem favoritos ainda.</p>";
    return;
  }

  // Renderiza cada favorito
  favoritosContainer.innerHTML = "";
  favoritosIds.forEach((id) => {
    const product = Object.values(allProducts).flat().find(p => p.id === id);

    if (product) {
      const itemEl = document.createElement("div");
      itemEl.className = "favorito-item";

      itemEl.innerHTML = `
        <img src="${product.imagem}" alt="${product.nome}" width="80" height="80">
        <div>
          <h4>${product.nome}</h4>
          <p>Preço: $${product.preco.toFixed(2)}</p>
        </div>
        <button class="add-carrinho" data-cart-id="${id}">Adicionar ao Carrinho</button>
        <button class="remover-fav" data-remove-id="${id}">Remover dos Favoritos</button>
      `;

      favoritosContainer.appendChild(itemEl);
    }
  });

  // Ações nos botões
  favoritosContainer.addEventListener("click", (event) => {
    // Remover dos favoritos
    if (event.target.classList.contains("remover-fav")) {
      const id = parseInt(event.target.dataset.removeId, 10);
      removerFavoritos(id);
      location.reload();
    }

    // Adicionar ao carrinho
    if (event.target.classList.contains("add-carrinho")) {
      const id = parseInt(event.target.dataset.cartId, 10);
      g2.addToCart(id);
      alert("Produto adicionado ao carrinho!");
    }
  });

});