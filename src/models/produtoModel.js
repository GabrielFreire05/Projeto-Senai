const{sql, getConnection} = require("../config/db");

const produtoModel = {
    buscarTodos: async()=>{
        try {
            
            const pool = await getConnection();

            let querySQL = "SELECT * FROM Produtos";

            const result = await pool.request().query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao Buscar produtos: ",error);
            throw error;
        }
    }

};

module.exports = {produtoModel};

