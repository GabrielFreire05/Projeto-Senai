// Importando a conexão com o banco de dados
// e o tipo de dados da pasta config/db 
// utilizando desestruturação
const { sql, getConnection } = require("../config/db");  // Corrigido para 'getConnection'

// Objeto clienteModel
const clienteModel = {
    buscarTodos: async () => {
        try {
            const pool = await getConnection();  // Corrigido para 'getConnection'
            // Comando para buscar todos os dados dos clientes
            let querySQL = "SELECT * FROM clientes";
            const result = await pool.request().query(querySQL);

            // .recordset é a propriedade correta do 'mssql' que retorna a lista (array) de resultados
            return result.recordset; 
        } catch (error) {
            console.error('Erro ao buscar clientes: ', error);
            throw error;
        }
    },

    // Verificar se o CPF existe 
    buscarPorCPF: async (cpfCliente) => {
        try {
            const pool = await getConnection();  // Corrigido para 'getConnection'
            let querySQL = `
                SELECT * FROM clientes WHERE cpfCliente = @cpfCliente
            `;
            const result = await pool.request()
                .input('cpfCliente', sql.VarChar(15), cpfCliente)
                .query(querySQL);
            return result.recordset;
        } catch (error) {
            console.error('Erro ao verificar o CPF: ', error);
            throw error;
        }
    },

    // Inserir um novo cliente
    inserirCliente: async (nomeCliente, cpfCliente, emailCliente, senhaCliente) => {
        try {
            const pool = await getConnection();  // Corrigido para 'getConnection'
            let querySQL = 'INSERT INTO clientes (nomeCliente, cpfCliente, emailCliente, senhaCliente) VALUES (@nomeCliente, @cpfCliente, @emailCliente, @senhaCliente)';
            await pool.request()
                .input('nomeCliente', sql.VarChar(100), nomeCliente)
                .input('cpfCliente', sql.VarChar(11), cpfCliente)
                .input('emailCliente', sql.VarChar(200), emailCliente)
                .input('senhaCliente', sql.VarChar(255), senhaCliente)
                .query(querySQL);
        } catch (error) {
            console.error('Erro ao inserir cliente: ', error);
            throw error;
        }
    },

    // Buscar cliente por email
    buscarPorEmail: async (emailCliente) => {
        try {
            const pool = await getConnection();  // Corrigido para 'getConnection'
            let querySQL = `
                SELECT * FROM clientes WHERE emailCliente = @emailCliente
            `;
            const result = await pool.request()
                .input('emailCliente', sql.VarChar(200), emailCliente) 
                .query(querySQL);

            return result.recordset;
        } catch (error) {
            console.error('Erro ao verificar o email: ', error);
            throw error;
        }
    }
};

module.exports = {
    clienteModel
};
