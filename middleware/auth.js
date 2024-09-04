const jwt = require('jsonwebtoken');
const { SECRET } = require("../utils/config");


const auth = {
    verifyToken: async(req, res, next)=>{
       try{
        // get the token from the request cookies
        const token = req.cookies.token;

        // if the token does not exist, return an error
        if(!token){
            return res.status(400).send({ message: 'Token not found'})
        }
            // verify the token
            try{
                const decoded = jwt.verify(token, SECRET)
                req.userId = decoded.id;
                next();
            }catch (error){
                res.status(400).send({ message: 'Invalid token'})
            }
        
       } catch(error){
        res.status(500).send({ message: error.message}) 
       }
    },
}

module.exports = auth;