
import 
{ fetchData, getCurrentUser, setUserQuestion, getCurrentQuestion, removeQuestion, setUserAnswer } 
from './main.js'

let user = getCurrentUser();
let question = getCurrentQuestion();

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
        var questionText, answerText, wrapDiv;

        var textBox = document.createElement('h3'); // changed from const// change back if broken
        // reply button
        const replyButton = document.createElement('button');
        replyButton.className = 'btn reply';
        replyButton.innerHTML = 'Reply';

        // like button // change to edit button
        const likeButton = document.createElement('button');
        likeButton.innerHTML = 'Like';
        likeButton.className = 'btn likeComment';

        // delete comment button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.className = 'btn deleteComment';

        if(hasClass(ev.target.parentElement, 'container')) {

            // wrapper for Quesitons
            const wrapDiv = document.createElement('div');
            wrapDiv.className = 'question wrapper';
            // grab text for question
            questionText = document.getElementById('comment').value;

            //add fetch for question:
            fetchData("/question/addQuestion", {q_content: questionText, user_id: user.user_id }, "POST")
            .then((data) => {
                setUserQuestion(data);
                console.log(data);
            })

            document.getElementById('comment').value = '';

            textBox.innerHTML = `${user.username} askes: "${questionText}"`;////

            // set quesiton on local storage
            //localStorage.setItem('question', questionText);

            wrapDiv.append(textBox, replyButton, likeButton, deleteButton);

            commentContainer.appendChild(wrapDiv);

        } else { // if answer section
            wrapDiv = ev.target.parentElement;
            answerText = ev.target.parentElement.firstElementChild.value; // comes from textArea
            // fetch
            //console.log(answerText);
            fetchData("/answer/addAnswer", {a_content: answerText, user_id: user.user_id }, "POST")
            .then((data) => {
                setUserAnswer(data);
                console.log(data);
            })
            textBox.innerHTML = `${user.username} answers: "${answerText}"`;
            // set answer on local storage
            //localStorage.setItem('answer', answerText);

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

/// set on local storage function
function setOnLocalStorage () {
    localStorage.setItem('template', document.getElementById('allComments').innerHTML);
}

// function setOnLocalStorage () { // og
//     localStorage.setItem('template', document.getElementById('allComments').innerHTML);
// }


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
            
            // new text area
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
        }

        else if(hasClass(e.target, 'likeComment')) {

            const parentDiv = e.target.parentElement;

            const wrapDiv = document.createElement('div');
            wrapDiv.style.marginTop = (Number.parseInt(parentDiv.style.marginTop) + 5).toString() + 'px';
            wrapDiv.className = 'answer wrapper';
            
            // new text area
            const textArea = document.createElement('textarea');

            textArea.style.marginTop = '5px';
            const addButton = document.createElement('button');
            addButton.className = 'btn addEdit';
            addButton.innerHTML = 'AddE';

            const cancelButton = document.createElement('button');
            cancelButton.innerHTML = 'Cancel';
            cancelButton.className='btn cancelReply';

            wrapDiv.append(textArea, addButton, cancelButton);
            parentDiv.appendChild(wrapDiv);
            
        //     //const likeBtnValue = e.target.innerHTML;
        //     //e.target.innerHTML = likeBtnValue !== 'Like' ? Number.parseInt(likeBtnValue) + 1 : 1;
        //     const parentDiv = e.target.parentElement;

        //     const wrapDiv = document.createElement('div')
        //     wrapDiv.className = "newtext"
        //     const newText = document.createElement('textarea');
            
        //     const addButton = document.createElement('button');
        //     addButton.className = 'btn add';
        //     addButton.setAttribute('id','add');
        //     addButton.innerHTML = 'Add';
        //     const cancelButton = document.createElement('button');
        //     cancelButton.innerHTML = 'Cancel';
        //     cancelButton.className='btn cancelReply';
        //     wrapDiv.append(newText, addButton, cancelButton);
        //     parentDiv.appendChild(wrapDiv);
        //     //reText = document.getElementById('comment').value;
            
        // // if(hasClass(e.target, 'add'))
        // // {
        // //     console.log('ada')
        // //     e.target.parentElement.firstElementChild.innerHTML = document.getElementById('comment').value;

        // // }
        // document.getElementById('add').addEventListener('click', go(e));

        // function go(e) {
        //     console.log('ada')
        //     e.target.parentElement.firstElementChild.innerHTML = document.getElementById('comment').value;
        // } 
        //     //e.target.parentElement.firstElementChild.innerHTML = newText.value;

        //     //document.getElementById('addReply').addEventListener('click'); 
        //     //    parentDiv.parentElement.remove();
        //    // }

        //     //let newText = 'haha';
        //    // e.target.parentElement.firstElementChild.innerHTML = textArea.innerHTML;
            

            setOnLocalStorage();
        
        } else if(hasClass(e.target, 'cancelReply')) {
            //e.target.parentElement.innerHTML = '';
            e.target.parentElement.remove();
            setOnLocalStorage();
        } else if(hasClass(e.target, 'deleteComment')) {
  
            //answerText = e.target.parentElement.innerHTML;
            //console.log(answerText);
            fetchData("/question/deleteQuestion", {question: user.user_id}, "DELETE")
            .then((data) => {
                //removeQuestion();
                console.log(data);
            })
            e.target.parentElement.remove();
           // question = questionText;
            
           // q_content: questionText, user_id: user.user_id
        //     fetchData("/questions/delete", {questionId: quesiton}, "DELETE")
        //     .then((data) => {
        //        if(!data.message) {
        //            console.log(data.success);
        //        }
            
         } else if (hasClass(e.target, 'addEdit')) {

            e.target.parentElement.firstElementChild.innerHTML = `${user.username} askes: "${questionText}"`;
         }
    } else {
        document.querySelector(".container h1.error").innerHTML = "Must log in first";
    }
});



//const questionBox = document.getElementsByClassName("container");
//if(questionBox) questionBox.addEventListener('addComments', saveComment);

//document.getElementById('addComments').addEventListener('click', saveComment);

//function saveComment(e) {
  //e.preventDefault();

  //const comment = document.getElementById("comment").value;
  //const pswd = document.getElementById("pswd").value;

//   fetchData('/questions/q_content', {q_content: comment}, "POST")
//   .then((data) => {
//     if(!data.message) {
//       console.log("success")
//     }
//   })
//   .catch((error) => {
//     const errText = error.message;
    //document.querySelector(".container h1.error").innerHTML = errText;
    //document.getElementById("pswd").value = "";
    //console.log(`Error! ${errText}`)
  //});
//}