const express = require('express')
const app = express()
const config = require('./config')

var quote = require('./controllers/quote')
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.use('/quote', quote);

app.use('/api', router);

app.use(express.static('public'))

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))
