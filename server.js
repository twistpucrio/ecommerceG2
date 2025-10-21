const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products.js');

const app = express();
const PORT = process.env.PORT || 8002;

// Configurações
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/products', productRoutes);

// Tratamento de erros de execução [500]
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// Tratamento de erros de execução [404]
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`API disponível em: http://localhost:${PORT}/api`);
});

/* FORMULARIO*/ 

const contactForm = document.querySelector('.contact-form');
const nome = document.getElementById('nome').value; 
const preco = document.getElementById('preco').value;
const descricao = document.getElementById('descricao').value;
const categoria = document.getElementById('categoria').value;
const estoque = document.getElementById('estoque').value;


form.addEventListener('submit', function(event) { event.preventDefault();
}); 

const formData = {
  nome: nome.value,
  preco: preco.value,
  descricao: descricao.value,
  categoria: categoria.value, 
  estoque: estoque.value
};

 fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });



    then(response => {
        // Verifica se a resposta foi bem-sucedida (status 2xx)
        if (!response.ok) {
            throw new Error('Erro na rede ou no servidor: ' + response.statusText);
        }
        // Tenta ler o corpo da resposta como JSON
        return response.json(); 
    })
    .then(data => {
        // 5. Trata a resposta (exibe mensagem de sucesso, atualiza a lista, etc.)
        console.log('Item adicionado com sucesso:', data);
        alert('Item adicionado com sucesso!');
        form.reset(); // Limpa o formulário
    })
    .catch(error => {
        // Trata erros (de rede, de JSON, ou do servidor)
        console.error('Houve um problema com a operação fetch:', error);
        alert('Erro ao adicionar o item. Verifique o console.');
    });