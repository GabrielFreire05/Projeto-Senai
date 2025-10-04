const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

const livrosFilePath = path.join(__dirname, 'livros.json');

if (!fs.existsSync(livrosFilePath)) {
    fs.writeFileSync(livrosFilePath, '[]', 'utf8');
}

app.post('/livros', (req, res) => {
    try {
        const { titulo, autor, anoPublicacao, qtdExemplares } = req.body;

        if (!titulo || !autor || !anoPublicacao || !qtdExemplares) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const data = fs.readFileSync(livrosFilePath, 'utf8');
        const livros = JSON.parse(data);

        const novoLivro = {
            id: livros.length > 0 ? Math.max(...livros.map(l => l.id)) + 1 : 1,
            titulo,
            autor,
            anoPublicacao,
            qtdExemplares
        };

        livros.push(novoLivro);

        fs.writeFileSync(livrosFilePath, JSON.stringify(livros, null, 2), 'utf8');

        res.status(201).json({ message: "Livro cadastrado com sucesso!", livro: novoLivro });

    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

app.get('/livros', (req, res) => {
    try {
        const data = fs.readFileSync(livrosFilePath, 'utf8');
        const livros = JSON.parse(data);
        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

app.get('/livros/:titulo', (req, res) => {
    try {
        const { titulo } = req.params;
        const data = fs.readFileSync(livrosFilePath, 'utf8');
        const livros = JSON.parse(data);

        const livroEncontrado = livros.find(livro => livro.titulo.toLowerCase() === titulo.toLowerCase());

        if (!livroEncontrado) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }

        res.status(200).json(livroEncontrado);

    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
