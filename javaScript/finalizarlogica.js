
window.onload = function() {

    // se não houver um usuario logado, envia para a página de cadastro
    const verificaLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (verificaLogado === null){
        window.location.href = 'cadastro.html';
    }

    // recupera ids dos campos da pagina de finalização
    let txtCep = document.getElementById("txtCep");
    let txtCid = document.getElementById("txtCid");
    let optEstado = document.getElementById("optEstado");

    let txtLog = document.getElementById("txtLog");
    let txtNum = document.getElementById("txtNum");
    let txtComp = document.getElementById("txtComp");

    // recupera os dados do usuarioLogado do localStorage

    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

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


};
