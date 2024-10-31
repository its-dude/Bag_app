const usermodel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbgr = require('debug')("development:userRoute");

 module.exports.registerUser= async (req, res) => {
    let { email, fullname, password } = req.body;
    let user = await usermodel.findOne({ email });
    if (!user) {
        try {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    let createduser = await usermodel.create({
                        email,
                        fullname,
                        password: hash
                    })
                    const token = jwt.sign({ email, userid: createduser._id }, process.env.JWT_TOKEN);
                    res.cookie("token", token);
                    res.redirect('/shop');
                })
            })
        } catch (err) {
            dbgr(err.message);
            res.send('error in creating user');
        }


    } else {
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
            const token = jwt.sign({ email, userid: loggeduser._id }, process.env.JWT_TOKEN);
            res.cookie("token", token);
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