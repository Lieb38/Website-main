
import 
{ fetchData, getCurrentUser, setCurrentUser, removeCurrentUser } 
from './main.js'

let user = getCurrentUser();

window.onload = function setTemplate() {
    document.getElementById('allComments').innerHTML = localStorage.getItem('template');
};

const commentContainer = document.getElementById('allComments');
document.getElementById('addComments').addEventListener('click', function (ev) {
   addComment(ev);
});

function addComment(ev) {
    if(user)
    {
        let commentText, wrapDiv;
        const textBox = document.createElement('h3');
        const replyButton = document.createElement('button');
        replyButton.className = 'btn reply';
        replyButton.innerHTML = 'Reply';
        const likeButton = document.createElement('button');
        likeButton.innerHTML = 'Like';
        likeButton.className = 'btn likeComment';
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.className = 'btn deleteComment';
        if(hasClass(ev.target.parentElement, 'container')) {
            const wrapDiv = document.createElement('div');
            wrapDiv.className = 'question wrapper';
            //wrapDiv.style.marginLeft = 0;
            commentText = document.getElementById('comment').value;
            //add fetch for question:
            

            document.getElementById('comment').value = '';
            textBox.innerHTML = `${user.username} askes: "${commentText}"`;////
            wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
            commentContainer.appendChild(wrapDiv);
        } else {
            wrapDiv = ev.target.parentElement;
            commentText = ev.target.parentElement.firstElementChild.value;
            textBox.innerHTML = `${user.username} answers: "${commentText}"`;
            //textBox.style.backgroundColor = "paleturquoise";
            wrapDiv.innerHTML = '';
            wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
        }
        setOnLocalStorage();
        // set userdata question
    } else {
        document.querySelector(".container h1.error").innerHTML = "Must log in first";
    }
}

function setOnLocalStorage () {
    localStorage.setItem('template', document.getElementById('allComments').innerHTML);
}
function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}
document.getElementById('allComments').addEventListener('click', function (e) {
    if(user) {
        if (hasClass(e.target, 'reply')) {
            const parentDiv = e.target.parentElement;
            const wrapDiv = document.createElement('div');
            wrapDiv.style.marginTop = (Number.parseInt(parentDiv.style.marginTop) + 5).toString() + 'px';
            wrapDiv.className = 'answer wrapper';
            const textArea = document.createElement('textarea');
            textArea.style.marginTop = '5px';
            const addButton = document.createElement('button');
            addButton.className = 'btn addReply';
            addButton.innerHTML = 'Add';
            const cancelButton = document.createElement('button');
            cancelButton.innerHTML = 'Cancel';
            cancelButton.className='btn cancelReply';
            wrapDiv.append(textArea, addButton, cancelButton);
            parentDiv.appendChild(wrapDiv);

        } else if(hasClass(e.target, 'addReply')) {
            addComment(e);
        } else if(hasClass(e.target, 'likeComment')) {
            const likeBtnValue = e.target.innerHTML;
            e.target.innerHTML = likeBtnValue !== 'Like' ? Number.parseInt(likeBtnValue) + 1 : 1;

            setOnLocalStorage();
        } else if(hasClass(e.target, 'cancelReply')) {
            e.target.parentElement.innerHTML = '';
            setOnLocalStorage();
        } else if(hasClass(e.target, 'deleteComment')) {
            if(user === user.username)
            {

            }
            e.target.parentElement.remove();
            //
            //fetchData("/questions/delete", {questionId: question.question_id}, "DELETE")
            //.then((data) => {
            //    if(!data.message) {
            //        console.log(data.success);
            //    }
            
        }
    } else {
        document.querySelector(".container h1.error").innerHTML = "Must log in first";
    }
});



//const questionBox = document.getElementsByClassName("container");
//if(questionBox) questionBox.addEventListener('addComments', saveComment);

document.getElementById('addComments').addEventListener('click', saveComment);

function saveComment(e) {
  e.preventDefault();

  const comment = document.getElementById("comment").value;
  //const pswd = document.getElementById("pswd").value;

  fetchData('/questions/q_content', {q_content: comment}, "POST")
  .then((data) => {
    if(!data.message) {
      console.log("success")
    }
  })
  .catch((error) => {
    const errText = error.message;
    //document.querySelector(".container h1.error").innerHTML = errText;
    //document.getElementById("pswd").value = "";
    //console.log(`Error! ${errText}`)
  });
}