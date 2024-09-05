//import express
const express = require('express');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes')
const logger = require('./utils/logger');
const unknownEndpoint = require('./utils/Error');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bookingRouter = require('./routes/bookingRoutes');


// create an express app
const app = express();


//middlware
app.use(cors({
    origin: 'https://gasbooking-backend.onrender.com',

    credentials: true
}));


app.use(cookieParser());

app.use(express.json());

app.use(logger);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/bookings', bookingRouter );



app.use(unknownEndpoint);

// export app
module.exports = app;