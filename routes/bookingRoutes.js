const express = require('express');
const bookingRouter = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth')

bookingRouter.post('/', auth.verifyToken, bookingController.createBooking);
bookingRouter.get('/', auth.verifyToken,  bookingController.getAllBookings);
bookingRouter.put('/:id', auth.verifyToken,  bookingController.updateBooking);
bookingRouter.delete('/:id', auth.verifyToken,  bookingController.deleteBooking);

module.exports=bookingRouter;