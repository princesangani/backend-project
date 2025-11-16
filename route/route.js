const express = require('express');
const router = express.Router();
const users = require('../users/users')
const auth = require('../middleware/auth')
const jwtmiddleware = require('../middleware/jwtmiddleware');
const { signupvalidate, loginvalidate, updatevalidate } = require('../validation/validate');
     
router.post('/users/signup',signupvalidate,auth.signup);
router.post('/users/login' ,loginvalidate,auth.loginUser)
router.get('/users/getdata',jwtmiddleware,auth.getDashboard)
router.put('/users/update',updatevalidate,jwtmiddleware,users.updateUsers);
router.delete('/users/delete',jwtmiddleware,users.deleteUsers)
 
module.exports=router; 