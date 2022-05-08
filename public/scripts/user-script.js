import 
{ fetchData, getCurrentUser, setCurrentUser, removeCurrentUser } 
from "./main.js"

const loginForm = document.getElementById("login-form");
if(loginForm) loginForm.addEventListener('submit', login);

function login(e) {
  e.preventDefault();

  const name = document.getElementById("username").value;
  const pswd = document.getElementById("pswd").value;
  fetchData('/users/login', {username: name, password: pswd}, "POST")
  .then((data) => {
    if(!data.message) {
      setCurrentUser(data);
      window.location.href = "home.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    document.querySelector("#login-form p.error").innerHTML = errText;
    document.getElementById("pswd").value = "";
    console.log(`Error! ${errText}`)
  });
}

const regForm = document.getElementById("reg-form");
if(regForm) regForm.addEventListener('submit', register);

function register(e) {
  e.preventDefault();

  const name = document.getElementById("username").value;
  const pswd = document.getElementById("pswd").value;
  
  fetchData('/users/register', {username: name, password: pswd}, "POST") // or '/users/register'
  .then((data) => {
    if(!data.message) {
      setCurrentUser(data) // new
      window.location.href = "home.html";
    }
  })
  .catch((error) => {
    const errText = error.message
    document.querySelector("#reg-form p.error").innerHTML = errText;
    document.getElementById("pswd").value = "";
    console.log(`Error! ${errText}`)
  });
}

// function setCurrentUser(user) { /// new!!
//   localStorage.setItem('user', JSON.stringify(user));
// }

// function getCurrentUser() {
//   return JSON.parse(localStorage.getItem('user'));
// }

// function removeCurrentUser() {
//   localStorage.removeItem('user');
// }

// document.getElementById("logout").addEventListener('click', logout);

// function logout() {
//   removeCurrentUser();
//   window.location.href = "home.html"
// }

//const user = getCurrentUser();
//console.log(use.userName);
