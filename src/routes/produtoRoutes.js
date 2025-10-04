const express = require("express");
const router = express.Router();
const {produtoControler} = require("../controllers/produtoController")

//GET /produtos -> Listar todos os produtos
router.get('/produtos', produtoControler.listarProdutos);

module.exports = {produtoRoutes: router};
