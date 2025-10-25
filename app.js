const express = require ("express");
const app = express();
const {produtoRoutes} = require ("./src/routes/produtosRoutes");

const PORT = 8081

app.use(express.json());

//Rotas da aplicação
app.use('/',produtoRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost${PORT}`);
});