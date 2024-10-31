const usermodel=require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports=async (req,res,next)=>{
  if(!req.cookies.token){
    req.flash("error","you need to login first");
    return res.redirect('/');
  }

  try{
    let {email,userid}=jwt.verify(req.cookies.token,Process.env.JWT_TOKEN);
    let user=await usermodel.findOne({email}).select("-password");
    req.user=user;
    next();
  }
  catch(err){
    req.flash("error","something went wrong");
    res.redirect('/')
  }
}