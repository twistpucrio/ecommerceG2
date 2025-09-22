








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
}




function limparFavoritos(){
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));


    if (!usuarioLogado) {
        alert("Nenhum usuário logado, por favor faça login e tente novamente");
        return;
    }

    // verifica se o usuario não tem favoritos na array ou se o tamanho é 0, se algum desses for verdade a função acaba
    if (!usuarioLogado.favoritos || usuarioLogado.favoritos.length === 0) {
        alert("Você não tem favoritos para deletar.");
        return;
    }

    let confirmacao = confirm("Tem certeza que deseja excluir sua lista de favoritos?");
    // se o usuario apertar em cancelar, a função acaba
    if (!confirmacao){
        return;
    }


    // remove o array favoritos do localStorage
    delete usuarioLogado.favoritos;

    // encontra o index do usuarioLogado na lista de usuarios e retorna o index, após isso, modifica a array usuarios a partir do usuariologado
    const index = usuarios.findIndex(user => user.id === usuarioLogado.id);
    usuarios[index] = usuarioLogado;

    // envia as modificações da array usuarios e usuarioLogado para o localStorage
    localStorage.setItem("usuarios",JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

}