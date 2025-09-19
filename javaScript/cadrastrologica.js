

// cria primeiro usuario
let usuarios = [{"nome":"Elena","email":"elena@gmail.com","senha":"teste123", "id": "0", "logradoro": "PUC-Rio", "numero": "123", "complemento": "Leme" }]

// coloca o primeiro usuuario no localStorage se não houver nada lá, fazemos isso pra não apagar os usuarios ao mudar de página
let verificaUsuarios = JSON.parse(localStorage.getItem("usuarios"));
if (verificaUsuarios === null){
    localStorage.setItem("usuarios",JSON.stringify(usuarios));
}


// essa função retorna verdadeiro se houver algum usuario com login feito atualmente
function verificaLogado(){
    const verificaLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (verificaLogado === null){
        return false;
    }

    else{
        return true;
    }
}



function cadastrar(){
    // pega dados escritos nos campos
    let nome = document.getElementById("nomeCadastro").value.trim();
    let email = document.getElementById("emailCadastro").value.trim().toLowerCase();
    let senha = document.getElementById("senhaCadastro").value;
    let logradoro = document.getElementById("logradoroCadastro").value;
    let numero = document.getElementById("numeroCadastro").value;
    let complemento = document.getElementById("complementoCadastro").value;

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

    // cria um novo id pro usuario
    let id = usuarios.length


    // adiciona novo usuario no banco da dados
    usuarios.push({nome, email, senha, id, logradoro, numero, complemento});
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


    // verifica se usuario está no banco de dados e qual é o usuario
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


function atualizarCadastro(){
    // pega informações sobre usuarios no banco de dados
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    // pega informações sobre a troca de dados na pagina
    let nomeAtualiza = document.getElementById("nomeAtualiza").value.trim();
    let senhaAtualiza = document.getElementById("senhaAtualiza").value;
    let logradoroAtualiza = document.getElementById("logradoroAtualiza").value;
    let numeroAtualiza = document.getElementById("numeroAtualiza").value;
    let complementoAtualiza = document.getElementById("complementoAtualiza").value;


    // atualiza se o campo estiver preenchido, colocando na variavel local

    if (nomeAtualiza){
        console.log(nomeAtualiza);
        usuarioLogado.nome = nomeAtualiza;
    }
    if (senhaAtualiza){
        usuarioLogado.senha = senhaAtualiza;
        console.log(senhaAtualiza);
    }
    if (logradoroAtualiza){
        usuarioLogado.logradoro = logradoroAtualiza;
        console.log(logradoroAtualiza);
    }
    if (numeroAtualiza){
        console.log(numeroAtualiza);
        usuarioLogado.numero = numeroAtualiza;
    }
    if (complementoAtualiza){
        console.log(complementoAtualiza);
        usuarioLogado.complemento = complementoAtualiza;
    }

    // pega a variavel local usuarioLogado e envia para o localStorage
    localStorage.setItem("usuarioLogado",JSON.stringify(usuarioLogado));


    // encontra o index do usuarioLogado na lista de usuarios e retorna o index, após isso, modifica a array usuarios a partir do usuariologado
    const index = usuarios.findIndex(user => user.id === usuarioLogado.id);
    usuarios[index] = usuarioLogado;

    // envia as modificações da array usuarios para o localStorage
    localStorage.setItem("usuarios",JSON.stringify(usuarios));

 
}


