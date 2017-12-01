const express = require('express')
const app = express()

var quote = require('./controllers/quote')
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.use('/quote', quote);

app.use('/api', router);

app.use(express.static('public'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
