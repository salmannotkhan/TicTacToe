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
  if (req.params.name == 'ai') {
    roomid = false
  }else{
    roomid = req.params.name
  }
  res.render('game', {roomid: roomid})
})

module.exports = router;
