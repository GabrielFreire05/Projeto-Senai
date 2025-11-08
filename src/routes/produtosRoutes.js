const express = require('express')
const router = express.Router()
const { produtoController } = require('../controllers/produtoController')

//GET /produtos -> listar todos os produtos
router.get('/produtos', produtoController.listarProdutos)

//POST /produtos -> criar um novo produto
router.post('/produtos', produtoController.criarProduto)

//PUT /produtos -> atualizar um novo produto
router.put('/produtos/:idProduto', produtoController.atualizarProduto)

router.delete('/produtos/:idProduto', produtoController.deletarProduto)
// ao exportar temos que dar um nome 
module.exports = {
    produtoRoutes: router
}