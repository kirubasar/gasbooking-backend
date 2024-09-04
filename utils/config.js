require('dotenv').config();

const gas = process.env.GAS_URI;
const SECRET =  process.env.jwt_SECRET

module.exports ={
    gas,
    SECRET
};