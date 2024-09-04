const Product = require("../models/product");

const productController ={
    //1. create product(post)
    createProduct: async(req, res)=>{
        try{
            // get the data from the request body
            const {name, description, price, image, branch, location, stock} = req.body;

            //  create a new product
            const newProduct = new Product({
                name, 
                description, 
                price,  
                branch, 
                location, 
                stock
            });
            // save the product to the database
            const savedProduct = await newProduct.save();

            // return the saved product
            res.send({ message: 'Product created successfully', product: savedProduct})
        }catch(error){
            res.send({ message: error.message})
        }
    },
    // get product(get)
    getAllProduct: async(req, res)=>{
        try{
            // get all products from the database
            const products = await Product.find();

            // return the products
            res.send({ message: 'All products', products})
        }catch(error){
            res.send({ message: error.message})
        }
    },
    getProductByQuery: async(req, res)=>{
        try{
           const {name} = req.query;
           
           // find the product by name
           if(name){
            const product = await Product.find({name});
           
            // if the product does not exist, return an error
            if(!product){
                return res.status(400).send({message: 'Product does not found'})
            }

            // return the product
             res.status(200).send({message:'products', product});
        }
           
        } catch(error){
            res.send({ message: error.message})
        }
    },
    updateProduct: async(req, res)=>{
        try{
            // get the product id from the request parameters
            const productId = req.params.id;

            // get the data from the request body
            const{ name, description, price, stock } = req.body;

            // find the product by id and update it
            const updatedProduct = await Product.findByIdAndUpdate(productId, {
                name, 
                description, 
                price, 
                stock
            }, {new: true});

            // return the updated product
            res.send({ message: 'Product updated successfully', product: updatedProduct});
        }catch(error){
            res.send({ message: error.message}) 
        }
    },
    deleteProduct: async(req, res)=>{
        try{
            
                // get the product id from the request parameters
                const productId = req.params.id;
    
                // find the product by id and delete it
                const deletedProduct = await Product.findByIdAndDelete(productId);
    
                // if the product does not exist, return an error
                if (!deletedProduct) {
                    return res.send({ message: 'Product does not exist' });
                }
    
                // return a success message
                res.send({ message: 'Product deleted successfully' });
        } catch(error){
            res.send({ message: error.message})
        }
       
}

}

module.exports= productController;