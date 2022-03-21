
const express = require('express');
const { Product } = require('../models/product');
const router = express.Router();
const mongoose = require('mongoose');
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');


router.get(`/`,(req, res)=>{
    const product = {
        id : '1',
        name : 'TestProducty7'
    }
    res.send(product)
})
router.post(`/`, async (req, res)=>{
    const secret = process.env.SECRET;
    var token = req.headers.authorization.split(' ')[1];
    if(token){
        console.log(token)
        try {
            var decoded_jwt = jwt.verify(token, secret);
            console.log(decoded_jwt);
            var userId = decoded_jwt.userId;
            console.log(userId);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        
        }else{
            console.log('user not found')
        }

        let newProduct = new Product({
        id : req.body.id,
        name : req.body.name,
        catelogId:userId
    });

    newProduct = await newProduct.save();
    if (!newProduct) return res.status(500).send('The product cannot be created');
    res.send(newProduct);
    
 });



module.exports = router;