const express = require('express');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

const router = express.Router();

// Inicializar o banco de dados
const db = new JsonDB(new Config('data/products', true, false, '/'));

// GET /api/products - Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await db.getData('/produto');
    res.json({ produto: products });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// GET /api/products/:id - Buscar produto por ID
router.get('/:id', async (req, res) => {
  try {
    const products = await db.getData('/produtos');
    const product = products.find(p => p.id == req.params.id);

    if (!product) {
      return res.status(404).json({ error: `Produto ${req.params.id} não encontrado` });
    }

    res.json(product);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

// GET /api/products/category/:category - Buscar produtos por categoria

router.get('/category/:category', async (req, res) => {
  try {
    const products = await db.getData('/produto');
    const productsByCategory = products.filter(p => p.category == req.params.category);

    if (!productsByCategory) {
      return res.status(404).json({ error: `Categoria ${req.params.category} não possui produtos.` });
    }

    res.json(productsByCategory);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produto por categoria' });
  }
});


module.exports = router;