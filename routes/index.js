const express = require('express');
const isLoggedIn=require('../middlewares/isLoggedIn');
const productmodel=require('../models/productmodel');
const route = express.Router();

route.get('/', (req, res) => {
    let error = req.flash('error');
    res.render('index', { error });
});

route.get('/shop', isLoggedIn, async(req, res) => {
    let products=await productmodel.find();
    res.render('shop',{products});
   
})
 
 module.exports=route;