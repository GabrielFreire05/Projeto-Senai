const bcrypt = require('bcrypt');

let senha = 'senha123';

const saltRounds = 10;

const senhaCriptografada = bcrypt.hashSync(senha, saltRounds);

console.log('senha Original', senha);
console.log('Senha Criptografada', senhaCriptografada);

const senhaValida = bcrypt.compareSync(senha, senhaCriptografada);

if (senhaValida){
    console.log('Senha valida');
}else{
    console.log('Senha invalida');
}