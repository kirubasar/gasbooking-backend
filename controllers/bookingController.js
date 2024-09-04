const Booking = require('../models/booking')

const bookingController ={
    createBooking: async(req, res)=>{
        try{
            // get the data from the request body
            const {products,bookingDate,deliveryDate,address,slot,paymentMethod, paymentStatus, bookingStatus} = req.body

            // get the user id from the request object
            const userId = req.userId

            // create a new booking
            const newBooking = new Booking({
                user: userId,
                products,
                bookingDate,
                deliveryDate,
                address,
                slot,
                paymentMethod, 
                paymentStatus, 
                bookingStatus, 
                
             })

            // save the booking to the database
            const savedBooking = await newBooking.save();

            // return the saved booking
            res.send({ message: 'Booking created successfully', booking: savedBooking})
        }catch(error){
            res.send({ message: error.message}) 
        }
    },
    getAllBookings: async(req, res)=>{
        try{
            // get the user id fron the request object
            const userId = req.userId;

            //get all bookings from the database
            const bookings = await Booking.find().populate('products', 'name').populate('user', 'name').lean().exec();

            // return the bookings
            res.send({ message: 'All Bookings',  bookings})
        }catch(error){
            res.send({ message: error.message})
        }
    },
   
    updateBooking: async(req, res)=>{
        try{
            // get the booking id from the request parameters
            const bookingId = req.params.id;

            // get the data from the request body
            const{slot, address, deliveryDate} = req.body;

            // find the booking by id and update it
            const updatedBooking = await Booking.findByIdAndUpdate(bookingId, {
                slot, 
                address, 
                deliveryDate,
            }, {new: true});

            // if the Booking does not exist, return an error
            if(!updatedBooking){
                return res.send({message:'Booking does not exist'});
            }

            // return the updated Booking
            res.send({message: 'Booking updated successfully', booking: updatedBooking})
        }catch(error){
            res.send({ message: error.message}) 
        }
    },
    deleteBooking: async(req, res)=>{
        try{
            // get the order id from the request parameters
            const bookingId = req.params.id;
            //find the booking by id and delete id
            const  deletedBooking = await Booking.findByIdAndDelete(bookingId)
            // if the order does not exist, return an error
            if(!deletedBooking){
                return res.send({message: 'Booking does not exist'})
            }

            // return the deleted booking
            res.send({message: 'Booking cancel successfully', booking: deletedBooking})
        }catch(error){
            res.send({ message: error.message}) 
        }
    }
}

module.exports = bookingController;