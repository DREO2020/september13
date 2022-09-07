const express = require('express');
const secured = require('../lib/middleware/secured');
const router = express.Router();

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
    `insert into 
    wallets (user_id, create_time, update_time, content, wallet_sgd_balance, email) 
    values (
      2, 
      NOW(), 
      NOW(), 
      "hello",
      2,
      "dreo2020@gmail.com")`,
    (errors, results) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("Some error occurred...");
      }
      response.status(200).send("Added a new user!");
    }
  );
});

module.exports = router;