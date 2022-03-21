const {User} = require('../models/user');
const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const { Catelog } = require('../models/catelog');



router.get('/list-of-sellers', async (req,res)=>{
    const userList = await User.find();
    var len = userList.length;
    let sellerList = []
    for(let i=0; i<len ; i++){
        if(userList[i].isSeller === true){
            sellerList.push(userList[i]);
        }
    }
    res.send(sellerList);
})
router.get('/seller-catelog/:id',async(req,res)=>{
    const catelog = await Catelog.findById(req.params.id)
    if(!catelog){
        res.status(500).json({message: 'The category with the given ID was not found!'})
    }
    res.status(200).send(catelog);
})

module.exports = router;