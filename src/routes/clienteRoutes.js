const express = require('express')
const router = express.Router()
const { clienteController } = require('../controllers/clienteController') 
const { verify } = require("../middlewares/authMiddleWare");
const { authController } = require("../controllers/authController")

router.post("/clientes/login", authController.clienteLogin);

router.get('/clientes', verify.cliente, clienteController.listarCliente)

router.post('/clientes', clienteController.criarCliente)

module.exports = {
    clienteRoutes: router
}