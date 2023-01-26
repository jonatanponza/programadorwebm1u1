var express = require('express');
var router = express.Router();

/* GET galeria page. */
router.get('/', function(req, res, next) {
  res.render('galeria');
});

module.exports = router;