const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');


const userController = {
   register: async (req, res)=>{
     try{
        // get the user inputs from the request body
        const {name, email, password} = req.body;

        // check if the user already exists in the database
        const user = await User.findOne({email});

        // if the user already exists, return an error
        if(user) {
         return res.status(400).send({ message: 'User already exists'})
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // create a new user
        const newUser = new User({name, email, password: hashedPassword})

        // save the user to the database
        const savedUser = await newUser.save();

        // return the saved user
        res.status(201).send({ message : 'User register successfully'})
     }catch(error){
      res.send({ message: error.message})
     }
   },
   login: async(req, res)=>{
      try{
        /// get the user inputs from the request body
        const {email, password} = req.body;
        
        // check is the user exists in the database
        const user = await User.findOne({email})

        // if the user does not exist, return an error
        if(!user){
         return res.status(400).send({ message : 'User does not exist'});
        }
        // check if the password is correct
        const isPassWordCorrect = await bcrypt.compare(password, user.password)
     
        // if the password is incorrect, return an error
        if(!isPassWordCorrect){
         return res.status(400).send({ message: 'Invalid password'})
        }
     
        //create a token
        const token = jwt.sign({id: user._id},SECRET);

        // set a cookie with the token
        res.cookie('token', token, {
         httpOnly: true,
         sameSite: 'none',
         secure: true,
         expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        })

        // return the user
        res.status(200).send({ message : 'Login successful', user: user});

      }catch(error){
         res.send({ message: error.message})
      }
   },
   logout: async(req, res)=>{
     try {
      // get the user id from the request object
      const userId = req.userId;

      // check if the user login or not
      if(!userId){
         return res.status(400).send({ message: 'User not logged in'})
      }
      //clear the cookie
      res.clearCookie('token');

      // return the user
      res.status(200).send({ message: 'Logout succesful'});
   }catch(error){
      res.send({ message: error.message})
     }
   },
   // get the user profile
   getProfile: async(req, res)=>{
      try{
       // get the user id from the request object
       const userId = req.userId;

       // find the user by id
       const userProfile = await User.findById(userId);

       // if the user doen not exist, return an error
       if(!userProfile){
         return res.status(400).send({ message: 'User does not exist'})
       }
       
       // return the user profile
       res.status(200).send({ message: 'User profile', user:userProfile})
      }catch(error){
         res.send({ message: error.message}) 
      }
   },
   updateProfile: async(req, res)=>{
      try{
         // get the user id from the request object
         const userId =req.userId;

         // get the inputs from the request body
         const {name, email} = req.body;

         // find the user by id
         const user = await User.findById(userId);

         // if the user does not exist, return an error
         if(!user){
            return res.send({ message: 'User does not exist'})
          }

          // update the user profile
          user.name = name|| user.name;
          user.email = email|| user.email;

          // save the user to the database
          const updatedUser = await user.save();

          //return the updated user profile
          res.send({ message: 'User profile updated successfully', user:updatedUser})

      }catch(error){
         res.send({ message: error.message}) 
      }
   },
   deleteProfile: async (req, res)=>{
      try{
         // get the user id from the request object
         const userId = req.userId;

         // find the user by id and delete
         const deletedUser = await User.findByIdAndDelete(userId);

         // if the user does not exist, return an error
         if (!deletedUser) {
             return res.send({ message: 'User does not exist' });
         }

         // return the deleted user
         res.send({ message: 'User deleted successfully', user: deletedUser });

         
      }catch(error){
         res.send({ message: error.message}) 
      }
   },
   
}

module.exports = userController;