const {User} = require('../models/user');
const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

router.get(`/`, async (req, res) =>{
    const userList = await User.find().select('-passwordHash');

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})
router.post('/register',async (req,res)=>{
    let newUser = new User({

        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,10),
        isSeller : req.body.isSeller
    })
    newUser = await newUser.save()
    if(!newUser)
    return res.status(400).send('The user cannot be created')
    res.send(newUser);
})

router.post('/login',async (req,res)=>{
    const user = await User.findOne({email:req.body.email})
    
    const secret = process.env.SECRET;
    if(user){
        if(user && bcrypt.compareSync(req.body.password,user.password)){
            
            const token = jwt.sign(
                {
                    userId : user._id
                },
                secret,
                {expiresIn:'1d'}
            )
            res.status(200).send({user: user.email,token:token});
        }
        else{
            res.status(400).send('Password is wrong!');
        }
    }
    else{
        res.status(400).send('The user not found!');
    }
})

module.exports =router;