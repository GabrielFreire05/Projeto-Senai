const sql = require("mssql");

const CONFIG = {
    user: 'sa',
    password: '123456789',
    server: 'localhost',
    database: 'lojaDB',
    options: {
        encrypt: true,
        trustServerCertificate: true // Ignora o erro de certificado autoassinado
    }
}

async function getConnection() {
    try {
        const pool = await sql.connect(CONFIG);  // Corrigido para 'pool' (e não 'poll')
        return pool;
    } catch (error) {
        console.error('Erro na conexão SQL Server:', error);
    }
}

module.exports = { sql, getConnection };
