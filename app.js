const express = require('express')
const app = express()
const PORT = 8081
const fs = require('fs')

//middleware para interpretar JSON no corpo da requisiçao
app.use(express.json())

const CAMINHO_ARQUIVO = "./produtos.json"

if (!fs.existsSync(CAMINHO_ARQUIVO)) {
    fs.writeFileSync(CAMINHO_ARQUIVO, '[]')
}

app.post("/produtos", (req, res) => {
    try {
        const { nome, preco } = req.body

        if (nome == "" || nome == undefined || preco == undefined || isNaN(preco)) {
            return res.status(400).json({ message: "Campos obrigatorios nao preenchidos"})
        }

        const data = fs.readFileSync(CAMINHO_ARQUIVO, 'utf-8')
        let produtos = JSON.parse(data) // transformando o texto em objeto js

        //criando um novo projeto js
        const novoProduto = {
            id: produtos.length + 1, 
            nome,
            preco
        }

        produtos.push(novoProduto)

        //adicionar ao arquivo .JSON
        fs.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(produtos, null, 4))

        console.log(novoProduto)
        
        res.status(201).json({ 
            message: `Produto cadastrado com sucesso`,
            produto: novoProduto
        })
    } catch (error) {
        console.error(`Erro ao cadastrar produto ${error}`)
        res.status(500).json({ message: "Erro interno no servidor"})
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})