const sql = require("mssql");

const CONFIG = {
    user: 'sa',
    password: '123456789',
    server: 'localhost',
    database: 'LojaDB',
    options:{
        encrypt: true,
        trustServerCertificate: true
    }
}

async function getConnection(){
    try {
     const pool = await sql.connect(CONFIG);
     return pool;
    } catch (error) {
        console.error('erro na conexão SQL Server: ',error);
    }
}

// (async()=>{
//     try {
//         const pool = await getConnection();
//         console.log("Conexão estabelecida com sucesso!");
//     } catch (error) {
//         console.error("Erro ao estabelecer conexão: ",error);
//     }
// })()


module.exports = {sql, getConnection};