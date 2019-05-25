const {exec} =require('../db/mysql');

const loginCheck = (username, password) => {
  const sql=`select username,realname from users where username='${username}' and password='${password}'`

  return exec(sal).then(Rows=>{
    return Rows[0] || {}
  })
};

module.exports = {
  loginCheck
};