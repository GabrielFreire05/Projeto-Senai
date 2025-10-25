const sql = require("mssql");

const CONFIG = {
    user: 'sa',
    password: '123456789',
    server: 'localhost',
    database: 'lojaDB',
    options:{
        encrypt: true,
        trustServerCertificate: true // ignora o erro de certificado autoassinado
    }
}

async function  getConnection(){
    try {
        const poll =  await sql.connect(CONFIG);
        return poll;
    } catch (error){
        console.error('Erro na conexão SQL Server:',error);
    }
}

//  (async ()=>{
//   try{
//      const poll = await getConnection();
//      console.log("Conexão estabelecida com sucesso!"); 
//   }catch (error) {
//     console.error("Erro ao estabelecer conexão:",error);
//   }
// })()

module.exports = {sql, getConnection};