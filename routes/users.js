var express = require('express');
var router = express.Router();
require('dotenv').config();


/* GET users listing. */
router.get('/', function(req, res, next) {
  let username ={
    name:process.env.USER_NAME,
    pass:process.env.USER_PASS,
  }
  res.send(username);
});

module.exports = router;
