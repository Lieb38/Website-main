import
{getCurrentUser, setCurrentUser, removeCurrentUser, logout, fetchData}
from './main.js'

let user = getCurrentUser();
// if user doesn't exist take to login page
if(!user) window.location.href = "login.html";

let profile = document.getElementById("profile"); // add styles for error class, btn class, edit id, delete id
profile.innerHTML = `
    <h1>You again? Hi ${user.username}!</h1>
    <div>
        <p class="error"></p>
        <button class="btn" id="edit">Edit Info</button>
        <button class="btn" id="delete">Delete Account</button>
    </div>
`;

document.getElementById("edit").addEventListener('click', editProfile);
document.getElementById("delete").addEventListener('click', deleteAccount);

function editProfile() {
    profile.classList.toggle("hide");
    let editForm = document.getElementById("editForm"); // change this: class="basic-form"
    editForm.innerHTML = `
    <form>
        <p class="error></p>
        <h2>Edit Profile</h2>
        <label for ="username">Change Username</label>
        <input type="text" name="username" id="username" placeholder="${user.username}">
        <br>
        <label for ="password">Change Password</label>
        <input type="password" name="pswd" id="pswd" placeholder="password">
        <br>
        <input type="submit" value="Submit">
    </form>
    `
}

function editAccount(e) {
    e.preventDefault();

    let userName = document.getElementById("username").value;
    //let passWord = document.getElementById("pswd").value;
    if(userName === user.userName) {
        let err = "No changes made";
        document.querySelector("#editForm p.error").innterHTML = err;
    } else {
        fetchData('/users/edit', {userId: user.user_id, userName: userName}, "PUT")
        .then((data) => {
            if(!data.message) {
                removeCurrentUser();
                setCurrentUser(data);
                window.location.href = "profile.html";
            }
        })
        .catch((error) => {
            const errText = error.message;
            document.querySelector("#editForm p.error").innerHTML = errText;
            console.log(`Error! ${errText}`)
        });
    }
}

function deleteAccount() {
    if(confirm("Are you ABOSULTELY certain you want to delete your account??")) {
        fetchData("/users/delete", {userId: user.user_id}, "DELETE")
        .then((data) => {
            if(!data.message) {
                console.log(data.success);
                logout();
                window.location.href = "register.html"
            }
        })
        .catch((error) => {
            const errText = error.message;
            document.querySelector("#profile div p.error").innerHTML = errText;
            console.log(`Error! ${errText}`)
        })
    }
}