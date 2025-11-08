
const { produtoModel } = require("../models/produtoModel")

const produtoController = {
    //funçao listar produtos

    //-------------------------
    //LISTAR TODOS OS PRODUTOS
    //GET /produtos
    //-------------------------
    listarProdutos: async (req, res) => { //aqui no controller ele controlas os endpoint
        try {
            const produtos = await produtoModel.buscarTodos()

            res.status(200).json(produtos)
        } catch (error) {
            console.error('Erro ao listar produtos: ', error)
            res.status(500).json({ error: "Erro ao buscar produtos" })
        }
    },

    /* 
    ---------------------
    CRIAR UM NOVO PRODUTO
    POST /produtos

    {
        "nomeProduto": "nome",
        "precoProduto": 0.00
    }
    ---------------------
    */

    criarProduto: async (req, res) => {
        try {
            const { nomeProduto, precoProduto } = req.body

            if (nomeProduto == undefined || precoProduto == undefined || isNaN(precoProduto)) {
                return res.status(400).json({
                    erro: 'Campos obrigatorios nao preenchidos!'
                })
            }

            await produtoModel.inserirProduto(nomeProduto, precoProduto)

            res.status(201).json({
                message: 'Produto cadastrado com sucesso!'
            })
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error)
            res.status(500).json({
                error: 'Erro ao cadastrar produto'
            })
        }
    },

    atualizarProduto: async (req, res) => {
        try {
            //path parament
            const { idProduto } = req.params
            const { nomeProduto, precoProduto } = req.body 

            //validaçao de UUID
            if (idProduto.length != 36) {// O ID tem que ter exatamente 36 caracteres
                return res.status(400).json({
                    erro: 'ID do produto invalido!'
                })
            }

            const produto = await produtoModel.buscarUm(idProduto)

            //verifica se o produto existe 
            if (!produto || produto.length !== 1) {
                return res.status(404).json({
                    erro: 'Produto nao encontrado'
                })
            }

            const produtoAtual = produto[0]

            //verifica se é nulo e fazer a atualizaçao
            const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto
            const precoAtualizado = precoProduto ?? produtoAtual.precoProduto

            await produtoModel.atualizarProduto(idProduto, nomeAtualizado, precoAtualizado)

            res.status(200).json({
                message: 'Produto atualizado com sucesso!'
            })
        } catch (error) {
            console.error('Erro ao atualiza produto: ', error)
            res.status(500).json({
                message: 'Erro no servidor ao atualizar o produto:' , error
            })
        }
    },

    deletarProduto: async (req, res) => {
        try {
            //path parament
            const { idProduto } = req.params

            //validaçao de UUID
            if (idProduto.length != 36) {// O ID tem que ter exatamente 36 caracteres
                return res.status(400).json({
                    erro: 'ID do produto invalido!'
                })
            }

            const produto = await produtoModel.buscarUm(idProduto)

            //verifica se o produto existe 
            if (!produto || produto.length !== 1) {
                return res.status(404).json({
                    erro: 'Produto nao encontrado'
                })
            }
            await produtoModel.deletarProduto(idProduto)

            res.status(200).json({message: "Produto deletado com sucesso"})

           } catch (error) {
              console.error('Erro ao deletar produto: ', error)
             res.status(500).json({
                    message: 'Erro no servidor ao deletar o produto:' , error
                })
            }
        }   
}
module.exports = {
    produtoController
}
