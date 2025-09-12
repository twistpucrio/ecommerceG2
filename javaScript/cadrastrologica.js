
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
    const existe = usuarios.find(user => user.email === email);

    // se o usuario já existe, fecha a função
    if (!existe){
        alert("Usuário não encontrado, verifique se as informações foram inseridas corretamente ou faça seu cadastro");
        return;
    }

    const verificaInformações = usuarios.find(user => user.email === email && user.senha === senha);

    if (verificaInformações){
        alert("Bem-vindo, ${usuario.nome}!")
    }
    else{
        alert("Senha errada, tente novamente")
    }

    

}