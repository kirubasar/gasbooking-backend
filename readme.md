Gas-Booking Application:

This is a simple gas-booking application that allows users to view products, booking gas, view booked gas list and also update the booking details, cancel the booking.

The application is built using the following technologies:

1. Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, Multer, Nodemailer, Nodemon, Dotenv,  Cors, cookie-parser.

2. Tools: Postman, VS Code, Git, GitHub, Render.

Steps:

Backend:
 1. Create an empty directory and open it in VS Code.
 2. Open the terminal and run the following command to create a package.json file:

````
npm init
````

3. Create an entry point file(index.js).
4. Configure the package.json file. Add the following code:

````
"scripts": {
    "start": "node index.js"
}
````

5. From the backend, connect to the database:

 1. Copy the connection string from the cluster.
 2. Install mongoose:

 ````
 npm install mongoose
 ````

 3. In the index.js file, add the following code:

 ````
 const mongoose = require('mongoose');

 mongoose.connect(connection_string);
 ````

 4. Install dotenv:
 ````
 npm install dotenv
 ````

 5. Create a .env file and add the connection string:

 ````
 GAS_URI=connection_string
 ````

 6. Require the dotenv package in the index.js file:
 
 ````
 require('dotenv').config();
 ````

 7. Change the connection string in index.js inside mongoose.connect() function to:

 ````
 process.env.GAS_URI
 ````

 8. Create a config.js file under the utils folder and add the following code:

 ````
 require('dotenv').config();

 const gas = process.env.GAS_URI;

 module.exports = {
    gas
};
````

 9. Require the config.js file in the index.js file:

 ````
const {gas}= require('./utils/config');
````

 10. Update the variable process.env.GAS_URI to gas in the mongoose.connect() function. 

6. Connect to the server using Express.js:
 
 1. Install express:

 ````
 npm install express
 ````
 2. Update the index.js file:

 ````
 const express = require('express');

 const app = express();

 app.get('/', (req, res) => {
    res.send('Hello World');
 });

 app.listen(3003, () => {
    console.log('Server is running on port 3003');
 });
 ````

7. Users Stories:
 1. As a user, I should be able to register and login to the application.
 2. As a user, I should be able view all gas products.
 3. As a user, I should be able to search & filter by based on their desired gas provider name.
 4. As a user, I should be able to manage existing bookings, including viewing, modifying, or canceling bookings.
 5. As a user, I should be able to logout to the application.

Task:

Backend:

 1. Setup the project with Node.js and Express.js.
 2. Setup the environment variables.
 3. Connect to the MongoDB database.
 4. Run the server and test the connection.
 5. Setup the architecture of the project(Models, Routes, Controllers, Middlewares).
 6. Basic housekeeping(Error handling, logging, parsing).
 7. Setup the authentication system (Register, Login, Logout).
 8. Setup the product system.
 9. Setup the user system.
10. Setup the booking system.

Some other tasks:
 1. Implement JWT, and Bcrypt for secure access:
 Install JWT, Bcrypt

 ````
 npm install jsonwebtoken
 
 npm install bcrypt
 ````

 2. Integrate middleware for user permissions:
 Install cookie parser

 ````
 npm install cookie-parser
 ````

All Tasks are complete - Final setup:

 1. Backend server to accept requests from the frontend:

 Install cors

 ````
 npm install cors
 ````

 2. Create an empty repository in GitHub.Com
 3. Create a .gitignore file in the project directory and add the following code:

 ````
 node_modules
 package-lock.json
 DS_Store
 .env
 ````
 4. Initialize the git repository in the project directory:

 ````
 git init
 ````
 
 5. Add the remote repository URL:

 ````
 git remote add origin <repository-url>
 ````

 6. Rename the default branch from master to main:

 ````
 git branch -m main
 ````

 7. Create a .gitignore file and add the following code:

 ````
 node_modules
 package-lock.json
 DS_Store
 .env
 ````

 8. Add the changes to the staging area:

 ````
 git add .
 ````

 9. Commit the changes:

 ````
 git commit -m "backend application setup"
 ````

 10. Push the changes to the remote repository:

 ````
 git push -u origin main
 ````

Last step:
 Deploy our application to Render.

