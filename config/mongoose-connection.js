const mongoose=require('mongoose');
const config = require('config');
const dbgr=require('debug')("development:mongoose");

mongoose
.connect(`${config.get("MONGODB_URI")}/bagapp`)
.then(()=>{
   dbgr('mongodb connected') ;
})
.catch((err) => {
    dbgr('error in connecting to mongodb:', err);
  });

module.exports=mongoose.connection;