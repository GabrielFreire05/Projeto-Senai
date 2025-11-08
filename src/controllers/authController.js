const { clienteModel } = require("../models/clienteModel"); // Corrigido
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    clienteLogin: async (req, res) => {
        try {
            const { emailCliente, senhaCliente } = req.body;
            
            if (emailCliente == undefined || senhaCliente == undefined) {
                return res.status(400).json({ erro: "Email e senha são obrigatórios" });
            }

            // Chama a função buscarPorEmail
            const result = await clienteModel.buscarPorEmail(emailCliente);

            // Verifica se a propriedade 'recordset' existe e se tem dados
            if (!result || !result.recordset || result.recordset.length === 0) {
                return res.status(401).json({ erro: "Email não encontrado" });
            }
            
            const cliente = result.recordset[0]; // Acessa o primeiro cliente retornado

            // Compara a senha
            const senhaValida = await bcrypt.compare(senhaCliente, cliente.senhaCliente);

            if (!senhaValida) {
                return res.status(401).json({ erro: "Credenciais inválidas" });
            }

            // Criação do payload do token JWT
            const payload = {
                idCliente: cliente.idCliente,
                nomeCliente: cliente.nomeCliente,
                tipoUsuario: "Cliente"
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // Ajuste para 'true' se for ambiente de produção (uso HTTPS)
                sameSite: "strict", // Corrigido 'samSite' para 'sameSite'
                maxAge: Number(process.env.JWT_TIME_EXPIRES_IN)
            });

            res.status(200).json({ message: "Logado com sucesso!", token });

        } catch (error) {
            console.error('Erro no login de cliente: ', error);
            return res.status(500).json({ erro: "Erro no servidor ao realizar login do cliente" });
        }
    }
};

module.exports = { authController };
