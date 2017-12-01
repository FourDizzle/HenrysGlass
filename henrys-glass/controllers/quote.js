const express = require('express'),
  router = express.Router(),
  bodyParser = require("body-parser")

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
  console.log(req.body)
  res.end(JSON.stringify({ success: true }))
})

module.exports = router
