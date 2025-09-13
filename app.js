const express = require('express'); // Importa o express para o projeto
const app = express(); // Instancia do express

const PORT = 8081;

// Função auxiliar para converter strings em números
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

app.get('/calculadora', (req, res) => {
    const { operacao, numUm, numDois } = req.query;
    
    let resultado;
    const numero1 = parseFloat(numUm);
    const numero2 = parseFloat(numDois);

    if (isNaN(numero1) || isNaN(numero2)) {
        return res.status(400).json({ error: 'Parâmetro inválido. Por favor, insira um número válido.' });
    }
    
    switch (operacao) {
        case 'soma':
            resultado = numero1 + numero2;
            break;
        case 'subtracao':
            resultado = numero1 - numero2;
            break;
        case 'multiplicacao':
            resultado = numero1 * numero2;
            break;
        case 'divisao':
            if (numero2 === 0) {
                return res.status(400).json({ error: 'Divisão por zero não é permitida.' });
            }
            resultado = numero1 / numero2;
            break;
        default:
            return res.status(400).json({ error: 'Operação inválida na query. Use soma, subtracao, multiplicacao ou divisao.' });
    }
    res.json({ resultado });
});


app.get('/operacao/:tipo', (req, res) => {

    const { tipo } = req.params; 
    
    const { numUm, numDois } = req.query;

    let resultado;

    const { numUm: numero1, numDois: numero2 } = parseNumber(numUm, numDois);

    if (isNaN(numero1) || isNaN(numero2)) {
        return res.status(400).json({ error: 'Parâmetro inválido. Por favor, insira números válidos na query (numUm e numDois).' });
    }

    switch (tipo) {
        case 'soma':
            resultado = numero1 + numero2;
            break;
        case 'subtracao':
            resultado = numero1 - numero2;
            break;
        case 'multiplicacao':
            resultado = numero1 * numero2;
            break;
        case 'divisao':
            if (numero2 === 0) {
                return res.status(400).json({ error: 'Divisão por zero não é permitida.' });
            }
            resultado = numero1 / numero2;
            break;
        default:
            return res.status(400).json({ error: 'Operação inválida no caminho. Use soma, subtracao, multiplicacao ou divisao.' });
    }

    res.json({ resultado });
});


//Sempre a ultima linha do codigo
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
