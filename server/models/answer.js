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

async function addAnswer(answer, user_id) {
    const sql = `INSERT INTO answers (a_content, user_id)
        VALUES ("${answer}", "${user_id}")`;

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

module.exports = {addAnswer}


// how do i make it so everytime a question or answwer is submitted, it updates the database
// how does assessments communicate with the bmi app and save a user's bmi in their profile?
