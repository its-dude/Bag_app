const express = require('express');
const path = require('path');
const usersRoute = require('./routes/usersRoute');
const productsRoute = require('./routes/productsRoute');
const ownersRoute = require('./routes/ownersRoute');
const session = require('express-session');
const config = require('config'); // Ensure this package is installed
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
require('dotenv').config();

app.use(session({
    secret:config.get("SESSION_SECRET"), // Get the session secret from config
    resave: false,
    saveUninitialized: true,
}));


app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/owners', ownersRoute);

app.get('/', (req, res) => {
    res.send('working');
});

app.listen(3000, () => {
    console.log('App is listening on port 3000');
});
