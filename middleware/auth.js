const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const query = require('../config/db query');
 
module.exports.signup = (req,res) => {
  const {name,email,password} = req.body;

  bcrypt.hash(password,10)
  .then (hashpassword => {
    return query.signupUser(name, email, hashpassword);
  })
  .then (() => {
    return res.status(201).json({
      status: true,  
      message: 'user signup successfully',
    }) 
  })
  .catch (err => {
    console.error('signup error',err.message) 
    return res.status(500).json ({
      status:false,
      message: 'server error',
    })
  })
} 

module.exports.loginUser = (req,res) => {
  const { email,password } = req.body;
    
  query.loginUser(email)

  .then (([user]) => {
    if(user.length===0) {
      return Promise.reject({ 
        status: false,
        msg:'wrong email and password',
      });
    }
    return bcrypt.compare(password, user[0].password)
    .then (match => {
      if(!match) {
        return Promise.reject({
          status:400, 
          msg:'wrong password',
        })
      }
      const token = jwt.sign(
        {id: user[0].id, name: user[0].name,email: user[0].email},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRATION}
      ) 
        res.json({ token });
    })
  })
   
  .catch(err => {
    if(err.status){
      return res.status(err.status).json({msg: err.msg})
    }
    console.error(err);
    res.status(500).json({ msg: 'server error'})
  })
}

exports.getDashboard = (req, res) => {
   const { id,name, email } = req.user; 
  res.json({
    user: {id,name,email }
   
  });
};
