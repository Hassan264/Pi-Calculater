var express = require('express');
var router = express.Router();
var math = require('mathjs').create({ number: 'BigNumber', precision: 100 });

var m1 = math.eval('sqrt(8) / 99^2');
var next = 0;

/* GET home page. */
router.get('/', function (req, res, next) {
  var result = 0;


  for (var i = 0; i < 800; i++) {
    var newResult = math.eval('((4 * n)! * (1103 + 26390 * n)) / ((n!)^4 * 396^(4*n))', { n: math.bignumber(i) });
    result = math.eval('r1 + r2', { r1: math.bignumber(result), r2: math.bignumber(newResult) });
  }
  var pi = math.eval('1 / (m1 * r)', { m1: math.bignumber(m1), r: math.bignumber(result) });

  res.send({
    result: pi.toString()
  });
});

module.exports = router;
