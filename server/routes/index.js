var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', (req, res, next) => {
  fs.readFile(path.join(__dirname, "../db/quiz.json"), 'utf-8', (err, data) => {
    res.json(JSON.parse(data))
  })
})

module.exports = router;
