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

let getAllQuestion = () => question.map(a => a.question);

