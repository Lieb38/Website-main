//import { addQuestion } from '../../server/models/question.js';

// look for edits

// editQuesiton: add aditional if statement for if parent class is container for question, 
// else for answer // 

// create edit paths for answers/ questions/. 

// get front end to work then ask kaitlin for help on backend=

import 
{ fetchData, getCurrentUser, setUserQuestion, getCurrentQuestion, removeQuestion, setUserAnswer } 
from './main.js'

let user = getCurrentUser();
let question = getCurrentQuestion();


window.onload = function setTemplate() {
    document.getElementById('allQuestions').innerHTML = localStorage.getItem('template');
};

// quesiton container // all `comment`s
const questionContainer = document.getElementById('allQuestions');

//on click for question section
document.getElementById('addQuestions').addEventListener('click', function (ev) {
    addQuestion(ev);
});

function addQuestion(ev) {
    if(user)
    {
        let questionText, answerText, wrapDiv;

        // quesiton " text"
        let textBox = document.createElement('h3');
        textBox.className = "Q";

        //submit reply button
        const replyButton = document.createElement('button');
        replyButton.className = 'btn reply';
        replyButton.innerHTML = 'Reply';

        // delete quesiton buttion
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.className = 'btn deleteQuestion';

        // edit question button
        const editButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        editButton.className = 'btn editQuestion';
        
        if(hasClass(ev.target.parentElement, 'container')) {

            // wrapper for Quesitons
            const wrapDiv = document.createElement('div');
            wrapDiv.className = 'question wrapper';

            // grab text for question
            questionText = document.getElementById('comment').value;
            document.getElementById('comment').value = '';


            //label on question
            textBox.innerHTML = `${user.username} askes: "${questionText}"`;////

            wrapDiv.append(textBox, replyButton, editButton, deleteButton);

            questionContainer.appendChild(wrapDiv);

            //add fetch for question:
            fetchData("/question/addQuestion", {q_content: textBox, user_id: user.user_id }, "POST")
            .then((data) => {
                data = { }
                setUserQuestion(data);
                console.log(data);
            })
        } 
        else // answer seciton
        {
            wrapDiv = ev.target.parentElement;
            answerText = ev.target.parentElement.firstElementChild.value; // from new textarea
            
            // label on answer:
            textBox.innerHTML = `${user.username} answers: "${answerText}"`;

            wrapDiv.innerHTML = '';
            wrapDiv.append(textBox, replyButton, deleteButton, editButton);

            //
            fetchData("/answer/addAnswer", {a_content: textBox, user_id: user.user_id }, "POST")
            .then((data) => {
                setUserAnswer(data);
                console.log(data);
            })
        }
        setOnLocalStorage();
    } 
    else {
        document.querySelector(".container h1.error").innerHTML = "Must log in first";
    }
}

function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}

//function setOnLocalStorage () {
//    localStorage.setItem('template', document.getElementById('allComments').innerHTML);




document.getElementById('allQuestions').addEventListener('click', function (e) {
    if(user) {
        if (hasClass(e.target, 'reply')) {

            //creates form to append answer
            const parentDiv = e.target.parentElement;

            const wrapDiv = document.createElement('div');
            wrapDiv.style.marginTop = (Number.parseInt(parentDiv.style.marginTop) + 5).toString() + 'px';
            wrapDiv.className = 'answer wrapper';
            
            // new text area
            const textArea = document.createElement('textarea');
            textArea.className = 'answerr' // classname of new text area

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
            addQuestion(e);
        } else if(hasClass(e.target, 'editQuestion')) {
            
            //creates form to append answer
            const parentDiv = e.target.parentElement;
            const wrapDiv = document.createElement('div');
            wrapDiv.style.marginTop = (Number.parseInt(parentDiv.style.marginTop) + 5).toString() + 'px';
            wrapDiv.className = 'edit wrapper';
            
            // new text area
            const textArea = document.createElement('textarea');

            textArea.style.marginTop = '5px';
            const addButton = document.createElement('button');
            addButton.className = 'btn addEdit';
            addButton.innerHTML = 'Add';
            const cancelButton = document.createElement('button');
            cancelButton.innerHTML = 'Cancel';
            cancelButton.className='btn cancelReply';
            wrapDiv.append(textArea, addButton, cancelButton);
            parentDiv.appendChild(wrapDiv);

            
        } else if(hasClass(e.target, 'cancelReply')) {

            e.target.parentElement.remove();
            
            setOnLocalStorage();

        } else if(hasClass(e.target, 'deleteQuestion')) {

            let questionText = e.target.parentElement.firstElementChild.innerHTML.value;
            console.log(questionText);
            fetchData("/question/deleteQuestion", {q_content: questionText}, "DELETE")
            .then((data) => {
                //removeQuestion();
                console.log(data);
            })
            e.target.parentElement.remove();

        } else if(hasClass(e.target, 'addEdit')) {
            editQuestion(e);
            setOnLocalStorage();
        } else {
            console.log('nothing');
        }
    } else {
        document.querySelector(".container h1.error").innerHTML = "Must log in first";
    }
///
});

function editQuestion(ev) {
    if(user)
    {
        var wrapDiv = ev.target.parentElement;
        var parentDiv = wrapDiv.parentElement;
        var questionText = ev.target.parentElement.firstElementChild.value; // from new textarea
            
        // label on answer:
        parentDiv.firstElementChild.innerHTML = `${user.username} edited to: "${questionText}"`;

        wrapDiv.remove()// = '';

        if(hasClass(parentDiv, 'question')) {
        
            fetchData("/question/editQuestion", {q_content: questionText, user_id: user.user_id }, "PUT")
            .then((data) => {
            setUserQuestion(data);
            
            console.log(data);
            }) 
        } else {
            fetchData("/question/editAnswer", {a_content: questionText, user_id: user.user_id }, "PUT")
            .then((data) => {
            setUserQuestion(data);
            
            console.log(data);
            }) 

        }
        //
         

    }
}



function editAnswer(e) {

}


function setOnLocalStorage () {
    localStorage.setItem('template', document.getElementById('allQuestions').innerHTML);
}