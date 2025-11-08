const {clienteModel} = require("../models/clienteModel")
const bcrypt = require('bcrypt');
// nao esqueca de exportar no final usando 
//MODULE.EXPORTS = {}
const clienteController = {
    // GET /clientes
    //funçao listar todos os clientes

    listarCliente: async (req, res) => { //controlando o endpoint listarCLiente
        try {
            const clientes = await clienteModel.buscarTodos()

            res.status(200).json(clientes)
        } catch (error) {
            console.error('Erro ao listar clientes: ', error)
            res.status(500).json({
                error: "Erro ao buscar clientes"
            })
        }
    },

    /*
    ---------------------------
    CRIAR UM NOVO CLIENTE
    POST /cliente

    {
        "nomeCliente": "nome",
        "cpfCliente": "12345678900"
    }
    */

    criarCliente: async (req, res) => {
    try {
        const { nomeCliente, cpfCliente, emailCliente, senhaCliente } = req.body;

        if (!nomeCliente || !cpfCliente || !emailCliente || !senhaCliente) {
            return res.status(400).json({
                erro: 'Campos obrigatorios nao preenchidos'
            });
        }

        // Criptografar senha
        const saltRounds = 10;
        const senhaCriptografada = await bcrypt.hash(senhaCliente, saltRounds);

        // Verificar se o CPF já existe
        const clientes = await clienteModel.buscarPorCPF(cpfCliente);
        if (clientes.length > 0) {
            return res.status(409).json({ erro: 'CPF ja cadastrado' });
        }

        // Inserir cliente no banco
        await clienteModel.inserirCliente(nomeCliente, cpfCliente, emailCliente, senhaCriptografada);

        res.status(201).json({
            message: 'cliente cadastrado com sucesso'
        });
    } catch (error) {
        console.error('erro ao cadastrar cliente:', error);
        res.status(500).json({
            error: 'Erro ao cadastrar cliente'
        });
    }
}

}

//EXPORTANDO O clienteController
module.exports = {
    clienteController
}