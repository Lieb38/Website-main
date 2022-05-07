/// look on bmi-app-main/ profile.js to see innerhtml injection w/ string literals

let qAmount = 0;
let aAmount = 0;

class Question {
    constructor(question) {
        this.questionId = qAmount;
        this.questionText = question;
        //this.questionRating = qRating;
        qAmount++
    }
}

// 1
let form = document.getElementById("questionForm");
let question = document.getElementById("question")




// 2
form.addEventListener('submit', addQuestion);


// 3
function addQuestion(e) {
    e.preventDefault();
    // 4
    let question = document.getElementById("question").value;

    const newQuestion = new Question(question);
    console.log(newQuestion);
    // 5
    let form = document.createElement('form');
    let h3 = document.createElement('h3');
    let label = document.createElement('label')
    let inputText = document.createElement('input');
    let inputSubmit = document.createElement('input');
    let li = document.createElement('li');
    // 6 style
    //li.className = 'question';
    //
    form.className = 'question';
    //
    inputText.setAttribute("id","answer")
    inputText.setAttribute("type","text")
    label.setAttribute("for", "answer")
   //
    inputSubmit.setAttribute("type","submit")
    inputSubmit.setAttribute("value","answer")

    // 7 add text
    //li.appendChild(document.createTextNode(question));
    form.appendChild(h3)
    h3.innerHTML = document.getElementById("question").value + "?";
    label.innerHTML = `type answer below...`
    form.appendChild(label)
    form.appendChild(inputText)
    form.appendChild(inputSubmit)
    //input2.appendChild(document.createElement())
    // 8 append li to questions list
    //questions.appendChild(li);
    questions.appendChild(form);
    //questions.appendChild(inputText);
    //questions.appendChild(inputSubmit);

    // 9
   // document.getElementById("question").value = "";
}
// space for additional function

class Answer {
    constructor(answer) {
        this.answerId = aId
        this.answerText = answer;
        this.answerRating = aRating;
        qAmount++;
    }
}
// 1
let form2 = document.getElementsByClassName("question")
let answer = document.getElementById("answer").value;

form2.addEventListener('submit', addAnswer);
 // 3
 function addAnswer(e) {
     e.preventDefault();
     // 4
     const newAnswer = new Answer(answer);
     console.log(newAnswer);
     // 5
     
    form2.innerHTML = `
    <form id="questionForm">
        <label for="question"><b>Question</b></label>
        <input type="text" id="question" required>
        <input type="submit" value="Ask">
    </form>
    
    `

     //let Ah3 = document.createElement('h3');

   //  let label2 = document.createElement('label')
   //  let inputText2 = document.createElement('input');
    // let inputSubmit2 = document.createElement('input');
    // let li2 = document.createElement('li');
     // 6 style
     //li.className = 'question';
     //
    // form2.className = 'question';
     //
    // inputText2.setAttribute("id","answer")
    // inputText2.setAttribute("type","text")
     //label2.setAttribute("for", "inputText")
    //
     //inputSubmit2.setAttribute("type","submit")
     //inputSubmit2.setAttribute("value","submit")
 
     // 7 add text
     //li.appendChild(document.createTextNode(question));
 //    form2.appendChild(Ah3)
 //    Ah3.innerHTML = document.getElementById("answer").value;
     //label2.innerHTML = document.createTextNode("question")
 //    form2.appendChild(label2)
//     form2.appendChild(inputText2)
//     form2.appendChild(inputSubmit2)
     //input2.appendChild(document.createElement())
     // 8 append li to questions list
     //questions.appendChild(li);
     answers.appendChild(form2);
     //questions.appendChild(inputText);
     //questions.appendChild(inputSubmit);
 
 }
 // space for additional function
