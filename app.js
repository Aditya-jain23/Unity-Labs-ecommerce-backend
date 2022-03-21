const express = require('express');
const app = express()
require('dotenv/config');   // To use .env variables all over the project.
const api = process.env.API_URL;
const morgan = require('morgan'); //Lib to log api requests
const mongoose =require('mongoose');
const authJwt = require('./helper/jwt');
const errorHandler = require('./helper/error-handler');


//routes
const productsRoutes = require('./routers/products');
const usersRoutes = require('./routers/users');
const catelogsRoutes = require('./routers/seller');
const buyersRoutes = require('./routers/buyers') 


//middleware
app.use(authJwt());
app.use(express.json());   // Middleware acts as a bridge between req and res.
app.use(errorHandler);
app.use(morgan('tiny'));
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/seller`, catelogsRoutes);
app.use(`${api}/buyers`, buyersRoutes);


mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('MongoDB Database up and running!...')
})
.catch((err)=>{
    console.log(err)
})

app.listen(3080,()=>{
    console.log(api)
    console.log('The server is up and running at http://localhost:3000')
})

