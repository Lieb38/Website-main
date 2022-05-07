
let form = document.getElementById("registerForm");
//let userId = document.getElementById("questions")

// 2
form.addEventListener('submit', addUser);

// 3
function addUser(e) {
  e.preventDefault();
// 4
  let Id = document.getElementById("Id").value;
  let userName = document.getElementById("username").value;
  let pswd = document.getElementById("pswd").value;

  const newUser = new User(Id, userName, pswd);
  console.log(newUser);
  }



class User {
    constructor(id, userName, pswd) {
      this.userId = id;
      //this.fName = fName
      this.userName = userName;
      this.setUserPassword(pswd);
    }
    //get methods
    getUserId() {
      return this.userId;
    }
    getUserName() {
      return this.userName;
    }
    getUserPassword() {
      return this.userPassword;
    }
    //set methods
    setUserId(id) {
      this.userId = id;
    }
    setUserName(userName) {
      this.userName = userName;
    }
    setUserPassword(pswd) {
      if(this.validPassword(pswd)) {
        this.userPassword = pswd;
      } else {
        console.log("Password must have at least 1 uppercase letter, 1 symbol, 2 numbers," 
          + "and have a length of at least 8 characters.");
      }
    }
    //valid password method
    validPassword(pswd) {
      if(pswd.length >= 8) {
        let upper = 0;
        let numbers = 0;
        let symbols = 0;
        
        for(let i = 0; i<pswd.length; i++) {
          if(this.isDigit(pswd[i])) {
            numbers++;
          } else if(!this.isLetterOrDigit(pswd[i])) {
            symbols++;
          } else if(this.isUpperCase(pswd[i])) {
            upper++;
          }
        }
  
        if(upper >= 1 && numbers >= 2 && symbols >= 1) {
          return true;
        }
      }
      return false;
    }
    //returns if character is a letter
    isUpperCase(char) {
      return (/[A-Z]/).test(char)
    }
    //returns if character is a digit
    isDigit(char) {
      return (/[1-9]/).test(char)
    }
    //returns if character is a letter or digit
    isLetterOrDigit(char) {
      return ((/[a-zA-Z]/).test(char) || (/[1-9]/).test(char))
    }
  }
  
  // const users = [
  //   {
  //     userName: "spat",
  //     firstName: "joe",
  //     lastName: "mamma",
  //     password: 0
  //   }
  // ]
  

  ////////////////////////////////////////////////////////////////////////////



    // login code
  // let getUsers = () => users;

  // function login(username, password) {
  //   const user = users.filter((u) => u.userName === username);
  //   if(!user[0]) throw Error('User not Found.');
  //   if(user[0].password !== password) throw Error ('Password is incorrect.')

  //   return user[0];
  // }
  // module.exports = {getUsers, login};



      // user button
// const usersBtn = document.getElementById("users-btn");
// usersBtn.addEventListener('click', getUsers);
    
// function getUsers() {
//   fetch("http://localhost:3000/users")
//   .then((res) => res.json())
//   .then((data) => {
//     let ul = document.getElementById("allUsers");
//     data.forEach((user) => {
//       let li = document.createElement('li');
//       let text = document.createTextNode(user.userName);
//       li.appendChild(text);
//       ul.appendChild(li);
//     })
//     console.log(data);
//   })
//   .catch((err) => console.log(`Error! ${err}`));
// }