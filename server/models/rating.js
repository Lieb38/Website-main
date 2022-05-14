const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS ratings (
    rating_id INT NOT NULL AUTO_INCREMENT,
    rating INT,
    question_id INT,
    answer_id INT,
    user_id INT,
    CONSTRAINT rating_pk PRIMARY KEY(rating_id),
    CONSTRAINT usera_fk FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT question_fk FOREIGN KEY(question_id) REFERENCES questions(question_id),
    CONSTRAINT answer_fk FOREIGN KEY(answer_id) REFERENCES answers(answer_id)
  )`;
  await con.query(sql);
}
createTable();



async function addRatingQ(rating, question_id) {
    const sql = `INSERT INTO ratings (rating, question_id)
        VALUES ("${rating}", "${question_id}")`;

    await con.query(sql);
    const sql2 ="SELECT LAST_INSERT_ID();"
    const id = await con.query(sql2);
    const fullRating = {
        rating: rating, 
        question_id: question
    };
    return fullRating;
}

async function addRatingA(rating, answer_id) {
    const sql = `INSERT INTO ratings (rating, question_id)
        VALUES ("${rating}", "${answer_id}")`;

    await con.query(sql);
    const sql2 ="SELECT LAST_INSERT_ID();"
    const id = await con.query(sql2);
    const fullRating = {
        rating: rating, 
        answer_id: answer
    };
    return fullRating;
}

async function increseRatingA(rating) {
    const sql = `UPDATE ratings SET
      rating = rating+1
      WHERE answer_id = ${answer_id}
    `;
    const update = await con.query(sql);
  }

async function increseRatingQ(rating) {
  const sql = `UPDATE ratings SET
    rating = rating+1
    WHERE question_id = ${question_id}
  `;
  const update = await con.query(sql);
}

module.exports = {addRatingA, addRatingQ, increseRatingA, increseRatingQ}

