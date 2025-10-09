window.onload = function() {

    // se não houver um usuario logado, envia para a página de cadastro
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (usuarioLogado === null){
        window.location.href = 'cadastro.html';
    }

    // recupera ids dos campos da pagina de finalização
    let txtCep = document.getElementById("cepAtualiza");
    let txtCid = document.getElementById("cidadeAtualiza");
    let optEstado = document.getElementById("estadoAtualiza");

    let txtLog = document.getElementById("logradoroAtualiza");
    let txtNum = document.getElementById("numeroAtualiza");
    let txtComp = document.getElementById("complementoAtualiza");

    if (usuarioLogado.cep){
        txtCep.value = usuarioLogado.cep;
    }
   if (usuarioLogado.cep){
        txtCep.value = usuarioLogado.cep;
    }
   if (usuarioLogado.cidade){
        txtCid.value = usuarioLogado.cidade
    }
   if (usuarioLogado.estado){
        optEstado.value = usuarioLogado.estado;
    }
   if (usuarioLogado.logradoro){
        txtLog.value = usuarioLogado.logradoro;
    }
   if (usuarioLogado.numero){
        txtNum.value = usuarioLogado.numero;
    }
   if (usuarioLogado.complemento){
        txtComp.value = usuarioLogado.complemento;
    }

}