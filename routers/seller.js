const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Catelog } = require('../models/catelog')
const jwt = require('jsonwebtoken');

router.post('/create-catelog',async(req,res)=>{
    const secret = process.env.SECRET;
    var token = req.headers.authorization.split(' ')[1];
    if(token){
        console.log(token)
        try {
            var decoded_jwt = jwt.verify(token, secret);
            console.log(decoded_jwt);
            var userId = decoded_jwt.userId;
            console.log(userId);
            let newCatelog = new Catelog({
                userId : userId,
                productId : req.body.productId
            });
            newCatelog = await newCatelog.save();
            if (!newCatelog) return res.status(500).send('The product cannot be created');
            res.send(newCatelog);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        }else{
            console.log('user not found')
        }

})
router.get('/orders')

module.exports = router;