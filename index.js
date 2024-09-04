const {gas}= require('./utils/config');
const app = require('./app')
// import mongoose
const mongoose = require('mongoose');


//1. connect to the database
mongoose.connect(gas)
    .then(()=> {
        console.log('Connected to MongoDB...');
        //2. start the server
        app.listen(3003,()=>{
            console.log('Server is running on port 3003');
})
    })
    .catch(err=> console.error('Could not connect to MongoDB...', err))


