const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS answers (
    answer_id INT NOT NULL AUTO_INCREMENT,
    date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    a_content VARCHAR(255),
    rating INT,
    question_id INT,
    user_id INT,
    CONSTRAINT answer_pk PRIMARY KEY(answer_id),
    CONSTRAINT usera_fk FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT question_fk FOREIGN KEY(question_id) REFERENCES questions(question_id),
    CONSTRAINT rating_fk FOREIGN KEY(rating) REFERENCES ratings(rating_score)
  )`;
  
  await con.query(sql);
}
createTable();

let getAnswers = async () => {
  const sql = `SELECT * FROM answers`;
  return await con.query(sql);
};

async function getAllanswers() {
  let sql;
  sql = `SELECT a_content, answer_id, user_id FROM answers`;
  return await con.query(sql);
};


async function getAnswer(answer) {
  let sql;
  if(answer.answer_id) {
    sql = `SELECT * FROM answers
      WHERE answer_id = ${answer.answer_id}
    `;
  } else {
    sql = `SELECT * FROM answers
      WHERE a_content = "${answer.a_content}"
    `;
  }

  return await con.query(sql);
}



async function addAnswer(answer, user_id) {
    const sql = `INSERT INTO answers (a_content, user_id)
        VALUES ("${answer}", ${user_id})`;

    await con.query(sql);
    const sql2 ="SELECT LAST_INSERT_ID();"
    const id = await con.query(sql2);
    const fullAnswer = {
        answer_id: id, 
        a_content: answer
    };
    return fullAnswer;
}
// add deleteQuestion
// add editQuestion

async function deleteAnswer(a_content) {
  const sql = `DELETE FROM answers 
    WHERE a_content = ${a_content}
  `;
  await con.query(sql);
 
}

async function editAnswer(answer) {
  const sql = `UPDATE answers SET
    a_content = "${answer.a_content}"
    WHERE user_id = ${answer.user_id}
  `;
  const update = await con.query(sql);
  const newAnswer = await getAnswer(answer);
  return await newAnswer[0];
}

module.exports = {addAnswer, deleteAnswer, editAnswer, getAnswer, getAnswers, getAllanswers}


// how do i make it so everytime a question or answwer is submitted, it updates the database
// how does assessments communicate with the bmi app and save a user's bmi in their profile?
