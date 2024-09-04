const express = require('express');
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const productRouter = express.Router();


productRouter.post('/', auth.verifyToken,  productController.createProduct)
productRouter.get('/', auth.verifyToken, productController.getAllProduct)
productRouter.get('/search', auth.verifyToken, productController.getProductByQuery)


module.exports = productRouter;