const {clienteModel} = require("../models/clienteModels")

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
        "cpfCliente": "12345678910"
    }
    */

    criarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente} = req.body

            if (nomeCliente == undefined || cpfCliente == undefined) {
                return res.status(400).json({
                    erro: 'Campos obrigatorios nao preenchidos'
                })
            }

            //verificar se o cpf ja existe no DB
            const clientes = await clienteModel.buscarPorCPF(cpfCliente)

            if(clientes.length > 0) {
                return res.status(409).json({erro: 'CPF ja cadastrado'})
            }

            await clienteModel.inserirCliente(nomeCliente, cpfCliente)

            res.status(201).json({
                message: 'cliente cadastrado com sucesso'
            })
        } catch (error) {
            console.error('erro ao cadastrar cliente:', error)
            res.status(500).json({
                error: 'Erro ao cadastrar cliente'
            })
        }
    }
}

//EXPORTANDO O clienteController
module.exports = {
    clienteController
}