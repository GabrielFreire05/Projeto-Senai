const livroModel = require('../models/livroModel');
const livroController = {
    cadastrarLivro: async (req, res) => {
        try {
            const { titulo, anoPubli, qntdUnid } = req.body;

            if (titulo === undefined || qntdUnid === undefined) {
                return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
            }

            const novoLivro = { titulo, anoPubli, qntdUnid };
            await livroModel.criar(novoLivro);

            res.status(201).json({ message: 'Livro cadastrado com sucesso!' });
        } catch (error) {
            console.error('Erro ao cadastrar livro:', error);
            res.status(500).json({ error: 'Erro ao cadastrar livro' });
        }
    },

    listarLivros: async (req, res) => {
        try {
            const { titulo } = req.query;
            let livros;

            if (titulo) {
                livros = await livroModel.buscarPorTitulo(titulo);
            } else {
                livros = await livroModel.buscarTodos();
            }

            res.status(200).json(livros);
        } catch (error) {
            console.error('Erro ao listar livros:', error);
            res.status(500).json({ error: 'Erro ao buscar livros' });
        }
    }
};

module.exports = livroController;