const con = require('./db_connect');

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS users (
    userId INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    CONSTRAINT user_pk PRIMARY KEY(userId)
  )`;
  await con.query(sql);
}
createTable();

let getUsers = async () => {
  const sql = `SELECT * FROM users`;
  return await con.query(sql);
};

// con.connect( async function(err) {
//   if (err) throw err;
//   let sql = `CREATE TABLE IF NOT EXISTS users (
//     userId INT AUTO_INCREMENT PRIMARY KEY,
//     userName VARCHAR(15),
//     password VARCHAR(25),
//     CONSSTRAINT user_pk PRIMARY KEY(userId)
//     )`

//   await con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("User table created");
//   });
// });





const users = [
    {
      userId: 66666,
      userName: "lieb_lieb",
      password: "a"
    },
    {
      userId: 55555,
      userName: "tryingToBe",
      password: "a"
    }
  ]
  
//  let getUsers = () => users;
  
  function login(username, password) {
    const user = userExists(username);
    if(!user[0]) throw Error('User not found');
    if(user[0].password !== password) throw Error('Password is incorrect.');
  
    return user[0];
  }
  
  function register(user) {
    const u = userExists(user.username);
    if(u.length>0) throw Error('Username already exists')
  
    const newUser = {
      userId: users[users.length-1].userId + 1,
      userName: user.username,
      password: user.password
    }
    users.push(newUser);
    return newUser;
  }
  
  function deleteUser(userId) {
    let i = users.map((user) => user.userId).indexOf(userId);
    users.splice(i, 1);
    console.log(users)
  }
  
  function userExists(username) {
    return users.filter((u) => u.userName === username);
  }
  
async function editUser(user) {
  const sql = `UPDATE users SET
  username = "${user.userName}"
  WHERE userId = "${user.userId}"
  `;
  const update = await con.query(sql);
  const newUser = await getUsers(user);
  return newUser[0];
}

  module.exports = { getUsers, login, register, deleteUser };
  