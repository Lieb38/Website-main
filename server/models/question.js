const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS questions (
    question_id INT NOT NULL AUTO_INCREMENT,
    date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    q_content  VARCHAR(255),
    rating INT,
    user_id INT,
    CONSTRAINT question_pk PRIMARY KEY(question_id),
    CONSTRAINT user_fk FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT rating_fk FOREIGN KEY(rating) REFERENCES ratings(rating_score)
  )`;
  await con.query(sql);
}
createTable();

//let getAllQuestion = () => question.map(a => a.question);

let getQuestions = async () => {
  const sql = `SELECT * FROM questions`;
  return await con.query(sql);
};

async function getQuestion(question) {
  let sql;
  if(question.question_id) {
    sql = `SELECT * FROM questions
      WHERE question_id = ${question.question_id}
    `;
  } else {
    sql = `SELECT * FROM questions
      WHERE q_content = "${question.q_content}"
    `;
  }

  return await con.query(sql);
}


async function addQuestion(question, user_id) {
    const sql = `INSERT INTO questions (q_content, user_id)
        VALUES ("${question}", "${user_id}")`;

    await con.query(sql);
    const sql2 ="SELECT LAST_INSERT_ID();"
    const id = await con.query(sql2);
    const fullQuestion = {
        question_id: id, 
        q_content: question
    };
    return fullQuestion;
}

async function deleteQuestion(question_id) {
  const sql = `DELETE FROM questions 
    WHERE question_id = ${question_id}
  `;
  await con.query(sql);
 
}

async function editQuestion(question) {
  const sql = `UPDATE questions SET
    q_content = "${question.q_content}"
    WHERE question_id = ${question.question_id}
  `;
  const update = await con.query(sql);
  const newQuestion = await getQuestion(question);
  return await newQuestion[0];
}
// add deleteQuestion
// async function deleteQuestion(id) {
//     const sql = `DELETE FROM questions 
//       WHERE question_id = ${id}
//     `;
//     await con.query(sql);
   
//   }
// add editQuestion

module.exports = {addQuestion, deleteQuestion, editQuestion, getQuestion, getQuestions}

