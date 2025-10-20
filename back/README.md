# BackEndG3

# 📦 Store Backend API

Uma API REST completa para uma loja virtual, construída com Node.js, Express e JSON DB.

## 📋 Descrição

Este projeto fornece uma API backend para gerenciar produtos de uma loja virtual, incluindo operações CRUD. Os dados são persistidos em um arquivo JSON usando JSON DB.


## 📁 Estrutura do Projeto

```
ecommerce-backend/
├── package.json
├── server.js
├── data/
│  └── products.json (a ser customizado para cada loja)
└── routes/
   └── products.js
```

## ⚙️ Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd furniture-store-backend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o servidor:**
```bash
npm start
```
## 📚 Endpoints da API

### 🔍 Produtos

#### Listar todos os produtos

```
GET /api/products
```

Resposta:
```json
{
  "produtos": [
    {
        "id": 1,
        "nome": "produto",
        (...)
    },
     {
        "id": 2,
        "nome": "produto",
        (...)
    },
    (...)
  ]
}
```

#### Buscar produto por id

```
GET /api/products/:id
```

```
// Exemplo para busca com identificador 10
GET /api/products/10
```

Resposta:
```json
{ 
    "id": 10,
    "nome": "produto",
    (...)
}
```


## 📝 Exemplos de Uso
```bash
curl -X GET http://localhost:8000/api/products
```


## 🎯 Modelo de Produto
```json
{
  "id": 000,
  "nome": "Nome do Produto",
  (...)
}
```
