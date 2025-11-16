const bcrypt = require('bcryptjs');
const query = require('../config/db query');

  module.exports.updateUsers = (req, res) => {
  const userid = (req.user.id)
  const { name, email, password } = req.body;
                                                               
  if (password) {  
 
    bcrypt.hash(String(password), 10)
      .then((hashpassword) => {
        return query.updatepassword(userid,  hashpassword);
      })  
      .then(([result]) => {
        if (result.affectedRows === 0) {
          return res.status(404).send('user not found');
        }
        res.json({  userid , msg: 'changed password'  });
      })
      .catch((err) => {
        console.error('error updating userpassword', err);
        res.status(500).send('server error');
      });

  } else if (email) {
    
    return query.updateemail(userid, email)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          return res.status(404).send('user not found');
        }
        res.json({ userid, email });
      })
      .catch((err) => { 
        console.error('error updating useremail', err);
        res.status(500).send('server error');
      });

  } else if (name) {
                 
     return query.updatename(userid, name)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          return res.status(404).send('user not found');
        }
        res.json({ userid, name });
      }) 
      .catch((err) => {
        console.error('error updating username', err);
        res.status(500).send('server error');
      });
    } 
};

module.exports.deleteUsers = (req, res) => {
  const userid = req.user.id
  query.deleteuser(userid)
    .then(([result]) => {
      if (result.affectedRows === 0) { 
        return res.status(404).send('user not found');  
      }
      res.json({ message: 'delete user successful' });
    })
    .catch((err) => {
      console.error('error deleting user', err);
      res.status(500).send('server error');
    });
}; 
      