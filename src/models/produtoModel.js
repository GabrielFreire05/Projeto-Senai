
const {sql, getConnection} = require("../config/db")

const produtoModel = { 
    buscarTodos: async ()=>{
        try{
            const pool = await getConnection();

            let querySQL = "SELECT * FROM Produtos"; 

            const result = await pool.request(). query (querySQL);

            return result.recordset;

        }catch (error){
            console.error("Erro ao buscar produtos:", error);
            throw error;

        }
    },
    buscarUm: async (params) => {
        try {
            const pool = await getConnection();

            const querySQL = 'SELET * FROM Produtos WHERE idProduto = @idProduto';

            const result = await pool.request()
            .input('idProduto', sql.UniqueIdentifier, idProdutos)
            .query(querySQL);
        } catch (error) {
            console.error('Erro ao buscar o produto', error);
            throw error;
        }
    },

    atualizarProduto: async (idProduto, nomeProduto, precoProduto) => {
        try {
            const pool = await getConnection();
            const querySQL = `UPDATE Produtoss SET nomeProduto = @nomeProduto, precoproduto = @precoProduto
                              WHERE idProduto = @idProduto`;
            
            await pool.request()
                .input('nomeProduto', sql.VarChar(100), nomeProduto)
                .input('precoProduto', sql.Decimal(10,2), precoProduto)
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
            throw error;
        }
    }
};

module.exports = {produtoModel};