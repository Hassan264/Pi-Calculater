var express = require('express');
var router = express.Router();
var math = require('mathjs');
math.config({ number: 'BigNumber', precision: 1000 });

var cluster = require('cluster');

var worker;

var counter = 1;
var pi = 0;

function initWorker() {
  worker = cluster.fork();
  console.log('worker is: ' + worker);
  worker.on('message', function (msg) {
    console.log("new PI: " + msg);
    console.log(msg);
    pi = msg.pi;
    sendCounter();
  })
  sendCounter(); // kickoff initial calculation
}

function sendCounter() {
  worker.send({ n: counter });
  counter++;
}

if (cluster.isMaster) {
  console.log('init worker');
  initWorker();
}
else {
  var worker = require('cluster').worker;
  console.log('worker code: ' + worker);
  worker.on('message', function (msg) {
    console.log('in on message worker: ' + msg);
    var result = 0;
    var m1 = math.eval('sqrt(8) / 99^2');

    for (var i = 0; i < msg.n; i++) {
      var newResult = math.eval('((4 * n)! * (1103 + 26390 * n)) / ((n!)^4 * 396^(4*n))', { n: math.bignumber(i) });
      result = math.eval('r1 + r2', { r1: math.bignumber(result), r2: math.bignumber(newResult) });
    }
    var pi = math.eval('1 / (m1 * r)', { m1: math.bignumber(m1), r: math.bignumber(result) });
    process.send({ pi: pi });

  });
}

/* GET home page. */
router.get('/', function (req, res, next) {

  res.send({
    result: pi
  });
});

module.exports = router;
