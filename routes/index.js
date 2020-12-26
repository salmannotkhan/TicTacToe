var express = require('express');
var shortid = require('shortid')
var router = express.Router();
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-')
/* GET home page. */
router.get('/', function(req, res, next) {
  var newId = shortid.generate()
  res.render('index', {roomid: '/' + newId });
});

router.get('/:name', function(req, res, next) {
  res.render('game', {roomid: req.params.name})
})

module.exports = router;
