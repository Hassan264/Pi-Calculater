var express = require('express');
var router = express.Router();
var math = require('mathjs');
math.config({ number: 'BigNumber', precision: 1000 });

var cluster = require('cluster');
cluster.setupMaster({ exec: 'routes/pi.js' });

var worker;

var counter = 1;
var pi = 0;

function initWorker() {
  worker = cluster.fork();
  worker.on('message', function (msg) {
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

initWorker();

/* GET home page. */
router.get('/', function (req, res, next) {

  res.send({
    result: pi.value
  });
});

module.exports = router;
