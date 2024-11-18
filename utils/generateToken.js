const jwt = require('jsonwebtoken');
module.exports.generateToken= (user)=>{
   return jwt.sign({ email:user.email, userid:user._id }, process.env.JWT_TOKEN);
}