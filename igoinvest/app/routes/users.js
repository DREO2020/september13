const express = require('express');
const secured = require('../lib/middleware/secured');
const router = express.Router();
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWD,
  database: process.env.DBNAME
})

let user_id;
let email;

/* GET user profile. */
router.get('/user', secured(), function (req, res) {
  const { _raw, _json, ...userProfile } = req.user;
  user_id = userProfile.user_id;
  console.log(user_id);
  email = userProfile.emails[0].value;
  console.log(email);
  res.render('user', {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: 'Profile page',
  });
});

router.post("/user/add", (req, res) => {
  // console.log(req.email);
  connection.connect();
  connection.query(
    'insert into users (id, email) values (?, ?)', [user_id, email],
    (errors, results) => {
      if (errors) {
        console.log(errors);
        res.status(500).send("Some error occurred...");
      }
      res.status(200).send("Added a new user!");
    }
  );
  
});

module.exports = router;