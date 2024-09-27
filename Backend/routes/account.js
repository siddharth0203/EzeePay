// backend/routes/account.js
const express = require('express');
const {middleware} = require('../middleware');
const {Account} = require('../db');
const {default : mongoose} = require('mongoose');
const router = express.Router();

router.get('/balance', middleware, async(req, res)=>{
    const account = await Account.findOne({
        //Here the userId is the inbuild comes with the mongoose database only(Just like as you have defined the username : req.body.username thing like that only)
        userId : req.userId
    });
    res.json({
        balance : account.balance
    });
})

router.post('/transfer', middleware, async(req, res)=>{
    const {amount, to}= req.body;
    const account = await Account.findOne({
        userId : req.userId
    })
    if(account.balance < amount){
        return res.status(400).json({
            msg : "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId : to
    })
    if(!toAccount){
        return res.status(400).json({
            msg : "Account Not Found"
        })
    }
    await Account.updateOne({
        userId : req.userId
    }, {
        $inc: {balance : -amount}
    })
    await Account.updateOne({
        userId : to
    }, {
        $inc : {
            balance : amount
        }
    })
    res.json({
        msg : "Transfer successful"
    })
})
module.exports = router;