const express = require('express');
const { JWT_SECRET } = require('./config');
const app = express();
const jwt = require('jsonwebtoken');
const middleware = (req, res, next)=>{
    const auth = req.headers.authorization;
    if(!auth){
        return res.status(403).json({
            msg : "Auth does'nt exist"
        })
    }
    const token = auth.split(' ')[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }catch(err){
        return res.status(403).json({});
    }
}

module.exports = {
    middleware
}