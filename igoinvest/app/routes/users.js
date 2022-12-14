const express = require('express');
const secured = require('../lib/middleware/secured');
const router = express.Router();
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWD,
  database: process.env.DBNAME,
  debug: false
})

pool.getConnection((err, connection) => {
  if (err)
    throw err;
  console.log('Database connected successfully');
  connection.release();
});

/* GET user profile. */
router.get('/user', secured(), function (req, res) {
  const { _raw, _json, ...userProfile } = req.user;
  user_id = userProfile.user_id;
  email = userProfile.emails[0].value;
  res.render('user', {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: 'Profile page',
  });
});

function insertNewUser(data) {
  let insertQuery = 'INSERT INTO USERS (id, email) VALUES (?, ?)';
  let query = mysql.format(insertQuery, [data.user_id, data.email]);
  pool.query(query, (error, response) => {
    if(error) {
      console.log(error);
      return;
    }
    console.log(response);
  })
}

router.post("/user/add", function (req, res) {
  const { _raw, _json, ...userProfile } = req.user;
  let user_id = userProfile.user_id;
  let email = userProfile.emails[0].value;
  // console.log("LOOOOOK HERRRRRRE");
  // console.log(res);
  // console.log("REQQQQ");
  // console.log(req);
  setTimeout(() => {
    insertNewUser({
      "user_id": user_id,
      "email": email
    });
  }, 5000);
});

module.exports = router;