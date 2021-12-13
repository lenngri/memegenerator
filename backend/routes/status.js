var express = require('express');
var router = express.Router();

/* GET test page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello World' });
});

module.exports = router;
