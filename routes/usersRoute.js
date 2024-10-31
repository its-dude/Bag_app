const express = require('express');
const route = express.Router();

const {registerUser,loginUser,logoutUser}=require('../controllers/authcontroller');

route.post('/register',registerUser)

route.post('/login',loginUser)

route.get('/logout',logoutUser)

module.exports = route; 