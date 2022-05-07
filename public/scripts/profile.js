import
{getCurrentUser, setCurrentUser, removeCurrentUser, logout, fetchData}
from './main.js'

let user = getCurrentUser();
// if user doesn't exist take to login page
if(!user) window.location.href = "login.html";

let profile = document.getElementById("profile"); // add styles for error class, btn class, edit id, delete id
profile.innerHTML = `
    <h2>You again? Hi ${user.username}!</h2>
    <div>
        <p class="error"></p>
        <button class="btn" id="edit">Edit Info</button>
        <button class="btn" id="delete">Delete Account</button>
    </div>
`;
