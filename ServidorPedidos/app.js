const express = require("express");
const app = express();
const PORT = 8080;

//ultima linha do codigo
app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
