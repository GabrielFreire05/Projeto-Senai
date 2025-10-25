const {produtoModel} = require("../models/produtoModel");

const produtoController = {
   
    listarProdutos: async (req, res)=>{
        try {
            
            const produtos = await produtoModel.buscarTodos();

            res.status(200).json(produtos);

        } catch (error) {
            console.error('Erro ao listar produtos:',error);
            res.status(500).json({error: 'Erro ao buscar produtos.'});
        }
    },

    atualizarProduto: async (req, res) => {
        try {
            const {idProduto} = req.params;
            const {nomeProduto, precoProduto} = req.body;

            if(idProduto.length != 36){
                return res.status(400).json({erro: 'id do produto inválido!'});
            }
            const produto = await produtoModel.buscarUm(idProduto);

            if(!produto || produto.length !==1){
                return res.status(404).json({erro: 'Produto não encontrado!'});
            }
            const produtoAtual = produto[0];
            const precoAtual = produto[0];

            const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;
            const precoAtualizado = precoProduto ?? precoAtual.precoProduto;

            await produtoModel.atualizarProduto(idProduto, nomeAtualizado, precoAtualizado);
            
            res.status(200).json({message: "Produto atualizado com sucesso!"})

        } catch (error) {
                console.error("Erro a atualizar produto!", error);
                res.status(500).json({erro: 'Erro interno no servidor ao atualizar produto!'});
        }
    }
}

module.exports = {produtoController};