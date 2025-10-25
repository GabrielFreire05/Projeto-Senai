const express = require("express");
const app = express();

const express = require('express');
const { connectDB } = require('./src/config/db'); // Caminho atualizado
const livroRoutes = require('./src/routes/livroRoutes.js'); // Caminho atualizado
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.json());

const startServer = async () => {
    try {
        await connectDB();

        app.get('/', (req, res) => {
            res.send('API da Biblioteca está no ar!');
        });

        app.use('/api', livroRoutes);

        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });

    } catch (error) {
        console.error("Falha ao iniciar o servidor.", error);
    }
};
const PORT = 8081;

app.listen(PORT,()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});