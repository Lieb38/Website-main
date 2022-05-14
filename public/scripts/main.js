const footer = document.querySelector('footer');
if(getCurrentUser()) {
  footer.innerHTML = `
  <ul>
   <h3>Lieb Mathieson &reg;</h3>
   <li><a href="profile.html">Profile</a></li>
   <li><a id="logout">Logout</a></li>
  </ul>
  `;
} else {
  footer.innerHTML = `
  <ul>
   <h3>Lieb Mathieson &reg;</h3>
   <li><a class="login" href="login.html">Login</a></li>
   <li><a href="register.html">Sign up</a></li>
  </ul>
  `;
}

export async function fetchData(url = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${url}`, { //http://localhost:3000
    method: methodType,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  if(response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
}

export function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function removeCurrentUser() {
  localStorage.removeItem('user')
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export const logoutBtn = document.getElementById("logout");
if(logoutBtn) logoutBtn.addEventListener('click', logout)

export function logout() {
  removeCurrentUser();
  window.location.href = "login.html";
}

// QUESTIONS JS SECTION //

export function setUserQuestion(question) {
  localStorage.setItem('question', JSON.stringify(question));
}

export function setUserAnswer(answer) {
  localStorage.setItem('answer', JSON.stringify(answer));
}
//export function setUserRating(user) {
//  localStorage.setItem('user', JSON.stringify(user));
//}//
export function getCurrentQuestion() {
  return JSON.parse(localStorage.getItem('question'));
}

export function getCurrentAnswer() {
  return JSON.parse(localStorage.getItem('answer'));
}

export function removeQuestion() {
  localStorage.removeItem('question');
}

export function removeAnswer() {
  localStorage.removeItem('answer');
}

// rating section