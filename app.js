const express = require('express'); // Importa o express para o projeto
const app = express(); // Instancia do express

const PORT = 8081;

const parseNumber = (numUmStr, numDoisStr) => {
    const numUm = parseFloat(numUmStr);
    const numDois = parseFloat(numDoisStr);
    return { numUm, numDois };
};

app.get('/soma/:numUm/:numDois', (req, res) => {
    // Extrai os parâmetros da requisição
    const { numUm, numDois } = parseNumber(req.params.numUm, req.params.numDois);

    if (isNaN(numUm) || isNaN(numDois)) {
        return res.status(400).json({ error: 'Parâmetro inválido. Por favor, insira um número válido.' });
    }

    const resultado = numUm + numDois;
    res.json({ resultado });
});

app.get('/subtracao/:numUm/:numDois', (req, res) => {
    const { numUm, numDois } = parseNumber(req.params.numUm, req.params.numDois);

    if (isNaN(numUm) || isNaN(numDois)) {
        return res.status(400).json({ error: 'Parâmetro inválido. Por favor, insira um número válido.' });
    }

    const resultado = numUm - numDois;
    res.json({ resultado });
});

app.get('/multiplicacao/:numUm/:numDois', (req, res) => {
    const { numUm, numDois } = parseNumber(req.params.numUm, req.params.numDois);

    if (isNaN(numUm) || isNaN(numDois)) {
        return res.status(400).json({ error: 'Parâmetro inválido. Por favor, insira um número válido.' });
    }

    const resultado = numUm * numDois;
    res.json({ resultado });
});

app.get('/divisao/:numUm/:numDois', (req, res) => {
    const { numUm, numDois } = parseNumber(req.params.numUm, req.params.numDois);

    if (isNaN(numUm) || isNaN(numDois)) {
        return res.status(400).json({ error: 'Parâmetro inválido. Por favor, insira um número válido.' });
    }

    if (numDois === 0) {
        return res.status(400).json({ error: 'Divisão por zero não é permitida.' });
    }

    const resultado = numUm / numDois;
    res.json({ resultado });
});

//Sempre a ultima linha do codigo
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});