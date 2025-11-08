const {clienteModels} = require("../models/clienteModel");
const bcrypt = require('bcrypt');
const { decrypt } = require("dotenv");
const jwt = require('jsonwebtoken');

const authController = {
    clienteLogin: async (req, res) => {
        try {
            const {emailCliente, senhaCliente} = req.body;
            
            if(emailCliente == undefined || senhaCliente == undefined){
                return res.status(400).json({erro: "Email e senha são obrigatorios"})
            }

            const result = await clienteModel.buscarPorEmail(emailCliente);

            if (result.lenght == 0){
                return res.status(401).json({erro:"Email não encontrado"})
            }
            
            const cliente = result[0];

            const senhaValida = await decrypt.compare(senhaCliente, cliente.senhaCliente);

            if (!senhaValida){
                return res.status(401).json({erro: "credenciais inválidas"});
            }

            const payload = {
                idCliente: cliente.idCliente,
                nomeCliente: cliente.nomeCliente,
                tipoUsuario: "Cliente"
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            res.status(200).json({message: "Logado com sucesso!", token})

        } catch (error) {
            console.error('Erro no login de cliente: ', error)
            return res.status(500).json({erro: "Erro no servidor ao realizar login do cliente"})
            throw error
        }
    }
};

module.exports = {authController};