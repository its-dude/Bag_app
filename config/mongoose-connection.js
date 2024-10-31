const mongoose=require('mongoose');
const dbgr=require('debug')("development:mongoose");

mongoose
.connect(`process.env.MONGODB_URI/bagapp`)
.then(()=>{
   dbgr('mongodb connected') ;
})
.catch((err) => {
    dbgr('error in connecting to mongodb:', err);
  });