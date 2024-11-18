const usermodel = require('../models/usermodel');
const encPassword=require('../utils/encPassword');
const bcrypt=require('bcrypt');
const {generateToken}=require('../utils/generateToken')
const dbgr = require('debug')("development:userRoute");

 module.exports.registerUser= async (req, res) => {
    let { email, fullname, password } = req.body;
    let user = await usermodel.findOne({ email });
    if (!user) {
        try {
        const hash=encPassword(password);
        let createduser = await usermodel.create({
            email,
            fullname,
            password: hash
        })
        const token = generateToken(createduser);
        res.cookie("token", token);
        res.redirect('/shop');                
        }
        catch (err) {
          dbgr(err.message);
          res.send('error in creating user');
        }
    } 
    else {
    req.flash("error", "user already exists");
    res.redirect('/');
    }
}

module.exports.loginUser=async(req,res)=>{
    let {email,password}=req.body;
    let loggeduser=await usermodel.findOne({email});
    if(!loggeduser){
        req.flash("error","email or password is wrong");
        return res.redirect('/');
    }

    try{
     bcrypt.compare(password,loggeduser.password,(err,result)=>{
        if(!result){
            req.flash("error","email or password is  wrong");
            res.redirect('/');    
        }else{
            const token = generateToken(loggeduser);
            res.cookie("token", token);
            dbgr('redirecting to shop ');
            res.redirect('/shop');
        }
     })
    }catch(err){
        res.status(401).send('something went wrong');
    }
}

module.exports.logoutUser=(req,res)=>{
    res.clearCookie("token");
    res.redirect('/');
}