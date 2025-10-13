

// cria primeiro usuario
let usuarios = [{ "nome": "Elena", "email": "elena@gmail.com", "senha": "teste123", "id": "0", "estado": "MG", "logradouro": "PUC-Rio", "numero": "123", "complemento": "Leme" }]

// coloca o primeiro usuuario no localStorage se não houver nada lá, fazemos isso pra não apagar os usuarios ao mudar de página
let verificaUsuarios = JSON.parse(localStorage.getItem("usuarios"));
if (verificaUsuarios === null) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


// essa função retorna verdadeiro se houver algum usuario com login feito atualmente
function verificaLogado() {
    const verificaLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (verificaLogado === null) {
        return false;
    }

    else {
        return true;
    }
}



function cadastrar() {
    // pega dados escritos nos campos
    let nome = document.getElementById("nomeCadastro").value.trim();
    let cpf = document.getElementById("cpfCadastro").value;
    let email = document.getElementById("emailCadastro").value.trim().toLowerCase();
    let senha = document.getElementById("senhaCadastro").value;

    let cep = document.getElementById("cepCadastro").value;
    let cidade = document.getElementById("cidadeCadastro").value;
    let estado = document.getElementById("estadoCadastro").value;


    let logradouro = document.getElementById("logradouroCadastro").value;
    let numero = document.getElementById("numeroCadastro").value;
    let complemento = document.getElementById("complementoCadastro").value;

    // verifica se algum está vazio
    if (!nome || !cpf || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    //verificacao nome
    let padraoNome = new RegExp("[0-9]");
    if (padraoNome.test(nome)) {
        alert("O nome não pode conter números!");
        return;
    }

    //verificacao cpf
    let padraoCpf = new RegExp("[a-zA-Z]");
    if (cpf.length != 11) {
        alert("número de caracteres inválido");
        return;
    }
    if (padraoCpf.test(cpf)) {
        alert("Cpf só contém números");
        return;
    }


    //verificacao email
    let padraoEmail = new RegExp("[a-z0-9]" + "@" + "[a-z]" + "." + "[a-z0-9_]");
    if (!padraoEmail.test(email)) {
        alert("O email nao existe");
        return;
    }

    //verificacao senha
    if (senha.length < 8 || senha.length > 15) {
        console.log("OI senha");
        alert("A senha deve conter entre 8 a 15 caracteres");
        return;
    }
    if (!/[A-Z]/.test(senha)) {
        console.log("OI2");
        alert("A senha deve conter pelo menos uma letra maiúscula.");
        senha = "";
        return;
    }
    if (!/[0-9]/.test(senha)) {
        console.log("OI3");
        alert("A senha deve conter pelo menos 1 número");
        senha = "";
        return;
    }



    //verificacao cep
    if (cep != "") {
        console.log("!");
        let padraoCep = new RegExp("[0-9]");
        if (!padraoCep.test(cep)) {
            alert("O cep deve apenas conter numeros.");
            return;
        }
        if (cep.length != 8) {
            alert("O cep deve conter 8 digitos.");
            return;
        }
    }



    //verificacao cidade
    if (cidade != "") {
        let padraoCidade = /^[A-Za-zÀ-ÿ\s]+$/; // permite letras + acentos + espaços
        if (!padraoCidade.test(cidade)) {
            alert("A cidade deve conter apenas letras e espaços.");
            return;
        }
        if (cidade.length < 2 || cidade.length > 60) {
            alert("Cidade deve ter entre 2 e 60 caracteres.");
            return;
        }
    }


    // verificaco estado
    if (estado != "") {
        const estadosValidos = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
        if (!estadosValidos.includes(estado.toUpperCase())) {
            alert("Estado inválido. Use a sigla correta (ex: SP, RJ).");
            return;
        }
    }

    //verificacao logradouro
    if (logradouro != "") {
        const padraoLogradouro = /^[A-Za-zÀ-ÿ\s.,-]+$/;
        if (!padraoLogradouro.test(logradouro)) {
            alert("Logradouro inválido.");
        } else if (logradouro.length < 3 || logradouro.length > 100) {
            alert("Logradouro deve ter entre 3 e 100 caracteres.");
        }
    }

    //verificacao numero
    if (numero != "") {
        if (!/^\d+$/.test(numero) && numero.toUpperCase() !== "S/N") {
            alert("Número inválido. Use apenas números ou 'S/N'.");
            return;
        }
    }

    //verificacao complemento
    if (complemento != "") {
        if(complemento.length < 2 || complemento.length > 40){
            alert("Complemento não pode ter mais de 80 caracteres.");
            return;
        }
    }

    // pega a lista de usuarios existentes
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));

    // verifica se usuario está no banco de dados
    const existe = usuarios.find(user => user.email === email);

    // se o usuario já existe, fecha a função
    if (existe) {
        alert("Email já cadastrado!");
        return;
    }

    // cria um novo id pro usuario
    let id = usuarios.length


    // adiciona novo usuario no banco da dados
    usuarios.push({ nome, email, senha, id, cep, cidade, estado, logradouro, numero, complemento });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuário Cadastrado!")


    document.getElementById("emailLogin").value = email;
    document.getElementById("senhaLogin").value = senha;
    login();
}

function login() {
    // verifica que não há nenhum login já efetuado para não termos duas contas logadas
    const verificaLoginExistente = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (verificaLoginExistente) {
        alert("Faça logout da conta atual antes de prosseguir");
        return;
    }

    // pega dados escritos nos campos
    let email = document.getElementById("emailLogin").value;
    let senha = document.getElementById("senhaLogin").value;

    // verifica se algum está vazio
    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    // pega a lista de usuarios existentes
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));


    // verifica se usuario está no banco de dados e qual é o usuario
    const usuario = usuarios.find(user => user.email === email);

    // se o usuario já existe, fecha a função
    if (!usuario) {
        alert("Usuário não encontrado, verifique se as informações foram inseridas corretamente ou faça seu cadastro");
        return;
    }

    // olha no banco de dados dos cadastros para tentar dar match nos emails e senhas cadastradas
    const verificaInformações = usuarios.find(user => user.email === email && user.senha === senha);

    // se houver um match, faz um alerta e adiciona um JSON com os dados do usuario, esse JSON significa que um login foi efetuado
    if (verificaInformações) {
        alert("Boas vindas, " + usuario.nome + "!");
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        window.location.href = 'index.html';
    }
    else {
        alert("Senha errada, tente novamente");
    }



}

function logout() {
    //procura se há um usuario com login feito atualmente, se não houver "usarioLogado" no localStorage então não há nenhum login efetuado no momento
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));


    // se for falso, nada além de um alerta acontece
    if (!usuarioLogado) {
        alert("Nenhum usuário logado atualmente");
    }
    // se houver um usuário, exibe uma mensagem e remove o JSON do login do localStorage
    else {
        alert(usuarioLogado.nome + ", você saiu da sua conta!");
        localStorage.removeItem("usuarioLogado");
        window.location.href = 'index.html';
    }
}


function atualizarCadastro() {
    // Pega dados dos usuários
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuarioLogado) {
        alert("Nenhum usuário logado no momento.");
        window.location.href = 'cadastro.html';
        return;
    }

    // Pega campos da página
    let senhaAntiga = document.getElementById("senhaAntigaAtualiza").value;
    let senhaNova = document.getElementById("senhaNovaAtualiza").value;

    let cepAtualiza = document.getElementById("cepAtualiza").value;
    let cidadeAtualiza = document.getElementById("cidadeAtualiza").value;
    let estadoAtualiza = document.getElementById("estadoAtualiza").value;
    let logradouroAtualiza = document.getElementById("logradouroAtualiza").value;
    let numeroAtualiza = document.getElementById("numeroAtualiza").value;
    let complementoAtualiza = document.getElementById("complementoAtualiza").value;


    // Senha
    if (senhaAntiga || senhaNova) {
        // Exigir que os dois campos estejam preenchidos
        if (!senhaAntiga || !senhaNova) {
            alert("Preencha tanto a senha atual quanto a nova senha para alterar.");
            return;
        }

        // Verifica se a senha antiga confere
        if (senhaAntiga !== usuarioLogado.senha) {
            alert("Senha atual incorreta. Tente novamente.");
            return;
        }

        // Validação da nova senha
        if (senhaNova.length < 8 || senhaNova.length > 15) {
            alert("A nova senha deve conter entre 8 e 15 caracteres.");
            return;
        }
        if (!/[A-Z]/.test(senhaNova)) {
            alert("A nova senha deve conter pelo menos uma letra maiúscula.");
            return;
        }
        if (!/[0-9]/.test(senhaNova)) {
            alert("A nova senha deve conter pelo menos um número.");
            return;
        }

        usuarioLogado.senha = senhaNova;
    }

    // CEP
    if (cepAtualiza) {
        if (!/^\d+$/.test(cepAtualiza)) {
            alert("O CEP deve conter apenas números.");
            return;
        }
        if (cepAtualiza.length !== 8) {
            alert("O CEP deve conter exatamente 8 dígitos.");
            return;
        }
        usuarioLogado.cep = cepAtualiza;
    }

    // Cidade
    if (cidadeAtualiza) {
        let padraoCidade = /^[A-Za-zÀ-ÿ\s]+$/;
        if (!padraoCidade.test(cidadeAtualiza)) {
            alert("A cidade deve conter apenas letras e espaços.");
            return;
        }
        if (cidadeAtualiza.length < 2 || cidadeAtualiza.length > 60) {
            alert("A cidade deve ter entre 2 e 60 caracteres.");
            return;
        }
        usuarioLogado.cidade = cidadeAtualiza;
    }

    // Estado
    if (estadoAtualiza) {
        const estadosValidos = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
        if (!estadosValidos.includes(estadoAtualiza.toUpperCase())) {
            alert("Estado inválido. Use a sigla correta (ex: SP, RJ).");
            return;
        }
        usuarioLogado.estado = estadoAtualiza.toUpperCase();
    }

    // Logradouro
    if (logradouroAtualiza) {
        const padraoLogradouro = /^[A-Za-zÀ-ÿ\s.,-]+$/;
        if (!padraoLogradouro.test(logradouroAtualiza)) {
            alert("Logradouro inválido.");
            return;
        }
        if (logradouroAtualiza.length < 3 || logradouroAtualiza.length > 100) {
            alert("Logradouro deve ter entre 3 e 100 caracteres.");
            return;
        }
        usuarioLogado.logradouro = logradouroAtualiza;
    }

    // Número
    if (numeroAtualiza) {
        if (!/^\d+$/.test(numeroAtualiza) && numeroAtualiza.toUpperCase() !== "S/N") {
            alert("Número inválido. Use apenas números ou 'S/N'.");
            return;
        }
        usuarioLogado.numero = numeroAtualiza;
    }

    // Complemento
    if (complementoAtualiza) {
        if (complementoAtualiza.length < 2 || complementoAtualiza.length > 40) {
            alert("Complemento deve ter entre 2 e 40 caracteres.");
            return;
        }
        usuarioLogado.complemento = complementoAtualiza;
    }

    // Atualiza o localStorage
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

    // Substitui o usuário correspondente no array geral
    const index = usuarios.findIndex(user => user.id === usuarioLogado.id);
    if (index !== -1) {
        usuarios[index] = usuarioLogado;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    alert("Seus dados foram atualizados com sucesso!");
    window.location.href = "index.html";
}





function iconeCadastro() {
    let verificaSeLogado = verificaLogado();

    if (verificaSeLogado === true) {
        window.location.href = 'atualiza.html';
    }

    else {
        window.location.href = 'cadastro.html';
    }


}

function iconeFavoritos() {
    let verificaSeLogado = verificaLogado();

    if (verificaSeLogado === true) {
        window.location.href = 'favoritos.html';
    }

    else {
        window.location.href = 'cadastro.html';
    }


}

function botaoFinalizar() {
    let verificaSeLogado = verificaLogado();

    if (verificaSeLogado === true) {
        window.location.href = 'finalizar.html';
    }
    else {
        window.location.href = 'cadastro.html';
    }

}


