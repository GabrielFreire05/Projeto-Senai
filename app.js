const express = require('express'); // Importa o express para o projeto
const app = express(); // Instancia do express

const PORT = 8081;

const parseNumber = (numUmStr, numDoisStr) => {
    const numUm = parseFloat(numUmStr);
    const numDois = parseFloat(numDoisStr);
    return { numUm, numDois };
};

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
            return res.status(400).json({ error: 'Operação inválida. Use soma, subtracao, multiplicacao ou divisao.' });
    }
    res.json({ resultado });
});

//Sempre a ultima linha do codigo
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});