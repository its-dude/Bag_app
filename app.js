const express = require('express');
const path = require('path');
const dbgr=require('debug')("development:app");
const mongooseconnection=require('./config/mongoose-connection');
const session = require('express-session');
const config = require('config');
const flash = require('connect-flash');
const cookieparser=require('cookie-parser');

const ussermodel=require('./models/usermodel');
const productmodel=require('./models/productmodel');
const ownermodel=require('./models/ownermodel');

const index=require('./routes/index')
const usersRoute = require('./routes/usersRoute');
const productsRoute = require('./routes/productsRoute');
const ownersRoute = require('./routes/ownersRoute');
const app = express();
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(cookieparser());
require('dotenv').config();  
app.use(session({
    secret:config.get("SESSION_SECRET"), // Get the session secret from config
    resave: false,
    saveUninitialized: true,
}));
app.use(flash()); 

dbgr(process.env.NODE_ENV);

app.use('/',index)
app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/owners', ownersRoute);



app.listen(3000, () => {
    dbgr('App is listening on port 3000'); 
});
