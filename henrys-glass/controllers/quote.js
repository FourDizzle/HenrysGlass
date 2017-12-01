const express = require('express'),
  router = express.Router(),
  bodyParser = require("body-parser"),
  sendEmail = require('../email');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
  console.log(req.body)
  sendEmail(req.body)
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ success: true }))
})

module.exports = router
