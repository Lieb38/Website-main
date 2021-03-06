import 
{ fetchData, getCurrentUser, setUserQuestion, getCurrentQuestion, getCurrentAnswer, removeQuestion, removeAnswer, setUserAnswer } 
from './main.js'


var user = getCurrentUser();
//var question = getCurrentQuestion();
//var answer = getCurrentAnswer()


window.onload = function setTemplate() {
    document.getElementById('allQuestions').innerHTML = localStorage.getItem('template');
};

// quesiton container // all `comment`s
var questionContainer = document.getElementById('allQuestions');


await fetch('http://localhost:3000/question/getAllQuestions').then(function (response){
    return response.json();
}).then (function(q)  {
    console.log(q)

    q.reverse();

    var ques = JSON.stringify(q.q_content), ul = document.createElement('ul');
    document.getElementById('allQs').appendChild(ul);
    
    q.forEach(element => {

        // if
        //if(element.user_id === user.user_id){ 

        // let li = document.createElement('li');
        // li.value = element.q_content;
        // ul.appendChild(li);
        // li.id = element.question_id
        // li.innerHTML+= element.q_content;

       // const deleteButton = document.createElement('button');
        //deleteButton.innerHTML = 'Delete';
        //deleteButton.className = 'btn deleteQuestion';
        //let btn = document.createElement('button');
        //li.appendChild(btn);
        
        //btn.id = "erase" + element.question_id;
        

        
   }// for each user

    //////////////////////////////////////////
    function addQuestion(ev) {
        if(user)
        {
            let questionText, wrapDiv;

            // quesiton " text"
            let textBox = document.createElement('h3');
            //textBox.className = "Q";

            //submit reply button
            const replyButton = document.createElement('button');
            replyButton.className = 'btn reply';
            replyButton.innerHTML = 'Reply';

            // delete quesiton buttion
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'Delete';
            deleteButton.className = 'btn deleteQuestion';
            deleteButton.id = "erase" + element.question_id;

            // delete answer buttion
            const deleteButton2 = document.createElement('button');
            deleteButton2.innerHTML = 'Delete';
            deleteButton2.className = 'btn deleteAnswer';

            // edit question button
            const editButton = document.createElement('button');
            editButton.innerHTML = 'Edit';
            editButton.className = 'btn editQuestion';
            editButton.id = "editQ" + element.question_id;
            
            if(hasClass(ev.target.parentElement, 'container')) {

                // wrapper for Quesitons
                const wrapDiv = document.createElement('div');
                wrapDiv.className = 'question wrapper';
                //textBox.className = "q";

                // grab text for question
                questionText = document.getElementById('comment').value;
                document.getElementById('comment').value = '';


                //label on question
                textBox.innerHTML = `${user.username} askes: "${questionText}"`;////

                wrapDiv.append(textBox, replyButton, editButton, deleteButton);

                questionContainer.appendChild(wrapDiv);

                //add fetch for question:
                fetchData("/question/addQuestion", {q_content: questionText, user_id: user.user_id }, "POST")
                .then((data) => {
                    setUserQuestion(data);
                    console.log(data);
                    window.href = "questions.html"
                })

        } else {
            document.querySelector(".container h1.error").innerHTML = "Must log in first";
        }
    }


    document.getElementById("editQ" + element.question_id).addEventListener('click', editQuestion);

   function editQuestion(ev) {
    if(user = element.user_id)
    {
        var wrapDiv = ev.target.parentElement;
        var parentDiv = wrapDiv.parentElement;
        var questionText = ev.target.parentElement.firstElementChild.value; // from new textarea
            
        // label on answer:
        parentDiv.firstElementChild.innerHTML = `${user.username} edited to: "${questionText}"`;
        
        
        fetchData("/question/editQuestion", {q_content: element.q_content, question_id: element.question_id }, "PUT")
        .then((data) => {
        //setUserQuestion(data);
        console.log(data);
        });
        wrapDiv.remove();
    } else {
        document.querySelector(".container h1.error").innerHTML = "must be same person as poster";
    }
   }
    
    document.getElementById("erase" + element.question_id).addEventListener('click', deleteQ);

    function DeleteQ(ev) {
        fetchData("/question/deleteQuestion", {question_id: element.question_id}, "DELETE")
        .then((data) => {
            window.location.href = "questions.html"
            console.log(data);
        });
        ev.target.parentElement.remove();
    }
    });// for each

}); //fetch

///////////////// answer time

await fetch('http://localhost:3000/answer/getAllAnswers').then(function (response){
    return response.json();
}).then (function(a)  {
    console.log(a)

    a.reverse();

    var ques = JSON.stringify(a.a_content), ul = document.createElement('ul');
    document.getElementById('allAs').appendChild(ul);
    
    a.forEach(element => {

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
                    fetchData("/question/deleteQuestion", {question_id: q.question_id}, "DELETE")
                    .then((data) => {
                        removeQuestion();
                        console.log(data);
                    })
                    e.target.parentElement.remove();
        
                } else if(hasClass(e.target, 'addEdit')) {
                    editQuestion(e);
                    setOnLocalStorage();
        
                } else if(hasClass(e.target, 'deleteAnswer')) {
                    //let answerText = e.target.parentElement.firstElementChild.innerHTML.value;
                    //console.log(answerText);
                    fetchData("/answer/deleteAnswer", {answer_id: answer.answer_id}, "DELETE")
                    .then((data) => {
                        removeAnswer();
                        console.log(data);
                    })
                    e.target.parentElement.remove();
                }
            } else {
                document.querySelector(".container h1.error").innerHTML = "Must log in first";
            }
        ///
        });



});// for each a

}); //fetch a


    if() // answer seciton
    {
        wrapDiv = ev.target.parentElement;
        answerText = ev.target.parentElement.firstElementChild.value; // from new textarea
        
        // label on answer:
        textBox.innerHTML = `${user.username} answers: "${answerText}"`;
        textBox.className = "A";
        wrapDiv.innerHTML = '';
        let a = document.getElementsByClassName('A').innerHTML;
        wrapDiv.append(textBox, replyButton, deleteButton2, editButton);

        //
        fetchData("/answer/addAnswer", {a_content: answerText, user_id: user.user_id }, "POST")
        .then((data) => {
            setUserAnswer(data);
            console.log(data);
        })
    }
    setOnLocalStorage();
} 

    function editAnswer(ev) {
        if(user)
        {
            var wrapDiv = ev.target.parentElement;
            var parentDiv = wrapDiv.parentElement;
            var questionText = ev.target.parentElement.firstElementChild.value; // from new textarea
                
            // label on answer:
            parentDiv.firstElementChild.innerHTML = `${user.username} edited to: "${questionText}"`;
    
            wrapDiv.remove();


            
            fetchData("/answer/editAnswer", {a_content: questionText, answer_id: answer.answer_id }, "PUT")
            .then((data) => {
            setUserAnswer(data);
            
            console.log(data);
            }) 
        
        }
    }




//on click for question section
document.getElementById('addQuestions').addEventListener('click', function (ev) {
    addQuestion(ev);
});


function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}








function setOnLocalStorage () {
    localStorage.setItem('template', document.getElementById('allQuestions').innerHTML);
}