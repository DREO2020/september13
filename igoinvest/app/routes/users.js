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

connection.connect();

/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.render('user', {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: 'Profile page',
  });
});

router.post("/user/add", (req, res) => {
  connection.query(
    `insert into users (first_name, last_name, nationality, country_of_residence, postal_code, email, 
    dob, occupation) 
    values ("Doraemon", "Tan", "Singaporean", "Singapore", "100042", "dreo2020@gmail.com", CURDATE(), "Unemployed")`,
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