// src/models/livroModel.js
const { connectDB, sql } = require('../config/db');

const livroModel = {
    criar: async (novoLivro) => {
        const pool = await connectDB();
        const result = await pool.request()
            .input('titulo', sql.NVarChar, novoLivro.titulo)
            .input('anoPubli', sql.Int, novoLivro.anoPubli)
            .input('qntdUnid', sql.Int, novoLivro.qntdUnid)
            .query('INSERT INTO Livros (titulo, anoPubli, qntdUnid) VALUES (@titulo, @anoPubli, @qntdUnid)');
        return result;
    },

    buscarTodos: async () => {
        const pool = await connectDB();
        const result = await pool.request().query('SELECT * FROM Livros');
        return result.recordset;
    },

    buscarPorTitulo: async (titulo) => {
        const pool = await connectDB();
        const result = await pool.request()
            .input('titulo', sql.NVarChar, `%${titulo}%`)
            .query('SELECT * FROM Livros WHERE titulo LIKE @titulo');
        return result.recordset;
    }
};

module.exports = livroModel;