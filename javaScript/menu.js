document.addEventListener('DOMContentLoaded', () => {
    // 1. Selecionar o elemento do menu
    const segundoCabecalho = document.querySelector('.segundo-cabeçalho');

    // 2. Selecionar o título (para saber quando ele some)
    const titulo = document.querySelector('#titulo');
    
    // Obter a altura do título para determinar o ponto de rolagem
    const alturaTitulo = titulo ? titulo.offsetHeight : 0; // Calcula a altura do <h1>

    // 3. Função para checar a rolagem e aplicar a classe
    function checkScroll() {
        // window.scrollY é a posição de rolagem vertical
        if (window.scrollY > alturaTitulo) {
            // Se rolou mais do que a altura do título, o menu está "grudado"
            segundoCabecalho.classList.add('menu-sombra-fixa');
        } else {
            // Se está no topo ou abaixo da altura do título, remove a sombra
            segundoCabecalho.classList.remove('menu-sombra-fixa');
        }
    }

    // 4. Adicionar o "ouvinte" de evento de rolagem
    window.addEventListener('scroll', checkScroll);

    // Chama a função uma vez ao carregar a página (caso o usuário volte com a rolagem)
    checkScroll(); 
});