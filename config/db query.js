const db = require('../config/db config');

exports.signupUser = (name, email, hashpassword) => {
  return db.query( 
    'insert into users (name, email, password) values (?, ?, ?)',
    [name, email, hashpassword]
  ); 
};

exports.loginUser = (email) => {
  return db.query('select * from users where email = ?', [email]);
};

exports.updatepassword = (id,hashpassword) => { 
    return db.query(
        'update users set password = ? where id = ?',
        [hashpassword,id] 
    )
}
 
exports.updateemail = (id,email) => {
  return db.query('update users set email = ? where id = ?',[email,id])
}

exports.updatename = (id,name) => {
  return db.query('update users set name = ? where id = ?', [name,id])
}

exports.deleteuser = (id) => {
    return db.query('delete from users where id = ?', [id])
}