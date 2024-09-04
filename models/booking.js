const mongoose = require('mongoose')

// create a schema
const bookingSchema = new mongoose.Schema({
   
     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    bookingDate: {
        type: Date,
        default: Date.now()
        
    },
      deliveryDate: {
        type: Date,
        default: Date.now()
    },
      address: {
        type: String,
       },
      slot: {
        type: String,
    },
    
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
    },
      paymentMethod: {
        type: String,
        enum: ['RazorPay', 'Stripe', 'CashOnDelivery'],
        default: 'RazorPay'
    },
      bookingStatus: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Delivered', 'Cancelled'],
        default: 'Pending',
    }
    });

    // create a model and export it
    module.exports = mongoose.model('Booking', bookingSchema, 'bookings')   