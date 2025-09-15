
let usuarios = [{"nome":"Elena","email":"elena@gmail.com","senha":"teste123"}]
localStorage.setItem("usuarios",JSON.stringify(usuarios));


function cadastrar(){
    // pega dados escritos nos campos
    let nome = document.getElementById("nomeCadastro").value;
    let email = document.getElementById("emailCadastro").value;
    let senha = document.getElementById("senhaCadastro").value;


    // verifica se algum está vazio
    if (!nome||!email||!senha){
        alert("Preencha todos os campos!");
        return;
    }

    // pega a lista de usuarios existentes
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));

    // verifica se usuario está no banco de dados
    const existe = usuarios.find(user => user.email === email);

    // se o usuario já existe, fecha a função
    if (existe){
        alert("Email já cadastrado!");
        return;
    }

    // adiciona novo usuario no banco da dados
    usuarios.push({nome, email, senha});
    localStorage.setItem("usuarios",JSON.stringify(usuarios));
    alert("Usuário Cadastrado!")


    // remove as informações escritas
    document.getElementById("nome").value="";
    document.getElementById("email").value="";
    document.getElementById("senha").value="";

}

function login(){
    // verifica que não há nenhum login já efetuado para não termos duas contas logadas
    const verificaLoginExistente = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (verificaLoginExistente){
        alert("Faça logout da conta atual antes de prosseguir");
        return;
    }

    // pega dados escritos nos campos
    let email = document.getElementById("emailLogin").value;
    let senha = document.getElementById("senhaLogin").value;

    // verifica se algum está vazio
    if (!email||!senha){
        alert("Preencha todos os campos!");
        return;
    }

    // pega a lista de usuarios existentes
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));


    // verifica se usuario está no banco de dados
    const usuario = usuarios.find(user => user.email === email);

    // se o usuario já existe, fecha a função
    if (!usuario){
        alert("Usuário não encontrado, verifique se as informações foram inseridas corretamente ou faça seu cadastro");
        return;
    }

    // olha no banco de dados dos cadastros para tentar dar match nos emails e senhas cadastradas
    const verificaInformações = usuarios.find(user => user.email === email && user.senha === senha);

    // se houver um match, faz um alerta e adiciona um JSON com os dados do usuario, esse JSON significa que um login foi efetuado
    if (verificaInformações){
        alert("Boas vindas, "+ usuario.nome +"!");
        localStorage.setItem("usuarioLogado",JSON.stringify(usuario));
    }
    else{
        alert("Senha errada, tente novamente");
    }

    

}

function logout(){
    //procura se há um usuario com login feito atualmente, se não houver "usarioLogado" no localStorage então não há nenhum login efetuado no momento
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));


    // se for falso, nada além de um alerta acontece
    if (!usuarioLogado){
        alert("Nenhum usuário logado atualmente");
    }
    // se houver um usuário, exibe uma mensagem e remove o JSON do login do localStorage
    else{
        alert(usuarioLogado.nome + ", você saiu da sua conta!");
        localStorage.removeItem("usuarioLogado");
    }
}