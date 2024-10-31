const express = require('express');
const path = require('path');
const dbgr=require('debug')("development:app");
const usersRoute = require('./routes/usersRoute');
const productsRoute = require('./routes/productsRoute');
const ownersRoute = require('./routes/ownersRoute');
const session = require('express-session');
const config = require('config');
const isLoggedIn=require('./middlewares/isLoggedIn')
const mongooseconnection=require('./config/mongoose-connection');
const flash = require('connect-flash');
const cookieparser=require('cookie-parser');
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

app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/owners', ownersRoute);

app.get('/', (req, res) => {
let error=req.flash('error');
 res.render('index',{error});
});

app.get('/shop',isLoggedIn,(req,res)=>{
    res.send('welcome to the shop');
})

app.listen(3000, () => {
    dbgr('App is listening on port 3000');
});
