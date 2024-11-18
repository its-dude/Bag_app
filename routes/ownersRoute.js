const express=require('express');
const ownermodel=require('../models/ownermodel');
const dbgr=require('debug')("development:ownersRoute")
const isLoggedIn=require('../middlewares/isLoggedIn')
const productmodel=require('../models/productmodel')
const route=express.Router();

if(process.env.NODE_ENV==="development"){
    route.post('/create',async(req,res)=>{
    const owners=await ownermodel.find();
    if(owners.length>0){
        req.flash("error","owner exists");
        return res.redirect('/owners');
    }
    
    try{
        let {email,password,fullname}=req.body;
        let owner=await ownermodel.create({
            email,
            password,
            fullname
        })
        res.redirect('/owners/admin')
    }
    catch(err){
        dbgr(err.message);
        res.send('error in creating owner');
    }
    })
}

route.get('/',(req,res)=>{
    const error=req.flash('error');
    res.render('createOwner',{error});
})

route.get('/admin',async(req,res)=>{
    const success=req.flash("success");
    let products=await productmodel.find();
    res.render('admin',{success,products});
})

route.get('/product/create',(req,res)=>{
    const success=req.flash("success");
    res.render('createproducts',{success});
})


module.exports=route;