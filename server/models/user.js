const con = require('./db_connect');

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(25) NOT NULL UNIQUE,
    user_questions NUMERIC,
    user_answers NUMERIC,
    user_ratings NUMERIC,
    user_password VARCHAR(25),
    CONSTRAINT user_pk PRIMARY KEY(user_id)
  )`;
  await con.query(sql);
}
createTable();

let getUsers = async () => {
  const sql = `SELECT * FROM users`;
  return await con.query(sql);
};

async function getUser(user) {
  let sql;
  if(user.userId) {
    sql = `SELECT * FROM users
    WHERE user_id = ${user.userId}
    `;
  } else {
    sql = `SELECT * FROM users
    WHERE username = "${user.username}"
    `;
  }
  return await con.query(sql)
}

async function login(username, password) {
  const user = await userExists(username);
  if(!user[0]) throw Error('User not found')
  if(user[0].user_password !== password) throw Error("Password is incorrect");

  return user[0];
}

async function register(user) {
  const u = userExists(user.username);
  if(u.length>0) throw Error("Username already exists...");

  const sql = `INSERT INTO users (username, user_password)
    VALUES ("${user.username}", "${user.password}")
  `;

  const insert = await con.query(sql);
  const newUser = await getUser(user);
  return newUser[0];
}

async function deleteUser(userId) {
  const sql = `DELETE FROM users
    WHERE user_id = ${userId}
  `;
  await con.query(sql);
}

async function userExists(username) {
  const sql = `SELECT * FROM users
    WHERE username = "${username}"
  `;
  return await con.query(sql);
}

async function editUser(user) {
  const sql = `UPDATE users SET
    username = "${user.userName}"
    WHERE user_id = ${user.userId}
  `;
  const update = await con.query(sql);
  const newUser = await getUser(user);
  return newUser[0];
}
module.exports = { getUsers, login, register, deleteUser, editUser, getUsers, createTable };


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




/*
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
*/